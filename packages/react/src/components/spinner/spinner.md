# Spinner

`Spinner` is a root-only moduix loading indicator implemented with `@ark-ui/react/factory`.
Ark UI does not provide a dedicated spinner primitive, so the component follows Ark composition and
styling conventions instead of wrapping a behavior machine.

## Purpose

Use `Spinner` for short-lived pending states when a compact, inline indicator is enough:

- inside buttons;
- next to visible status text such as "Saving changes";
- in small cards, toolbars, and form actions.

It is intentionally small:

- one exported root component with `Spinner.Root` attached as the Ark-style namespace form;
- one visual root;
- built-in status semantics for the default path;
- optional custom indicator content inside the same sized/spinning wrapper;
- `asChild` support for custom root hosts;
- no layout, delay handling, loading-state orchestration, or variants beyond size.

## Current behavior contract

- `Spinner` and `Spinner.Root` are the same root component.
- The default root renders an `ark.span` with `data-scope="spinner"`, `data-part="root"`,
  `data-slot="spinner-root"`, and `data-size`.
- When `decorative={false}` (default), the root renders with `role="status"`.
- Non-decorative spinners default to `aria-label="Loading"` unless the consumer provides
  `aria-label` or `aria-labelledby`.
- When `decorative={true}`, the root switches to `role="presentation"` and `aria-hidden="true"`.
- The inner rotating wrapper renders as
  `span[data-scope="spinner"][data-part="indicator"][data-slot="spinner-indicator"]`.
- Without custom `children`, the indicator wrapper renders the default ring as
  `span[data-scope="spinner"][data-part="ring"][data-slot="spinner-ring"]`.
- With custom `children`, the default ring is replaced, but the `spinner-indicator` wrapper still
  provides sizing and rotation.
- With `asChild`, Ark merges the root props into the single child. The child becomes the root and
  must render its own visual contents.
- Spinner motion is disabled automatically under `prefers-reduced-motion`.

## Basic usage

Standalone status:

```tsx
import { Spinner } from '@moduix/react';

export function LoadingState() {
  return <Spinner />;
}
```

Inline with visible text:

```tsx
import { Spinner } from '@moduix/react';

export function SavingState() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
      <Spinner decorative size="sm" />
      <span>Saving changes</span>
    </span>
  );
}
```

Custom static indicator:

```tsx
import { Spinner } from '@moduix/react';

export function SyncSpinner() {
  return (
    <Spinner aria-label="Syncing">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3v4M12 17v4M3 12h4M17 12h4M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83M18.36 5.64l-2.83 2.83M8.47 15.53l-2.83 2.83"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </Spinner>
  );
}
```

Custom root host:

```tsx
import { Spinner } from '@moduix/react';

export function ReportSpinner() {
  return (
    <Spinner asChild size="lg" aria-label="Loading report">
      <span>
        <span data-scope="spinner" data-part="indicator" />
      </span>
    </Spinner>
  );
}
```

## Composition

`Spinner` exposes one root component and two default internal visual parts:

```text
Spinner / Spinner.Root
└─ root[data-scope="spinner"][data-part="root"][data-slot="spinner-root"][data-size]
   └─ indicator[data-scope="spinner"][data-part="indicator"][data-slot="spinner-indicator"]
      └─ ring[data-scope="spinner"][data-part="ring"][data-slot="spinner-ring"] (default only)
```

| Part                       | Role                                                                 |
| -------------------------- | -------------------------------------------------------------------- |
| `Spinner` / `Spinner.Root` | Root status element and custom host composition point.               |
| `spinner-indicator`        | Rotating wrapper that owns the spinner animation.                    |
| `spinner-ring`             | Default ring indicator. It is omitted when custom children are used. |

There are no slot props, no `classNames` maps, no context hooks, and no separate exported parts.
Use `className` on the root plus Ark/data-slot selectors or public CSS variables for styling.

## Public props

`Spinner.Root` accepts `HTMLArkProps<'span'>` plus these wrapper props:

| Prop              | Type                                   | Default                 | Notes                                                                               |
| ----------------- | -------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------- |
| `size`            | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`                  | Sets `data-size` and switches the default size scale.                               |
| `decorative`      | `boolean`                              | `false`                 | Removes status semantics when adjacent visible text already communicates the state. |
| `asChild`         | `boolean`                              | `false`                 | Merges root props into the single child element.                                    |
| `children`        | `React.ReactNode`                      | default ring            | Replaces the default ring unless `asChild` makes the child the root.                |
| `className`       | `string`                               | -                       | Merged with the root class for local styling overrides.                             |
| `aria-label`      | `string`                               | `"Loading"` by behavior | Overrides the default announcement when the spinner is not decorative.              |
| `aria-labelledby` | `string`                               | -                       | Uses external text as the accessible name instead of the default label.             |

Public exported types:

- `SpinnerRootProps`
- `SpinnerSize`

## Styling API

### Stable hooks

| Hook                                               | Purpose                                      |
| -------------------------------------------------- | -------------------------------------------- |
| `[data-scope="spinner"][data-part="root"]`         | Ark-style selector for the root.             |
| `[data-scope="spinner"][data-part="indicator"]`    | Ark-style selector for the rotating wrapper. |
| `[data-scope="spinner"][data-part="ring"]`         | Ark-style selector for the default ring.     |
| `data-slot="spinner-root"`                         | Stable moduix selector for the root.         |
| `data-slot="spinner-indicator"`                    | Stable moduix selector for the wrapper.      |
| `data-slot="spinner-ring"`                         | Stable moduix selector for the default ring. |
| `[data-size='xs' \| 'sm' \| 'md' \| 'lg' \| 'xl']` | Size state on the root.                      |

### Public CSS variables

`Spinner` exposes these public variables through `src/core/styles/theme.css` and the component stylesheet:

| Variable                      | Default                                              | Effect                                        |
| ----------------------------- | ---------------------------------------------------- | --------------------------------------------- |
| `--spinner-animation`         | `var(--animation-spin)`                              | Rotation applied to `spinner-indicator`.      |
| `--spinner-color`             | `currentColor`                                       | Main indicator color.                         |
| `--spinner-radius`            | `var(--radius-full)`                                 | Default border radius for the ring.           |
| `--spinner-ring-border-width` | `0.125rem`                                           | Ring stroke thickness.                        |
| `--spinner-ring-track-color`  | `color-mix(in oklab, currentColor 22%, transparent)` | Track color for the default ring.             |
| `--spinner-size`              | `var(--spinner-size-md, 1.25rem)`                    | Global size override for the current subtree. |
| `--spinner-size-xs`           | `0.75rem`                                            | Token for `size="xs"`.                        |
| `--spinner-size-sm`           | `1rem`                                               | Token for `size="sm"`.                        |
| `--spinner-size-md`           | `1.25rem`                                            | Token for `size="md"`.                        |
| `--spinner-size-lg`           | `1.75rem`                                            | Token for `size="lg"`.                        |
| `--spinner-size-xl`           | `2.25rem`                                            | Token for `size="xl"`.                        |

## UX and accessibility

- The default path is accessible out of the box because the root exposes `role="status"` and a fallback
  label of `"Loading"`.
- Prefer `decorative` whenever nearby visible text already says what is happening, such as "Saving
  changes" or "Submitting".
- Use `aria-labelledby` when the spinner should reuse visible text elsewhere instead of repeating a new
  announcement.
- `Spinner` is non-interactive: no keyboard behavior, focus management, disabled state, or read-only
  state is built in or needed.
- Respect reduced motion. The shipped CSS disables spinner rotation for users who request less motion.

## Intentional differences from legacy

- There is no upstream legacy or Ark UI `Spinner` primitive to mirror locally.
- The component no longer exposes a plain DOM-only span prop contract. It uses `HTMLArkProps<'span'>`
  and supports `asChild`.
- The public root namespace follows Ark-style root-only components: `Spinner` and `Spinner.Root`.
- Styling uses Ark `data-scope` and `data-part` attributes plus stable moduix `data-slot` hooks.

## Agent notes

- Keep `Spinner` thin. Do not add loading-state orchestration, text rendering props, delay handling, or
  variant systems.
- Preserve the current semantics contract:
  - default path announces a loading status;
  - `decorative` hides the spinner from assistive technology;
  - `aria-labelledby` suppresses the fallback `aria-label`.
- Preserve the public hooks `data-scope="spinner"`, `data-part`, `data-slot`, and `data-size`.
- Preserve the public `--spinner-*` variable contract unless the task explicitly changes styling API.
- If behavior, styling hooks, or examples change, update `Spinner.tsx`, `Spinner.module.css`,
  Storybook stories, public docs examples, and this file together.

## Local changelog

- 2026-06-21: Migrated `Spinner` to an Ark-style root-only component with `@ark-ui/react/factory`,
  `asChild`, `Spinner.Root`, `data-scope="spinner"`, `data-part` styling hooks, docs examples with
  Code/Styles/Data tabs, and the `SpinnerRootProps` public type.
- 2026-06-03: Rewrote the local documentation around the actual moduix `Spinner` contract, documented
  semantics/composition/styling hooks, exposed the default ring as `data-slot="spinner-ring"`, added
  public prop and size type exports, and added `--spinner-animation` while disabling motion under
  `prefers-reduced-motion`.