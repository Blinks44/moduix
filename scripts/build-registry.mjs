import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const registrySchemaUrl = 'https://ui.shadcn.com/schema/registry.json';
const importRewrites = new Map([
  ['@/utils/mergeClassName', '@/lib/moduix/mergeClassName'],
  ['@/icons/ui', '@/lib/moduix/icons/ui'],
]);
const codeFileExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(rootDir, '..');
const registryDir = path.join(repoRoot, 'packages/ui/registry');
const registryDefaultDir = path.join(registryDir, 'default');
const configPath = path.join(registryDir, 'registry.config.json');

const config = JSON.parse(await readFile(configPath, 'utf8'));
const githubRegistryPrefix = `${config.github.owner}/${config.github.repo}`;

await rm(registryDefaultDir, { recursive: true, force: true });
await mkdir(registryDefaultDir, { recursive: true });

await copyFiles(config.shared.files);

for (const component of config.components) {
  const componentFiles = component.files.map((file) => ({
    ...file,
    source: path.join(component.sourceDir, file.source),
  }));

  await copyFiles(componentFiles);
}

const registryItems = [
  createRegistryItem(config.init),
  createRegistryItem(config.shared),
  ...config.components.map((component) => createRegistryItem(component)),
];

await writeFile(
  path.join(registryDefaultDir, 'registry.json'),
  `${JSON.stringify(
    {
      $schema: registrySchemaUrl,
      name: `${config.github.repo}-default`,
      homepage: config.github.homepage,
      items: registryItems,
    },
    null,
    2,
  )}\n`,
);
await writeFile(
  path.join(repoRoot, 'registry.json'),
  `${JSON.stringify(
    {
      $schema: registrySchemaUrl,
      name: config.github.repo,
      homepage: config.github.homepage,
      items: [],
      include: ['./packages/ui/registry/default/registry.json'],
    },
    null,
    2,
  )}\n`,
);

async function copyFiles(files) {
  for (const file of files) {
    const sourcePath = path.join(repoRoot, file.source);
    const outputPath = path.join(registryDefaultDir, file.path);

    if (!isCodeFile(sourcePath)) {
      await mkdir(path.dirname(outputPath), { recursive: true });
      await cp(sourcePath, outputPath);
      continue;
    }

    const source = await readFile(sourcePath, 'utf8');
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, rewriteImports(source));
  }
}

function isCodeFile(filePath) {
  return codeFileExtensions.has(path.extname(filePath));
}

function rewriteImports(source) {
  let output = source;

  for (const [from, to] of importRewrites) {
    output = output.replaceAll(from, to);
  }

  return output;
}

function createRegistryItem(item) {
  return removeEmptyFields({
    name: item.name,
    type: item.type ?? 'registry:item',
    title: item.title,
    description: item.description,
    extends: item.extends,
    config: item.config,
    dependencies: item.dependencies,
    docs: item.docs,
    registryDependencies: item.registryDependencies?.map(normalizeRegistryDependency),
    files: item.files?.map(({ path: filePath, target, type }) => ({
      path: filePath,
      target,
      type,
    })),
  });
}

function normalizeRegistryDependency(dependency) {
  if (dependency.startsWith('@') || dependency.includes('/') || dependency.includes('://')) {
    return dependency;
  }

  return `${githubRegistryPrefix}/${dependency}`;
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