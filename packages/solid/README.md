![moduix banner](https://raw.githubusercontent.com/Blinks44/moduix/main/website/docs/public/banner.png)

[![npm](https://img.shields.io/npm/v/@moduix/solid?logo=npm&label=npm)](https://www.npmjs.com/package/@moduix/solid)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

# @moduix/solid

Solid components built on [Ark UI](https://ark-ui.com/), with accessible behavior, explicit
composition, and CSS Modules styling.

moduix adds CSS Modules and shared design tokens to Ark UI primitives. Components
are composed from named parts and customizable through CSS custom properties, `class`, stable
`data-slot` hooks, and Ark state attributes.

[Documentation](https://moduix.dev/) ·
[Components](https://moduix.dev/docs/components) ·
[Tokens](https://moduix.dev/docs/tokens)

## Install

Install the package and its Ark UI peer dependency in an existing Solid project:

```bash
pnpm add @moduix/solid @ark-ui/solid
```

`solid-js` and `@ark-ui/solid` are peer dependencies. moduix supports Solid 1.9 and later 1.x releases.

The optional `Chart` component also requires its TanStack peer dependency:

```bash
pnpm add @tanstack/charts
```

Import components from their subpaths, such as `@moduix/solid/accordion`. The package has no
root export. Only Chart requires `@tanstack/charts`.

## Add styles

Import the shared foundation stylesheet once in your application entry point:

```tsx
import '@moduix/solid/style.css';
```

It provides the shared tokens and base layer styles. Component imports carry their own CSS Modules,
so their styles follow the components that use them.

The reset is optional. Import it first when you choose to use it:

```tsx
import '@moduix/solid/reset.css';
import '@moduix/solid/style.css';
```

## Use components

Import component subpaths and compose their named parts:

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from '@moduix/solid/accordion';

export function Example() {
  return (
    <Accordion defaultValue={['first']}>
      <AccordionItem value="first">
        <AccordionItemTrigger>What is moduix?</AccordionItemTrigger>
        <AccordionItemContent>
          A component library built on accessible Ark UI primitives.
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  );
}
```

## Customize

Use `class` on roots and named parts for local styles, or override public CSS custom properties at
the theme, semantic, or component layer:

```css
:root {
  --moduix-primary: oklch(0.5 0.17 285);
  --moduix-radius: 0.875rem;
}
```

## Optional presets

Import one preset after `style.css` and enable it on the document root:

```tsx
import '@moduix/solid/style.css';
import '@moduix/solid/presets/soft.css';
```

```html
<html data-moduix-theme="soft"></html>
```

The available presets are `dense`, `soft`, and `contrast`.

## Prefer to own the source?

The shadcn registry copies the component source and styles into your project:

```bash
pnpm dlx shadcn@latest add @moduix-solid/accordion
```

## Compatibility

The package is ESM-only and ships modern JavaScript targeting ES2023. Consume it through a modern
application bundler configured for the browsers your application supports.

## Links

- [Documentation](https://moduix.dev/)
- [npm package](https://www.npmjs.com/package/@moduix/solid)
- [Source repository](https://github.com/Blinks44/moduix)
- [Issues](https://github.com/Blinks44/moduix/issues)

## License

[MIT](./LICENSE.md)