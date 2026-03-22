import { HeroBG } from "./HeroBG";

export const Hero = () => {
  return (
    <div className="flex flex-row items-center justify-center grow gap-2">
      <HeroBG />
      <div className="flex flex-col justify-center items-end rounded-tl-full size-100">
        <div className="w-[80%]">
          <h1 className="font-bold text-5xl text-accent">PMK Development</h1>
          <h2 className="text-2xl text-accent/70 my-2">
            Software Engineer, Full-Stack Developer
          </h2>
        </div>
      </div>
      <img src="hero-img.png" className="h-[75%]" />
    </div>
  );
};
