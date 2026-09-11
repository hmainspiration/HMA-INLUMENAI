import React from 'react';
import { HMA16, HMA17, HMA18, HMA19, HMA20, HMA21 } from './HMALogosPart1';
import { HMA22, HMA23, HMA24 } from './HMALogosPart2A';
import { HMA25, HMA26, HMA27 } from './HMALogosPart2B';

export {
  HMA16,
  HMA17,
  HMA18,
  HMA19,
  HMA20,
  HMA21,
  HMA22,
  HMA23,
  HMA24,
  HMA25,
  HMA26,
  HMA27,
};

interface RenderHMALogoProps {
  hmaCode: string;
  className?: string;
  fillColor?: string;
}

export const RenderHMALogo: React.FC<RenderHMALogoProps> = ({
  hmaCode,
  className = 'w-full h-full',
  fillColor = '#FFFFFF',
}) => {
  const normalized = hmaCode.replace(/[^0-9]/g, '');
  const suffix = normalized.length === 4 ? normalized.slice(2) : normalized;

  switch (suffix) {
    case '16':
      return <HMA16 className={className} fillColor={fillColor} />;
    case '17':
      return <HMA17 className={className} fillColor={fillColor} />;
    case '18':
      return <HMA18 className={className} fillColor={fillColor} />;
    case '19':
      return <HMA19 className={className} fillColor={fillColor} />;
    case '20':
      return <HMA20 className={className} fillColor={fillColor} />;
    case '21':
      return <HMA21 className={className} fillColor={fillColor} />;
    case '22':
      return <HMA22 className={className} fillColor={fillColor} />;
    case '23':
      return <HMA23 className={className} fillColor={fillColor} />;
    case '24':
      return <HMA24 className={className} fillColor={fillColor} />;
    case '25':
      return <HMA25 className={className} fillColor={fillColor} />;
    case '26':
      return <HMA26 className={className} fillColor={fillColor} />;
    case '27':
      return <HMA27 className={className} fillColor={fillColor} />;
    default:
      return <HMA26 className={className} fillColor={fillColor} />;
  }
};
