"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

// Radial line shader (provided), tinted to the site's gold palette.
const fragmentShader = /* glsl */ `
  #define TWO_PI 6.2831853072
  #define PI 3.14159265359

  precision mediump float;
  uniform vec2 resolution;
  uniform float time;

  void main(void) {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    float t = time * 0.05;
    float lineWidth = 0.002;

    // Accumulate the layered lines into a single intensity (no RGB fringing).
    float v = 0.0;
    for (int j = 0; j < 3; j++) {
      for (int i = 0; i < 5; i++) {
        v += lineWidth * float(i * i) /
          abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
      }
    }
    v /= 3.0;

    // Map the line intensity onto the gold accent.
    vec3 gold = vec3(1.0, 0.78, 0.32);
    gl_FragColor = vec4(gold * v, 1.0);
  }
`;

function Plane() {
  const matRef = React.useRef<THREE.ShaderMaterial>(null);
  const { invalidate } = useThree();

  const uniforms = React.useMemo(
    () => ({
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  // Render at ~30fps via the demand frameloop instead of every rAF.
  React.useEffect(() => {
    let raf = 0;
    let last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 33) return;
      last = now;
      invalidate();
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [invalidate]);

  useFrame((state) => {
    const mat = matRef.current;
    if (!mat) return;
    // elapsedTime * 3 ≈ the original's 0.05-per-frame speed at 60fps, but frame-rate independent.
    mat.uniforms.time.value = state.clock.elapsedTime * 3.0;
    mat.uniforms.resolution.value.set(
      state.size.width * state.viewport.dpr,
      state.size.height * state.viewport.dpr
    );
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function ShaderBackground() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (reduceMotion || !mounted) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-50 blur-[1px] [mask-image:radial-gradient(135%_135%_at_50%_0%,black,transparent_78%)]"
    >
      <Canvas
        gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
        dpr={0.5}
        frameloop="demand"
      >
        <Plane />
      </Canvas>
    </div>
  );
}
