import type { RgbColor } from "react-colorful";

export enum NoiseMode {
  WORLEY = "worley",
  PERLIN = "perlin",
}

export type NoiseConfig = {
  colorMin: RgbColor;
  colorMax: RgbColor;
  noiseMode: NoiseMode;
  fractal: boolean;
  noiseData: {
    offset: [x: number, y: number];
    scale: number;
    size: [x: number, y: number];
    seed: number;
  };
  fractalData: {
    lacunarity: number;
    persistence: number;
    octaves: number;
  };
  worleySeeds: number;
};

const loadShader = (
  gl: WebGL2RenderingContext,
  type: GLenum,
  source: string,
) => {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("gl.createShader returned null");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`${type} shader compile failed:\n${log}`);
  }
  return shader;
};

export const createProgram = (
  gl: WebGL2RenderingContext,
  vertSource: string,
  fragSource: string,
) => {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragSource);
  const program = gl.createProgram();

  if (!program) throw new Error("gl.createProgram returned null");

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program);
    throw new Error(`program link failed:\n${log}`);
  }

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return program;
};

export const populateUniforms = (
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  config: NoiseConfig,
) => {
  const uSeed = gl.getUniformLocation(program, "uSeed");
  const uOffset = gl.getUniformLocation(program, "uOffset");
  const uScale = gl.getUniformLocation(program, "uScale");

  const uMinColor = gl.getUniformLocation(program, "uMinColor");
  const uMaxColor = gl.getUniformLocation(program, "uMaxColor");

  const uOctaves = gl.getUniformLocation(program, "uOctaves");
  const uPersistence = gl.getUniformLocation(program, "uPersistence");
  const uLacunarity = gl.getUniformLocation(program, "uLacunarity");

  const uWorleySeeds = gl.getUniformLocation(program, "uWorleySeeds");

  gl.uniform1i(uSeed, config.noiseData.seed);
  gl.uniform2f(uOffset, config.noiseData.offset[0], config.noiseData.offset[1]);
  gl.uniform1f(uScale, config.noiseData.scale);

  gl.uniform4f(
    uMinColor,
    config.colorMin.r / 255,
    config.colorMin.g / 255,
    config.colorMin.b / 255,
    1,
  );
  gl.uniform4f(
    uMaxColor,
    config.colorMax.r / 255,
    config.colorMax.g / 255,
    config.colorMax.b / 255,
    1,
  );

  const fractalData = config.fractal
    ? config.fractalData
    : { octaves: 1, lacunarity: 1, persistence: 1 };
  gl.uniform1i(uOctaves, fractalData.octaves);
  gl.uniform1f(uPersistence, fractalData.persistence);
  gl.uniform1f(uLacunarity, fractalData.lacunarity);

  gl.uniform1i(
    uWorleySeeds,
    config.noiseMode === NoiseMode.WORLEY ? config.worleySeeds : 1,
  );
};
