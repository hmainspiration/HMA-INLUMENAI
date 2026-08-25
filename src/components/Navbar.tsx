import React, { useState } from 'react';
import { HmaLogo } from './HmaLogo';
import { MessageSquare, Sparkles, HelpCircle, Menu, X, Clock, Play, Sun, Moon } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/socialLinks';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenQuickQuote?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/80 shadow-xs transition-colors duration-200">
      
      {/* Top Utility Bar with Social Icons & Motto */}
      <div className="bg-[#0F172A] dark:bg-[#060911] text-gray-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-gray-800 dark:border-gray-900 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Motto */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-gray-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] animate-pulse" />
              La Creatividad es Un Regalo de Dios · Ecosistema HMA
            </span>
          </div>

          {/* Right: Quick Social Media Icons & Tools */}
          <div className="flex items-center gap-4">
            
            {/* Social Icons Strip */}
            <div className="flex items-center gap-2 pr-3 border-r border-gray-700">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Redes:
              </span>
              <a
                href={SOCIAL_LINKS.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp HMA"
                className="text-gray-400 hover:text-[#25D366] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook HMA"
                className="text-gray-400 hover:text-[#1877F2] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram HMA"
                className="text-gray-400 hover:text-[#E4405F] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube HMA"
                className="text-gray-400 hover:text-[#FF0000] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center group transition-transform duration-200 hover:scale-[1.01]">
            <HmaLogo className="h-10 sm:h-11" variant="full" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <a
              href="#inicio"
              className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-[#00B4D8] dark:hover:text-[#00B4D8] transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/60"
            >
              Inicio
            </a>

            <a
              href="#servicios"
              className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-[#00B4D8] dark:hover:text-[#00B4D8] transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/60 flex items-center gap-2"
            >
              <span>Servicios</span>
            </a>

            <a
              href="#reloj-10-anos"
              className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-[#D97706] dark:hover:text-[#F5A623] transition-colors rounded-lg hover:bg-amber-50/40 dark:hover:bg-amber-950/30 flex items-center gap-2 group"
            >
              <span>10 Años</span>
            </a>

            <a
              href="#portafolio"
              className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-[#7B2CBF] dark:hover:text-[#9C61CF] transition-colors rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/30"
            >
              Portafolio
            </a>
          </nav>

          {/* Right Area: Theme Switcher & Primary CTA */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Theme Toggle Button (Claro / Oscuro) */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700/80 transition-all text-xs font-bold cursor-pointer"
              title={isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
              aria-label="Alternar modo de color"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                  <span>Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600/20" />
                  <span>Modo Oscuro</span>
                </>
              )}
            </button>

            {/* Direct WhatsApp Call to Action */}
            <a
              href={SOCIAL_LINKS.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00B4D8] hover:bg-[#0096C7] text-white font-bold text-xs shadow-md shadow-[#00B4D8]/20 hover:shadow-lg transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Right Controls: Theme Toggle + Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            
            {/* Mobile Quick Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title={isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
              aria-label="Alternar modo de color"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0F172A] px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <a
            href="#inicio"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-bold text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Inicio
          </a>
          <a
            href="#servicios"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-sm font-bold text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <span>Catálogo de Servicios</span>
          </a>
          <a
            href="#reloj-10-anos"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-bold text-amber-900 dark:text-amber-200 bg-amber-50/60 dark:bg-amber-950/40 rounded-lg"
          >
            10 Años
          </a>
          <a
            href="#portafolio"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-bold text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Portafolio
          </a>

          {/* Theme switcher option in mobile drawer */}
          <button
            onClick={() => {
              toggleTheme();
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <span className="flex items-center gap-2">
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              <span>Tema de Color:</span>
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-xs">
              {isDark ? 'Modo Oscuro (Activo)' : 'Modo Claro (Activo)'}
            </span>
          </button>

          {/* Social Links Row in Mobile Drawer */}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs font-bold uppercase text-gray-400 mb-2">Canales Oficiales:</p>
            <div className="grid grid-cols-4 gap-2">
              <a
                href={SOCIAL_LINKS.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/80 flex flex-col items-center justify-center text-[#25D366] text-[11px] font-bold border border-gray-100 dark:border-gray-700"
              >
                <MessageSquare className="w-4 h-4 mb-1" />
                <span>WhatsApp</span>
              </a>
              <a
                href={SOCIAL_LINKS.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/80 flex flex-col items-center justify-center text-[#1877F2] text-[11px] font-bold border border-gray-100 dark:border-gray-700"
              >
                <svg className="w-4 h-4 mb-1 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </a>
              <a
                href={SOCIAL_LINKS.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/80 flex flex-col items-center justify-center text-[#E4405F] text-[11px] font-bold border border-gray-100 dark:border-gray-700"
              >
                <svg className="w-4 h-4 mb-1 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href={SOCIAL_LINKS.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/80 flex flex-col items-center justify-center text-[#FF0000] text-[11px] font-bold border border-gray-100 dark:border-gray-700"
            >
              <svg className="w-4 h-4 mb-1 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>
      )}

    </header>
  );
};
