import React, { useState, useEffect } from 'react';
import { ActivePage, ThemeMode } from '../types';
import { BrandWordmark, IsotipoMaestroVector } from './BrandLogos';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { getSiteConfig, SiteConfig } from '../utils/store';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  themeMode,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const isNegative = themeMode === 'profundo';

  useEffect(() => {
    setConfig(getSiteConfig());
  }, []);

  const showInquiries = config?.enableInquiries !== false;

  const navItems = [
    { label: 'Inicio', page: { type: 'home' } as ActivePage },
    { label: '12 Servicios', page: { type: 'home' } as ActivePage, anchor: '#servicios' },
    { label: 'Ecosistema', page: { type: 'home' } as ActivePage, anchor: '#ecosistema' },
    { label: 'Colores', page: { type: 'home' } as ActivePage, anchor: '#colores' },
    { label: 'Trayectoria (10 Años)', page: { type: 'trajectory' } as ActivePage },
    ...(showInquiries ? [{ label: 'Contacto', page: { type: 'contact' } as ActivePage }] : [])
  ];

  const handleLinkClick = (item: { label: string; page: ActivePage; anchor?: string }) => {
    setMobileMenuOpen(false);
    if (item.page.type !== activePage.type) {
      onNavigate(item.page);
      if (item.anchor) {
        setTimeout(() => {
          const el = document.querySelector(item.anchor!);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (item.anchor) {
      const el = document.querySelector(item.anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-200 ${
        isNegative
          ? 'bg-[#060C04]/90 border-[#FEFAE8]/10 text-[#FEFAE8]'
          : 'bg-[#FEFAE8]/90 border-[#060C04]/10 text-[#060C04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Configuration: Isotipo + Wordmark */}
        <button
          onClick={() => onNavigate({ type: 'home' })}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          aria-label="Ir a inicio HMA INLUMENAI"
        >
          <div className="p-1 rounded-lg transition-transform group-hover:scale-105">
            <IsotipoMaestroVector width={36} height={36} isNegative={isNegative} />
          </div>
          <BrandWordmark isNegative={isNegative} />
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleLinkClick(item)}
              className={`font-general text-sm font-medium transition-colors hover:text-[#3D80FD] cursor-pointer ${
                activePage.type === item.page.type && !item.anchor
                  ? 'text-[#3D80FD] font-semibold'
                  : isNegative
                  ? 'text-[#FEFAE8]/80'
                  : 'text-[#060C04]/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Mode Switcher: Positivo (Luz) / Negativo (Profundo) */}
          <button
            onClick={onToggleTheme}
            className={`p-2.5 rounded-full transition-colors cursor-pointer ${
              isNegative
                ? 'bg-[#FEFAE8]/10 text-[#FEFAE8] hover:bg-[#FEFAE8]/20'
                : 'bg-[#060C04]/5 text-[#060C04] hover:bg-[#060C04]/10'
            }`}
            title={isNegative ? 'Cambiar a modo Positivo (Luz)' : 'Cambiar a modo Negativo (Profundo)'}
            aria-label="Alternar modo de color"
          >
            {isNegative ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary CTA */}
          {showInquiries && (
            <button
              onClick={() => onNavigate({ type: 'contact' })}
              className="btn-primary flex items-center gap-2 bg-[#3D80FD] text-white hover:bg-[#2D60C1] cursor-pointer shadow-sm"
            >
              <span>Iniciar Consulta</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full cursor-pointer"
            aria-label="Alternar modo de color"
          >
            {isNegative ? <Sun className="w-5 h-5 text-[#FEFAE8]" /> : <Moon className="w-5 h-5 text-[#060C04]" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 cursor-pointer focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-6 py-6 space-y-4 ${
            isNegative ? 'bg-[#060C04] border-[#FEFAE8]/10' : 'bg-[#FEFAE8] border-[#060C04]/10'
          }`}
        >
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleLinkClick(item)}
              className="block w-full text-left font-general text-base font-medium py-2 hover:text-[#3D80FD]"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-current/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate({ type: 'contact' });
              }}
              className="btn-primary w-full justify-center bg-[#3D80FD] text-white flex items-center gap-2"
            >
              <span>Iniciar Consulta</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
