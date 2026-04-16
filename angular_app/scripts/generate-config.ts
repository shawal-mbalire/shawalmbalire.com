/**
 * Generate app configuration JSON for runtime access
 */
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const config = {
  appName: 'Portfolio',
  environment: process.env['NODE_ENV'] ?? 'development',
  baseUrl: '/',
  contactEmail: 'mbalireshawal@gmail.com',
  analyticsId: '',
};

const publicDir = join(process.cwd(), 'public');
if (!existsSync(publicDir)) {
  console.log(`Creating public directory: ${publicDir}`);
  writeFileSync(join(process.cwd(), '.gitignore'), 'public/app-config.json\n', { flag: 'a' });
}

const outputPath = join(publicDir, 'app-config.json');
writeFileSync(outputPath, JSON.stringify(config, null, 2));
console.log(`[config] Wrote ${outputPath}`);
console.log(`[config] ${JSON.stringify(config)}`);
