# Spinner

Upstream docs:

- Ark UI: no dedicated Spinner primitive. Use the Ark factory model in https://ark-ui.com/docs/guides/composition#the-ark-factory
- Ark composition: https://ark-ui.com/docs/guides/composition
- Ark styling: https://ark-ui.com/docs/guides/styling
- Ark refs: https://ark-ui.com/docs/guides/ref

## Purpose

`Spinner` is a compact loading indicator for inline pending states, buttons, small cards, toolbars, and form actions.

## Upstream model to preserve

Ark UI does not ship a dedicated spinner primitive. Moduix builds `Spinner` with `@ark-ui/react/factory` as a local root-only Ark-style component:

- one Ark factory root rendered as `ark.span`;
- `asChild` support for a single custom root host;
- direct ref forwarding to the rendered root element;
- Ark-style `data-scope` and `data-part` selectors for styling.

There is no Ark state machine, provider, context hook, controlled state, hidden input, keyboard behavior, or focus management to preserve.

## Current behavior contract

- `Spinner` and `Spinner.Root` are the same root component.
- `Spinner.Root` accepts `HTMLArkProps<'span'>` plus `size` and `decorative`.
- `size` defaults to `'md'` and writes `data-size` on the root.
- `decorative` defaults to `false`.
- Non-decorative spinners render `role="status"` and default to `aria-label="Loading"` unless `aria-label` or `aria-labelledby` is provided.
- Decorative spinners render `role="presentation"` and `aria-hidden="true"`.
- `Spinner` owns its status semantics and `data-scope`, `data-part`, `data-slot`, and `data-size` styling hooks; native props cannot override them.
- Custom `children` replace the default ring while keeping the built-in indicator wrapper.
- `asChild` makes the single child the root; that child must render its own indicator contents.
- Motion is disabled under `prefers-reduced-motion`.

## Anatomy and exported parts

```text
Spinner / Spinner.Root
└─ root[data-scope="spinner"][data-part="root"][data-slot="spinner-root"][data-size]
   └─ indicator[data-scope="spinner"][data-part="indicator"][data-slot="spinner-indicator"]
      └─ ring[data-scope="spinner"][data-part="ring"][data-slot="spinner-ring"] (default only)
```

| Part                       | Hook                            | Notes                                                      |
| -------------------------- | ------------------------------- | ---------------------------------------------------------- |
| `Spinner` / `Spinner.Root` | `data-slot="spinner-root"`      | Exported root and custom host composition point.           |
| indicator                  | `data-slot="spinner-indicator"` | Internal rotating wrapper that owns size and animation.    |
| ring                       | `data-slot="spinner-ring"`      | Internal default ring, omitted when custom children exist. |

## Composition

Use the short root form for normal consumers:

```tsx
import { Spinner } from '@moduix/react';

export function LoadingState() {
  return <Spinner />;
}
```

Use `decorative` beside visible loading text:

```tsx
import { Spinner } from '@moduix/react';

export function SavingState() {
  return (
    <span>
      <Spinner decorative size="sm" />
      Saving changes
    </span>
  );
}
```

Use `asChild` only when the root host itself must be custom:

```tsx
import { Spinner } from '@moduix/react';

export function ReportSpinner() {
  return (
    <Spinner asChild size="lg" aria-label="Loading report">
      <span>
        <span data-scope="spinner" data-part="indicator" data-slot="spinner-indicator">
          <span data-scope="spinner" data-part="ring" data-slot="spinner-ring" />
        </span>
      </span>
    </Spinner>
  );
}
```

## Upstream feature coverage

- Composition: follows Ark factory `asChild` behavior and the single-child custom host constraint.
- Styling: exposes Ark-style `data-scope="spinner"` and `data-part` hooks plus stable moduix `data-slot` hooks.
- Refs: forwards the React `ref` to the root Ark factory element.
- State: has no controlled or uncontrolled state. The only local state-like attribute is `data-size`.
- Accessibility: uses native status semantics rather than an Ark primitive contract.
- Forms, IDs, provider/context, `HiddenInput`, focus management, and keyboard navigation do not apply.

## Accessibility and state

The default non-decorative path announces a loading status. Prefer `decorative` when adjacent visible text already communicates the pending state. Use `aria-labelledby` when a visible label elsewhere should name the status.

`Spinner` is non-interactive, so it does not manage focus, keyboard input, disabled state, invalid state, read-only state, or field context.

## Defaults and styling

`className` applies to the root. Consumers can style the component through root class selectors, Ark-style data selectors, stable `data-slot` hooks, `data-size`, and public CSS variables.

| Variable                      | Default                                              |
| ----------------------------- | ---------------------------------------------------- |
| `--spinner-animation`         | `var(--animation-spin)`                              |
| `--spinner-color`             | `currentColor`                                       |
| `--spinner-radius`            | `var(--radius-full)`                                 |
| `--spinner-ring-border-width` | `var(--border-width-md)`                             |
| `--spinner-ring-track-color`  | `color-mix(in oklab, currentColor 22%, transparent)` |
| `--spinner-size`              | `var(--spinner-size-md, 1.25rem)`                    |
| `--spinner-size-xs`           | `0.75rem`                                            |
| `--spinner-size-sm`           | `1rem`                                               |
| `--spinner-size-md`           | `1.25rem`                                            |
| `--spinner-size-lg`           | `1.75rem`                                            |
| `--spinner-size-xl`           | `2.25rem`                                            |

## Intentional sugar and differences from upstream

- There is no dedicated Ark Spinner primitive to mirror.
- Moduix adds default status semantics, the `decorative` prop, the `size` prop, and the default ring.
- `children` is convenience sugar for replacing the default ring while keeping the indicator wrapper.
- `Spinner.Root` exists only to keep the API aligned with root-only Ark-style components.

## Agent notes

- Keep the component thin. Do not add loading orchestration, delay handling, text props, variants, or slot maps.
- Preserve `asChild`, ref forwarding, status semantics, `data-scope`, `data-part`, `data-slot`, and `data-size`.
- Keep public docs, stories, local markdown, and registry output synchronized with any behavior or styling contract change.

## Local changelog

- 2026-07-11: Protected status semantics and stable styling hooks from conflicting native props.
- 2026-07-03: Stopped exporting `SpinnerRootProps` and `SpinnerSize`; docs and examples now infer
  props from `Spinner` directly to keep the public surface smaller.
- 2026-06-27: Re-audited the local Ark factory contract, simplified `asChild` examples to reuse public data hooks, aligned docs API text, and removed non-token ring thickness overrides from examples.
- 2026-06-21: Migrated `Spinner` to an Ark-style root-only component with `@ark-ui/react/factory`, `asChild`, `Spinner.Root`, `data-scope="spinner"`, `data-part` styling hooks, docs examples with Code/Styles/Data tabs, and the `SpinnerRootProps` public type.
- 2026-06-03: Rewrote the local documentation around the actual moduix `Spinner` contract, documented semantics/composition/styling hooks, exposed the default ring as `data-slot="spinner-ring"`, added public prop and size type exports, and added `--spinner-animation` while disabling motion under `prefers-reduced-motion`.