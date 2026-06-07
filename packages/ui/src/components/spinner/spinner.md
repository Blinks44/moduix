# Spinner

`Spinner` is a local moduix loading indicator. It does not wrap a Base UI primitive.

## Purpose

Use `Spinner` for short-lived pending states when a compact, inline indicator is enough:

- inside buttons;
- next to visible status text such as "Saving changes";
- in small cards, toolbars, and form actions.

It is intentionally small:

- one exported component;
- one visual root;
- built-in status semantics for the default path;
- optional custom indicator content inside the same sized/spinning wrapper;
- no layout, delay handling, loading-state orchestration, or variants beyond size.

## Current behavior contract

- `Spinner` renders a `span` root with `data-slot="spinner-root"` and `data-size`.
- When `decorative={false}` (default), the root renders with `role="status"`.
- Non-decorative spinners default to `aria-label="Loading"` unless the consumer provides
  `aria-label` or `aria-labelledby`.
- When `decorative={true}`, the root switches to `role="presentation"` and `aria-hidden="true"`.
- The inner rotating wrapper always renders as `span[data-slot="spinner-indicator"]`.
- Without custom `children`, the indicator wrapper renders the default ring as
  `span[data-slot="spinner-ring"]`.
- With custom `children`, the default ring is replaced, but the outer
  `spinner-indicator` wrapper still provides sizing and rotation.
- Spinner motion is disabled automatically under `prefers-reduced-motion`.

## Basic usage

Standalone status:

```tsx
import { Spinner } from 'moduix';

export function LoadingState() {
  return <Spinner />;
}
```

Inline with visible text:

```tsx
import { Spinner } from 'moduix';

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
import { Spinner } from 'moduix';

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

Keep custom children visually static. The `spinner-indicator` wrapper already handles rotation.

## Composition

`Spinner` exposes one component and up to three DOM parts:

```text
Spinner
└─ root[data-slot="spinner-root"][data-size]
   └─ indicator[data-slot="spinner-indicator"]
      └─ ring[data-slot="spinner-ring"] (default indicator only)
```

- `spinner-root` is the exported visual root and carries semantics.
- `spinner-indicator` is always present and owns the rotation.
- `spinner-ring` exists only when `children` are not provided.

There are no slot props, no `classNames` maps, and no separate exported parts. Use `className` on the
root plus descendant selectors or public CSS variables when you need local styling overrides.

## Public props

`Spinner` accepts standard `span` props plus these wrapper props:

| Prop              | Type                                   | Default                 | Notes                                                                               |
| ----------------- | -------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------- |
| `size`            | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`                  | Sets `data-size` and switches the default size scale.                               |
| `decorative`      | `boolean`                              | `false`                 | Removes status semantics when adjacent visible text already communicates the state. |
| `children`        | `React.ReactNode`                      | default ring            | Replaces the default ring inside the rotating wrapper. Keep custom content static.  |
| `className`       | `string`                               | —                       | Merged with the root class for local styling overrides.                             |
| `aria-label`      | `string`                               | `"Loading"` by behavior | Overrides the default announcement when the spinner is not decorative.              |
| `aria-labelledby` | `string`                               | —                       | Uses external text as the accessible name instead of the default label.             |

Public exported types:

- `SpinnerProps`
- `SpinnerSize`

## Styling API

### Stable hooks

| Hook                              | Purpose                                                     |
| --------------------------------- | ----------------------------------------------------------- |
| `data-slot="spinner-root"`        | Stable selector for the exported root.                      |
| `data-slot="spinner-indicator"`   | Stable selector for the rotating inner wrapper.             |
| `data-slot="spinner-ring"`        | Stable selector for the default ring only.                  |
| `[data-size='xs' \| ... \| 'xl']` | Size state on the root. Present for every spinner instance. |

### Public CSS variables

`Spinner` exposes these public variables through `src/styles/theme.css` and the component stylesheet:

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

Example override:

```tsx
import { Spinner } from 'moduix';
import styles from './custom-spinner-demo.module.css';

export function CustomSpinnerDemo() {
  return <Spinner decorative size="lg" className={styles.spinner} />;
}
```

```css
.spinner {
  --spinner-color: var(--color-primary);
  --spinner-ring-border-width: 0.1875rem;
  --spinner-ring-track-color: color-mix(in oklab, var(--color-primary) 22%, transparent 40%);
}
```

Notes:

- `className` only applies to the root. Use descendant selectors from that root when targeting the
  indicator or default ring.
- `--spinner-size` overrides the computed size for all size variants in the matching subtree.
- `--spinner-animation: none` disables rotation for matching descendants, but shipped CSS still turns
  animation off automatically under `prefers-reduced-motion`.
- When custom `children` are used, `--spinner-radius`, `--spinner-ring-border-width`, and
  `--spinner-ring-track-color` no longer affect the visual child because the default ring is replaced.

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

## Limitations and recommendations

- `Spinner` is a visual/status primitive, not a layout helper. Compose spacing and alignment outside the
  component.
- Keep custom `children` static. If the child also animates or rotates, the nested motion compounds with
  the rotating wrapper.
- There is no text slot, label slot, delay prop, or progress value API. Pair `Spinner` with adjacent UI
  when the loading state needs more explanation.
- For larger blocking placeholders, prefer `Skeleton` or a fuller loading layout instead of scaling one
  spinner indefinitely.
- Use public CSS variables and `data-slot` hooks for styling. Do not add parallel slot prop bags or
  internal class APIs.

## Intentional differences from Base UI

- There is no upstream Base UI `Spinner` primitive to mirror locally.
- moduix ships `Spinner` as a single local component with a small styling contract instead of a
  namespaced primitive API.
- The local documentation describes the shipped moduix wrapper contract and styling hooks, not a generic
  loading-indicator pattern from another library.

## Agent notes

- Keep `Spinner` thin. Do not add loading-state orchestration, text rendering props, delay handling, or
  variant systems.
- Preserve the current semantics contract:
  - default path announces a loading status;
  - `decorative` hides the spinner from assistive technology;
  - `aria-labelledby` suppresses the fallback `aria-label`.
- Preserve the public hooks `data-slot="spinner-root"`, `data-slot="spinner-indicator"`,
  `data-slot="spinner-ring"`, and `data-size`.
- Preserve the public `--spinner-*` variable contract unless the task explicitly changes styling API.
- If behavior, styling hooks, or examples change, update `Spinner.tsx`, `Spinner.module.css`,
  Storybook stories, and this file together.
- Keep docs examples aligned with what previews actually show, including wrapper composition or CSS when
  that affects the visible result.

## Local changelog

- 2026-06-03: Rewrote the local documentation around the actual moduix `Spinner` contract, documented
  semantics/composition/styling hooks, exposed the default ring as `data-slot="spinner-ring"`, added
  public `SpinnerProps` and `SpinnerSize` exports, and added `--spinner-animation` while disabling
  motion under `prefers-reduced-motion`.