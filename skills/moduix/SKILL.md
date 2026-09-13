---
name: moduix
description: Build or modify applications with shipped moduix framework adapters and CSS Modules or Tailwind components. Use when discovering, installing, composing, updating, or reviewing package-managed or shadcn copy-owned moduix UI.
---

# moduix

Use the public moduix documentation as the source of truth. Preserve the project's framework,
styling track, and ownership model. Do not migrate between framework adapters, CSS Modules and
Tailwind, or package-managed and copy-owned code unless the user asks.

moduix is multi-framework by design. React and Solid adapters ship today; Vue and Svelte are planned.
Never present a planned adapter as available. Discover the current package or registry before choosing
commands, imports, or examples.

## Identify the project setup

Inspect the package manager, existing imports, application stylesheet, and `components.json` before
changing code. Select the matching package or registry:

| Runtime | Ownership | CSS Modules     | Tailwind CSS v4          |
| ------- | --------- | --------------- | ------------------------ |
| React   | package   | `@moduix/react` | `@moduix/react-tailwind` |
| React   | registry  | `@moduix-react` | `@moduix-react-tailwind` |
| Solid   | package   | `@moduix/solid` | `@moduix/solid-tailwind` |
| Solid   | registry  | `@moduix-solid` | `@moduix-solid-tailwind` |

Assume the application is already configured for its framework. For a Tailwind track, also confirm
that Tailwind CSS v4 is already configured. Do not scaffold a framework, install Tailwind, or
initialize shadcn only to use a package. If no ownership model is established, ask the user to
choose between package-managed and copy-owned components.

## Discover before installing

Read [references/discovery.md](references/discovery.md), then:

1. Read the canonical moduix page for the component, recipe, or setup task.
2. Confirm that the component exists in the selected package or registry. The CSS Modules and
   Tailwind catalogues may differ while components are being ported.
3. Prefer a documented component or recipe to custom UI when it fits. Recipes are documentation,
   not registry items; install their listed components and keep application behavior in the app.

## Use package-managed components

1. Use the project's package manager and the install command from the current Quick start. Do not
   reinstall the framework runtime in an initialized application.
2. Import components from package subpaths such as `@moduix/react/accordion` or
   `@moduix/solid-tailwind/accordion`.
3. For CSS Modules, import the matching package's `style.css` once. Component imports carry their
   own scoped CSS. The package `reset.css` is optional and, when selected, must come before
   `style.css`.
4. For Tailwind, import the matching package's `style.css` before `tailwindcss`, then add an
   explicit `@source` limited to that package's `dist/components` directory. Resolve the path from
   the application stylesheet. Tailwind Preflight is the reset; do not import the CSS Modules
   reset.

```css
@import '@moduix/react-tailwind/style.css';
@import 'tailwindcss';

@source '../node_modules/@moduix/react-tailwind/dist/components';
```

Replace `react-tailwind` with `solid-tailwind` for Solid.

## Use copy-owned components

1. Run `shadcn@latest info --json` with the project's package runner. Confirm the matching registry
   namespace, aliases, installed items, and resolved file paths.
2. Run `shadcn@latest search <namespace> --query "<product need>"` and
   `shadcn@latest view <namespace>/<item>` before adding an item. Prefer the configured shadcn MCP
   server for discovery when available, but do not configure an AI client unless asked.
3. Run `shadcn@latest add <namespace>/<item> --dry-run`, inspect the result, then add it normally.
   The registry installs the component's declared files, utilities, and dependencies; do not
   recreate them manually.
4. Keep the generated foundation stylesheet imported once. For CSS Modules, import
   `@/lib/moduix/styles/style.css`; the registry reset is a separate optional item. For Tailwind,
   import the generated foundation before `tailwindcss`. Copied Tailwind components need no package
   `@source` directive because their source is inside the application.

```css
@import './lib/moduix/styles/style.css';
@import 'tailwindcss';
```

Before updating a copied item, run `shadcn@latest add <namespace>/<item> --diff`. Read existing
files and preserve local changes. Never use `--overwrite` without explicit user approval.

## Build and review

- Preserve the documented Ark-shaped part tree, callback detail objects, context hooks, form
  behavior, and accessibility contract.
- Use native framework patterns. Do not transliterate one adapter's composition into another
  framework's shape or invent shadcn-style aliases that moduix does not export.
- Keep package imports and copy-owned imports separate.
- Customize CSS Modules through documented variables, classes, slots, and state attributes.
  Customize Tailwind components with consumer utilities; avoid recreating component-specific
  moduix variable systems.
- Validate with the consumer project's normal formatter, typecheck, tests, build, and relevant
  accessibility checks.