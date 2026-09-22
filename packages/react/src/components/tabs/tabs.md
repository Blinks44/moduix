# Tabs

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/tabs
- Chakra UI: https://chakra-ui.com/docs/components/tabs

## Purpose

Tabs switches between mutually exclusive content panels within one page region.

## Upstream model to preserve

The wrapper follows Ark UI React `@ark-ui/react/tabs`. Preserve the Ark part model:
`Root`, `RootProvider`, `List`, `Trigger`, `Indicator`, and `Content`.

State and callbacks must remain Ark-shaped. `onValueChange(details)` exposes the selected value as
`details.value`; do not remap it to a string callback. `activationMode`, `orientation`, `loopFocus`,
`deselectable`, `lazyMount`, `unmountOnExit`, `ids`, and `navigate` pass through to Ark.

## Current behavior contract

- `Tabs` is the root component.
- `TabsRootProvider` connects parts to state created with moduix `useTabs()`.
- `TabsRootProvider` reads orientation from the Ark `data-orientation` root DOM hook exposed by the
  `useTabs()` state to resolve the vertical `line` → `default` fallback. This is an Ark DOM-contract
  dependency; if upstream ever drops the attribute, the fallback degrades and the regression tests
  catch it.
- `TabsList`, `TabsTrigger`, `TabsIndicator`, and `TabsContent` are thin styled Ark wrappers.
- `variant?: 'default' | 'line'` is the only moduix visual sugar on `Tabs` and
  `TabsRootProvider`; `line` applies to horizontal tabs only. Vertical tabs use the default filled
  indicator.
- `TabsList` does not auto-render `TabsIndicator`. Consumers render the indicator explicitly.

## Anatomy and exported parts

```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview" />
    <TabsIndicator />
  </TabsList>
  <TabsContent value="overview" />
</Tabs>

<TabsRootProvider value={tabs}>
  {/* same parts connected to useTabs() state */}
</TabsRootProvider>
```

| Export              | `data-slot`          | Notes                                              |
| ------------------- | -------------------- | -------------------------------------------------- |
| `Tabs`              | `tabs-root`          | Root div, selected value, focus and orientation.   |
| `TabsRootProvider` | `tabs-root-provider` | Root provider div for `useTabs()` state.           |
| `TabsContext`      | -                    | Advanced render-prop access to the current state.  |
| `TabsList`         | `tabs-list`          | Trigger list.                                      |
| `TabsTrigger`      | `tabs-trigger`       | Button by default; supports Ark `asChild`.         |
| `TabsIndicator`    | `tabs-indicator`     | Optional active-trigger indicator.                 |
| `TabsContent`      | `tabs-content`       | Content region for a matching trigger value.       |
| `useTabs`           | -                    | Ark-compatible state hook for `TabsRootProvider`. |
| `useTabsContext`    | -                    | Reads the current state from a Tabs tree.          |

## Composition

```tsx
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@moduix/react/tabs';

export function Example() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsIndicator />
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
      <TabsContent value="password">Password settings</TabsContent>
    </Tabs>
  );
}
```

Use `asChild` on `TabsTrigger` for links or router components:

```tsx
<TabsTrigger value="account" asChild>
  <a href="#account">Account</a>
</TabsTrigger>
```

## Upstream feature coverage

- Basic tabs use `Root`, `List`, `Trigger`, explicit `Indicator`, and `Content`.
- Controlled state uses `value` and `onValueChange(details)`.
- Disabled tabs use `disabled` on `TabsTrigger`.
- Indicator support uses explicit `TabsIndicator`.
- Lazy mounting uses `lazyMount` and `unmountOnExit` on root or root provider.
- Links use `asChild` on `TabsTrigger`.
- Manual activation uses `activationMode="manual"`.
- Vertical tabs use `orientation="vertical"`.
- External state uses moduix `useTabs()` plus `TabsRootProvider`.
- `TabsContext` and `useTabsContext()` expose Ark-shaped current state for advanced markup.

## Accessibility and state

Ark owns ARIA attributes, tab/tabpanel relationships, keyboard navigation, roving focus, disabled
behavior, and selected content visibility. Horizontal tabs use left/right arrow navigation; vertical
tabs use up/down arrow navigation. `loopFocus` defaults to `true` upstream.

Ark state and styling attributes exposed on parts include `data-scope="tabs"`, `data-part`,
`data-orientation`, `data-selected`, `data-disabled`, `data-focus`, and SSR state on triggers.

Indicator positioning comes from Ark CSS variables on `TabsIndicator`: `--left`, `--top`,
`--width`, `--height`, and `--transition-property`.

`TabsContext` receives the current state through a render prop. `useTabsContext()` reads the same
state from descendants of `Tabs` or `TabsRootProvider`.

## Defaults and styling

Every visual part accepts `className` and receives a stable `data-slot`. moduix styling preserves
the existing compact visual identity through `--moduix-tabs-*` variables, design tokens, border radii, and
motion tokens.

`variant="default"` renders a SegmentGroup-like filled indicator surface with `radius-md`
and `shadow-sm` when `TabsIndicator` is present. Its movement uses Ark's
`--transition-duration` and `--transition-timing-function` contract, exposed through separate
moduix variables for the filled and line variants.
`variant="line"` switches the same Ark indicator part to an edge line treatment for horizontal tabs.
Vertical tabs keep the filled treatment even when `line` is passed.

The root defaults to a column layout and switches to row layout for `orientation="vertical"`.
`TabsContent` is bordered, rounded, and padded by default.

## Intentional sugar and differences from upstream

- `variant` is moduix visual sugar; Ark has no `variant` prop for tabs. `line` is intentionally
  limited to horizontal tabs.
- The wrapper adds `data-slot` hooks and default CSS module classes.
- The wrapper does not add a default indicator automatically. This keeps Ark composition explicit.
- The flat API exposes each Tabs part as a family-prefixed value; it does not retain a compound
  namespace or compatibility aliases.

## Agent notes

- Keep wrappers thin and flat. Do not reintroduce namespace assembly or compatibility aliases.
- Preserve Ark callback detail objects and do not add compatibility shims for old legacy signatures.
- Keep custom styling examples on Ark variables `--left`, `--top`, `--width`, and `--height`.
- `TabsRootProvider`, `useTabs`, `TabsContext`, and `useTabsContext` are the moduix-owned path for
  external and state-driven Tabs composition.

## Local changelog

- 2026-09-22: Completed the flat Tabs API migration across the shipped React and Solid adapters,
  tests, stories, registries, and documentation without compatibility aliases.
- 2026-09-20: Moved the owned `data-variant` attribute after consumer props in `Tabs` and
  `TabsRootProvider` so consumers cannot override the vertical `line` → `default` fallback, and
  documented the `TabsRootProvider` orientation lookup as an Ark DOM-contract dependency.
- 2026-09-01: Replaced ineffective indicator transition shorthands with per-variant duration and
  timing-function variables that Ark applies at runtime.
- 2026-08-13: Kept `TabsRootProvider`'s public `data-variant` aligned with `Tabs` for vertical
  state stores, and added regression coverage for that fallback and manual activation.
- 2026-07-31: Stabilized the root width, constrained the vertical list on narrow viewports, limited
  the line treatment to horizontal tabs, and documented the public context surfaces.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-03: Removed duplicate Ark type aliases while retaining moduix state hooks and context
  readers for the documented provider workflow.
- 2026-07-11: Restored `useTabs` as a moduix package export for the documented
  `TabsRootProvider` external-state path. Indicator CSS now applies Ark positioning variables.
- 2026-06-27: Included moduix `variant` in the public root prop types and simplified custom styling
  examples to use Ark indicator positioning without duplicate trigger styles.
- 2026-06-21: Migrated Tabs to Ark UI React. Added the Ark-shaped provider, context, state hook,
  and callbacks while removing legacy compatibility props.
- 2026-06-22: Aligned the default indicator styling with `SegmentGroup`: `radius-md`,
  `shadow-sm`, and explicit transition variables. Kept `variant="line"` as an underline treatment.
