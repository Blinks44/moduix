![moduix banner](https://raw.githubusercontent.com/Blinks44/moduix/main/apps/docs/public/banner.png)

[![npm](https://img.shields.io/npm/v/@moduix/react?logo=npm&label=npm)](https://www.npmjs.com/package/@moduix/react)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Turborepo](https://img.shields.io/badge/Monorepo-Turborepo-EF4444)](https://turbo.build/)

# moduix

Composable React components for product interfaces, built on top of
[Ark UI](https://ark-ui.com/) primitives.

moduix gives you ready-made components with accessible behavior, native CSS styles, and a
composition-first API. It supports two production workflows: install the package for managed
updates, or copy registry component source when your application needs direct ownership.

## Why It Exists

moduix is built for real product screens: predictable behavior, readable composition, small
runtime surface, and CSS that can be owned by the application. The library is public and actively
developed around Ark UI primitives, shadcn-compatible source delivery, and practical defaults for
teams that need consistent interfaces.

## Principles

- **Ark UI underneath.** Components target Ark UI composition and accessibility primitives instead of
  reimplementing low-level interaction behavior.
- **Small dependency surface.** Ark UI is the only external UI primitive layer. The package
  keeps the runtime stack intentionally small and does not bring a styling framework with it.
- **Two installation paths.** Use moduix as an npm package, or copy component source into your
  project when direct ownership is more important than package-managed updates.
- **Composable API.** Components are exposed as named parts, so complex UI can be assembled
  without hiding important structure.
- **Native CSS.** Styles are distributed as CSS, use CSS custom properties, and are designed to
  work with your existing styling approach.
- **shadcn-compatible source delivery.** shadcn/ui remains a major inspiration for readable
  component composition. moduix keeps that ownership model available through its registry.

## Installation

moduix supports two installation paths:

- Install the library as a regular npm package when you want package-managed updates.
- Install component source into your own project with `shadcn` when you want direct ownership.

| Choose this path            | When it fits best                                                                                                             |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| npm package                 | You want the fastest setup, package-managed updates, imports from `@moduix/react`, and styles from `@moduix/react/style.css`. |
| `shadcn` copy-owned install | You want generated source files inside your app, direct local customization, and imports from `@/components/moduix/*`.        |

### npm package

```bash
npm install @moduix/react @ark-ui/react
```

`react`, `react-dom`, and `@ark-ui/react` are peer dependencies. They stay in your application
bundle, so moduix does not ship duplicate React or Ark UI runtimes.

### shadcn copy-owned install

`shadcn` can install selected moduix components from the GitHub registry directly into your project.
The files become part of your codebase instead of staying in `node_modules`.

Make sure your project resolves the `@/*` alias to `src/*` in both `tsconfig.json` and
`tsconfig.app.json`, and mirror it in your bundler config.

Create `components.json` in the project root when your app does not already have one:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}
```

```bash
npx shadcn@latest add Blinks44/moduix/react-button
npx shadcn@latest add Blinks44/moduix/react-accordion
```

The registry install also pulls in the shared moduix foundation files those components need, such as
styles, icons, and small utilities.

Import the generated foundation stylesheet once in your application entry point:

```tsx
import '@/lib/moduix/styles/style.css';
```

If you want the optional reset in the copy-owned path, import it explicitly before the main
stylesheet:

```tsx
import '@/lib/moduix/styles/reset.css';
import '@/lib/moduix/styles/style.css';
```

With the aliases above, generated files land in `src/components/moduix/*` and `src/lib/moduix/*`.

## Usage

Import the required foundation stylesheet once in your application entry point:

```tsx
import '@moduix/react/style.css';
```

This stylesheet is required. It provides the shared design tokens and base styles that component
CSS depends on.

If you want the optional reset, import it explicitly before the main stylesheet:

```tsx
import '@moduix/react/reset.css';
import '@moduix/react/style.css';
```

Then import and compose the components you need:

```tsx
import { Button, Dialog, Portal } from '@moduix/react';

export function Example() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Project settings</Dialog.Title>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
```

`style.css` ships the shared design tokens and base styles. Component imports still bring along only
the component CSS they use.

## Styling

Components accept `className` where customization is expected and expose stable `data-slot`
attributes for targeted styling. Theme values are regular CSS custom properties:

```css
:root {
  --color-primary: oklch(0.205 0 0);
  --button-radius: 0.5rem;
}
```

Library CSS is organized with cascade layers:

```css
@layer ui.reset, ui.tokens, ui.components;
```

This keeps defaults predictable while still letting application styles override tokens,
classes, or component-level variables.

## What Is Included

The package exports composed components for common product UI needs, including Accordion, Avatar,
Button, Checkbox, Combobox, Dialog, Drawer, Field, FileUpload, Menu, NumberInput, Popover,
QrCode, Select, Tabs, Toast, Tooltip, TreeView, and supporting layout and display primitives.

## Documentation

- Documentation: https://moduix.blinks44.workers.dev/
- npm package: https://www.npmjs.com/package/@moduix/react
- React package README: `packages/react/README.md`
- Docs app README: `apps/docs/README.md`

## Repository Quick Start

From the monorepo root:

```bash
npm install
npm run build:react
npm run dev
```

## Acknowledgements

This project could not exist without the work of these teams and communities:

- [Ark UI](https://ark-ui.com/) for the composition and accessibility primitives now shaping the library contract.
- [shadcn/ui](https://ui.shadcn.com/) for the API inspiration and the culture of practical,
  readable component composition.
- [Tailwind CSS](https://tailwindcss.com/) for the reset.css implementation.
- [Fumadocs](https://fumadocs.dev/) for the documentation foundation.
- [TanStack](https://tanstack.com/) for the application tooling used by the docs.
- [Voidzero](https://voidzero.dev/) for the JavaScript tooling used by the workspace.

## Contributing

Contributions are welcome, especially bug reports, accessibility fixes, documentation
improvements, and focused component improvements.

Before opening a pull request:

1. Install dependencies from the repository root:

   ```bash
   npm install
   ```

2. Build the React package when your change affects `packages/react` or documentation examples:

   ```bash
   npm run build:react
   ```

3. Run the required checks:

   ```bash
   npm run fmt:fix
   npm run lint:check
   npm run tsc:check
   ```

Keep pull requests small and specific. For component changes, update the related stories, exports,
local component notes, public docs, and registry output so the package and docs stay in sync.

Agent-facing repository guidance lives in `AGENTS.md` and `.agents/skills`. Generated or
agent-assisted changes should still preserve the library's direct Ark-first component contracts,
small APIs, and readable implementation style.