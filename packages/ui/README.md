![moduix banner](https://raw.githubusercontent.com/Blinks44/moduix/main/apps/docs/public/banner.png)

[![npm](https://img.shields.io/npm/v/moduix?logo=npm&label=npm)](https://www.npmjs.com/package/moduix)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Turborepo](https://img.shields.io/badge/Monorepo-Turborepo-EF4444)](https://turbo.build/)

# moduix

Composable React components for product interfaces, built on top of
[Base UI](https://base-ui.com/) primitives.

moduix gives you ready-made components with accessible behavior, native CSS styles, and a
composition-first API. It is inspired by the clarity of
[shadcn/ui](https://ui.shadcn.com/), and it is trying to combine two useful workflows: install
components as a regular npm package when that fits your project, or copy component source when
you need direct ownership.

## Why It Exists

moduix started as an internal tool for shared product UI. We needed a component library that
was practical enough for real application screens, predictable enough to use across teams, and
small enough to stay easy to understand.

The library is now public because it may be useful outside of the original company context. If
it helps another team build consistent interfaces faster, that is already a good outcome.

## Principles

- **Base UI underneath.** Components are built on accessible Base UI primitives instead of
  reimplementing low-level interaction behavior.
- **Small dependency surface.** Base UI is the only external UI primitive layer. The package
  keeps the runtime stack intentionally small and does not bring a styling framework with it.
- **Two installation paths.** Use moduix as an npm package, or copy component source into your
  project when direct ownership is more important than package-managed updates.
- **Composable API.** Components are exposed as named parts, so complex UI can be assembled
  without hiding important structure.
- **Native CSS.** Styles are distributed as CSS, use CSS custom properties, and are designed to
  work with your existing styling approach.
- **Not a shadcn/ui competitor.** shadcn/ui is a major inspiration for the developer experience.
  moduix explores whether package-managed components and copy-owned components can coexist in
  one library.

## Installation

moduix supports two installation paths:

- Install the library as a regular npm package when you want package-managed updates.
- Install component source into your own project with `shadcn` when you want direct ownership.

### npm package

```bash
npm install moduix @base-ui/react
```

`react`, `react-dom`, and `@base-ui/react` are peer dependencies. They stay in your application
bundle, so moduix does not ship duplicate React or Base UI runtimes.

### shadcn copy-owned install

`shadcn` can install selected moduix components from the GitHub registry directly into your project.
The files become part of your codebase instead of staying in `node_modules`.

Make sure your project resolves the `@/*` alias to `src/*` in both `tsconfig.json` and
`tsconfig.app.json`, and mirror it in your bundler config.

Create `components.json` in the project root. Temporary workaround while `shadcn` custom registry
base init still requires a Tailwind-compatible setup:

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
npx shadcn@latest add Blinks44/moduix/button
npx shadcn@latest add Blinks44/moduix/accordion
```

The registry install also pulls in the shared moduix foundation files those components need, such as
styles, icons, and small utilities.

Import the generated foundation stylesheet once in your application entry point:

```tsx
import '@/lib/moduix/styles/style.css';
```

Generated files are written to `src/components/moduix/*` and `src/lib/moduix/*` when the aliases
above point `@/*` at `src/*`.

## Usage

Import the required foundation stylesheet once in your application entry point:

```tsx
import 'moduix/style.css';
```

This stylesheet is required. It provides the shared design tokens and base styles that component
CSS depends on.

If you want the optional reset, import it explicitly before the main stylesheet:

```tsx
import 'moduix/reset.css';
import 'moduix/style.css';
```

Then import and compose the components you need:

```tsx
import { Button, Dialog, DialogContent, DialogTitle, DialogTrigger } from 'moduix';

export function Example() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogTitle>Project settings</DialogTitle>
      </DialogContent>
    </Dialog>
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

The package exports composed components for common product UI needs, including Accordion,
AlertDialog, Autocomplete, Avatar, Button, Checkbox, Dialog, Drawer, Field, Form, Input,
Menu, NavigationMenu, Popover, Select, Tabs, Toast, Tooltip, and supporting primitives.

## Documentation

- Documentation: https://moduix.blinks44.workers.dev/
- npm package: https://www.npmjs.com/package/moduix
- UI package README: `packages/ui/README.md`
- Docs app README: `apps/docs/README.md`

## Repository Quick Start

From the monorepo root:

```bash
npm install
npm run build:ui
npm run dev
```

## Acknowledgements

This project could not exist without the work of these teams and communities:

- [Base UI](https://base-ui.com/) for the accessible React primitives that power the components.
- [shadcn/ui](https://ui.shadcn.com/) for the API inspiration and the culture of practical,
  readable component composition.
- [Tailwind CSS](https://tailwindcss.com/) for the reset.css implementation.
- [Fumadocs](https://fumadocs.dev/) for the documentation foundation.
- [TanStack](https://tanstack.com/) for the application tooling used by the docs.
- [Voidzero](https://voidzero.dev/) for awesome JS tools

## Contributing

Contributions are welcome, especially bug reports, accessibility fixes, documentation
improvements, and focused component improvements.

Before opening a pull request:

1. Install dependencies from the repository root:

   ```bash
   npm install
   ```

2. Build the UI package when your change affects `packages/ui` or documentation examples:

   ```bash
   npm run build:ui
   ```

3. Run the required checks:

   ```bash
   npm run fmt:fix
   npm run lint:check
   npm run tsc:check
   ```

Keep pull requests small and specific. For component changes, update the related stories,
exports, and documentation so the package and docs stay in sync.

Feel free to use agents or code generation tools, but
please review the result before submitting. The components are intentionally small and direct,
so the goal is to keep the code readable, maintainable, and free from unnecessary abstractions.
I added the `skills` folder so code written with agents stays consistent with the rest of the
library components.