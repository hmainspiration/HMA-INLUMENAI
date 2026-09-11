import React, { useState, useEffect } from 'react';
import { ActivePage, ServiceId, ThemeMode } from './types';
import { SERVICES } from './data/brandData';
import { getSiteConfig, SiteConfig } from './utils/store';
import { getPageUrl, parsePathToPage } from './utils/routes';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ArchitectureSection } from './components/ArchitectureSection';
import { ServicesGrid } from './components/ServicesGrid';
import { Differentiators } from './components/Differentiators';
import { HistoryTimeline } from './components/HistoryTimeline';
import { ServiceDetailView } from './components/ServiceDetailView';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  
  const [activePage, setActivePage] = useState<ActivePage>(() => {
    if (typeof window !== 'undefined') {
      return parsePathToPage(window.location.pathname);
    }
    return { type: 'home' };
  });
  
  const [themeMode, setThemeMode] = useState<ThemeMode>('luz');
  const [contactServicePreselect, setContactServicePreselect] = useState<string>('');
  
  const isNegative = themeMode === 'profundo';

  useEffect(() => {
    setConfig(getSiteConfig());

    const handlePopState = () => {
      setActivePage(parsePathToPage(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'luz' ? 'profundo' : 'luz'));
  };

  const updatePage = (newPage: ActivePage) => {
    setActivePage(newPage);
    if (typeof window !== 'undefined') {
      const targetUrl = getPageUrl(newPage);
      if (window.location.pathname !== targetUrl) {
        window.history.pushState(null, '', targetUrl);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (id: ServiceId) => {
    updatePage({ type: 'service', serviceId: id });
  };

  const handleNavigate = (page: ActivePage) => {
    updatePage(page);
  };

  const handleContactService = (serviceName: string) => {
    setContactServicePreselect(serviceName);
    updatePage({ type: 'contact' });
  };

  useEffect(() => {
    document.documentElement.style.backgroundColor = isNegative ? '#060C04' : '#FEFAE8';
    document.body.style.backgroundColor = isNegative ? '#060C04' : '#FEFAE8';
    document.body.style.color = isNegative ? '#FEFAE8' : '#060C04';
  }, [isNegative]);

  const currentServiceItem =
    activePage.type === 'service'
      ? SERVICES.find((s) => s.id === activePage.serviceId) || SERVICES[0]
      : null;

  if (activePage.type === 'admin') {
    return <AdminPanel isNegative={isNegative} onNavigateHome={() => handleNavigate({ type: 'home' })} />;
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isNegative ? 'bg-[#060C04] text-[#FEFAE8]' : 'bg-[#FEFAE8] text-[#060C04]'
      }`}
    >
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1">
        {activePage.type === 'home' && (
          <>
            {config?.showHero !== false && (
              <Hero
                isNegative={isNegative}
                onExploreServices={() => {
                  const el = document.getElementById('servicios');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                onExploreEcosystem={() => {
                  const el = document.getElementById('ecosistema');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            )}
            
            {config?.showArchitecture !== false && (
              <ArchitectureSection
                isNegative={isNegative}
                onSelectService={handleSelectService}
              />
            )}
            
            {config?.showServices !== false && (
              <ServicesGrid
                isNegative={isNegative}
                onSelectService={handleSelectService}
              />
            )}
            
            {config?.showDifferentiators !== false && (
              <Differentiators isNegative={isNegative} />
            )}
            
            {config?.showTimeline !== false && (
              <HistoryTimeline
                isNegative={isNegative}
                isFullView={false}
                onNavigateHeritage={() => handleSelectService('heritage')}
              />
            )}
            
            {config?.showContact !== false && (
              <ContactSection
                isNegative={isNegative}
                preselectedService={contactServicePreselect}
              />
            )}
          </>
        )}

        {activePage.type === 'service' && currentServiceItem && (
          <ServiceDetailView
            service={currentServiceItem}
            isNegative={isNegative}
            onBackToHome={() => handleNavigate({ type: 'home' })}
            onSelectOtherService={(id) => handleSelectService(id as ServiceId)}
            onContactService={handleContactService}
          />
        )}

        {activePage.type === 'trajectory' && (
          <div className="pt-8">
            <HistoryTimeline
              isNegative={isNegative}
              isFullView={true}
              onNavigateHeritage={() => handleSelectService('heritage')}
            />
          </div>
        )}

        {activePage.type === 'contact' && (
          <div className="pt-8">
            <ContactSection
              isNegative={isNegative}
              preselectedService={contactServicePreselect}
            />
          </div>
        )}
      </main>

      <Footer
        isNegative={isNegative}
        onNavigate={handleNavigate}
        onSelectService={handleSelectService}
      />
    </div>
  );
}
