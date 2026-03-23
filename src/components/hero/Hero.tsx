import { HeroBG } from "./HeroBG";

export const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full overflow-clip">
      <HeroBG />
      <div className="flex flex-row items-center justify-center h-[50%] gap-2">
        <div className="flex flex-col justify-center items-end rounded-tl-full size-100 z-10">
          <div className="w-[80%]">
            <h1 className="font-bold text-5xl text-white">PMK Development</h1>
            <h2 className="text-2xl text-white/70 my-2">
              Software Engineer, Full-Stack Developer
            </h2>
          </div>
        </div>
        <img src="hero-img.png" className="h-175 z-1" />
      </div>
    </div>
  );
};
