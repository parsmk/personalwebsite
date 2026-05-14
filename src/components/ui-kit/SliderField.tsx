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
};

export const SliderField = ({
  name,
  label,
  min,
  max,
  step,
}: SliderFieldProps) => {
  return (
    <div className="text-primary font-semibold">
      {label && <p className="text-white/50 text-sm mb-1">{label}</p>}
      <div className="flex gap-2">
        {min}
        <Slider
          name={name}
          min={min}
          max={max}
          step={step}
          className="relative flex items-center w-[90%] h-5"
        >
          <SliderTrack className="relative grow rounded-full bg-accent h-1">
            <SliderRange className="absolute h-full rounded-full bg-primary" />
          </SliderTrack>
          <SliderThumb className="block size-3 rounded-full bg-secondary focus:outline-none cursor-pointer" />
        </Slider>
        {max}
      </div>
    </div>
  );
};
