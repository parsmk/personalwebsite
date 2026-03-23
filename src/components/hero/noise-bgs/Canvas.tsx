import { useEffect, useRef } from "react";
import { applyColorMap, type RGB } from "../../../scripts/ColorMap";

type CanvasProps = {
  noiseMap: number[];
  size: [number, number];
  colorMin: RGB;
  colorMax: RGB;
};

export const Canvas = ({ noiseMap, size, colorMin, colorMax }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!noiseMap || !canvasRef.current) return;
    if (!ctxRef.current) ctxRef.current = canvasRef.current.getContext("2d");
    const ctx = ctxRef.current;
    if (!ctx) return;
    const pixels = applyColorMap(noiseMap, size, colorMin, colorMax);
    const imageData = new ImageData(pixels, size[0], size[1]);
    ctx.putImageData(imageData, 0, 0);
  }, [noiseMap, size, colorMin, colorMax]);
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
