![moduix banner](https://raw.githubusercontent.com/Blinks44/moduix/main/apps/docs/docs/public/banner.png)

[![npm](https://img.shields.io/npm/v/@moduix/react?logo=npm&label=npm)](https://www.npmjs.com/package/@moduix/react)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

# @moduix/react

Polished React components for product interfaces, built on
[Ark UI](https://ark-ui.com/) and styled with native CSS.

The package combines Ark's accessible interaction model with shadcn-inspired clarity: calm defaults,
explicit named parts, consistent states, and a token-first theme contract. No styling framework is
required.

[Documentation](https://moduix.dev/) ·
[Quick start](https://moduix.dev/docs/quick-start) ·
[Components](https://moduix.dev/docs/components) ·
[Tokens](https://moduix.dev/docs/tokens)

## Highlights

- Ark-aligned composition, controlled and uncontrolled state, context, callbacks, and form behavior.
- Consistent `36px` primary controls and `32px` popup rows through shared size tokens.
- Native CSS, CSS Modules, cascade layers, semantic tokens, and component-level variables.
- Stable moduix `data-slot` hooks alongside Ark part and state attributes.
- Optional reset and curated `dense`, `soft`, and `contrast` presets.
- React 18 and 19 support.
- A matching hosted shadcn registry when source ownership is the better workflow.

## Install

Install the package and its Ark UI peer dependency:

```bash
npm install @moduix/react @ark-ui/react
```

`react`, `react-dom`, and `@ark-ui/react` are peer dependencies, so the package does not ship
duplicate framework or primitive runtimes.

## Add Styles

Import the required foundation stylesheet once in your application entry point:

```tsx
import '@moduix/react/style.css';
```

This entrypoint provides shared design tokens and base styles. Component imports bring along their
own CSS.

The reset is optional and intentionally separate:

```tsx
import '@moduix/react/reset.css';
import '@moduix/react/style.css';
```

## Use Components

Import public components from the package barrel and compose their named parts:

```tsx
import { Button, Dialog } from '@moduix/react';

export function Example() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open settings</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Project settings</Dialog.Title>
            <Dialog.Description>Update how this workspace behaves.</Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <Button variant="outline">Done</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
```

moduix keeps important Ark anatomy visible. Higher-level convenience parts are documented as the
recommended path where they exist, while low-level composition remains available for advanced
cases.

## Theme the System

Theme values are CSS custom properties. Change broad semantic decisions first and use component
aliases for deliberate exceptions:

```css
:root {
  --primary: oklch(0.52 0.18 145);
  --radius: 0.75rem;
  --size-md: 36px;
  --size-sm: 32px;
}

.compact-toolbar {
  --button-size-md: 32px;
}
```

The token hierarchy is:

1. theme primitives such as `--primary`, `--spacing-2`, `--size-md`, and `--radius`;
2. semantic aliases such as `--color-primary`, `--spacing-md`, and `--radius-md`;
3. shared family defaults such as `--popup-item-min-height` and `--focus-ring-width`;
4. component aliases such as `--input-height` and `--select-item-min-height`.

Library styles use predictable cascade layers:

```css
@layer ui.reset, ui.tokens, ui.base, ui.components;
```

Components also expose `className`, `data-slot`, and the Ark `data-scope`, `data-part`, and
state attributes supported by their primitives.

## Optional Presets

Import one preset after `style.css` and activate it on the document root:

```tsx
import '@moduix/react/style.css';
import '@moduix/react/presets/soft.css';
```

```html
<html data-moduix-theme="soft"></html>
```

Available presets are `dense`, `soft`, and `contrast`. See
[Themes](https://moduix.dev/docs/themes) before combining presets or creating a reusable custom
theme.

## Prefer to Own the Source?

The moduix registry uses the shadcn distribution format while preserving the same Ark-aligned
component contracts:

```bash
npx shadcn@latest init
npx shadcn@latest registry add '@moduix-react=https://moduix.dev/r/react/{name}.json'
npx shadcn@latest add @moduix-react/button @moduix-react/dialog
```

Generated files are installed under `@/components/moduix/*` and `@/lib/moduix/*`. Read the
[complete Quick Start](https://moduix.dev/docs/quick-start) for alias setup, registry inspection,
dry runs, and generated stylesheet imports.

## Acknowledgements

- [Ark UI](https://ark-ui.com/) provides the primitive behavior and composition model.
- [Chakra UI](https://chakra-ui.com/) informs Ark-aligned ergonomics and design-system craft.
- [shadcn/ui](https://ui.shadcn.com/) inspires open-code delivery, beautiful defaults, and practical
  documentation.
- [UnoCSS](https://unocss.dev/) and [Tailwind CSS](https://tailwindcss.com/) provide foundations
  adapted by the optional reset.

## Links

- [Documentation](https://moduix.dev/)
- [npm package](https://www.npmjs.com/package/@moduix/react)
- [Source repository](https://github.com/Blinks44/moduix)
- [Issues](https://github.com/Blinks44/moduix/issues)

## License

[MIT](./LICENSE.md)