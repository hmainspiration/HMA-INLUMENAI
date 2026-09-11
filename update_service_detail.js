import fs from 'fs';

let content = fs.readFileSync('src/components/ServiceDetailView.tsx', 'utf-8');

// Add imports
if (!content.includes('getPortfolioConfig')) {
  content = content.replace(
    "import { SERVICES } from '../data/brandData';",
    "import { SERVICES } from '../data/brandData';\nimport { getPortfolioConfig } from '../utils/store';\nimport { getPortfolioFiles } from '../utils/portfolioRegistry';\nimport { MediaRenderer } from './MediaRenderer';\nimport { useEffect } from 'react';"
  );
}

// Add state and useEffect inside the component
if (!content.includes('portfolioData')) {
  content = content.replace(
    "  const [isTransforming, setIsTransforming] = useState(false);",
    `  const [isTransforming, setIsTransforming] = useState(false);

  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [autoFiles, setAutoFiles] = useState<string[]>([]);

  useEffect(() => {
    const pConfig = getPortfolioConfig();
    setPortfolioData(pConfig[service.id] || null);
    
    const allFiles = getPortfolioFiles();
    setAutoFiles(allFiles.filter(f => f.includes(\`/portfolio/\${service.id}/\`)));
    
    setHasTransformedToMaster(false);
  }, [service.id]);

  const renderPortfolioSection = () => {
    if (!portfolioData?.isPublished) return null;
    
    const hasCustomMedia = portfolioData.customMedia && portfolioData.customMedia.length > 0;
    const hasAutoMedia = autoFiles && autoFiles.length > 0;
    
    if (!hasCustomMedia && !hasAutoMedia) return null;

    return (
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="font-general text-xs font-bold tracking-widest uppercase text-[#3D80FD]">
            Portafolio de Trabajo
          </span>
          <h2 className="type-h2">Casos de Éxito & Recursos</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hasCustomMedia && portfolioData.customMedia.map((media: any) => (
            <div key={media.id} className="flex flex-col gap-2">
              <MediaRenderer {...media} />
            </div>
          ))}
          
          {hasAutoMedia && autoFiles.map(file => {
            const isImg = file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.svg');
            const isAudio = file.endsWith('.mp3');
            
            if (isImg) return <MediaRenderer key={file} type="image" url={file} title={file.split('/').pop()} />;
            if (isAudio) return <MediaRenderer key={file} type="audio" url={file} title={file.split('/').pop()} />;
            return null;
          })}
        </div>
      </section>
    );
  };
`
  );
}

// Inject renderPortfolioSection() before Deliverables
if (!content.includes('{renderPortfolioSection()}')) {
  content = content.replace(
    "{/* Deliverables & Capabilities Section */}",
    "{renderPortfolioSection()}\n\n      {/* Deliverables & Capabilities Section */}"
  );
}

fs.writeFileSync('src/components/ServiceDetailView.tsx', content, 'utf-8');
