import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, SkipForward } from 'lucide-react';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';
import { getLenis } from '../utils/lenis';

interface PreloaderProps {
  onStartExit?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onStartExit }) => {
  const { showPreloader, setShowPreloader, preloaderVideoUrl } = useCart();
  const [isMuted, setIsMuted] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const preloaderContainerRef = useRef<HTMLDivElement>(null);

  // Lock scrolling while preloader is active
  useEffect(() => {
    const lenis = getLenis();
    if (showPreloader) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [showPreloader]);

  // Autoplay video
  useEffect(() => {
    if (!showPreloader) return;

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {
        // Fallback for browser autoplay policies
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
      });
    }
  }, [showPreloader, preloaderVideoUrl]);

  const handleDismiss = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);

    // Concurrently trigger website entrance underneath for seamless cross-dissolve
    onStartExit?.();

    const video = videoRef.current;
    if (video && !video.muted && video.volume > 0) {
      gsap.to(video, { volume: 0, duration: 0.6, ease: 'power1.out' });
    }

    // Buttery smooth GSAP exit transition
    if (preloaderContainerRef.current) {
      gsap.to(preloaderContainerRef.current, {
        opacity: 0,
        scale: 1.04,
        filter: 'blur(6px)',
        duration: 1.1,
        ease: 'power2.inOut',
        onComplete: () => {
          setShowPreloader(false);
          setIsFadingOut(false);
          const lenis = getLenis();
          lenis?.start();
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        }
      });
    } else {
      setShowPreloader(false);
      setIsFadingOut(false);
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (video) {
      const newMuted = !isMuted;
      video.muted = newMuted;
      if (!newMuted) {
        video.volume = 1;
      }
      setIsMuted(newMuted);
    }
  };

  if (!showPreloader) return null;

  return (
    <div
      ref={preloaderContainerRef}
      className={`fullscreen-video-preloader-overlay ${isFadingOut ? 'fade-out' : ''}`}
      id="site-preloader"
    >
      {/* 1. Fullscreen Video (covers 100vw and 100vh completely) */}
      <video
        ref={videoRef}
        src={preloaderVideoUrl || '/videos/preloader.mp4'}
        autoPlay
        muted={isMuted}
        playsInline
        preload="auto"
        onEnded={handleDismiss}
        className="fullscreen-preloader-video"
      />

      {/* 2. Transparent Floating Controls (Bottom Right corner only, icons only) */}
      <div className="preloader-bottom-right-controls">
        {/* Transparent Sound Toggle Button */}
        <button
          type="button"
          className="preloader-glass-icon-btn"
          onClick={toggleSound}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {/* Transparent Skip Button */}
        <button
          type="button"
          className="preloader-glass-icon-btn"
          onClick={handleDismiss}
          title="Skip Intro"
          aria-label="Skip to store"
        >
          <SkipForward size={20} />
        </button>
      </div>
    </div>
  );
};
