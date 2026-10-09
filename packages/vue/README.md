![moduix banner](https://raw.githubusercontent.com/Blinks44/moduix/main/website/docs/public/banner.png)

[![npm](https://img.shields.io/npm/v/@moduix/vue?logo=npm&label=npm)](https://www.npmjs.com/package/@moduix/vue)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

# @moduix/vue

Vue components built on [Ark UI](https://ark-ui.com/), styled with CSS Modules.
Compose components from flat named parts using native Vue props and events.

[Quick start](https://moduix.dev/docs/quick-start) ·
[Components](https://moduix.dev/docs/components) ·
[Styling](https://moduix.dev/docs/styling)

## Install

Start from an existing application using Vue 3.5 or later in the 3.x line.

Install moduix and its matching Ark UI peer dependency:

```bash
pnpm add @moduix/vue @ark-ui/vue
```

Import components from subpaths such as `@moduix/vue/accordion`; there is no package-root
export. Only the optional Chart integration requires an additional peer: `pnpm add @tanstack/charts`.

## Add styles

Import the reset and foundation once in your application entry point:

```ts
import '@moduix/vue/reset.css';
import '@moduix/vue/style.css';
```

If your application already provides an equivalent reset, omit `reset.css`. The foundation supplies
shared tokens and base styles; component imports load their own CSS Modules.

## Use a component

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

The family name is the root component. Each additional part is a separate family-prefixed export.
The setup is working when the trigger is styled and the panel opens with keyboard and pointer input.

## Customize

Use `class` on the root or a named part, stable `data-slot` hooks, and Ark state attributes
for application styles. Override shared CSS tokens or component variables for more focused changes.

The optional presets are `dense`, `soft`, and `contrast`. See
[Themes](https://moduix.dev/docs/themes) for imports and activation, and
[Tokens](https://moduix.dev/docs/tokens) for available CSS properties.

## Own the source

Configure `components.json` and aliases with the
[registry setup](https://moduix.dev/docs/quick-start#install-with-the-shadcn-cli), then add a component:

```bash
pnpm dlx shadcn@latest add @moduix-vue/accordion
```

The CLI copies native Vue source, styles, and dependencies into your project. Follow Quick Start
to connect the generated foundation stylesheet. The same namespace also installs
[blocks](https://moduix.dev/blocks), for example `@moduix-vue/login-simple`.

## Compatibility

The package is ESM-only and ships JavaScript targeting ES2023. Use an application bundler that
supports package CSS imports. See the [framework guides](https://moduix.dev/docs/quick-start#choose-your-framework)
for entry files, aliases, and SSR integration.

## Links

- [Documentation](https://moduix.dev/)
- [npm package](https://www.npmjs.com/package/@moduix/vue)
- [Source repository](https://github.com/Blinks44/moduix)
- [Issues](https://github.com/Blinks44/moduix/issues)

## License

[MIT](./LICENSE.md)