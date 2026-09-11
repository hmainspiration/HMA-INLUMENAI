import fs from 'fs';

let content = fs.readFileSync('src/components/ContactSection.tsx', 'utf-8');

if (!content.includes('getSiteConfig')) {
  content = content.replace(
    "import { SERVICES } from '../data/brandData';",
    "import { SERVICES } from '../data/brandData';\nimport { getSiteConfig, SiteConfig } from '../utils/store';\nimport { useEffect } from 'react';"
  );
}

if (!content.includes('const [config, setConfig] = useState')) {
  content = content.replace(
    "const [isSubmitted, setIsSubmitted] = useState(false);",
    "const [isSubmitted, setIsSubmitted] = useState(false);\n  const [config, setConfig] = useState<SiteConfig | null>(null);\n\n  useEffect(() => {\n    setConfig(getSiteConfig());\n  }, []);"
  );
}

// Location
content = content.replace(
  /<span>Managua, Nicaragua<\/span>/g,
  "<span>{config?.locationAddress || 'Managua, Nicaragua'}</span>"
);
content = content.replace(
  /<div className="flex items-center gap-3">[\s\S]*?UtilitarianIcon name="location"[\s\S]*?Managua, Nicaragua[\s\S]*?<\/div>/,
  `{config?.showLocation !== false && (
                <div className="flex items-center gap-3">
                  <div className={\`w-10 h-10 rounded-full flex items-center justify-center \${
                    isNegative ? 'bg-[#FEFAE8]/10' : 'bg-[#060C04]/5'
                  }\`}>
                    <UtilitarianIcon name="location" size={18} />
                  </div>
                  <div>
                    <p className="font-general text-xs font-bold uppercase tracking-wider opacity-60">Sede</p>
                    <p className="font-general text-sm">{config?.locationAddress || 'Managua, Nicaragua'}</p>
                  </div>
                </div>
              )}`
);

// Email
content = content.replace(
  /<span>hsalldm95@gmail\.com<\/span>/g,
  "<span>{config?.contactEmail || 'hsalldm95@gmail.com'}</span>"
);

content = content.replace(
  /<div className="flex items-center gap-3">[\s\S]*?UtilitarianIcon name="email"[\s\S]*?hsalldm95@gmail\.com[\s\S]*?<\/div>/,
  `<div className="flex items-center gap-3">
                  <div className={\`w-10 h-10 rounded-full flex items-center justify-center \${
                    isNegative ? 'bg-[#FEFAE8]/10' : 'bg-[#060C04]/5'
                  }\`}>
                    <UtilitarianIcon name="email" size={18} />
                  </div>
                  <div>
                    <p className="font-general text-xs font-bold uppercase tracking-wider opacity-60">Correo Directo</p>
                    <a href={\`mailto:\${config?.contactEmail || 'hsalldm95@gmail.com'}\`} className="font-general text-sm hover:text-[#3D80FD] transition-colors">{config?.contactEmail || 'hsalldm95@gmail.com'}</a>
                  </div>
                </div>`
);

// Phone
content = content.replace(
  /<div className="flex items-center gap-3">[\s\S]*?UtilitarianIcon name="phone"[\s\S]*?\+505[\s\S]*?<\/div>/,
  `<div className="flex items-center gap-3">
                  <div className={\`w-10 h-10 rounded-full flex items-center justify-center \${
                    isNegative ? 'bg-[#FEFAE8]/10' : 'bg-[#060C04]/5'
                  }\`}>
                    <UtilitarianIcon name="phone" size={18} />
                  </div>
                  <div>
                    <p className="font-general text-xs font-bold uppercase tracking-wider opacity-60">Teléfono / WhatsApp</p>
                    <p className="font-general text-sm">{config?.contactPhone || '+505 0000 0000'}</p>
                  </div>
                </div>`
);


fs.writeFileSync('src/components/ContactSection.tsx', content, 'utf-8');
