import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const registrySchemaUrl = 'https://ui.shadcn.com/schema/registry.json';
const sharedImportRewrites = new Map([
  ['@/utils/mergeClassName', '@/lib/moduix/mergeClassName'],
  ['@/icons/ui', '@/lib/moduix/icons/ui'],
]);
const codeFileExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(rootDir, '..');
const registryDir = path.join(repoRoot, 'packages/ui/registry');
const registryDefaultDir = path.join(registryDir, 'default');
const configPath = path.join(registryDir, 'registry.config.json');

await main();

async function main() {
  const config = await loadConfig();
  const importRewrites = buildImportRewrites(config);

  await resetRegistryDir();
  await syncRegistryFiles(config.shared.files, importRewrites);

  for (const component of config.components) {
    await syncRegistryFiles(resolveComponentFiles(component), importRewrites);
  }

  await writeRegistryFiles(config);
}

async function loadConfig() {
  return JSON.parse(await readFile(configPath, 'utf8'));
}

function buildImportRewrites(config) {
  const importRewrites = new Map(sharedImportRewrites);

  for (const component of config.components) {
    const componentDirName = path.basename(component.sourceDir);
    const registryImportPath = `@/components/moduix/${component.name}`;

    importRewrites.set(`@/components/${componentDirName}`, registryImportPath);
    importRewrites.set(`../${componentDirName}`, registryImportPath);
  }

  return importRewrites;
}

async function resetRegistryDir() {
  await rm(registryDefaultDir, { recursive: true, force: true });
  await mkdir(registryDefaultDir, { recursive: true });
}

function resolveComponentFiles(component) {
  return component.files.map((file) => ({
    ...file,
    source: path.join(component.sourceDir, file.source),
  }));
}

async function syncRegistryFiles(files, importRewrites) {
  for (const file of files) {
    await syncRegistryFile(file, importRewrites);
  }
}

async function syncRegistryFile(file, importRewrites) {
  const sourcePath = path.join(repoRoot, file.source);
  const outputPath = path.join(registryDefaultDir, file.path);

  await mkdir(path.dirname(outputPath), { recursive: true });

  if (!isCodeFile(sourcePath)) {
    await cp(sourcePath, outputPath);
    return;
  }

  const source = await readFile(sourcePath, 'utf8');
  await writeFile(outputPath, rewriteImports(source, importRewrites));
}

function isCodeFile(filePath) {
  return codeFileExtensions.has(path.extname(filePath));
}

function rewriteImports(source, importRewrites) {
  let output = source;

  for (const [from, to] of importRewrites) {
    output = output.replace(new RegExp(`(?<=['"])${escapeRegExp(from)}(?=['"])`, 'g'), to);
  }

  return output;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function writeRegistryFiles(config) {
  const registryItems = [
    createRegistryItem(config.init, config),
    createRegistryItem(config.shared, config),
    ...config.components.map((component) => createRegistryItem(component, config)),
  ];

  await writeJson(path.join(registryDefaultDir, 'registry.json'), {
    $schema: registrySchemaUrl,
    name: `${config.github.repo}-default`,
    homepage: config.github.homepage,
    items: registryItems,
  });

  await writeJson(path.join(repoRoot, 'registry.json'), {
    $schema: registrySchemaUrl,
    name: config.github.repo,
    homepage: config.github.homepage,
    items: [],
    include: ['./packages/ui/registry/default/registry.json'],
  });
}

async function writeJson(filePath, value) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function createRegistryItem(item, config) {
  return removeEmptyFields({
    name: item.name,
    type: item.type ?? 'registry:item',
    title: item.title,
    description: item.description,
    extends: item.extends,
    config: item.config,
    dependencies: item.dependencies,
    docs: item.docs,
    registryDependencies: item.registryDependencies?.map((dependency) =>
      normalizeRegistryDependency(dependency, config),
    ),
    files: item.files?.map(({ path: filePath, target, type }) => ({
      path: filePath,
      target,
      type,
    })),
  });
}

function normalizeRegistryDependency(dependency, config) {
  if (dependency.startsWith('@') || dependency.includes('/') || dependency.includes('://')) {
    return dependency;
  }

  return `${config.github.owner}/${config.github.repo}/${dependency}`;
}

function removeEmptyFields(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, fieldValue]) => {
      if (fieldValue == null) {
        return false;
      }

      if (Array.isArray(fieldValue) && fieldValue.length === 0) {
        return false;
      }

      return true;
    }),
  );
}