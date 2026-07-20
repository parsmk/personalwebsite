export const PERLIN_LOGIC = `
  const vec2 vectors[8] = vec2[](
    vec2(1.0, 0.0),
    vec2(-1.0, 0.0),
    vec2(0.0, 1.0),
    vec2(0.0, -1.0),
    vec2(0.70710678, 0.70710678),
    vec2(-0.70710678, 0.70710678),
    vec2(0.70710678, -0.70710678),
    vec2(-0.70710678, -0.70710678)
  );

  uint perm(int x, int y) {
    return hashCoord(x, y, 0);
  }

  float ease(float t) {
    return ((6.0 * t - 15.0) * t + 10.0) * t * t * t;
  }

  float noise(vec2 s) {
    ivec2 f = ivec2(floor(s));
    ivec2 cell = f & 255;
    vec2 delta = s - vec2(f);

    vec2 vector00 = vec2(delta.x, delta.y);
    vec2 vector01 = vec2(delta.x, delta.y - 1.0);
    vec2 vector10 = vec2(delta.x - 1.0, delta.y);
    vec2 vector11 = vec2(delta.x - 1.0, delta.y - 1.0);

    int value00 = int(perm(cell.x, cell.y));
    int value01 = int(perm(cell.x, cell.y + 1));
    int value10 = int(perm(cell.x + 1, cell.y));
    int value11 = int(perm(cell.x + 1, cell.y + 1));

    float dot00 = dot(vector00, vectors[value00 & 7]);
    float dot01 = dot(vector01, vectors[value01 & 7]);
    float dot10 = dot(vector10, vectors[value10 & 7]);
    float dot11 = dot(vector11, vectors[value11 & 7]);

    return mix(
      mix(dot00, dot10, ease(delta.x)),
      mix(dot01, dot11, ease(delta.x)),
      ease(delta.y)
    );
  }
`;
