import fs from 'fs';

function wrapWithLocal(file, varName, localKey) {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(`export const ${varName}`, `const DEFAULT_${varName}`);
  content += `\n\nexport const ${varName} = typeof window !== 'undefined' && localStorage.getItem('${localKey}') ? JSON.parse(localStorage.getItem('${localKey}') as string) : DEFAULT_${varName};\n`;
  fs.writeFileSync(file, content, 'utf-8');
}

wrapWithLocal('src/data/brandData.ts', 'SERVICES', 'hma_services');
wrapWithLocal('src/data/evolutionEras.ts', 'EVOLUTION_ERAS', 'hma_eras');
