import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const websiteRoot = fileURLToPath(new URL('../', import.meta.url));

// Vue and Svelte components keep their imports in `<script>` blocks.
function scriptSource(file, source) {
  if (!/\.(?:vue|svelte)$/.test(file)) return source;
  return [...source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
    .map(([, code]) => code)
    .join('\n');
}

// Collect the example's actual local imports.
export function exampleProject(entry, addDependency) {
  const files = {};
  const dependencies = {};
  const visit = (file) => {
    const name = path.relative(websiteRoot, file);
    if (name in files) return;
    addDependency(file);
    const source = readFileSync(file, 'utf8');
    files[name] = source;
    if (!/\.(?:[jt]sx?|vue|svelte)$/.test(file)) return;
    for (const { fileName: specifier } of ts.preProcessFile(scriptSource(file, source))
      .importedFiles) {
      if (specifier.startsWith('.') || specifier.startsWith('@/')) {
        const base = specifier.startsWith('@/')
          ? path.join(websiteRoot, 'src', specifier.slice(2))
          : path.resolve(path.dirname(file), specifier);
        const local = [base, `${base}.tsx`, `${base}.ts`, `${base}/index.tsx`].find(existsSync);
        if (!local) throw new Error(`Cannot export ${name}: missing ${specifier}`);
        visit(local);
      } else {
        const pkg = specifier
          .split('/')
          .slice(0, specifier.startsWith('@') ? 2 : 1)
          .join('/');
        if (pkg in dependencies) continue;
        // Svelte packages may export only a `svelte` condition, which Node cannot resolve.
        const installed = path.join(websiteRoot, 'node_modules', pkg);
        let dir = existsSync(installed)
          ? installed
          : path.dirname(fileURLToPath(import.meta.resolve(specifier)));
        while (dir !== path.dirname(dir)) {
          const manifest = path.join(dir, 'package.json');
          if (existsSync(manifest)) {
            const json = JSON.parse(readFileSync(manifest, 'utf8'));
            if (json.name === pkg) {
              addDependency(manifest);
              dependencies[pkg] = json.version;
              break;
            }
          }
          dir = path.dirname(dir);
        }
        if (!(pkg in dependencies)) throw new Error(`Cannot find version for ${pkg}`);
      }
    }
  };
  visit(entry);
  return { files, dependencies, entry: path.relative(websiteRoot, entry) };
}