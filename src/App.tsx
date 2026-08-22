import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ClockTimelineSection } from './components/ClockTimelineSection';
import { PortfolioSection } from './components/PortfolioSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';
import { MediaShowcaseModal } from './components/MediaShowcaseModal';
import { MediaOrientationGuideModal } from './components/MediaOrientationGuideModal';
import { ServiceItem, MediaItem } from './types';
import { MessageSquare, HelpCircle, Sparkles, Play } from 'lucide-react';
import { getWhatsAppUrl } from './data/socialLinks';

const CURRENT_VERSION = 'v2.0.0';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isDeploymentGuideOpen, setIsDeploymentGuideOpen] = useState<boolean>(false);
  const [isMediaGuideOpen, setIsMediaGuideOpen] = useState<boolean>(false);
  const [mediaShowcaseService, setMediaShowcaseService] = useState<ServiceItem | null>(null);
  const [initialMediaItem, setInitialMediaItem] = useState<MediaItem | null>(null);

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

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC] dark:bg-[#0B0F19] text-[#111827] dark:text-[#F3F4F6] transition-colors duration-200">
      
      {/* Top Navigation Bar */}
      <Navbar
        onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)}
        onOpenMediaGuide={() => setIsMediaGuideOpen(true)}
        onOpenQuickQuote={() => {
          handleExploreServices();
        }}
      />

      {/* Main Page Body */}
      <main className="flex-grow">
        
        {/* 1. Hero Section */}
        <Hero
          onExploreServices={handleExploreServices}
          onExploreAnniversary={handleExploreAnniversary}
        />

        {/* 2. Services Section (12 Services & 4 Clusters with Glow effect & Live Media Preview) */}
        <ServicesSection
          onSelectService={(service) => setSelectedService(service)}
          onOpenMedia={handleOpenMedia}
          onOpenMediaGuide={() => setIsMediaGuideOpen(true)}
        />

        {/* 3. Special Anniversary Section: "El Reloj de las 12 H" (2016-2026) */}
        <ClockTimelineSection />

        {/* 4. Portfolio Section */}
        <PortfolioSection
          onSelectServiceRequest={(name) => {
            handleExploreServices();
          }}
        />

      </main>

      {/* Footer */}
      <Footer
        onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)}
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

      {/* Media Orientation & Smart Links Helper Modal for Non-Programmer */}
      <MediaOrientationGuideModal
        isOpen={isMediaGuideOpen}
        onClose={() => setIsMediaGuideOpen(false)}
      />

      {/* Step-by-Step Deployment Guide Modal */}
      <DeploymentGuideModal
        isOpen={isDeploymentGuideOpen}
        onClose={() => setIsDeploymentGuideOpen(false)}
      />

      {/* Floating Action Button: Quick WhatsApp Contact */}
      <a
        href={floatingWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#00B4D8] hover:bg-[#0096C7] text-white font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all group"
        title="Chatear con HMA Inlumenai en WhatsApp"
      >
        <MessageSquare className="w-5 h-5 fill-white/20" />
        <span className="hidden sm:inline">WhatsApp HMA</span>
      </a>

      {/* Floating Helper for Non-Programmer User (Media & Deploy) */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2">
        <button
          onClick={() => setIsMediaGuideOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#111827] dark:bg-gray-800 text-white hover:bg-black dark:hover:bg-gray-700 font-semibold text-xs shadow-lg hover:shadow-xl transition-all border border-transparent dark:border-gray-700 cursor-pointer"
          title="Ver cómo añadir tus videos y canciones"
        >
          <Play className="w-3.5 h-3.5 text-[#00B4D8] fill-current" />
          <span>Demos & Enlaces</span>
        </button>

        <button
          onClick={() => setIsDeploymentGuideOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
          title="Ver Guía de Despliegue (GitHub + Vercel)"
        >
          <HelpCircle className="w-4 h-4 text-[#00B4D8]" />
          <span>Guía Despliegue</span>
        </button>
      </div>

    </div>
  );
}

