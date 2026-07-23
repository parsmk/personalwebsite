import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@radix-ui/react-slider";

type SliderFieldProps = {
  name: string;
  min: number;
  max: number;
  step?: number;
  label?: string;
  value?: number;
  onValueChange?: (value: number[]) => void;
};

export const SliderField = ({
  name,
  label,
  min,
  max,
  step,
  value,
  onValueChange,
}: SliderFieldProps) => {
  return (
    <div className="text-primary font-semibold">
      {label && <p className="text-white/50 text-sm">{label}</p>}
      <div className="grid grid-cols-[1fr_9fr]">
        {value}
        <Slider
          name={name}
          min={min}
          max={max}
          step={step}
          value={value ? [value] : undefined}
          onValueChange={onValueChange}
          className="relative flex items-center w-full h-5 touch-none select-none"
        >
          <SliderTrack className="relative grow rounded-full bg-accent h-1">
            <SliderRange className="absolute h-full rounded-full bg-primary" />
          </SliderTrack>
          <SliderThumb className="block size-3 rounded-full bg-secondary focus:outline-none cursor-pointer" />
        </Slider>
      </div>
    </div>
  );
};
