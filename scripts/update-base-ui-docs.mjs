#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const COMPONENTS = [
  { slug: 'accordion', folder: 'Accordion' },
  { slug: 'alert-dialog', folder: 'AlertDialog' },
  { slug: 'autocomplete', folder: 'Autocomplete' },
  { slug: 'avatar', folder: 'Avatar' },
  { slug: 'button', folder: 'Button' },
  { slug: 'checkbox', folder: 'Checkbox' },
  { slug: 'checkbox-group', folder: 'CheckboxGroup' },
  { slug: 'collapsible', folder: 'Collapsible' },
  { slug: 'combobox', folder: 'Combobox' },
  { slug: 'context-menu', folder: 'ContextMenu' },
  { slug: 'dialog', folder: 'Dialog' },
  { slug: 'drawer', folder: 'Drawer' },
  { slug: 'field', folder: 'Field' },
  { slug: 'fieldset', folder: 'Fieldset' },
  { slug: 'form', folder: 'Form' },
  { slug: 'input', folder: 'Input' },
  { slug: 'menu', folder: 'Menu' },
  { slug: 'menubar', folder: 'Menubar' },
  { slug: 'meter', folder: 'Meter' },
  { slug: 'navigation-menu', folder: 'NavigationMenu' },
  { slug: 'number-field', folder: 'NumberField' },
  { slug: 'otp-field', folder: 'OTPField' },
  { slug: 'popover', folder: 'Popover' },
  { slug: 'preview-card', folder: 'PreviewCard' },
  { slug: 'progress', folder: 'Progress' },
  { slug: 'radio', folder: 'Radio' },
  { slug: 'scroll-area', folder: 'ScrollArea' },
  { slug: 'select', folder: 'Select' },
  { slug: 'separator', folder: 'Separator' },
  { slug: 'slider', folder: 'Slider' },
  { slug: 'switch', folder: 'Switch' },
  { slug: 'tabs', folder: 'Tabs' },
  { slug: 'toast', folder: 'Toast' },
  { slug: 'toggle', folder: 'Toggle' },
  { slug: 'toggle-group', folder: 'ToggleGroup' },
  { slug: 'toolbar', folder: 'Toolbar' },
  { slug: 'tooltip', folder: 'Tooltip' },
];

const BASE_URL = 'https://base-ui.com/react/components';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

async function downloadComponentDoc({ slug, folder }) {
  const url = `${BASE_URL}/${slug}.md`;
  const outputPath = path.join(
    repoRoot,
    'packages',
    'ui',
    'src',
    'components',
    folder,
    `${slug}.md`,
  );

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  const content = await response.text();
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, content, 'utf8');
  return outputPath;
}

async function main() {
  console.log(`Updating ${COMPONENTS.length} Base UI docs...`);

  const results = await Promise.allSettled(COMPONENTS.map(downloadComponentDoc));

  let hasErrors = false;
  results.forEach((result, index) => {
    const { slug } = COMPONENTS[index];

    if (result.status === 'fulfilled') {
      console.log(`OK: ${slug} -> ${path.relative(repoRoot, result.value)}`);
      return;
    }

    hasErrors = true;
    console.error(
      `ERROR: ${slug} -> ${result.reason instanceof Error ? result.reason.message : String(result.reason)}`,
    );
  });

  if (hasErrors) {
    process.exitCode = 1;
    return;
  }

  console.log('Base UI docs update completed.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});