import { useState, useRef, useEffect } from "react";

import { NoiseControlPanel } from "./control-panel/NoiseControlPanel";

import {
  createProgram,
  NoiseMode,
  populateUniforms,
  type NoiseConfig,
} from "./shaders/utils";
import { VERT_SHADER, NOISE_SHADER } from "./shaders/programs";
import { PERLIN_LOGIC } from "./shaders/perlin";
import { WORLEY_LOGIC } from "./shaders/worley";

import { useWindowSize } from "../../hooks/useWindowSize";

const INIT_CONFIG: NoiseConfig = {
  worleySeeds: 2,
  noiseMode: NoiseMode.WORLEY,
  fractal: true,
  noiseData: {
    seed: Math.random() * 99999 + 1,
    offset: [0, 0],
    scale: 250,
    size: [window.innerWidth, window.innerHeight],
  },
  fractalData: {
    lacunarity: 3,
    persistence: 0.5,
    octaves: 4,
  },
  colorMin: { r: 255, g: 255, b: 255 },
  colorMax: { r: 4, g: 52, b: 44 },
};

export const NoiseBG = () => {
  const [config, setConfig] = useState<NoiseConfig>(INIT_CONFIG);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const noiseFns = useRef<{
    perlin: WebGLProgram;
    worley: WebGLProgram;
  } | null>(null);

  const [width, height] = useWindowSize();

  useEffect(() => {
    const gl = canvas.current?.getContext("webgl2");

    if (!gl) return;

    glRef.current = gl;

    const perlin = createProgram(gl, VERT_SHADER, NOISE_SHADER(PERLIN_LOGIC));
    const worley = createProgram(gl, VERT_SHADER, NOISE_SHADER(WORLEY_LOGIC));

    noiseFns.current = { perlin, worley };

    return () => {
      gl.deleteProgram(perlin);
      gl.deleteProgram(worley);
      noiseFns.current = null;
    };
  }, []);

  useEffect(() => {
    if (!glRef.current || !noiseFns.current) return;
    const gl = glRef.current;
    const { perlin, worley } = noiseFns.current;

    const program = config.noiseMode === NoiseMode.PERLIN ? perlin : worley;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.useProgram(program);
    populateUniforms(gl, program, config);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }, [config]);

  useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      noiseData: { ...prev.noiseData, size: [width, height] },
    }));
  }, [width, height]);

  return (
    <div className="sticky top-0 h-0 w-full overflow-visible">
      <div className="absolute inset-x-0 top-0 h-screen">
        <canvas
          ref={canvas}
          width={config.noiseData.size[0]}
          height={config.noiseData.size[1]}
          className="absolute inset-0 h-full w-full -z-1"
          style={{ imageRendering: "pixelated" }}
        />
        <NoiseControlPanel
          config={config}
          setConfig={(changes) =>
            setConfig((prev) => ({ ...prev, ...changes }))
          }
        />
      </div>
    </div>
  );
};
