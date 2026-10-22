# Tabs

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/tabs
- Chakra UI: https://chakra-ui.com/docs/components/tabs

## Purpose

Tabs switches between mutually exclusive content panels within one page region.

## Upstream model to preserve

The wrapper follows Ark UI React `@ark-ui/react/tabs`. Preserve the Ark part model: `Root`,
`RootProvider`, `List`, `Trigger`, `Indicator`, and `Content`.

State and callbacks stay Ark-shaped: `onValueChange(details)` exposes `details.value`.
`activationMode`, `orientation`, `loopFocus`, `deselectable`, `lazyMount`, `unmountOnExit`, `ids`,
and `navigate` pass through to Ark with Ark defaults.

## Anatomy and exported parts

```tsx
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsIndicator />
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="password">Password settings</TabsContent>
</Tabs>
```

| Export             | `data-slot`          | Notes                                                 |
| ------------------ | -------------------- | ----------------------------------------------------- |
| `Tabs`             | `tabs-root`          | Root; mirrors `variant`, `size`, and `fitted`.        |
| `TabsRootProvider` | `tabs-root-provider` | Root for state created with `useTabs()`.              |
| `TabsContext`      | -                    | Render-prop access to the current state.              |
| `TabsList`         | `tabs-list`          | Trigger list and positioning box for the indicator.   |
| `TabsTrigger`      | `tabs-trigger`       | Button by default; supports Ark `asChild` for links.  |
| `TabsIndicator`    | `tabs-indicator`     | Optional selected-trigger indicator, rendered by you. |
| `TabsContent`      | `tabs-content`       | Bordered, padded panel for the matching value.        |
| `useTabs`          | -                    | Ark state hook for `TabsRootProvider`.                |
| `useTabsContext`   | -                    | Reads the current state inside a Tabs tree.           |

Types: `TabsRootProps`, `TabsRootProviderProps`, `TabsSize`, `TabsVariant`, and the Ark types
`TabsValueChangeDetails`, `TabsFocusChangeDetails`, `UseTabsProps`, `UseTabsReturn`, and the part
props.

## Current behavior contract

- `size?: 'sm' | 'md' | 'lg'` (default `md`) on `Tabs` and `TabsRootProvider` is mirrored as
  `data-size`; the default list is as tall as a control of that size (32/36/40px). Private
  `--_tabs-*` properties on the root carry the per-size values, so nested tabs keep their own size.
- `fitted?: boolean` is mirrored as `data-fitted`; it stretches a horizontal list to the root width
  and gives each trigger `flex: 1`. Vertical tabs ignore it.
- `variant?: 'default' | 'line'` on `Tabs` and `TabsRootProvider`.
  `default` fills the selected trigger with the indicator surface; `line` draws a 2px line on the
  list edge: below the list for horizontal tabs, on the inline-end edge for vertical tabs (RTL
  follows Ark's `dir` on the indicator).
- `TabsList` does not render an indicator. Without `TabsIndicator`, the selected trigger differs only
  by text color.
- The indicator is placed only from Ark's `--left`, `--top`, `--width`, and `--height` (the selected
  trigger's offset box), so trigger size overrides keep it aligned. It sits behind the triggers with
  `z-index: -1` inside the isolated list. Ark sets `position`, the transition property, and the
  duration inline; moduix sets `--transition-duration` and `--transition-timing-function` from
  foundation motion tokens.
- The horizontal list scrolls with `overflow-x: auto`. The vertical list is `min(12rem, 40%)` wide.
- Trigger and panel focus rings are inset outlines, so the scrolling list does not clip them.

## Styling

CSS Modules expose 7 variables: `--moduix-tabs-list-bg`, `--moduix-tabs-list-border-color`,
`--moduix-tabs-indicator-bg`, `--moduix-tabs-tab-color`, `--moduix-tabs-tab-color-active` (also the
hover and line-indicator color), `--moduix-tabs-bg`, and `--moduix-tabs-border-color` (panel). Other
values come from foundation tokens; override them with a class on the part.

## Agent notes

- Keep wrappers thin and flat; no namespace assembly or compatibility aliases.
- Do not add a JS orientation lookup for variants; variant and orientation combine in CSS through
  `data-variant` on the root and `data-orientation` on each part.
- Do not auto-render `TabsIndicator`.- Variant styles use descendant selectors (`.root[data-variant='line'] .list`,
  `group-data-[variant=line]/tabs:`), so `default` tabs nested inside a `line` panel pick up line
  styles. This is a known limitation: a child combinator would break wrappers around `TabsList`, and
  nearest-root scoping needs reset custom properties in every part. Override the nested parts with a
  class if this case comes up.