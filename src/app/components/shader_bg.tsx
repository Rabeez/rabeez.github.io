"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";
import { useTime, animate } from "motion/react";
import * as THREE from "three";

interface ShaderBackgroundProps {
  // Light theme colors
  lightThemeColors?: {
    lightBlue: string;
    darkBlue: string;
  };
  // Dark theme colors
  darkThemeColors?: {
    lightBlue: string;
    darkBlue: string;
  };
  // Z-index for the shader container
  zIndex?: number;
  // Debug mode to show current theme
  debug?: boolean;
  // Force visibility for debugging
  forceVisible?: boolean;
  children?: React.ReactNode;
}

export default function ShaderBackground({
  // Default light theme colors (softer blues)
  lightThemeColors = {
    lightBlue: "#93c5fd", // blue-300
    darkBlue: "#3b82f6", // blue-500
  },
  // Default dark theme colors (deeper blues)
  darkThemeColors = {
    lightBlue: "#60a5fa", // blue-400
    darkBlue: "#1e40af", // blue-800
  },
  // Allow custom z-index (default -10)
  zIndex = -10,
  // Debug mode
  debug = false,
  // Force visibility for debugging
  forceVisible = false,
  children,
}: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const timeRef = useRef<number>(0);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const time = useTime();

  // Use refs instead of state for the current colors to avoid re-renders
  const currentLightBlueRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const currentDarkBlueRef = useRef<THREE.Vector3>(new THREE.Vector3());

  // For debugging - we'll use state for this since we want to show it in the UI
  const [currentTheme, setCurrentTheme] = useState<"latte" | "mocha">("mocha");

  // Track the current theme with a ref to avoid re-renders
  const themeRef = useRef<"latte" | "mocha">("mocha");

  // We'll still need one state to trigger initial setup
  const [isInitialized, setIsInitialized] = useState(false);

  // Function to get the current theme from data-theme attribute
  const getCurrentTheme = (): "latte" | "mocha" => {
    if (typeof document !== "undefined") {
      const dataTheme = document.documentElement.getAttribute("data-theme");
      return dataTheme === "mocha" ? "mocha" : "latte";
    }
    return "mocha"; // Default to light if not in browser
  };

  // Add debug info

  // Initialize theme observer
  useEffect(() => {
    // Set initial theme
    const initialTheme = getCurrentTheme();
    themeRef.current = initialTheme;
    setCurrentTheme(initialTheme); // For debugging

    // Initialize the component
    setIsInitialized(true);

    // Create a mutation observer to watch for theme changes
    const observer = new MutationObserver(() => {
      const newTheme = getCurrentTheme();

      // Only update if the theme actually changed
      if (themeRef.current !== newTheme) {
        themeRef.current = newTheme;
        setCurrentTheme(newTheme); // For debugging
        updateColorsForTheme(newTheme);
      }
    });

    // Start observing the document element for data-theme changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []); // Empty dependency array - run once on mount

  // Function to update colors based on theme
  const updateColorsForTheme = (theme: "latte" | "mocha") => {
    const colors = theme === "mocha" ? darkThemeColors : lightThemeColors;

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
    }
  };

  // Initialize WebGL and shader
  useEffect(() => {
    if (!isInitialized || !canvasRef.current) return;

    // Get initial theme
    const initialTheme = getCurrentTheme();
    themeRef.current = initialTheme;

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

    // Get initial colors based on theme
    const colors =
      initialTheme === "mocha" ? darkThemeColors : lightThemeColors;

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
          
          // Output to screen
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    // Store material reference for later updates
    materialRef.current = shaderMaterial;

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

    // Cleanup
    return () => {
      scene.remove(plane);
      plane.geometry.dispose();
      shaderMaterial.dispose();
      renderer.dispose();
      rendererRef.current = null;
      materialRef.current = null;
    };
  }, [isInitialized, darkThemeColors, lightThemeColors]); // Only run when initialized or theme colors change

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
      className={`-z-${zIndex * -1} fixed inset-0 overflow-hidden`}
      style={{
        zIndex: effectiveZIndex,
        // Add a background color in debug mode to help identify if the component is rendering
        backgroundColor:
          debug && forceVisible ? "rgba(0,0,0,0.1)" : "transparent",
      }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ display: "block" }}
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
          <p className="mb-2">Current Theme: {currentTheme}</p>
          <p className="mb-2">
            Z-Index: <strong>{effectiveZIndex}</strong>
          </p>
          <p className="mb-2">
            Light Blue:
            {currentTheme === "latte"
              ? lightThemeColors.lightBlue
              : darkThemeColors.lightBlue}
          </p>
          <p>
            Dark Blue:
            {currentTheme === "latte"
              ? lightThemeColors.darkBlue
              : darkThemeColors.darkBlue}
          </p>
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
