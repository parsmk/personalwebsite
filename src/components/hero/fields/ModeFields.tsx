import { NoiseModes } from "../../../scripts/noise/NoiseUtil";
import { Button } from "../../ui-kit/Button";
import type { RenderConfig } from "../HeroBG";
import { FieldCard, FieldCardPos } from "./FieldCard";

type ModefieldsProps = {
  config: RenderConfig;
  setConfig: (next: RenderConfig) => void;
};

export const ModeFields = ({ config, setConfig }: ModefieldsProps) => {
  return (
    <FieldCard pos={FieldCardPos.BOTTOM} direction="row">
      <Button
        variant="outline"
        active={config.noiseMode === NoiseModes.PERLIN}
        onClick={() => setConfig({ ...config, noiseMode: NoiseModes.PERLIN })}
      >
        Perlin
      </Button>
      <Button
        variant="outline"
        active={config.noiseMode === NoiseModes.WORLEY}
        onClick={() => setConfig({ ...config, noiseMode: NoiseModes.WORLEY })}
      >
        Worley
      </Button>
      <Button
        variant="outline"
        active={config.fractal}
        onClick={() => setConfig({ ...config, fractal: !config.fractal })}
      >
        Fractal
      </Button>
    </FieldCard>
  );
};
