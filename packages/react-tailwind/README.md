# @moduix/react-tailwind

Tailwind CSS v4 implementation of moduix React components. The current release contains Accordion,
Alert, Angle Slider, and Avatar while preserving their public Ark-shaped APIs from `@moduix/react`.

## Install

In an existing React project configured with Tailwind CSS v4, install the package and its Ark UI
peer dependency:

```sh
pnpm add @moduix/react-tailwind @ark-ui/react
```

`react`, `react-dom`, `tailwindcss`, and `@ark-ui/react` remain peer dependencies.

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
import { Accordion } from '@moduix/react-tailwind/accordion';

export function Example() {
  return (
    <Accordion defaultValue={['first']}>
      <Accordion.Item value="first">
        <Accordion.ItemTrigger>
          First item
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>First content</Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion>
  );
}
```

Consumer `className` values are merged after defaults with `tailwind-merge`, so utilities such as `p-0` override the component's default padding.

## shadcn registry

Configure the namespace and add the component with the standard CLI:

```json
{
  "registries": {
    "@moduix-react-tailwind": "https://moduix.dev/r/react-tailwind/{name}.json"
  }
}
```

```sh
pnpm dlx shadcn@latest add @moduix-react-tailwind/accordion
```

The registry installs the same foundation stylesheet locally as `@/lib/moduix/styles/style.css`. Import it once before Tailwind in your application stylesheet:

```css
@import './lib/moduix/styles/style.css';
@import 'tailwindcss';
```

No `@source` directive is required for the registry installation because the component source is copied into the application.