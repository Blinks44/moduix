# Button

Thin styled wrapper over `@base-ui/react/button`.

## Overview

`Button` keeps the Base UI primitive intact and only adds library styling plus two visual props:
`variant` and `size`.

Everything else comes directly from Base UI `Button` props, including `render`,
`nativeButton`, `disabled`, and `focusableWhenDisabled`.

## Usage

```tsx
import { Button } from 'moduix';

export function Example() {
  return <Button>Save changes</Button>;
}
```

## Composition

- Use `variant` for visual intent.
- Use `size` for density and icon-only controls.
- Use `render` when the button should render another element, such as an anchor or router link.
- Use `className` and `--button-*` CSS properties for styling overrides.

For navigation-first actions, render an anchor instead of keeping button semantics:

```tsx
import { Button } from 'moduix';

export function LinkButton() {
  return (
    <Button render={<a href="#button" />} nativeButton={false} variant="outline">
      Open docs
    </Button>
  );
}
```

## Pending State

`Button` does not include a custom loading API. Compose pending UI with existing props and
children:

```tsx
import { Button, Spinner } from 'moduix';

export function PendingButton({ pending }: { pending: boolean }) {
  return (
    <Button disabled={pending} focusableWhenDisabled aria-busy={pending || undefined}>
      {pending ? (
        <>
          <Spinner decorative size="sm" />
          Saving
        </>
      ) : (
        'Save changes'
      )}
    </Button>
  );
}
```

## Styling Hooks

- `data-slot="button-root"`
- `data-variant`
- `data-size`
- Base UI state attributes such as `data-disabled`

Use `className` for local overrides and `--button-*` CSS properties from `theme.css` for
theme-level changes.

## Base UI reference

- https://base-ui.com/react/components/button
