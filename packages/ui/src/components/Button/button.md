# Button

Thin styled wrapper over `@base-ui/react/button`.

## What moduix adds

- visual `variant`
- visual `size`
- default button styles and tokens
- `data-slot="button-root"`, `data-variant`, and `data-size` styling hooks

Everything else comes directly from Base UI `Button` props, including `render`,
`nativeButton`, `disabled`, and `focusableWhenDisabled`.

## Usage

```tsx
import { Button } from 'moduix';

export function Example() {
  return <Button>Save changes</Button>;
}
```

## Pending actions

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

## Styling

- Use `className` for root-level overrides.
- Override `--button-*` CSS properties from `theme.css` for theme-level changes.
- Style nested icons or other children through normal composition.

## Base UI reference

- https://base-ui.com/react/components/button