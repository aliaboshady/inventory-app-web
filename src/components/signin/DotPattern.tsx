'use client'

import { useEffect, useRef } from "react";

type TwoSizeDotsCanvasProps = {
  bigSize?: number;
  smallSize?: number;
  spacing?: number;
  color?: string;
  className?: string;
};

export default function DotPattern({
  bigSize = 16,
  smallSize = 8,
  spacing = 40,
  color = "#111827",
}: TwoSizeDotsCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (w: number, h: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const bigR = bigSize / 2;
      const smallR = smallSize / 2;

      const half = spacing / 2;
      let row = 0;
      for (let y = half; y <= h + half; y += spacing, row++) {
        let col = 0;
        for (let x = half; x <= w + half; x += spacing, col++) {
          const isBig = (row + col) % 2 === 0;
          const r = isBig ? bigR : smallR;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }
    };

    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      draw(rect.width, rect.height);
    });
    ro.observe(wrapper);
    const rect = wrapper.getBoundingClientRect();
    draw(rect.width, rect.height);

    return () => ro.disconnect();
  }, [bigSize, smallSize, spacing, color]);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
