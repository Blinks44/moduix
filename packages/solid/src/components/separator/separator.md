# Separator (Solid)

`Separator` is a semantic divider for visually separating related content groups with a horizontal
or vertical rule. It preserves the React component's single root, styling hooks, and defaults.

## Public contract

- `Separator` is the only public root component.
- The root accepts Ark Solid factory span props plus `orientation`, `variant`, and `size`.
- Defaults are `orientation="horizontal"`, `variant="solid"`, and `size="sm"`.
- The root emits `data-scope="separator"`, `data-part="root"`, `data-slot="separator-root"`,
  `data-orientation`, `data-size`, and `data-variant`.
- The default semantic role is `separator`; `aria-orientation` follows the resolved orientation.
- A non-separator role, such as `presentation`, omits `aria-orientation`.

## Ark Solid composition and refs

Ark Solid uses a render-function `asChild` prop:

```tsx
<Separator asChild={(props) => <hr {...props()} />} orientation="horizontal" />
```

Ordinary roots forward Solid refs to the rendered element. The Ark Solid factory does not forward a
ref through an `asChild` render function, so those native paths remain separate.

## Styling

The CSS module is intentionally identical to the React component. Use `class`, `style`, or the
documented CSS variables to customize the root without overriding its owned data hooks.

## Differences from React

- Solid uses `class` instead of `className`.
- Solid uses `asChild={(props) => ...}` instead of a child element passed to `asChild`.
- Solid refs use the native callback ref contract.