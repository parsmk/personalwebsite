import { useEffect, useRef } from "react";
import { applyColorMap, type RGB } from "../../../scripts/ColorMap";

type CanvasProps = {
  noiseMap: number[];
  size: [number, number];
  color: RGB;
};

export const Canvas = ({ noiseMap, size, color }: CanvasProps) => {
  useEffect(() => {
    if (!noiseMap || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const pixels = applyColorMap(noiseMap, size, color);
    const imageData = new ImageData(pixels, size[0], size[1]);
    ctx.putImageData(imageData, 0, 0);
  }, [noiseMap, size]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <canvas
      ref={canvasRef}
      width={size[0]}
      height={size[1]}
      className="absolute inset-0 h-full w-full -z-1"
      style={{ imageRendering: "pixelated" }}
    />
  );
};
