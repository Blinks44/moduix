![moduix banner](https://raw.githubusercontent.com/Blinks44/moduix/main/website/docs/public/banner.png)

[![npm](https://img.shields.io/npm/v/@moduix/react-tailwind?logo=npm&label=npm)](https://www.npmjs.com/package/@moduix/react-tailwind)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

# @moduix/react-tailwind

React components built on [Ark UI](https://ark-ui.com/) and styled with Tailwind CSS v4. The package
ships the same component subpaths and Ark-shaped contracts as `@moduix/react`, while keeping utility
classes available for consumer overrides.

[Documentation](https://moduix.dev/) ·
[Quick start](https://moduix.dev/docs/quick-start) ·
[Components](https://moduix.dev/docs/components) ·
[Styling](https://moduix.dev/docs/styling)

## Install

In an existing React project configured with Tailwind CSS v4, install the package and its Ark UI
peer dependency:

```bash
pnpm add @moduix/react-tailwind @ark-ui/react
```

`react`, `react-dom`, `tailwindcss`, and `@ark-ui/react` remain peer dependencies.

The optional `Chart` component also requires `@tanstack/charts`:

```bash
pnpm add @tanstack/charts
```

## Add styles

Import the moduix stylesheet before Tailwind. Register the package as an explicit source because Tailwind ignores dependencies by default:

```css
@import '@moduix/react-tailwind/style.css';
@import 'tailwindcss';

/* Resolve this path relative to this stylesheet. */
@source '../node_modules/@moduix/react-tailwind/dist/components';
```

Keep `style.css` before the Tailwind import. It provides the foundation tokens and shared keyframes, and establishes the cascade-layer order so Tailwind utilities, including consumer overrides, are applied after the moduix token and component layers. Tailwind Preflight is the reset for this package; do not add the `@moduix/react` reset alongside it.

In a monorepo, point `@source` at the installed package or at `packages/react-tailwind/src/components` when consuming workspace source directly.

## Use Accordion

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from '@moduix/react-tailwind/accordion';

export function Example() {
  return (
    <Accordion defaultValue={['first']}>
      <AccordionItem value="first">
        <AccordionItemTrigger>
          First item
          <AccordionItemIndicator />
        </AccordionItemTrigger>
        <AccordionItemContent>
          <AccordionItemBody>First content</AccordionItemBody>
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  );
}
```

Consumer `className` values are merged after defaults with `tailwind-merge`, so utilities such as `p-0` override the component's default padding.

## Use Button

```tsx
import { Button } from '@moduix/react-tailwind/button';

export function Example() {
  return <Button variant="outline">Save changes</Button>;
}
```

## shadcn registry

Configure the namespace and add the component with the standard CLI:

```json
{
  "registries": {
    "@moduix-react-tailwind": "https://moduix.dev/r/react-tailwind/{name}.json"
  }
}
```

```bash
pnpm dlx shadcn@latest add @moduix-react-tailwind/accordion
```

The registry installs the same foundation stylesheet locally as `@/lib/moduix/styles/style.css`. Import it once before Tailwind in your application stylesheet:

```css
@import './lib/moduix/styles/style.css';
@import 'tailwindcss';
```

No `@source` directive is required for the registry installation because the component source is copied into the application.

## Compatibility

The package is ESM-only and ships modern JavaScript targeting ES2023. Consume it through a modern
application bundler configured for the browsers your application supports.

## Links

- [Documentation](https://moduix.dev/)
- [npm package](https://www.npmjs.com/package/@moduix/react-tailwind)
- [Source repository](https://github.com/Blinks44/moduix)
- [Issues](https://github.com/Blinks44/moduix/issues)

## Acknowledgements

moduix builds on [Ark UI](https://ark-ui.com/) for accessible primitives,
[Tailwind CSS](https://tailwindcss.com/) for utility styling, and ideas from
[Chakra UI](https://chakra-ui.com/) and [shadcn/ui](https://ui.shadcn.com/).

## License

[MIT](./LICENSE.md)