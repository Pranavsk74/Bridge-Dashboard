import React, { useEffect, useState } from 'react';
import { SensorReading } from '@/models/types';
import { ASSETS } from '@/config/assets';
import { ChevronDown, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  reading: SensorReading;
  onNavigate: (viewId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ reading, onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);
  const [videoError, setVideoError] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const videoScale = Math.min(1.04, 1 + scrollY * 0.0001);
  const textOffsetY = Math.min(20, scrollY * 0.04);
  const textOpacity = Math.max(0, 1 - scrollY * 0.002);
  const videoSrc = encodeURI(ASSETS.hero.video.path);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-[#2f2116] text-[#ffebd0]">
      {/* 100vh Full-Bleed Train Video (SOLE HERO VIDEO ON WEBSITE) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {!videoError ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            style={{ transform: `scale(${videoScale})` }}
            className="w-full h-full object-cover transition-transform duration-500 ease-out filter brightness-[0.88] contrast-[1.05]"
          />
        ) : (
          <div className="w-full h-full bg-[#2f2116] bg-cad-grid-dark flex items-center justify-center font-sans text-caption-oryzo text-[#fee197]">
            HERO VIDEO PENDING // {ASSETS.hero.video.path}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2f2116] via-[#2f2116]/35 to-transparent opacity-85" />
      </div>

      {/* Hero Content Overlay Layer */}
      <div className="relative z-10 max-w-[1200px] mx-auto h-full px-6 md:px-10 flex flex-col justify-between pt-36 pb-16 pointer-events-none">
        <div className="w-full flex justify-between items-start pointer-events-auto">
          <div className="text-caption-oryzo text-[#ffebd0] tracking-wide font-sans border-l-2 border-[#fee197] pl-3 py-1">
            STRUCTURAL MONITORING
          </div>
          <button
            onClick={() => onNavigate('team')}
            className="flex items-center space-x-2 bg-[#2f2116]/80 hover:bg-[#3a291b] border border-[#fee197]/40 px-3 py-1.5 rounded text-legal-oryzo font-mono text-[#fee197] backdrop-blur transition-all"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>VERCEL DEMO & TEAM</span>
          </button>
        </div>

        <div
          style={{
            transform: `translateY(-${textOffsetY}px)`,
            opacity: textOpacity,
          }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pointer-events-auto"
        >
          {/* Main Editorial Copy */}
          <div className="md:col-span-8 space-y-4 font-serif">
            <span className="text-caption-oryzo text-[#fee197] font-sans font-medium tracking-wider block uppercase">
              CLAUDE'S PLAN
            </span>
            <h1 className="text-display text-[#fff8e9] font-medium leading-tight font-serif">
              MACHINE LEARNING
              <br />
              STRUCTURAL HEALTH MONITORING
            </h1>
            <p className="text-subheading text-[#ffebd0]/90 font-sans max-w-2xl">
              From sensor measurements to an informed view of structural condition between physical inspection cycles.
            </p>
          </div>

          {/* Right Metadata Caption & Actions */}
          <div className="md:col-span-4 space-y-4 md:text-right border-t md:border-t-0 md:border-l border-[#ffebd0]/30 pt-4 md:pt-0 md:pl-6 font-sans">
            <div className="text-legal-oryzo text-[#ffebd0]/85 space-y-1">
              <span className="block font-medium text-[#fee197]">LIVE TELEMETRY STREAM</span>
              <span className="block font-mono">STRAIN: {reading.strain_microstrain} µε // VIB: {reading.vibration_rms_g}g</span>
              <span className="block text-[#ffebd0]/70 font-mono">TILT: {reading.tilt_deg}° // DISP: {reading.displacement_mm}mm</span>
            </div>

            <div className="pt-2 flex md:justify-end gap-3 font-sans">
              <button
                onClick={() => onNavigate('problem')}
                className="btn-outline-dark flex items-center space-x-2 text-caption-oryzo"
              >
                <span>EXPLORE</span>
                <ChevronDown className="w-4 h-4 text-[#ffebd0]" />
              </button>

              <button
                onClick={() => onNavigate('monitor')}
                className="btn-outline-amber flex items-center space-x-2 text-caption-oryzo"
              >
                <span>MONITOR</span>
                <ArrowDown className="w-4 h-4 text-[#fee197]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
