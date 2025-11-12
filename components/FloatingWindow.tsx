
import React, { useState, useRef, useEffect } from 'react';
import { MinimizeIcon, RestoreIcon, CloseIcon } from './Icons';

interface FloatingWindowProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onMinimizeToggle: () => void;
  onPositionChange: (pos: { x: number; y: number }) => void;
}

export const FloatingWindow: React.FC<FloatingWindowProps> = ({
  title,
  children,
  isOpen,
  isMinimized,
  position,
  onClose,
  onMinimizeToggle,
  onPositionChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [relPos, setRelPos] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      onPositionChange({
        x: e.pageX - relPos.x,
        y: e.pageY - relPos.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, relPos, onPositionChange]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (!windowRef.current) return;
    const rect = windowRef.current.getBoundingClientRect();
    setIsDragging(true);
    setRelPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    e.preventDefault();
  };
  
  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className="fixed bg-gray-900/80 backdrop-blur-sm border border-green-500/50 rounded-lg shadow-2xl shadow-green-500/20 text-white font-mono flex flex-col z-50 transition-all duration-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isMinimized ? '250px' : 'clamp(300px, 90vw, 900px)',
      }}
    >
      <header
        className="flex items-center justify-between p-2 bg-gray-800/50 border-b border-green-500/30 rounded-t-lg cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <h3 className="text-green-400 text-sm tracking-widest">{title}</h3>
        <div className="flex items-center space-x-2">
          <button onClick={onMinimizeToggle} className="p-1 rounded-full hover:bg-gray-700 transition-colors" aria-label={isMinimized ? 'Restore' : 'Minimize'}>
            {isMinimized ? <RestoreIcon className="w-4 h-4 text-yellow-400" /> : <MinimizeIcon className="w-4 h-4 text-yellow-400" />}
          </button>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700 transition-colors" aria-label="Close">
            <CloseIcon className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </header>
      {!isMinimized && (
        <div className="p-4 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      )}
    </div>
  );
};
