![moduix banner](https://raw.githubusercontent.com/Blinks44/moduix/main/website/docs/public/banner.png)

[![npm](https://img.shields.io/npm/v/@moduix/react?logo=npm&label=npm)](https://www.npmjs.com/package/@moduix/react)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

# @moduix/react

React components built on [Ark UI](https://ark-ui.com/), with accessible behavior, explicit
composition, and CSS Modules styling.

moduix gives Ark UI primitives a coherent visual system without adding a styling runtime. Components
are composed from named parts, styled with regular CSS, and customizable through CSS custom
properties, `className`, stable `data-slot` hooks, and Ark state attributes.

[Documentation](https://moduix.dev/) ·
[Quick start](https://moduix.dev/docs/quick-start) ·
[Components](https://moduix.dev/docs/components) ·
[Tokens](https://moduix.dev/docs/tokens)

## Install

Install the package and its Ark UI peer dependency:

```bash
pnpm add @moduix/react @ark-ui/react
```

`react`, `react-dom`, and `@ark-ui/react` are peer dependencies. moduix supports React 18 and 19.

The optional `Chart` component also requires its TanStack peer dependency:

```bash
pnpm add @tanstack/charts
```

## Add styles

Import the shared foundation stylesheet once in your application entry point:

```tsx
import '@moduix/react/style.css';
```

It provides the shared tokens and base layer styles. Component imports carry their own CSS Modules,
so their styles follow the components that use them.

The reset is optional. Import it first when you choose to use it:

```tsx
import '@moduix/react/reset.css';
import '@moduix/react/style.css';
```

## Use components

Import component subpaths and compose their flat named parts:

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from '@moduix/react/accordion';

export function Example() {
  return (
    <Accordion defaultValue={['first']}>
      <AccordionItem value="first">
        <AccordionItemTrigger>
          What is moduix?
          <AccordionItemIndicator />
        </AccordionItemTrigger>
        <AccordionItemContent>
          <AccordionItemBody>
            A component library built on accessible Ark UI primitives.
          </AccordionItemBody>
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  );
}
```

The family name is the root component. Every additional part is a separate family-prefixed export.

## Customize deliberately

CSS Modules keep the package defaults locally scoped while leaving clear extension points for your
application:

- use `className` on a root or named part for local CSS;
- use stable moduix `data-slot` hooks and Ark state attributes for structural or state-specific
  selectors;
- override public CSS custom properties at the theme, semantic, or component layer.

For example, set product-level theme primitives in your own stylesheet:

```css
:root {
  --moduix-primary: oklch(0.5 0.17 285);
  --moduix-radius: 0.875rem;
}
```

See [Tokens](https://moduix.dev/docs/tokens) and [Themes](https://moduix.dev/docs/themes) for the
token hierarchy and component-specific variables.

## Optional presets

Import one preset after `style.css` and enable it on the document root:

```tsx
import '@moduix/react/style.css';
import '@moduix/react/presets/soft.css';
```

```html
<html data-moduix-theme="soft"></html>
```

The available presets are `dense`, `soft`, and `contrast`.

## Prefer to own the source?

The hosted shadcn-compatible registry provides the same Ark-aligned component contracts in source
form. Set up `components.json` with the [Quick start](https://moduix.dev/docs/quick-start), then add
the components you need:

```bash
pnpm dlx shadcn@latest add @moduix-react/button @moduix-react/dialog
```

Generated files include the component source, CSS Modules, and required supporting files. Their
destination paths are controlled by your `components.json` aliases.

## Compatibility

The package is ESM-only and ships modern JavaScript targeting ES2023. Consume it through a modern
application bundler configured for the browsers your application supports.

## Links

- [Documentation](https://moduix.dev/)
- [npm package](https://www.npmjs.com/package/@moduix/react)
- [Source repository](https://github.com/Blinks44/moduix)
- [Issues](https://github.com/Blinks44/moduix/issues)

## Acknowledgements

moduix is possible because of the work and ideas of these projects:

- [Ark UI](https://ark-ui.com/) for the accessible, state-machine-backed primitives that define the
  behavioral foundation.
- [Chakra UI](https://chakra-ui.com/) for Ark-aligned composition ergonomics and design-system
  craft.
- [shadcn/ui](https://ui.shadcn.com/) for open-code distribution, beautiful defaults, and a
  documentation style centered on practical ownership.
- [UnoCSS](https://unocss.dev/) and [Tailwind CSS](https://tailwindcss.com/) for the foundations
  adapted by the optional reset.
- [Rstack](https://rstack.rs/) for its Rust-based ecosystem: Rspress for documentation, Rslib for
  library builds, and Rstest for tests.
- [VoidZero](https://voidzero.dev/) for the JavaScript tooling used throughout the workspace.

## License

[MIT](./LICENSE.md)