# moduix

Composable React UI components for product teams.

[![npm](https://img.shields.io/npm/v/moduix?logo=npm&label=npm)](https://www.npmjs.com/package/moduix)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Turborepo](https://img.shields.io/badge/Monorepo-Turborepo-EF4444)](https://turbo.build/)

## Library

`moduix` is a React component library built on accessible Base UI primitives and a composition-first API.

- Accessible behavior out of the box.
- Compound components with predictable DX.
- Native CSS + CSS Modules for transparent styling and easy theming.

See docs: https://moduix.blinks44.workers.dev/

## Quick Usage

Install in your app:

```bash
npm install moduix @base-ui/react
```

Import styles once and use components:

```tsx
import 'moduix/style.css';
import { Button, Dialog, DialogContent, DialogTitle, DialogTrigger } from 'moduix';

export function Example() {
  return (
	<Dialog>
	  <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
	  <DialogContent>
		<DialogTitle>Project settings</DialogTitle>
	  </DialogContent>
	</Dialog>
  );
}
```

## Repository Quick Start

From the monorepo root:

```bash
npm install
npm run build:ui
npm run dev
```

## Documentation

- Public docs (temporary): https://moduix.blinks44.workers.dev/
- Library README: `packages/ui/README.md`
- Docs app README: `apps/docs/README.md`

## Acknowledgements

- [Base UI](https://base-ui.com/) for the accessible primitives behind the components.
- [shadcn/ui](https://ui.shadcn.com/) for composition API inspiration and practical DX patterns.
- [Fumadocs](https://fumadocs.dev/) for the documentation foundation.
- [TanStack](https://tanstack.com/) for tooling used in the docs app.

## Validation

Run from the monorepo root after changes:

```bash
npm run fmt:fix
npm run lint:check
npm run tsc:check
```
