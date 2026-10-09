# ToggleGroup (Solid)

`ToggleGroup` is the moduix Solid wrapper around Ark UI ToggleGroup. It preserves grouped
two-state selection, roving focus, keyboard navigation, `ToggleGroupRootProvider` composition,
context access, and the React wrapper's visual variants and sizes.

## Composition

```tsx
import { ToggleGroup, ToggleGroupItem } from '@moduix/solid/toggle-group';

export function ToggleGroupDemo() {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  );
}
```

The public values are `ToggleGroup`, `ToggleGroupItem`, `ToggleGroupRootProvider`, and
`ToggleGroupContext`. The barrel also exports `useToggleGroup`, `useToggleGroupContext`,
`ToggleGroupRootProps`, `ToggleGroupRootProviderProps`, `ToggleGroupItemProps`, `ToggleVariant`,
and `ToggleSize`.

## Ark Solid behavior

Solid Ark components use a render-function `asChild` prop:

```tsx
<ToggleGroup
  asChild={(props) => <section {...props()} />}
  defaultValue={['left']}
  aria-label="Text alignment"
>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
</ToggleGroup>
```

The installed Ark Solid primitive does not forward refs through an `asChild` render function.
Ordinary refs and custom-host composition are therefore supported as separate native paths.

## API and styling

The root and root provider support Ark's `value`, `defaultValue`, `multiple`, `deselectable`,
`orientation`, `loopFocus`, `rovingFocus`, `disabled`, `id`, `ids`, and `onValueChange(details)`
props. `variant` (`default`, `outline`, `ghost`) and `size` (`xs`, `sm`, `md`, `lg`, `icon-sm`,
`icon-md`, `icon-lg`) are moduix visual props. Items inherit the root visual props unless they
provide their own values.

The root emits `data-slot="toggle-group-root"` and the root provider emits
`data-slot="toggle-group-root-provider"`. Both emit `data-variant` and `data-size`. Items emit
`data-slot="toggle-group-item"`, `data-variant`, and `data-size`. Ark state attributes such as
`data-scope="toggle-group"`, `data-part`, `data-orientation`, `data-disabled`, `data-focus`, and
item `data-state="on" | "off"` remain available.