# Tabs

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/tabs
- Chakra UI: https://chakra-ui.com/docs/components/tabs

## Purpose

Tabs switches between mutually exclusive content panels within one page region.

## Upstream model to preserve

The wrapper follows Ark UI React `@ark-ui/react/tabs`. Preserve the Ark part model:
`Root`, `RootProvider`, `List`, `Trigger`, `Indicator`, `Content`, and `Context`.

State and callbacks must remain Ark-shaped. `onValueChange(details)` exposes the selected value as
`details.value`; do not remap it to a string callback. `activationMode`, `orientation`, `loopFocus`,
`deselectable`, `lazyMount`, `unmountOnExit`, `ids`, and `navigate` pass through to Ark.

## Current behavior contract

- `Tabs` is the short root form and equals `Tabs.Root`.
- `Tabs.RootProvider` connects parts to state created with `useTabs()`.
- `Tabs.List`, `Tabs.Trigger`, `Tabs.Indicator`, and `Tabs.Content` are thin styled Ark wrappers.
- `Tabs.Context`, `useTabs()`, and `useTabsContext()` are exported from the public barrel.
- `variant?: 'default' | 'line'` is the only moduix visual sugar on `Tabs.Root` and
  `Tabs.RootProvider`.
- `Tabs.List` does not auto-render `Tabs.Indicator`. Consumers render the indicator explicitly.
- Legacy flat exports (`TabsList`, `TabsTab`, `TabsPanel`, `TabsIndicator`) and legacy props such as
  `render`, `nativeButton`, `activateOnFocus`, `keepMounted`, and `renderBeforeHydration` are not
  part of the contract.

## Anatomy and exported parts

```tsx
<Tabs defaultValue="overview">
  <Tabs.Context>{(tabs) => null}</Tabs.Context>
  <Tabs.List>
    <Tabs.Trigger value="overview" />
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value="overview" />
</Tabs>

<Tabs.RootProvider value={tabs}>
  {/* same parts connected to useTabs() state */}
</Tabs.RootProvider>
```

| Export                      | `data-slot`          | Notes                                            |
| --------------------------- | -------------------- | ------------------------------------------------ |
| `Tabs` / `Tabs.Root`        | `tabs-root`          | Root div, selected value, focus and orientation. |
| `Tabs.RootProvider`         | `tabs-root-provider` | Root provider div for `useTabs()` state.         |
| `Tabs.List`                 | `tabs-list`          | Trigger list.                                    |
| `Tabs.Trigger`              | `tabs-trigger`       | Button by default; supports Ark `asChild`.       |
| `Tabs.Indicator`            | `tabs-indicator`     | Optional active-trigger indicator.               |
| `Tabs.Content`              | `tabs-content`       | Content region for a matching trigger value.     |
| `Tabs.Context`              | -                    | Ark render-prop state reader.                    |
| `useTabs`, `useTabsContext` | -                    | Ark hooks re-exported from the package barrel.   |

## Composition

```tsx
import { Tabs } from '@moduix/react';

export function Example() {
  return (
    <Tabs defaultValue="account">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="account">Account settings</Tabs.Content>
      <Tabs.Content value="password">Password settings</Tabs.Content>
    </Tabs>
  );
}
```

Use `asChild` on `Tabs.Trigger` for links or router components:

```tsx
<Tabs.Trigger value="account" asChild>
  <a href="#account">Account</a>
</Tabs.Trigger>
```

## Upstream feature coverage

- Basic tabs use `Root`, `List`, `Trigger`, explicit `Indicator`, and `Content`.
- Controlled state uses `value` and `onValueChange(details)`.
- Disabled tabs use `disabled` on `Tabs.Trigger`.
- Indicator support uses explicit `Tabs.Indicator`.
- Lazy mounting uses `lazyMount` and `unmountOnExit` on root or root provider.
- Links use `asChild` on `Tabs.Trigger`.
- Manual activation uses `activationMode="manual"`.
- Vertical tabs use `orientation="vertical"`.
- External state uses `useTabs()` plus `Tabs.RootProvider`.
- Inline state reads use `Tabs.Context`; reusable children can use `useTabsContext()`.

## Accessibility and state

Ark owns ARIA attributes, tab/tabpanel relationships, keyboard navigation, roving focus, disabled
behavior, and selected content visibility. Horizontal tabs use left/right arrow navigation; vertical
tabs use up/down arrow navigation. `loopFocus` defaults to `true` upstream.

Ark state and styling attributes exposed on parts include `data-scope="tabs"`, `data-part`,
`data-orientation`, `data-selected`, `data-disabled`, `data-focus`, and SSR state on triggers.

Indicator positioning comes from Ark CSS variables on `Tabs.Indicator`: `--left`, `--top`,
`--width`, `--height`, and `--transition-property`.

## Defaults and styling

Every visual part accepts `className` and receives a stable `data-slot`. moduix styling preserves
the existing compact visual identity through `--tabs-*` variables, design tokens, border radii, and
motion tokens.

`variant="default"` renders a SegmentGroup-like filled indicator surface with `radius-md`,
`shadow-sm`, and explicit movement transitions when `Tabs.Indicator` is present.
`variant="line"` switches the same Ark indicator part to an edge line treatment.

The root defaults to a column layout and switches to row layout for `orientation="vertical"`.
`Tabs.Content` is bordered, rounded, and padded by default.

## Intentional sugar and differences from upstream

- `variant` is moduix visual sugar; Ark has no `variant` prop for tabs.
- The wrapper adds `data-slot` hooks and default CSS module classes.
- The wrapper does not add a default indicator automatically. This keeps Ark composition explicit.
- Legacy legacy flat aliases and render contracts were intentionally removed during migration.

## Agent notes

- Keep wrappers thin and namespace-first. Do not re-export flat part aliases unless a future product
  decision explicitly reverses this migration rule.
- Preserve Ark callback detail objects and do not add compatibility shims for old legacy signatures.
- Keep custom styling examples on Ark variables `--left`, `--top`, `--width`, and `--height`; do not
  reintroduce legacy `--active-tab-*` variables.
- If docs import `useTabs` or `useTabsContext`, verify public barrel exports remain in sync.

## Local changelog

- 2026-06-21: Migrated Tabs to Ark UI React. Replaced flat part exports with
  namespace-first `Tabs.*`, added `RootProvider`, `Context`, `useTabs`, and `useTabsContext`,
  switched callbacks/state/styling to Ark contracts, and removed legacy compatibility props.
- 2026-06-22: Aligned the default indicator styling with `SegmentGroup`: `radius-md`,
  `shadow-sm`, and explicit transition variables. Kept `variant="line"` as an underline treatment.