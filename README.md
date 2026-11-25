![moduix banner](website/docs/public/banner.jpg)

[![npm](https://img.shields.io/npm/v/@moduix/react?logo=npm&label=npm)](https://www.npmjs.com/package/@moduix/react)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE.md)
[![npm downloads](https://img.shields.io/npm/dm/@moduix/react?label=downloads)](https://www.npmjs.com/package/@moduix/react)
[![CI](https://github.com/Blinks44/moduix/actions/workflows/verify.yml/badge.svg)](https://github.com/Blinks44/moduix/actions/workflows/verify.yml)

# moduix

**Accessible UI components for React, Solid, Vue, and Svelte.** 80+ components and ready-made blocks built
on [Ark UI](https://ark-ui.com/), with the same API in every framework. Style them with CSS Modules
or Tailwind CSS v4, and install from npm or copy the source into your app with the shadcn CLI.

[Documentation](https://moduix.dev/) ·
[Quick start](https://moduix.dev/docs/quick-start) ·
[Components](https://moduix.dev/docs/components) ·
[Blocks](https://moduix.dev/blocks) ·
[Packages](#current-packages)

[![Projects dashboard built with moduix for Solid: a dialog form adds a row, the counters update, and a toast confirms it](.github/assets/projects-dashboard.gif)](https://moduix.dev/blocks/projects-dashboard)

## Current packages

| Runtime | CSS Modules                                                      | Tailwind                                                                           |
| ------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| React   | [`@moduix/react`](https://www.npmjs.com/package/@moduix/react)   | [`@moduix/react-tailwind`](https://www.npmjs.com/package/@moduix/react-tailwind)   |
| Solid   | [`@moduix/solid`](https://www.npmjs.com/package/@moduix/solid)   | [`@moduix/solid-tailwind`](https://www.npmjs.com/package/@moduix/solid-tailwind)   |
| Vue     | [`@moduix/vue`](https://www.npmjs.com/package/@moduix/vue)       | [`@moduix/vue-tailwind`](https://www.npmjs.com/package/@moduix/vue-tailwind)       |
| Svelte  | [`@moduix/svelte`](https://www.npmjs.com/package/@moduix/svelte) | [`@moduix/svelte-tailwind`](https://www.npmjs.com/package/@moduix/svelte-tailwind) |

## Why moduix

- **Ark-backed behavior.** Dialogs, menus, inputs, and other complex interactions keep Ark UI's
  keyboard support, state management, form behavior, and accessibility semantics.
- **The same component names across frameworks.** React, Solid, Vue, and Svelte use flat exports such as
  `Dialog`, `DialogTrigger`, and `DialogContent`, with framework-native props and events.
- **Two styling paths.** Choose CSS Modules for ordinary, locally scoped component styles, or
  Tailwind CSS v4 for utility-first composition and overrides. Neither path adds a styling runtime.
- **Two install methods.** Keep dependencies package-managed or copy component source into your
  application through the shadcn registry.

## Get started

The example below uses React with CSS Modules. [Quick start](https://moduix.dev/docs/quick-start)
covers every shipped framework, both styling tracks, and package or registry installation.

### Start a new app

Use a standalone Vite starter with TypeScript and either CSS Modules or Tailwind CSS v4:

| Framework | CSS Modules                                                                                                                      | Tailwind CSS v4                                                                                                                                             |
| --------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React     | [react-vite](starters/react-vite) · [StackBlitz](https://stackblitz.com/github/Blinks44/moduix/tree/main/starters/react-vite)    | [react-vite-tailwind](starters/react-vite-tailwind) · [StackBlitz](https://stackblitz.com/github/Blinks44/moduix/tree/main/starters/react-vite-tailwind)    |
| Solid     | [solid-vite](starters/solid-vite) · [StackBlitz](https://stackblitz.com/github/Blinks44/moduix/tree/main/starters/solid-vite)    | [solid-vite-tailwind](starters/solid-vite-tailwind) · [StackBlitz](https://stackblitz.com/github/Blinks44/moduix/tree/main/starters/solid-vite-tailwind)    |
| Vue       | [vue-vite](starters/vue-vite) · [StackBlitz](https://stackblitz.com/github/Blinks44/moduix/tree/main/starters/vue-vite)          | [vue-vite-tailwind](starters/vue-vite-tailwind) · [StackBlitz](https://stackblitz.com/github/Blinks44/moduix/tree/main/starters/vue-vite-tailwind)          |
| Svelte    | [svelte-vite](starters/svelte-vite) · [StackBlitz](https://stackblitz.com/github/Blinks44/moduix/tree/main/starters/svelte-vite) | [svelte-vite-tailwind](starters/svelte-vite-tailwind) · [StackBlitz](https://stackblitz.com/github/Blinks44/moduix/tree/main/starters/svelte-vite-tailwind) |

```bash
pnpm dlx giget@latest gh:Blinks44/moduix/starters/react-vite my-app
cd my-app
pnpm install
pnpm dev
```

Replace `react-vite` with `solid-vite`, `vue-vite`, or `svelte-vite`, or append `-tailwind` for a
Tailwind CSS v4 starter (for example `react-vite-tailwind`).

### Use the published package

Install moduix and its Ark UI peer dependency:

```bash
pnpm add @moduix/react @ark-ui/react
```

Import the reset and foundation once in your application entry point. If your application already
provides an equivalent reset, omit `reset.css`:

```tsx
import '@moduix/react/reset.css';
import '@moduix/react/style.css';
```

Import a component from its subpath:

```tsx
import { Button } from '@moduix/react/button';

export function Example() {
  return <Button>Continue</Button>;
}
```

There is no package-root export. Optional integrations (`Chart` with `@tanstack/charts` and `Image`
with `@unpic/core`, `unpic`, plus `@unpic/react` on React) install their peer dependencies only when
you use them. The [package README](packages/react/README.md) shows how to compose a component from
named parts.

### Own the source with the registry

Use the registry when a component should live in your repository and evolve with your product.
Initialize your framework and styling track in one step (writes `components.json`, installs base
dependencies, and copies foundation styles):

```bash
pnpm dlx shadcn@latest init https://moduix.dev/r/react/init.json
```

Replace `react` with `solid`, `vue`, `svelte`, or the matching `-tailwind` track (for example
`react-tailwind`). Then add only the components you need:

```bash
pnpm dlx shadcn@latest add @moduix-react/button @moduix-react/dialog
```

The generated source includes the component, its CSS Module (or Tailwind utility classes), and any
required supporting files. The registry preserves the same component contracts and design tokens as
the published package, and your `components.json` aliases determine the destination paths.

The registry also installs [blocks](https://moduix.dev/blocks), including sign-in forms, a sidebar
dashboard, settings, pricing, AI chat, and a data table. CSS Modules blocks include their source, a
layout CSS Module, and required UI components; Tailwind blocks ship pure Tailwind utility markup
with zero `.module.css` files. After the same registry setup, install a block with one command:

```bash
pnpm dlx shadcn@latest add @moduix-react/login-simple
```

Choose the matching framework and styling namespace, such as `@moduix-vue-tailwind/login-simple`.

## Styling and theming

Pass `className` (React) or `class` (Solid, Vue, and Svelte) to a root or named part. CSS Modules packages
support ordinary CSS and component variables; Tailwind packages merge utility overrides with
`tailwind-merge`. Both tracks share the same design tokens and optional presets: `dense`, `soft`,
and `contrast`.

See [Styling](https://moduix.dev/docs/styling), [Themes](https://moduix.dev/docs/themes), and
[Tokens](https://moduix.dev/docs/tokens) for customization.

## AI and coding agents

moduix ships an Agent Skill in [`skills/moduix`](skills/moduix/SKILL.md) that helps coding agents
detect the project's framework, styling track, and install method before editing components:

```bash
pnpm dlx skills add https://github.com/Blinks44/moduix --skill moduix
```

Machine-readable documentation is available at [`llms.txt`](https://moduix.dev/llms.txt),
[`llms-full.txt`](https://moduix.dev/llms-full.txt), and per-framework bundles
([`llms-react.txt`](https://moduix.dev/llms-react.txt),
[`llms-solid.txt`](https://moduix.dev/llms-solid.txt),
[`llms-vue.txt`](https://moduix.dev/llms-vue.txt),
[`llms-svelte.txt`](https://moduix.dev/llms-svelte.txt)). See
[AI tools](https://moduix.dev/docs/ai) for details.

## Versioning

moduix follows semantic versioning. The 3.x API is stable: breaking changes ship only in major
versions, each with a migration guide, and deprecated APIs stay available until the next major. See
[Versioning and stability](https://moduix.dev/docs/updating#versioning-and-stability).

Comparing options? See
[moduix vs shadcn/ui, Mantine, Park UI, and Chakra UI](https://moduix.dev/docs/comparison).

## Contributing

Contributions are welcome, especially focused component improvements, accessibility fixes, bug
reports, and documentation corrections. Keep public component behavior, local component notes,
documentation, and registry output synchronized when a public contract changes.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the repository layout, local setup, and checks, and [AGENTS.md](./AGENTS.md) for
repository conventions. Security issues go through [SECURITY.md](./SECURITY.md).

## Acknowledgements

moduix is possible because of the work and ideas of these projects:

- [Ark UI](https://ark-ui.com/) for interaction primitives.
- [Chakra UI](https://chakra-ui.com/) for component composition and styling patterns.
- [shadcn/ui](https://ui.shadcn.com/) for source distribution through registries.
- [Lucide](https://lucide.dev/) for the open-source icon set used throughout the component library.
- [UnoCSS](https://unocss.dev/) and [Tailwind CSS](https://tailwindcss.com/) for the foundations
  adapted by the optional reset.
- [Rstack](https://rstack.rs/) for its Rust-based ecosystem: Rspress for documentation, Rslib for
  library builds, and Rstest for tests.
- [VoidZero](https://voidzero.dev/) for the JavaScript tooling used throughout the workspace.

## Also by Sergey V.

- [**Hearth**](https://hearth.moduix.dev): Local dev environment dashboard for runtimes, projects, Docker, Kubernetes, databases, and AI agents.
- [**Monny**](https://monny.moduix.dev): Native macOS system monitor for CPU, memory, disk, network, Apple silicon sensors, and AI usage quotas.
- [**Rebind**](https://rebind.moduix.dev): Native macOS utility for remapping keys, mouse buttons, Logitech mice, and trackpad gestures.

## License

[MIT](./LICENSE.md)

Third-party licenses and attribution are listed in
[THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).