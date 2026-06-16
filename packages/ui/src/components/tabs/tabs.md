# Tabs

Upstream primitive docs: https://base-ui.com/react/components/tabs.md

## Purpose

`Tabs` is the moduix wrapper around Base UI Tabs. It ships with moduix styling, a small
`variant="line"` API, stable `data-slot` hooks, and one convenience behavior: `TabsList` renders the
default active indicator for you.

Use it for switching between closely related views that share one page region, for example settings
sections, dashboards, profile panes, or inline form modes.

## Current behavior contract

- `Tabs` forwards Base UI root props and refs to a `<div>`.
- `Tabs` adds one moduix-only prop: `variant?: 'default' | 'line'`.
- `TabsList` forwards Base UI list props and appends a default `TabsIndicator` when no explicit
  `TabsIndicator` is present in its children tree.
- Adding your own `TabsIndicator` inside `TabsList` suppresses the built-in one for that list.
- `TabsTab` and `TabsPanel` stay close to Base UI. Matching `value` props connect the interactive tab
  to its panel.
- Root orientation is preserved from Base UI. moduix styles support both horizontal and vertical
  layouts.
- `TabsIndicator` is optional in the default path, but remains available when you need direct control
  over indicator styling or `renderBeforeHydration`.

## Composition

```tsx
import { Tabs, TabsList, TabsPanel, TabsTab } from 'moduix';

const items = [
  {
    value: 'overview',
    title: 'Overview',
    content:
      'Review project status, team velocity, workloads and activity highlights in one place.',
  },
  {
    value: 'projects',
    title: 'Projects',
    content: 'Track active workstreams, owners and milestones across all departments.',
  },
  {
    value: 'account',
    title: 'Account',
    content: 'Manage personal settings, team settings, notifications and access preferences.',
  },
];

export function TabsExample() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        {items.map((item) => (
          <TabsTab key={item.value} value={item.value}>
            {item.title}
          </TabsTab>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsPanel key={item.value} value={item.value}>
          {item.content}
        </TabsPanel>
      ))}
    </Tabs>
  );
}
```

Recommended structure:

```text
Tabs
├─ TabsList
│  ├─ TabsTab[value]
│  ├─ TabsTab[value]
│  └─ TabsIndicator (optional explicit override)
└─ TabsPanel[value]
```

Exported parts:

| Part            | Renders  | Notes                                                                                    |
| --------------- | -------- | ---------------------------------------------------------------------------------------- |
| `Tabs`          | `div`    | Root state machine. Owns selected value, orientation, and moduix `variant`.              |
| `TabsList`      | `div`    | Roving-focus list. Auto-renders the default indicator unless you provide one explicitly. |
| `TabsIndicator` | `span`   | Optional escape hatch for custom indicator styling or `renderBeforeHydration`.           |
| `TabsTab`       | `button` | Interactive tab button by default. `value` is required.                                  |
| `TabsPanel`     | `div`    | Content region for the matching tab. `value` is required.                                |

Explicit indicator example:

```tsx
import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from 'moduix';
import styles from './custom-indicator-tabs.module.css';

export function CustomIndicatorTabs() {
  return (
    <Tabs defaultValue="profile" className={styles.root}>
      <TabsList className={styles.list}>
        <TabsTab value="profile" className={styles.tab}>
          Profile
        </TabsTab>
        <TabsTab value="security" className={styles.tab}>
          Security
        </TabsTab>
        <TabsIndicator className={styles.indicator} renderBeforeHydration />
      </TabsList>
      <TabsPanel value="profile" className={styles.panel}>
        Profile settings
      </TabsPanel>
      <TabsPanel value="security" className={styles.panel}>
        Security settings
      </TabsPanel>
    </Tabs>
  );
}
```

## Public props

The wrappers preserve Base UI props instead of exporting local prop aliases. The tables below cover
the props that matter most in regular usage.

### `Tabs`

| Prop            | Default        | Notes                                                                                         |
| --------------- | -------------- | --------------------------------------------------------------------------------------------- |
| `defaultValue`  | `0`            | Uncontrolled active tab value. Pass an enabled tab value explicitly in SSR-sensitive layouts. |
| `value`         | -              | Controlled active tab value. `null` is allowed when nothing should be selected.               |
| `onValueChange` | -              | Called with the next value and Base UI event details.                                         |
| `orientation`   | `'horizontal'` | Changes layout direction and keyboard arrow semantics.                                        |
| `variant`       | `'default'`    | moduix-only visual style. Use `'line'` for an underline-style indicator.                      |
| `className`     | -              | Applied to the root container.                                                                |
| `render`        | -              | Base UI element replacement/composition escape hatch.                                         |

### `TabsList`

| Prop              | Default | Notes                                                                                |
| ----------------- | ------- | ------------------------------------------------------------------------------------ |
| `activateOnFocus` | `false` | Arrow-key focus also activates the focused tab.                                      |
| `loopFocus`       | `true`  | Arrow-key roving focus wraps around the list.                                        |
| `className`       | -       | Applied to the styled list container.                                                |
| `render`          | -       | Base UI element replacement/composition escape hatch.                                |
| `children`        | -       | Usually `TabsTab` items. Optional explicit `TabsIndicator` overrides auto indicator. |

### `TabsTab`

| Prop           | Default  | Notes                                                                             |
| -------------- | -------- | --------------------------------------------------------------------------------- |
| `value`        | required | Must match a `TabsPanel` value.                                                   |
| `disabled`     | `false`  | Removes the tab from interaction and roving focus.                                |
| `className`    | -        | Applied to the styled tab button.                                                 |
| `render`       | -        | Use with `nativeButton={false}` to render links or custom elements.               |
| `nativeButton` | `true`   | Set to `false` when the rendered element should not receive button-only behavior. |

### `TabsPanel`

| Prop          | Default  | Notes                                                                                   |
| ------------- | -------- | --------------------------------------------------------------------------------------- |
| `value`       | required | Must match a `TabsTab` value.                                                           |
| `keepMounted` | `false`  | Keeps inactive panel DOM mounted when local state, measurements, or forms must persist. |
| `className`   | -        | Applied to the styled panel container.                                                  |
| `render`      | -        | Base UI element replacement/composition escape hatch.                                   |

### `TabsIndicator`

| Prop                    | Default | Notes                                                                   |
| ----------------------- | ------- | ----------------------------------------------------------------------- |
| `className`             | -       | Applied to the indicator element.                                       |
| `renderBeforeHydration` | `false` | Use when SSR pages should show the explicit indicator before hydration. |
| `render`                | -       | Base UI element replacement/composition escape hatch.                   |

## Defaults and styling

Every exported visual part accepts `className` and receives a stable `data-slot`:

| Part            | `data-slot`      |
| --------------- | ---------------- |
| `Tabs`          | `tabs-root`      |
| `TabsList`      | `tabs-list`      |
| `TabsIndicator` | `tabs-indicator` |
| `TabsTab`       | `tabs-tab`       |
| `TabsPanel`     | `tabs-panel`     |

moduix also adds `data-variant="default"` or `data-variant="line"` on `Tabs`.

Base UI state attributes used by the shipped styles and available for consumer overrides:

| Attribute                   | Where it appears                  | Meaning                                  |
| --------------------------- | --------------------------------- | ---------------------------------------- |
| `data-orientation`          | root, list, indicator, tab, panel | Current tabs orientation.                |
| `data-activation-direction` | root, list, indicator, tab, panel | Direction of the last active-tab change. |
| `data-active`               | tab                               | Present on the active tab.               |
| `data-disabled`             | tab                               | Present when the tab is disabled.        |
| `data-hidden`               | panel                             | Present when a mounted panel is hidden.  |
| `data-starting-style`       | panel                             | Present while a panel is entering.       |
| `data-ending-style`         | panel                             | Present while a panel is leaving.        |
| `data-index`                | panel                             | Base UI panel index.                     |

Indicator positioning variables come from Base UI and are available on `TabsIndicator`:

| Variable              | Meaning                   |
| --------------------- | ------------------------- |
| `--active-tab-left`   | Active tab left offset.   |
| `--active-tab-right`  | Active tab right offset.  |
| `--active-tab-top`    | Active tab top offset.    |
| `--active-tab-bottom` | Active tab bottom offset. |
| `--active-tab-width`  | Active tab width.         |
| `--active-tab-height` | Active tab height.        |

moduix CSS variables:

| Variable                           | Default                                                 |
| ---------------------------------- | ------------------------------------------------------- |
| `--tabs-bg`                        | `var(--color-background)`                               |
| `--tabs-border-color`              | `var(--color-border)`                                   |
| `--tabs-border-width`              | `var(--border-width-sm)`                                |
| `--tabs-color`                     | `var(--color-foreground)`                               |
| `--tabs-focus-ring-color`          | `var(--color-ring)`                                     |
| `--tabs-focus-ring-offset`         | `0`                                                     |
| `--tabs-focus-ring-width`          | `var(--border-width-sm)`                                |
| `--tabs-gap`                       | `0.75rem`                                               |
| `--tabs-indicator-bg`              | `var(--color-background)`                               |
| `--tabs-indicator-radius`          | `var(--radius-sm)`                                      |
| `--tabs-indicator-size`            | `1.75rem`                                               |
| `--tabs-indicator-transition`      | `translate 200ms ease, width 200ms ease`                |
| `--tabs-line-indicator-bg`         | `var(--tabs-tab-color-active, var(--color-foreground))` |
| `--tabs-line-indicator-radius`     | `var(--radius-full)`                                    |
| `--tabs-line-indicator-size`       | `2px`                                                   |
| `--tabs-line-indicator-transition` | `translate 200ms ease, width 200ms ease`                |
| `--tabs-list-bg`                   | `var(--color-muted)`                                    |
| `--tabs-list-border-color`         | `var(--color-border)`                                   |
| `--tabs-list-border-width`         | `var(--border-width-sm)`                                |
| `--tabs-list-gap`                  | `0.25rem`                                               |
| `--tabs-list-padding`              | `0.25rem`                                               |
| `--tabs-list-padding-x`            | `var(--tabs-list-padding, 0.25rem)`                     |
| `--tabs-list-padding-y`            | `var(--tabs-list-padding, 0.25rem)`                     |
| `--tabs-panel-color`               | `var(--tabs-color, var(--color-foreground))`            |
| `--tabs-panel-font-size`           | `var(--text-sm)`                                        |
| `--tabs-panel-line-height`         | `var(--line-height-text-sm)`                            |
| `--tabs-panel-focus-ring-offset`   | `-1px`                                                  |
| `--tabs-panel-padding`             | `1rem`                                                  |
| `--tabs-radius`                    | `var(--radius-lg)`                                      |
| `--tabs-tab-color`                 | `var(--color-muted-foreground)`                         |
| `--tabs-tab-color-active`          | `var(--color-foreground)`                               |
| `--tabs-tab-color-hover`           | `var(--tabs-tab-color-active, var(--color-foreground))` |
| `--tabs-tab-content-gap`           | `0.5rem`                                                |
| `--tabs-tab-disabled-opacity`      | `var(--opacity-disabled)`                               |
| `--tabs-tab-font-size`             | `var(--text-sm)`                                        |
| `--tabs-tab-font-weight`           | `var(--weight-medium)`                                  |
| `--tabs-tab-height`                | `2rem`                                                  |
| `--tabs-tab-icon-color`            | `currentColor`                                          |
| `--tabs-tab-icon-size`             | `1rem`                                                  |
| `--tabs-tab-line-height`           | `var(--line-height-text-sm)`                            |
| `--tabs-tab-padding-x`             | `0.625rem`                                              |
| `--tabs-tab-radius`                | `var(--radius-sm)`                                      |
| `--tabs-tab-transition`            | `var(--transition-default)`                             |
| `--tabs-vertical-list-width`       | `12rem`                                                 |

### Styling notes

- The default variant renders a filled sliding indicator behind the active tab and a bordered panel.
- `variant="line"` removes the filled indicator look and switches to an edge underline (or left edge in
  vertical orientation).
- `TabsList` is `inline-flex` by default. In `line` variant it stretches to full width.
- `TabsPanel` is individually bordered and padded by default. When composing a lighter inline layout,
  override the root, list, panel, and indicator classes together instead of fighting one selector at a
  time.

## Accessibility and UX notes

- Base UI handles `role="tablist"`, `role="tab"`, `role="tabpanel"`, roving focus, and panel/tab ARIA
  wiring. Keep using the exported parts so that contract stays intact.
- By default, arrow keys move focus within the list and activation happens on <kbd>Enter</kbd> or
  <kbd>Space</kbd>. Set `activateOnFocus` on `TabsList` for automatic activation during roving focus.
- When `orientation="vertical"`, keyboard navigation switches to up/down arrows.
- Use `render` with `nativeButton={false}` when the tab should render as an anchor or another
  non-button element.
- If the initial tab can be disabled during SSR, pass an explicit enabled `defaultValue` or controlled
  `value`. Base UI cannot infer disabled tabs during pre-render.
- Do not place nested interactive controls inside a `TabsTab`; keep the tab label itself as the single
  interactive target.
- Use `keepMounted` on `TabsPanel` when inactive content must preserve local component state or DOM
  measurements.

## Intentional differences from Base UI

- Consumers import flat moduix parts (`Tabs`, `TabsList`, `TabsTab`, `TabsPanel`, `TabsIndicator`),
  not `Tabs.Root`/`Tabs.List`.
- The wrapper is styled by default with CSS Modules and theme variables; it is not an unstyled
  primitive.
- `Tabs` adds the local `variant` prop and `data-variant` styling hook.
- `TabsList` auto-renders the default indicator, so the common path does not require a manual
  `TabsIndicator`.
- To customize indicator classes or enable `renderBeforeHydration`, consumers must provide an explicit
  `TabsIndicator` inside `TabsList`.
- No local `items` prop, slot prop map, or generated markup shortcut exists. Tabs stay fully
  compositional.

## Agent notes

- Preserve Base UI selection behavior, keyboard navigation, focus management, and ARIA wiring.
- Preserve the `TabsList` convenience contract: default indicator on the simple path, explicit
  `TabsIndicator` as the override path.
- Preserve `data-slot` values, `data-variant`, and the documented CSS variables as public styling
  hooks.
- Keep `variant` limited to the current `'default' | 'line'` union unless a user explicitly asks for a
  new visual contract.
- If changing indicator injection logic, keep it robust for Fragment-wrapped children and avoid
  duplicate indicators.

## Local changelog

- Rewritten to document the shipped moduix wrapper contract instead of copied Base UI documentation.
- Documented the moduix-only `variant` prop, automatic indicator behavior, styling hooks, and explicit
  custom-indicator escape hatch.
- Synced documented `--tabs-*` defaults with `packages/ui/src/styles/theme.css` for line indicator
  color and list padding fallbacks.