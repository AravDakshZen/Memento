import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [badgeText, setBadgeText] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, .clickable-card, [data-cursor]');
      if (interactive) {
        setIsHovered(true);
        const customBadge = interactive.getAttribute('data-cursor');
        setBadgeText(customBadge || '');
      } else {
        setIsHovered(false);
        setBadgeText('');
      }

      // 3D Tilt micro-interaction for cards with data-tilt
      const tiltEl = target.closest('[data-tilt]') as HTMLElement | null;
      if (tiltEl) {
        const rect = tiltEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;
        tiltEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      }
    };

    const handleMouseLeaveDoc = () => {
      setIsVisible(false);
      // Reset tilts
      document.querySelectorAll('[data-tilt]').forEach((el) => {
        (el as HTMLElement).style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveDoc);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveDoc);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isVisible]);

  // Smooth lerp loop for the trailing outer ring
  useEffect(() => {
    let animId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const followLoop = () => {
      setTrailingPos((prev) => ({
        x: lerp(prev.x, position.x, 0.2),
        y: lerp(prev.y, position.y, 0.2),
      }));
      animId = requestAnimationFrame(followLoop);
    };

    animId = requestAnimationFrame(followLoop);
    return () => cancelAnimationFrame(animId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        className={`custom-cursor-dot ${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />

      {/* Trailing Luxury Aura Ring */}
      <div
        className={`custom-cursor-follower ${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''} ${badgeText ? 'has-badge' : ''}`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        {badgeText && <span className="cursor-badge-text">{badgeText}</span>}
      </div>
    </>
  );
};
