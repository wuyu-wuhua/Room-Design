import React, { useRef, useEffect } from 'react';

interface ScratchToRevealProps {
  width: number;
  height: number;
  minScratchPercentage?: number;
  className?: string;
  gradientColors?: string[];
  image: string; // 草图
  revealImage: string; // 渲染图
  maskImage?: string; // 新增：遮罩图片
  children?: React.ReactNode;
}

export const ScratchToReveal: React.FC<ScratchToRevealProps> = ({
  width,
  height,
  minScratchPercentage = 60,
  className = '',
  gradientColors = ["#A97CF8", "#F38CB8", "#FDCC92"],
  image,
  revealImage,
  maskImage,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const [maskLoaded, setMaskLoaded] = React.useState(false);
  const gradCanvasRef = useRef<HTMLCanvasElement>(null);

  // 记录已刮开的像素百分比
  const checkScratchPercent = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] === 0) cleared++;
    }
    return (cleared / (canvas.width * canvas.height)) * 100;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    if (image) {
      // 用image作为遮罩（草图）
      const img = new window.Image();
      img.src = image;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        setMaskLoaded(true);
      };
    } else {
      // 填充渐变遮罩
      const grad = ctx.createLinearGradient(0, 0, width, height);
      gradientColors.forEach((color, i) => grad.addColorStop(i / (gradientColors.length - 1), color));
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      setMaskLoaded(true);
    }
  }, [width, height, gradientColors, image]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    scratch(e);
  };
  const handlePointerUp = () => {
    isDrawing.current = false;
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    scratch(e);
  };

  // 修改scratch函数：canvas destination-out，底图能被看到
  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const native = e.nativeEvent as any;
    const x = ((native.touches?.[0]?.clientX ?? e.clientX) - rect.left) * (canvas.width / rect.width);
    const y = ((native.touches?.[0]?.clientY ?? e.clientY) - rect.top) * (canvas.height / rect.height);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  };

  // 判断是否已刮开足够
  const [done, setDone] = React.useState(false);
  useEffect(() => {
    if (done) return;
    const interval = setInterval(() => {
      if (checkScratchPercent() > minScratchPercentage) setDone(true);
    }, 500);
    return () => clearInterval(interval);
  }, [done, minScratchPercentage]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width, height, position: 'relative', userSelect: 'none' }}
    >
      {/* revealImage底图，始终渲染在最底层 */}
      <img
        src={revealImage}
        alt="reveal"
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit', position: 'absolute', left: 0, top: 0, zIndex: 0 }}
        draggable={false}
      />
      {/* 只渲染canvas遮罩 */}
      {!done && (
        <>
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', borderRadius: 'inherit', touchAction: 'none', zIndex: 2 }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
          />
          {/* 刮开提示 */}
          <span style={{ position: 'absolute', top: 10, right: 16, zIndex: 10, background: 'linear-gradient(90deg,#A97CF8,#F38CB8,#FDCC92)', color: '#fff', fontWeight: 700, fontSize: 13, padding: '3px 12px', borderRadius: 12, boxShadow: '0 2px 8px #b6b9d6', pointerEvents: 'none' }}>
            Can be scratched off
          </span>
        </>
      )}
      {/* 刮开后显示children */}
      {done && children}
    </div>
  );
}; 