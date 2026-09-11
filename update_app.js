import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Add getSiteConfig to imports
if (!content.includes('getSiteConfig')) {
  content = content.replace(
    "import { SERVICES } from './data/brandData';",
    "import { SERVICES } from './data/brandData';\nimport { getSiteConfig, SiteConfig } from './utils/store';"
  );
}

// Add state to App component
if (!content.includes('const [config, setConfig] = useState')) {
  content = content.replace(
    "export default function App() {",
    "export default function App() {\n  const [config, setConfig] = useState<SiteConfig | null>(null);\n\n  useEffect(() => {\n    setConfig(getSiteConfig());\n  }, []);"
  );
}

// Replace conditional renders
content = content.replace(
  /<Hero([\s\S]*?)\/>/,
  "{config?.showHero !== false && <Hero$1/>}"
);

content = content.replace(
  /<ArchitectureSection([\s\S]*?)\/>/,
  "{config?.showArchitecture !== false && <ArchitectureSection$1/>}"
);

content = content.replace(
  /<ServicesGrid([\s\S]*?)\/>/,
  "{config?.showServices !== false && <ServicesGrid$1/>}"
);

content = content.replace(
  /<Differentiators([\s\S]*?)\/>/,
  "{config?.showDifferentiators !== false && <Differentiators$1/>}"
);

// Specifically replace the history timeline teaser in home
content = content.replace(
  /{[\s\S]*?HistoryTimeline[\s\S]*?isFullView={false}[\s\S]*?onNavigateHeritage[\s\S]*?}/,
  "{config?.showTimeline !== false && <HistoryTimeline\n              isNegative={isNegative}\n              isFullView={false}\n              onNavigateHeritage={() => handleSelectService('heritage')}\n            />}"
);

// Specifically replace contact section in home
content = content.replace(
  /{[\s\S]*?ContactSection[\s\S]*?preselectedService={contactServicePreselect}[\s\S]*?}/,
  "{config?.showContact !== false && <ContactSection\n              isNegative={isNegative}\n              preselectedService={contactServicePreselect}\n            />}"
);


fs.writeFileSync('src/App.tsx', content, 'utf-8');
