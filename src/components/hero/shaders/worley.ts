export const WORLEY_LOGIC = `
  #define MAX_SEEDS 20

  vec2 hash2(ivec2 cell, int i) {
    uint h = hashCoord(cell.x, cell.y, i);
    return vec2(float(h & 0xffffu), float(h >> 16u)) / 65536.0;
  }

  void cellSeeds(ivec2 cell, out vec2 points[MAX_SEEDS]) {
    for (int i = 0; i < uWorleySeeds; i++) {
      points[i] = vec2(cell) + hash2(cell, i);
    }
  }

  float noise(vec2 s) {
    ivec2 cell = ivec2(floor(s));
    float minDist = 10000.0;

    for (int dx = -1; dx <= 1; dx++) {
      for (int dy = -1; dy<= 1; dy++) {
        vec2 seeds[MAX_SEEDS];
        cellSeeds(ivec2(cell.x + dx, cell.y + dy), seeds);

        for (int i = 0; i < uWorleySeeds; i++) {
          vec2 d = s - seeds[i];
          minDist = min(minDist, dot(d, d));
        }
      }
    }

    float d = sqrt(minDist);
    float expected = 1.0 / (2.0 * sqrt(float(uWorleySeeds)));
    return clamp(d / expected, 0.0, 1.0) * 2.0 - 1.0;
  }
`;
