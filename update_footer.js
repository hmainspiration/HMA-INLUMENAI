import fs from 'fs';

let content = fs.readFileSync('src/components/Footer.tsx', 'utf-8');

// Add config import
if (!content.includes('getSiteConfig')) {
  content = content.replace(
    "import { SERVICES } from '../data/brandData';",
    "import { SERVICES } from '../data/brandData';\nimport { getSiteConfig, SiteConfig } from '../utils/store';\nimport { useEffect, useState } from 'react';"
  );
}

// Add state to Footer component
if (!content.includes('const [config, setConfig] = useState')) {
  content = content.replace(
    "export const Footer: React.FC<FooterProps> = ({",
    "export const Footer: React.FC<FooterProps> = ({\n  isNegative = false,\n  onNavigate,\n  onSelectService\n}) => {\n  const [config, setConfig] = useState<SiteConfig | null>(null);\n\n  useEffect(() => {\n    setConfig(getSiteConfig());\n  }, []);\n\n  return ("
  );
  // Remove the old destructuring block
  content = content.replace(
    "  isNegative = false,\n  onNavigate,\n  onSelectService\n}) => {\n  return (",
    ""
  );
}

// Update Email
content = content.replace(
  /href="mailto:hsalldm95@gmail\.com"/g,
  'href={`mailto:${config?.contactEmail || \'hsalldm95@gmail.com\'}`}'
);
content = content.replace(
  /<span>hsalldm95@gmail\.com<\/span>/g,
  '<span>{config?.contactEmail || \'hsalldm95@gmail.com\'}</span>'
);

// Update Location & Copyright
content = content.replace(
  /Managua, Nicaragua\./g,
  "{config?.locationAddress || 'Managua, Nicaragua'}."
);

// Update Social Links Array
const oldSocials = `{(['phone', 'email', 'location', 'website', 'whatsapp', 'instagram', 'facebook', 'youtube'] as const).map((icon) => (
              <div
                key={icon}
                className={\`p-2 rounded-lg transition-colors cursor-pointer \${
                  isNegative ? 'hover:bg-[#FEFAE8]/10 text-[#FEFAE8]' : 'hover:bg-[#060C04]/5 text-[#060C04]'
                }\`}
                title={icon}
              >
                <UtilitarianIcon name={icon} size={16} />
              </div>
            ))}`;

const newSocials = `
            {config?.showLocation !== false && (
              <div className={\`p-2 rounded-lg transition-colors cursor-pointer \${
                  isNegative ? 'hover:bg-[#FEFAE8]/10 text-[#FEFAE8]' : 'hover:bg-[#060C04]/5 text-[#060C04]'
                }\`} title="location">
                <UtilitarianIcon name="location" size={16} />
              </div>
            )}
            <a href={\`mailto:\${config?.contactEmail || 'hola'}\`} className={\`p-2 rounded-lg transition-colors cursor-pointer \${
                  isNegative ? 'hover:bg-[#FEFAE8]/10 text-[#FEFAE8]' : 'hover:bg-[#060C04]/5 text-[#060C04]'
                }\`} title="email">
                <UtilitarianIcon name="email" size={16} />
            </a>
            {config?.showSocials !== false && (
              <>
                {config?.socialWhatsapp && (
                  <a href={config.socialWhatsapp} target="_blank" rel="noopener noreferrer" className={\`p-2 rounded-lg transition-colors \${isNegative ? 'hover:bg-[#FEFAE8]/10 text-[#FEFAE8]' : 'hover:bg-[#060C04]/5 text-[#060C04]'}\`} title="whatsapp">
                    <UtilitarianIcon name="whatsapp" size={16} />
                  </a>
                )}
                {config?.socialInstagram && (
                  <a href={config.socialInstagram} target="_blank" rel="noopener noreferrer" className={\`p-2 rounded-lg transition-colors \${isNegative ? 'hover:bg-[#FEFAE8]/10 text-[#FEFAE8]' : 'hover:bg-[#060C04]/5 text-[#060C04]'}\`} title="instagram">
                    <UtilitarianIcon name="instagram" size={16} />
                  </a>
                )}
                {config?.socialFacebook && (
                  <a href={config.socialFacebook} target="_blank" rel="noopener noreferrer" className={\`p-2 rounded-lg transition-colors \${isNegative ? 'hover:bg-[#FEFAE8]/10 text-[#FEFAE8]' : 'hover:bg-[#060C04]/5 text-[#060C04]'}\`} title="facebook">
                    <UtilitarianIcon name="facebook" size={16} />
                  </a>
                )}
                {config?.socialYoutube && (
                  <a href={config.socialYoutube} target="_blank" rel="noopener noreferrer" className={\`p-2 rounded-lg transition-colors \${isNegative ? 'hover:bg-[#FEFAE8]/10 text-[#FEFAE8]' : 'hover:bg-[#060C04]/5 text-[#060C04]'}\`} title="youtube">
                    <UtilitarianIcon name="youtube" size={16} />
                  </a>
                )}
              </>
            )}
`;

content = content.replace(oldSocials, newSocials);
fs.writeFileSync('src/components/Footer.tsx', content, 'utf-8');
