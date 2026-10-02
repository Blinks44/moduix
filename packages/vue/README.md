![moduix banner](https://raw.githubusercontent.com/Blinks44/moduix/main/website/docs/public/banner.png)

[![npm](https://img.shields.io/npm/v/@moduix/vue?logo=npm&label=npm)](https://www.npmjs.com/package/@moduix/vue)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

# @moduix/vue

Vue components built on [Ark UI](https://ark-ui.com/), with accessible behavior, explicit
composition, and CSS Modules styling.

[Documentation](https://moduix.dev/) ·
[Quick start](https://moduix.dev/docs/quick-start) ·
[Components](https://moduix.dev/docs/components)

## Install

Install the package and its Ark UI peer dependency in an existing Vue application:

```bash
pnpm add @moduix/vue @ark-ui/vue
```

Vue 3.5 and later 3.x releases and `@ark-ui/vue` are peer dependencies.

The optional `Chart` component also requires `@tanstack/charts`:

```bash
pnpm add @tanstack/charts
```

Prefer component subpaths when you do not use Chart. The root barrel also re-exports Chart; install
`@tanstack/charts` when importing that barrel, since a bundler may resolve the integration even if
you only use another component.

## Add styles

Import the shared foundation once in your application entry point:

```ts
import '@moduix/vue/style.css';
```

Component imports carry their own CSS Modules. If your application needs the moduix reset,
import it before the foundation:

```ts
import '@moduix/vue/reset.css';
import '@moduix/vue/style.css';
```

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
} from '@moduix/vue/accordion';
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

Use `class` on roots and named parts, stable `data-slot` hooks, Ark state attributes, and public
CSS custom properties. Shared `--moduix-*` tokens control the system; component variables tune
individual families.

Import an optional preset after the foundation and activate it on your document root:

```ts
import '@moduix/vue/presets/soft.css';
```

```html
<html data-moduix-preset="soft"></html>
```

See [Styling](https://moduix.dev/docs/styling), [Tokens](https://moduix.dev/docs/tokens), and
[Themes](https://moduix.dev/docs/themes).

## Own the source

Configure `components.json` with the [Quick start](https://moduix.dev/docs/quick-start), then add
native Vue source through the matching registry:

```bash
pnpm dlx shadcn@latest add @moduix-vue/accordion
```

Registry items contain authored Vue SFCs and their supporting files. Keep `rsc: false` in Vue
applications and resolve the configured aliases in TypeScript and your bundler.

## Development

```bash
pnpm --filter @moduix/vue build
pnpm --filter @moduix/vue test
pnpm --filter @moduix/vue tsc:check
```

## License

[MIT](./LICENSE.md)