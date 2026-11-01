import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const websiteRoot = fileURLToPath(new URL('../', import.meta.url));

// Collect the example's actual local imports; PreviewMeta is the only docs-only dependency.
export function exampleProject(entry, addDependency) {
  const files = {};
  const dependencies = {};
  const visit = (file) => {
    const name = path.relative(websiteRoot, file);
    if (name in files) return;
    addDependency(file);
    const source = readFileSync(file, 'utf8');
    files[name] = source;
    if (!/\.[jt]sx?$/.test(file)) return;
    for (const { fileName: specifier } of ts.preProcessFile(source).importedFiles) {
      if (specifier === '@/components/mdx/Components') continue;
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
        let dir = path.dirname(fileURLToPath(import.meta.resolve(specifier)));
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