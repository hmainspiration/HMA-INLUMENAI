import React from 'react';
import { SOCIAL_LINKS } from '../data/socialLinks';
import { MessageSquare, Youtube, Instagram, Facebook } from 'lucide-react';

interface SocialMediaBarProps {
  variant?: 'header' | 'footer' | 'floating' | 'banner';
  className?: string;
  showLabels?: boolean;
}

export const SocialMediaBar: React.FC<SocialMediaBarProps> = ({
  variant = 'header',
  className = '',
  showLabels = false,
}) => {
  const getIcon = (id: string, sizeClass = 'w-4 h-4') => {
    switch (id) {
      case 'youtube':
        return <Youtube className={sizeClass} />;
      case 'facebook':
        return <Facebook className={sizeClass} />;
      case 'instagram':
        return <Instagram className={sizeClass} />;
      case 'whatsapp':
        return <MessageSquare className={sizeClass} />;
      default:
        return null;
    }
  };

  const links = Object.values(SOCIAL_LINKS);

  if (variant === 'header') {
    return (
      <div className={`flex items-center gap-1 sm:gap-1.5 ${className}`}>
        {links.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.ariaLabel}
            aria-label={item.ariaLabel}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200 group relative"
          >
            <span className="group-hover:scale-110 transition-transform text-gray-600 group-hover:text-[#111827]">
              {getIcon(item.id, 'w-4 h-4')}
            </span>
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
        {links.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.ariaLabel}
            aria-label={item.ariaLabel}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-900/80 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white text-xs font-semibold transition-all group"
          >
            <span className="transition-transform group-hover:scale-110">
              {getIcon(item.id, 'w-3.5 h-3.5')}
            </span>
            <span>{item.name}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {links.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          title={item.ariaLabel}
          aria-label={item.ariaLabel}
          className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-200 text-gray-700 hover:text-[#00B4D8] hover:border-[#00B4D8]/40 transition-all"
        >
          {getIcon(item.id, 'w-4 h-4')}
        </a>
      ))}
    </div>
  );
};
