import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ClockTimelineSection } from './components/ClockTimelineSection';
import { PortfolioSection } from './components/PortfolioSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { MediaShowcaseModal } from './components/MediaShowcaseModal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminPanel } from './components/admin/AdminPanel';
import { ServiceItem, MediaItem } from './types';
import { useData } from './context/DataContext';
import { MessageSquare } from 'lucide-react';
import { getWhatsAppUrl } from './data/socialLinks';

const CURRENT_VERSION = 'v2.3.3';
const ADMIN_AUTH_SESSION_KEY = 'hma_admin_auth_v1';

export default function App() {
  const { siteConfig } = useData();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [mediaShowcaseService, setMediaShowcaseService] = useState<ServiceItem | null>(null);
  const [initialMediaItem, setInitialMediaItem] = useState<MediaItem | null>(null);

  // Admin routing & auth state
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      return path === '/admin' || path.startsWith('/admin/') || hash === '#admin' || hash.startsWith('#admin/');
    }
    return false;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(ADMIN_AUTH_SESSION_KEY) === 'true';
    }
    return false;
  });

  // Listen to browser navigation (back/forward, URL hash change)
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      setIsAdminView(path === '/admin' || path.startsWith('/admin/') || hash === '#admin' || hash.startsWith('#admin/'));
    };

    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setIsAdminView(true);
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setIsAdminView(false);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem(ADMIN_AUTH_SESSION_KEY, 'true');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(ADMIN_AUTH_SESSION_KEY);
    navigateToHome();
  };

  const handleExploreServices = () => {
    const el = document.getElementById('servicios');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreAnniversary = () => {
    const el = document.getElementById('reloj-10-anos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenMedia = (service: ServiceItem, initialMedia?: MediaItem) => {
    setMediaShowcaseService(service);
    setInitialMediaItem(initialMedia || null);
  };

  const floatingWhatsAppUrl = getWhatsAppUrl(
    'Hola HMA Inlumenai, me gustaría solicitar información y cotización sobre sus servicios.'
  );

  // If in Admin route
  if (isAdminView) {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin 
          onSuccess={handleAdminLoginSuccess}
          onLoginSuccess={handleAdminLoginSuccess}
          onCancel={navigateToHome}
        />
      );
    }

    return (
      <AdminPanel 
        onLogout={handleAdminLogout}
        onBackToSite={navigateToHome}
        onGoToPublicSite={navigateToHome}
      />
    );
  }

  // Public Client & Visitor View
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC] dark:bg-[#0B0F19] text-[#111827] dark:text-[#F3F4F6] transition-colors duration-200">
      
      {/* Top Navigation Bar */}
      <Navbar
        onOpenQuickQuote={handleExploreServices}
      />

      {/* Main Page Body */}
      <main className="flex-grow">
        
        {/* 1. Hero Section */}
        <Hero
          onExploreServices={handleExploreServices}
          onExploreAnniversary={handleExploreAnniversary}
        />

        {/* 2. Services Section (12 Services & 4 Clusters with dynamic data and En Construcción state) */}
        <ServicesSection
          onSelectService={(service) => setSelectedService(service)}
          onOpenMedia={handleOpenMedia}
        />

        {/* 3. Special Anniversary Section: "El Reloj de las 12 H" (2016-2026) - Configurable from Admin */}
        {siteConfig.showAnniversaryClock !== false && (
          <ClockTimelineSection />
        )}

        {/* 4. Portfolio Section */}
        <PortfolioSection
          onSelectServiceRequest={(_name) => {
            handleExploreServices();
          }}
        />

      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={navigateToAdmin}
      />

      {/* Interactive Quotation / Detail Modal */}
      <QuoteModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenMedia={(svc) => handleOpenMedia(svc)}
      />

      {/* Media Showcase Player Modal (Videos, Audio Player & Lightbox) */}
      <MediaShowcaseModal
        isOpen={Boolean(mediaShowcaseService)}
        onClose={() => setMediaShowcaseService(null)}
        service={mediaShowcaseService}
        initialMedia={initialMediaItem}
        onOpenQuote={(svc) => {
          setMediaShowcaseService(null);
          setSelectedService(svc);
        }}
      />

      {/* Floating Action Button: Quick WhatsApp Contact for clients */}
      <a
        href={floatingWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#00B4D8] hover:bg-[#0096C7] text-white font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all group cursor-pointer"
        title="Chatear con HMA Inlumenai en WhatsApp"
      >
        <MessageSquare className="w-5 h-5 fill-white/20" />
        <span className="hidden sm:inline">WhatsApp HMA</span>
      </a>

    </div>
  );
}

