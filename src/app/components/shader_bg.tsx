"use client";

import type React from "react";

import { useRef, useEffect, useState } from "react";
import { useTime, animate } from "motion/react";
import * as THREE from "three";

interface ShaderBackgroundProps {
  theme?: "latte" | "mocha"; // Make theme optional with a default
  // Z-index for the shader container
  zIndex?: number;
  // Debug mode to show current theme
  debug?: boolean;
  // Force visibility for debugging
  forceVisible?: boolean;
  children?: React.ReactNode;
}

export default function ShaderBackground({
  theme = "mocha", // Default to latte if not provided
  zIndex = -10,
  debug = false,
  forceVisible = false,
  children,
}: ShaderBackgroundProps) {
  const my_theme_colors = {
    latte: {
      lightBlue: "#93c5ad",
      darkBlue: "#ff82a6",
    },
    mocha: {
      lightBlue: "#60a5fa",
      darkBlue: "#1e40af",
    },
  };

  // Ensure we have a valid theme
  const safeTheme =
    theme && (theme === "latte" || theme === "mocha") ? theme : "mocha";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const timeRef = useRef<number>(0);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const time = useTime();

  // Use refs for the current colors to avoid re-renders
  const currentLightBlueRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const currentDarkBlueRef = useRef<THREE.Vector3>(new THREE.Vector3());

  // For debugging
  const [debugInfo, setDebugInfo] = useState<string>("");

  // Add debug info
  const addDebugInfo = (info: string) => {
    if (debug) {
      console.log(`[ShaderBackground] ${info}`);
      setDebugInfo(
        (prev) => `${prev}\n${new Date().toLocaleTimeString()}: ${info}`,
      );
    }
  };

  // Update colors when theme changes
  useEffect(() => {
    if (materialRef.current) {
      updateColorsForTheme(safeTheme);
    }
  }, [safeTheme]);

  // Function to update colors based on theme
  const updateColorsForTheme = (currentTheme: "latte" | "mocha") => {
    // Safely get colors, defaulting to latte if there's an issue
    const colors = my_theme_colors[currentTheme] || my_theme_colors.latte;

    addDebugInfo(
      `Updating colors for ${currentTheme} theme: ${colors.lightBlue}, ${colors.darkBlue}`,
    );

    // Parse the hex colors to RGB values
    const lightBlueRGB = hexToRgb(colors.lightBlue);
    const darkBlueRGB = hexToRgb(colors.darkBlue);

    // Create target vectors
    const targetLightBlue = new THREE.Vector3(
      lightBlueRGB.r / 255,
      lightBlueRGB.g / 255,
      lightBlueRGB.b / 255,
    );

    const targetDarkBlue = new THREE.Vector3(
      darkBlueRGB.r / 255,
      darkBlueRGB.g / 255,
      darkBlueRGB.b / 255,
    );

    // Animate color transitions
    if (materialRef.current) {
      addDebugInfo("Material found, updating colors");
      // Start with current values if they exist, otherwise use targets
      const startLightBlue =
        currentLightBlueRef.current.length() > 0
          ? {
              x: currentLightBlueRef.current.x,
              y: currentLightBlueRef.current.y,
              z: currentLightBlueRef.current.z,
            }
          : {
              x: targetLightBlue.x,
              y: targetLightBlue.y,
              z: targetLightBlue.z,
            };

      const startDarkBlue =
        currentDarkBlueRef.current.length() > 0
          ? {
              x: currentDarkBlueRef.current.x,
              y: currentDarkBlueRef.current.y,
              z: currentDarkBlueRef.current.z,
            }
          : {
              x: targetDarkBlue.x,
              y: targetDarkBlue.y,
              z: targetDarkBlue.z,
            };

      // Animate light blue
      animate(
        startLightBlue,
        {
          x: targetLightBlue.x,
          y: targetLightBlue.y,
          z: targetLightBlue.z,
        },
        {
          duration: 0.8,
          onUpdate: (latest) => {
            if (materialRef.current) {
              currentLightBlueRef.current.set(latest.x, latest.y, latest.z);
              materialRef.current.uniforms.lightBlue.value =
                currentLightBlueRef.current;
            }
          },
        },
      );

      // Animate dark blue
      animate(
        startDarkBlue,
        {
          x: targetDarkBlue.x,
          y: targetDarkBlue.y,
          z: targetDarkBlue.z,
        },
        {
          duration: 0.8,
          onUpdate: (latest) => {
            if (materialRef.current) {
              currentDarkBlueRef.current.set(latest.x, latest.y, latest.z);
              materialRef.current.uniforms.darkBlue.value =
                currentDarkBlueRef.current;
            }
          },
        },
      );
    } else {
      addDebugInfo("Material not found, cannot update colors");
    }
  };

  // Initialize WebGL and shader
  useEffect(() => {
    if (!canvasRef.current) {
      addDebugInfo("Canvas not found");
      return;
    }

    addDebugInfo("Initializing WebGL and shader");

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    rendererRef.current = renderer;

    // Setup scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Get initial colors based on theme - safely
    const colors = my_theme_colors[safeTheme] || my_theme_colors.latte;

    addDebugInfo(
      `Using ${safeTheme} theme colors: ${colors.lightBlue}, ${colors.darkBlue}`,
    );

    // Parse the hex colors to RGB values
    const lightBlueRGB = hexToRgb(colors.lightBlue);
    const darkBlueRGB = hexToRgb(colors.darkBlue);

    // Create initial vectors
    const initialLightBlue = new THREE.Vector3(
      lightBlueRGB.r / 255,
      lightBlueRGB.g / 255,
      lightBlueRGB.b / 255,
    );

    const initialDarkBlue = new THREE.Vector3(
      darkBlueRGB.r / 255,
      darkBlueRGB.g / 255,
      darkBlueRGB.b / 255,
    );

    // Update refs with initial values
    currentLightBlueRef.current = initialLightBlue.clone();
    currentDarkBlueRef.current = initialDarkBlue.clone();

    // Create shader material
    // Source: https://www.shadertoy.com/view/4tdBRs
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3() },
        lightBlue: { value: initialLightBlue },
        darkBlue: { value: initialDarkBlue },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec3 iResolution;
        uniform vec3 lightBlue;
        uniform vec3 darkBlue;
        
        void main() {
          // Normalized pixel coordinates (from 0 to 1)
          vec2 uv = gl_FragCoord.xy / iResolution.xy;
          
          // Time varying pixel depth
          vec3 depth = 0.5 + 0.2 * cos(iTime + uv.xyx * 5.0 + vec3(0, 2, 4));
          
          // Create fog effect with blue colors
          vec3 fogEffect = mix(darkBlue, lightBlue, depth);
          
          // Combine layers for more interesting effect
          vec3 col = fogEffect * depth.g + depth.b * lightBlue * 0.3;
          
          // Output to screen with full opacity
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    // Store material reference for later updates
    materialRef.current = shaderMaterial;
    addDebugInfo("Shader material created");

    // Create a plane that fills the screen
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial);
    scene.add(plane);

    // Handle resize
    const handleResize = () => {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;

      if (needResize) {
        renderer.setSize(width, height, false);
        shaderMaterial.uniforms.iResolution.value.set(width, height, 1);
      }

      return needResize;
    };

    // Animation loop
    const animate = () => {
      if (!rendererRef.current) return;

      requestAnimationFrame(animate);
      handleResize();

      // Update time uniform
      shaderMaterial.uniforms.iTime.value = timeRef.current;

      renderer.render(scene, camera);
    };

    handleResize();
    animate();
    addDebugInfo("Animation loop started");

    // Cleanup
    return () => {
      addDebugInfo("Cleaning up WebGL resources");
      scene.remove(plane);
      plane.geometry.dispose();
      shaderMaterial.dispose();
      renderer.dispose();
      rendererRef.current = null;
      materialRef.current = null;
    };
  }, [safeTheme, debug]); // Use safeTheme instead of theme

  // Update time from Framer Motion's useTime hook
  useEffect(() => {
    const unsubscribe = time.on("change", (value) => {
      timeRef.current = value / 1000;
    });

    return () => {
      unsubscribe();
    };
  }, [time]);

  // Calculate the effective z-index
  const effectiveZIndex = debug && forceVisible ? 9999 : zIndex;

  return (
    <div
      className={`${debug ? "pointer-events-auto" : "pointer-events-none"} fixed inset-0 overflow-hidden`}
      style={{
        zIndex: effectiveZIndex,
        backgroundColor:
          debug && forceVisible ? "rgba(0,0,0,0.1)" : "transparent",
        opacity: 1,
        visibility: "visible",
      }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{
          display: "block",
          opacity: 1,
          visibility: "visible",
        }}
      />

      {debug && (
        <div
          className="absolute top-4 left-4 rounded bg-black p-4 text-white shadow-lg"
          style={{
            zIndex: 10000,
            maxWidth: "80vw",
            maxHeight: "80vh",
            overflow: "auto",
            border: "2px solid red",
            opacity: 0.9,
          }}
        >
          <h3 className="mb-2 text-xl font-bold">ShaderBackground Debug</h3>
          <p className="mb-2">
            Current Theme: <strong>{safeTheme}</strong>{" "}
            {safeTheme !== theme && `(defaulted from ${theme || "undefined"})`}
          </p>
          <p className="mb-2">
            Z-Index: <strong>{effectiveZIndex}</strong>
          </p>
          <p className="mb-2">
            Colors: {JSON.stringify(my_theme_colors[safeTheme])}
          </p>

          <div className="mt-4">
            <p className="font-bold">Debug Log:</p>
            <pre className="mt-2 rounded bg-gray-800 p-2 text-xs whitespace-pre-wrap">
              {debugInfo || "No debug info yet"}
            </pre>
          </div>
        </div>
      )}

      {children}
    </div>
  );
}

// Helper function to convert hex color to RGB
function hexToRgb(hex: string) {
  // Remove # if present
  hex = hex.replace(/^#/, "");

  // Parse hex values
  const bigint = Number.parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}
