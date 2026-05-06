import { cpSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(rootDir, 'dist');

const entries = [
  ['content', 'src/content.ts'],
  ['background', 'src/background.ts'],
  ['notifier', 'src/notifier.ts'],
];
const watch = process.argv.includes('--watch');

rmSync(outDir, { recursive: true, force: true });

for (const [name, input] of entries) {
  await build({
    root: rootDir,
    configFile: false,
    publicDir: false,
    build: {
      outDir,
      emptyOutDir: false,
      copyPublicDir: false,
      watch: watch ? {} : null,
      rollupOptions: {
        input: resolve(rootDir, input),
        output: {
          entryFileNames: `${name}.js`,
          format: 'iife',
          inlineDynamicImports: true,
        },
      },
    },
  });
}

cpSync(resolve(rootDir, 'public'), outDir, { recursive: true });

if (watch) {
  console.log('Watching extension entries: content, background, notifier');
}
