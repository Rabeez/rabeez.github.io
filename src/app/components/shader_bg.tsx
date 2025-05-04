"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";
import { useTime, animate } from "motion/react";
import * as THREE from "three";

interface ShaderBackgroundProps {
  theme?: "latte" | "mocha";
  zIndex?: number;
  debug?: boolean;
  forceVisible?: boolean;
  children?: React.ReactNode;
}

export default function ShaderBackground({
  theme = "mocha",
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
      lightBlue: "#a0a5fa",
      darkBlue: "#fe40af",
    },
  };

  const [safeTheme, setSafeTheme] = useState(theme);
  useEffect(() => {
    setSafeTheme(theme);
  }, [theme]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const timeRef = useRef<number>(0);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const time = useTime();

  const currentLightBlueRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const currentDarkBlueRef = useRef<THREE.Vector3>(new THREE.Vector3());

  const updateColorsForTheme = (currentTheme: "latte" | "mocha") => {
    const colors = my_theme_colors[currentTheme];
    const lightBlueRGB = hexToRgb(colors.lightBlue);
    const darkBlueRGB = hexToRgb(colors.darkBlue);

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

    const startLight = {
      x: currentLightBlueRef.current.x,
      y: currentLightBlueRef.current.y,
      z: currentLightBlueRef.current.z,
    };
    const startDark = {
      x: currentDarkBlueRef.current.x,
      y: currentDarkBlueRef.current.y,
      z: currentDarkBlueRef.current.z,
    };

    animate(startLight, targetLightBlue, {
      duration: 0.8,
      onUpdate: (latest) => {
        currentLightBlueRef.current.set(latest.x, latest.y, latest.z);
        if (materialRef.current)
          materialRef.current?.uniforms.lightBlue.value.copy(
            currentLightBlueRef.current,
          );
      },
    });

    animate(startDark, targetDarkBlue, {
      duration: 0.8,
      onUpdate: (latest) => {
        currentDarkBlueRef.current.set(latest.x, latest.y, latest.z);
        if (materialRef.current)
          materialRef.current?.uniforms.darkBlue.value.copy(
            currentDarkBlueRef.current,
          );
      },
    });
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const colors = my_theme_colors[safeTheme];
    // console.log("init colors", colors);
    const lightBlueRGB = hexToRgb(colors.lightBlue);
    const darkBlueRGB = hexToRgb(colors.darkBlue);

    currentLightBlueRef.current.set(
      lightBlueRGB.r / 255,
      lightBlueRGB.g / 255,
      lightBlueRGB.b / 255,
    );
    currentDarkBlueRef.current.set(
      darkBlueRGB.r / 255,
      darkBlueRGB.g / 255,
      darkBlueRGB.b / 255,
    );

    // Source: https://www.shadertoy.com/view/4tdBRs/
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3() },
        lightBlue: { value: currentLightBlueRef.current },
        darkBlue: { value: currentDarkBlueRef.current },
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
          vec2 uv = gl_FragCoord.xy / iResolution.xy;
          uv.x *= iResolution.x / iResolution.y;

          vec3 depth = 0.5 + 0.2 * cos(iTime + uv.xyx * 5.0 + vec3(0, 2, 4));
          vec3 fogEffect = mix(darkBlue, lightBlue, depth);
          vec3 col = fogEffect * depth.g + depth.b * lightBlue * 0.3;
          gl_FragColor = vec4(col, 1.0);

          // vec3 color = uv.x < 0.5 ? lightBlue : darkBlue;
          // gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    materialRef.current = shaderMaterial;
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial);
    scene.add(plane);

    const handleResize = () => {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
        shaderMaterial.uniforms.iResolution.value.set(width, height, 1);
      }
    };

    const loop = () => {
      if (!rendererRef.current || !materialRef.current) return;
      requestAnimationFrame(loop);
      handleResize();
      materialRef.current.uniforms.iTime.value = timeRef.current;
      renderer.render(scene, camera);
    };

    handleResize();
    loop();

    return () => {
      scene.remove(plane);
      plane.geometry.dispose();
      shaderMaterial.dispose();
      renderer.dispose();
      materialRef.current = null;
      rendererRef.current = null;
    };
  }, []); // Empty deps, runs only once

  // Theme update only updates uniform values
  useEffect(() => {
    // console.log("updating colors", safeTheme);

    const colors = my_theme_colors[safeTheme];

    const lightRGB = hexToRgb(colors.lightBlue);
    const darkRGB = hexToRgb(colors.darkBlue);

    materialRef.current?.uniforms.lightBlue.value.copy(
      new THREE.Vector3(lightRGB.r / 255, lightRGB.g / 255, lightRGB.b / 255),
    );
    materialRef.current?.uniforms.darkBlue.value.copy(
      new THREE.Vector3(darkRGB.r / 255, darkRGB.g / 255, darkRGB.b / 255),
    );

    // console.log(materialRef.current?.uniforms);
    // console.log(materialRef.current?.uniforms.darkBlue.value);
  }, [safeTheme]);

  // Move the animation forward
  useEffect(() => {
    const unsub = time.on("change", (val) => {
      timeRef.current = val / 1000;
    });
    return () => unsub();
  }, [time]);

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
        style={{ display: "block", opacity: 1, visibility: "visible" }}
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
          </div>
        </div>
      )}

      {children}
    </div>
  );
}

function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");
  const bigint = Number.parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}
