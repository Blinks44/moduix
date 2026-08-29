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
npm install @moduix/react @ark-ui/react
```

`react`, `react-dom`, and `@ark-ui/react` are peer dependencies. moduix supports React 18 and 19.

The optional `Chart` component also requires its TanStack peer dependency:

```bash
npm install @tanstack/charts
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

Import component subpaths and compose their named parts:

```tsx
import { Button } from '@moduix/react/button';
import { Dialog } from '@moduix/react/dialog';

export function Example() {
  return (
    <Dialog>
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
    </Dialog>
  );
}
```

Use the short root alias, such as `Dialog`, in application code. The matching `Dialog.Root` export is
available when an explicit namespace improves a local abstraction, but it is not required.

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
npx shadcn@latest add @moduix-react/button @moduix-react/dialog
```

Generated files include the component source, CSS Modules, and required supporting files. Their
destination paths are controlled by your `components.json` aliases.

## Links

- [Documentation](https://moduix.dev/)
- [npm package](https://www.npmjs.com/package/@moduix/react)
- [Source repository](https://github.com/Blinks44/moduix)
- [Issues](https://github.com/Blinks44/moduix/issues)

## License

[MIT](./LICENSE.md)