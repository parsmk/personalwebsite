export const VERT_SHADER = `#version 300 es
  const vec2 c[3] = vec2[3](vec2(-1,-1), vec2(3,-1), vec2(-1,3));
  void main() { gl_Position = vec4(c[gl_VertexID], 0.0, 1.0); }
`;

const NOISE_HELPERS = `
  uint hashU(uint x) {
    x ^= x >> 16;
    x *= 0x7feb352du;
    x ^= x >> 15;
    x *= 0x846ca68bu;
    x ^= x >> 16;
    return x;
  }

  uint hashCoord(int x, int y, int i) {
    uint h = uint(uSeed);
    h = hashU(h ^ (uint(x) * 0x9e3779b9u));
    h = hashU(h ^ (uint(y) * 0x85ebca6bu));
    h = hashU(h ^ (uint(i) * 0xc2b2ae35u));
    return h;
  }
`;

export const NOISE_SHADER = (injection: string) =>
  `#version 300 es
    precision highp float;

    out vec4 outColor;

    uniform int uSeed;
    uniform vec2 uOffset;
    uniform float uScale;

    uniform vec4 uMinColor;
    uniform vec4 uMaxColor;

    uniform int uOctaves;
    uniform float uPersistence;
    uniform float uLacunarity;

    uniform int uWorleySeeds;

    ${NOISE_HELPERS}

    ${injection}

    void main() {
      float amp = 1.0, freq = 1.0, height = 0.0, norm = 0.0;

      for (int i = 0; i < uOctaves; i++) {
        vec2 s = (freq * (gl_FragCoord.xy + uOffset)) / uScale;
        height += amp * noise(s);
        norm += amp;
        amp *= uPersistence;
        freq *= uLacunarity;
      }

      outColor = mix(uMinColor, uMaxColor, (height / norm + 1.0) / 2.0);
    }
  `;
