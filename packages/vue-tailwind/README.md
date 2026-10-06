![moduix banner](https://raw.githubusercontent.com/Blinks44/moduix/main/website/docs/public/banner.png)

[![npm](https://img.shields.io/npm/v/@moduix/vue-tailwind?logo=npm&label=npm)](https://www.npmjs.com/package/@moduix/vue-tailwind)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

# @moduix/vue-tailwind

Vue components built on [Ark UI](https://ark-ui.com/), with accessible behavior, explicit
composition, and Tailwind CSS v4 utility styling.

[Documentation](https://moduix.dev/) ·
[Quick start](https://moduix.dev/docs/quick-start) ·
[Components](https://moduix.dev/docs/components)

## Install

Install the package and its Ark UI peer dependency in an existing Vue application:

```bash
pnpm add @moduix/vue-tailwind @ark-ui/vue
```

Vue 3.5 and later 3.x releases and `@ark-ui/vue` are peer dependencies.
This track assumes Tailwind CSS v4 is already configured in your application.
The optional `Chart` component also requires `@tanstack/charts`:

```bash
pnpm add @tanstack/charts
```

Import components from their subpaths, such as `@moduix/vue-tailwind/accordion`. The package has no
root export. Only Chart requires `@tanstack/charts`.

## Add styles

Import the foundation before Tailwind in your application stylesheet and scan the compiled
component directory:

```css
@import '@moduix/vue-tailwind/style.css';
@import 'tailwindcss';

@source '../node_modules/@moduix/vue-tailwind/dist/components';
```

Resolve `@source` relative to this stylesheet. Tailwind Preflight supplies the reset.
Import the stylesheet once in your application entry point.

## Use components

Import component subpaths and compose the flat named parts in a Vue SFC:

```vue
<script setup lang="ts">
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from '@moduix/vue-tailwind/accordion';
</script>

<template>
  <Accordion :default-value="['first']">
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
</template>
```

The family name is the root component. Additional parts use the family prefix, and hooks such as
`useAccordion` stay top-level. Use native Vue `class`, props, events, scoped slots, and reactive
state. Component pages document supported models and any upstream framework differences.

The npm package includes compiled ESM and Vue declarations; consumers do not need to compile
library SFC source.

## Customize

Pass utility classes through `class` on roots and named parts. Consumer classes are merged last.
The shared foundation provides semantic colors, spacing, typography, and motion. Tailwind styling
uses utilities rather than the CSS Modules component-variable API.

Import an optional preset after the foundation and activate it on your document root:

```css
@import '@moduix/vue-tailwind/presets/soft.css';
```

```html
<html data-moduix-theme="soft"></html>
```

See [Styling](https://moduix.dev/docs/styling), [Tokens](https://moduix.dev/docs/tokens), and
[Themes](https://moduix.dev/docs/themes).

## Own the source

Configure `components.json` with the [Quick start](https://moduix.dev/docs/quick-start), then add
native Vue source through the matching registry:

```bash
pnpm dlx shadcn@latest add @moduix-vue-tailwind/accordion
```

Registry items contain authored Vue SFCs and their supporting files. Keep `rsc: false` in Vue
applications and resolve the configured aliases in TypeScript and your bundler.

## Development

```bash
pnpm --filter @moduix/vue-tailwind build
pnpm --filter @moduix/vue-tailwind test
pnpm --filter @moduix/vue-tailwind tsc:check
```

## License

[MIT](./LICENSE.md)