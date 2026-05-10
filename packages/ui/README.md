# moduix

Ready-made React components for product interfaces. The library is built on top of Base UI primitives and follows a composition-first API strongly inspired by shadcn/ui: you assemble small named parts, keep behavior accessible, and customize styles through props, `className`, and CSS variables. Styles are written in native CSS with CSS Modules, so the package ships framework-agnostic component CSS without requiring a utility CSS runtime.

## Website

The live documentation is temporarily available at https://moduix.blinks44.workers.dev/.

## Install

```bash
npm install moduix @base-ui/react
```

`react`, `react-dom`, and `@base-ui/react` are peer dependencies. They stay in your application bundle, so the library does not ship duplicate React or Base UI runtimes.

## Usage

Import the library styles once in your application entry point:

```tsx
import 'moduix/style.css';
```

Then import the components you need:

```tsx
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

The CSS file includes component styles and design tokens. It does not include global reset or application-level base styles, so those stay under the consuming project's control. If your bundler supports CSS imports from JavaScript, styles are also referenced by the library entry, but explicit `moduix/style.css` import is the most predictable setup for apps, SSR, and tests.

## Styling

Components expose stable `data-slot` attributes and accept `className` where customization is expected. Theme values are regular CSS custom properties:

```css
:root {
  --color-primary: oklch(0.205 0 0);
  --button-radius: 0.5rem;
}
```

The distributed stylesheet uses CSS cascade layers:

```css
@layer ui.reset, ui.tokens, ui.components;
```

This keeps library styles predictable while still letting application styles override tokens or component classes.

## What is included

The package exports composed components for common UI needs: Accordion, AlertDialog, Autocomplete, Avatar, Button, Checkbox, Dialog, Drawer, Field, Form, Input, Menu, NavigationMenu, Popover, Select, Tabs, Toast, Tooltip, and more. It also exports small shared primitives such as icons and close buttons.

## Acknowledgements

This project could not exist without the work of these teams and communities:

- [Base UI](https://base-ui.com/) for the accessible React primitives that power the components.
- [shadcn/ui](https://ui.shadcn.com/) for the API inspiration and the culture of practical,
  readable component composition.
- [Tailwind CSS](https://tailwindcss.com/) for the reset.css implementation.
- [Fumadocs](https://fumadocs.dev/) for the documentation foundation.
- [TanStack](https://tanstack.com/) for the application tooling used by the docs.
- [Voidzero](https://voidzero.dev/) for awesome JS tools

## Publishing Checklist

Before publishing a new version:

```bash
npm run fmt
npm run lint
npm run tsc:check
npm run build -w packages/ui
npm pack --dry-run -w packages/ui
```

Check that the tarball contains `dist/index.js`, `dist/index.cjs`, `dist/index.d.ts`, `dist/index.css`, `package.json`, and this README.