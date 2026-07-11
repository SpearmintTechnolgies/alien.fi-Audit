"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are hovering over an interactive element
      if (target.closest('a, button, input, textarea, select, .cursor-pointer, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", updateHoverState);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", updateHoverState);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* The main green circle cursor */}
      <div 
        className="fixed pointer-events-none z-[9999] rounded-full border-2 border-[#9BED58] transition-all duration-300 ease-out flex items-center justify-center"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          width: isHovering ? '60px' : '30px',
          height: isHovering ? '60px' : '30px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: isHovering ? 'rgba(155, 237, 88, 0.2)' : 'transparent',
        }}
      />
    </>
  );
}
