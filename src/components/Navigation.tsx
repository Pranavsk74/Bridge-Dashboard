import React, { useState, useEffect } from 'react';
import { ASSETS } from '@/config/assets';

interface NavigationProps {
  activeView: string;
  onNavigate: (viewId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeView, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'problem', label: 'PROBLEM' },
    { id: 'monitor', label: 'MONITOR' },
    { id: 'ml', label: 'ML' },
    { id: 'simulation', label: 'SIMULATION' },
    { id: 'database', label: 'DATABASE' },
    { id: 'report', label: 'REPORT' },
    { id: 'team', label: 'TEAM & DEMO' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#2f2116]/95 backdrop-blur-md border-b border-[#4f3622] py-3'
          : 'bg-gradient-to-b from-[#2f2116]/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Substantially Larger Logo with Entrance Animation (64-96px desktop height) */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex items-center space-x-4 group text-left focus:outline-none transition-all duration-700 ease-out transform ${
            mounted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-94 translate-y-1'
          }`}
        >
          <img
            src={ASSETS.branding.logo.path}
            alt="CLAUDE'S PLAN Logo"
            className="h-[60px] md:h-[96px] w-auto max-w-[380px] object-contain group-hover:scale-[1.03] transition-transform duration-300"
          />
        </button>

        {/* Quiet Architectural Navigation Menu */}
        <div className="hidden md:flex items-center space-x-8 font-sans">
          {navItems.map((item, idx) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{ animationDelay: `${idx * 60}ms` }}
                className={`text-caption-oryzo tracking-wider transition-colors py-1 relative focus:outline-none ${
                  isActive ? 'text-[#ffebd0] font-medium' : 'text-[#ffebd0]/70 hover:text-[#ffebd0]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#fee197]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Navigation Selector */}
        <div className="md:hidden flex items-center font-sans">
          <select
            value={activeView}
            onChange={(e) => onNavigate(e.target.value)}
            className="bg-[#2f2116] border border-[#4f3622] text-[#ffebd0] text-caption-oryzo px-3 py-1.5 focus:outline-none"
          >
            {navItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};
