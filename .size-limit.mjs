// Size budgets for key components of every shipped adapter (run `pnpm run build:packages` first).
// Sizes include Ark UI and CSS; the framework itself is excluded. Limits are [CSS Modules, Tailwind].
import { readdirSync } from 'node:fs';

const frameworkPackages = { react: ['react', 'react-dom'], solid: ['solid-js'], vue: ['vue'] };
const limits = {
  button: ['3 kB', '11 kB'],
  dialog: ['25 kB', '33 kB'],
  select: ['40 kB', '47 kB'],
  menu: ['39 kB', '47 kB'],
  combobox: ['40 kB', '47 kB'],
  tabs: ['15 kB', '23 kB'],
};

export default readdirSync('packages')
  .filter((name) => name.replace(/-tailwind$/, '') in frameworkPackages)
  .flatMap((name) =>
    Object.entries(limits).map(([component, [cssModules, tailwind]]) => ({
      name: `${name}/${component}`,
      path: `packages/${name}/dist/components/${component}/index.js`,
      ignore: frameworkPackages[name.replace(/-tailwind$/, '')],
      limit: name.endsWith('-tailwind') ? tailwind : cssModules,
    })),
  );