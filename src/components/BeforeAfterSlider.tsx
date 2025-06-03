import React, { useRef, useState } from 'react';

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  alt?: string;
  className?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ before, after, alt, className }) => {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    const move = (ev: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let x = ev.clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      setPos((x / rect.width) * 100);
    };
    const up = () => {
      dragging.current = false;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden bg-gray-900 shadow-xl group ${className || ''}`}
      style={{ userSelect: 'none' }}
    >
      <img src={before} alt={alt || 'before'} className="absolute inset-0 w-full h-full object-cover" />
      <img
        src={after}
        alt={alt || 'after'}
        className="absolute inset-0 h-full object-cover"
        style={{ width: '100%', height: '100%', clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      {/* 分割线和拖动按钮 */}
      <div
        className="absolute top-0 bottom-0 z-20 flex flex-col items-center cursor-ew-resize"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        onPointerDown={handlePointerDown}
      >
        <div className="w-1 h-full bg-white/80 rounded-full shadow" />
        <div className="w-10 h-10 bg-white/90 border-4 border-gray-300 rounded-full shadow-lg flex items-center justify-center mt-[-20px] cursor-pointer transition-transform group-hover:scale-110">
          <svg width="24" height="24" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 12h8M12 8l-4 4 4 4"/></svg>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider; 