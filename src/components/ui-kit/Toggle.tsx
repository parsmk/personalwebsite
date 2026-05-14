import { Switch, SwitchThumb } from "@radix-ui/react-switch";

type ToggleProps = {
  active: boolean;
  setActive: (b: boolean) => void;
};

export const Toggle = ({ active, setActive }: ToggleProps) => {
  return (
    <Switch
      className="
        relative flex h-5 w-12
        items-center rounded-full
        bg-primary/50 outline-1 outline-primary
        data-[state=checked]:bg-primary cursor-pointer
      "
      checked={active}
      onCheckedChange={(b) => setActive(b)}
    >
      <SwitchThumb
        className="
          block absolute size-4
          rounded-full 
          bg-white/50 shadow 
          translate-x-0.5 transition-all duration-300 data-[state=checked]:translate-x-7.5 data-[state=checked]:bg-accent
        "
      />
    </Switch>
  );
};
