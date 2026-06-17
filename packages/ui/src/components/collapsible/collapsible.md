# Collapsible

Upstream primitive docs: https://base-ui.com/react/components/collapsible.md

## Purpose

`Collapsible` is the moduix wrapper around Base UI Collapsible. It keeps the primitive state model for
one trigger and one panel, then adds moduix defaults: flat exports, CSS Module styling, public
`data-slot` hooks, and an optional trigger icon helper.

Use it for optional supporting content that belongs to the current page flow: recovery keys, inline
settings help, secondary metadata, or one-off disclosure rows. If several related sections need to
coordinate together, prefer `Accordion`.

## Current behavior contract

- `Collapsible` forwards Base UI root props and refs to a `<div>`.
- `CollapsibleTrigger` forwards Base UI trigger props and refs to a `<button>` by default.
- `CollapsiblePanel` forwards Base UI panel props and refs to a `<div>`.
- Root state stays Base UI-native: `open`, `defaultOpen`, `onOpenChange`, and `disabled` are not
  renamed.
- `CollapsibleTrigger` applies moduix trigger styles only on the default render path. When `render` is
  provided, consumers own the full trigger styling.
- `CollapsibleTriggerIcon` is narrow moduix sugar for the common disclosure cue. It renders a
  decorative `span`, defaults `aria-hidden` to `true`, and shows `ChevronRightIcon` when no children
  are provided.
- The root uses a compact default width through `--collapsible-width` and `--collapsible-max-width`
  so the trigger does not jump with panel content width.
- The panel animation relies on Base UI runtime measurement via `--collapsible-panel-height`.
- `keepMounted` and `hiddenUntilFound` are passed through to the panel unchanged.

## Composition

```tsx
import { Collapsible, CollapsiblePanel, CollapsibleTrigger, CollapsibleTriggerIcon } from 'moduix';

export function CollapsibleExample() {
  return (
    <Collapsible>
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleTriggerIcon />
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <div className="panelContent">Store these keys somewhere safe.</div>
      </CollapsiblePanel>
    </Collapsible>
  );
}
```

Recommended anatomy:

```text
Collapsible
├─ CollapsibleTrigger
│  ├─ label
│  └─ CollapsibleTriggerIcon (optional)
└─ CollapsiblePanel
   └─ content wrapper
```

Exported parts:

| Part                     | Renders  | Slot data attribute                    | Purpose                                                       |
| ------------------------ | -------- | -------------------------------------- | ------------------------------------------------------------- |
| `Collapsible`            | `div`    | `data-slot="collapsible-root"`         | Root state container for one disclosure pair.                 |
| `CollapsibleTrigger`     | `button` | `data-slot="collapsible-trigger"`      | Interactive control that toggles the panel.                   |
| `CollapsibleTriggerIcon` | `span`   | `data-slot="collapsible-trigger-icon"` | Optional decorative state cue.                                |
| `CollapsiblePanel`       | `div`    | `data-slot="collapsible-panel"`        | Collapsible content region animated by measured panel height. |

## Public props

The wrappers intentionally preserve Base UI props instead of introducing local aliases.

Common root props:

| Prop           | Default | Description                                                               |
| -------------- | ------- | ------------------------------------------------------------------------- |
| `defaultOpen`  | `false` | Uncontrolled initial open state.                                          |
| `open`         | -       | Controlled open state.                                                    |
| `onOpenChange` | -       | Called with the next `open` value and Base UI event details.              |
| `disabled`     | `false` | Disables user interaction for the trigger and panel state machine.        |
| `className`    | -       | Accepts a string or Base UI state resolver; moduix classes are merged in. |
| `render`       | -       | Base UI render prop for replacing or composing the root element.          |

Common trigger and panel props:

- `CollapsibleTrigger`: `className`, `render`, `nativeButton`, and native button props.
- `CollapsiblePanel`: `className`, `keepMounted`, `hiddenUntilFound`, `render`, and native `div` props.
- `CollapsibleTriggerIcon`: native `span` props, optional `children`, and `aria-hidden` (defaults to
  `true`).

Use `nativeButton={false}` only when `CollapsibleTrigger render={...}` does **not** render a real
`button`.

Example controlled usage:

```tsx
import { useState } from 'react';
import { Collapsible, CollapsiblePanel, CollapsibleTrigger, CollapsibleTriggerIcon } from 'moduix';

function ControlledCollapsible() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleTriggerIcon />
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <div className="panelContent">Store these keys somewhere safe.</div>
      </CollapsiblePanel>
    </Collapsible>
  );
}
```

## Defaults and styling

All exported visual parts accept `className`. The root, trigger, icon, and panel expose stable
`data-slot` values shown above for selectors and tests.

Base UI state hooks used by the shipped styles:

| Attribute             | Where it appears | Meaning                                                                      |
| --------------------- | ---------------- | ---------------------------------------------------------------------------- |
| `data-panel-open`     | trigger          | Matching panel is open. Used by `CollapsibleTriggerIcon`.                    |
| `data-open`           | panel            | Panel is open.                                                               |
| `data-closed`         | panel            | Panel is closed.                                                             |
| `data-starting-style` | panel            | Panel is entering.                                                           |
| `data-ending-style`   | panel            | Panel is leaving.                                                            |
| `hidden`              | panel            | Closed panels are hidden unless `keepMounted` or `hiddenUntilFound` is used. |

Default styling behavior:

- `Collapsible` is a simple column flex container with inherited text color, `min-width: 0`, a
  default `--collapsible-width` of `14rem`, and `--collapsible-max-width: 100%`.
- `CollapsibleTrigger` is a full-width flex button with hover, active, focus-visible, and disabled
  states, plus `user-select: none` to avoid accidental text selection during repeated toggles.
- `CollapsibleTriggerIcon` rotates when the trigger receives `data-panel-open`.
- `CollapsiblePanel` animates its height and hides overflow; spacing should usually live on an inner
  content wrapper instead of the panel itself.
- When `CollapsibleTrigger` receives `render`, moduix does not attach the default trigger CSS class.
  This matches `Accordion.ItemTrigger` and avoids leaking button layout styles onto custom controls.

`CollapsibleTriggerIcon` can keep the default icon or render custom children:

```tsx
<CollapsibleTrigger>
  Details
  <CollapsibleTriggerIcon className={styles.chevron}>
    <ChevronDownIcon />
  </CollapsibleTriggerIcon>
</CollapsibleTrigger>
```

```css
.chevron {
  --collapsible-icon-open-transform: rotate(180deg);
}
```

Public CSS variables:

| Variable                            | Default                               |
| ----------------------------------- | ------------------------------------- |
| `--collapsible-color`               | `var(--color-foreground)`             |
| `--collapsible-disabled-opacity`    | `var(--opacity-disabled)`             |
| `--collapsible-focus-ring-color`    | `var(--color-ring)`                   |
| `--collapsible-focus-ring-offset`   | `var(--border-width-sm)`              |
| `--collapsible-focus-ring-width`    | `var(--border-width-sm)`              |
| `--collapsible-max-width`           | `100%`                                |
| `--collapsible-icon-open-transform` | `rotate(90deg)`                       |
| `--collapsible-icon-size`           | `0.75rem`                             |
| `--collapsible-icon-transition`     | `var(--transition-default)`           |
| `--collapsible-panel-color`         | `var(--color-muted-foreground)`       |
| `--collapsible-panel-font-size`     | `var(--text-sm)`                      |
| `--collapsible-panel-height`        | runtime measured value                |
| `--collapsible-panel-line-height`   | `var(--line-height-text-sm)`          |
| `--collapsible-panel-transition`    | `var(--transition-default)`           |
| `--collapsible-panel-width`         | runtime measured value                |
| `--collapsible-trigger-bg`          | `transparent`                         |
| `--collapsible-trigger-bg-active`   | `var(--collapsible-trigger-bg-hover)` |
| `--collapsible-trigger-bg-hover`    | `var(--collapsible-trigger-bg)`       |
| `--collapsible-trigger-color`       | `var(--collapsible-color)`            |
| `--collapsible-trigger-font-size`   | `var(--text-sm)`                      |
| `--collapsible-trigger-gap`         | `var(--spacing-2)`                    |
| `--collapsible-trigger-line-height` | `var(--line-height-text-sm)`          |
| `--collapsible-trigger-padding-x`   | `var(--spacing-2)`                    |
| `--collapsible-trigger-padding-y`   | `var(--spacing-1)`                    |
| `--collapsible-trigger-radius`      | `0`                                   |
| `--collapsible-trigger-transition`  | `var(--transition-default)`           |
| `--collapsible-width`               | `14rem`                               |

## Accessibility and UX notes

- Keep the default trigger render path whenever possible. It gives the correct button semantics,
  keyboard interaction, and focus behavior with no extra work.
- If you replace the trigger host with a non-button element, set `nativeButton={false}` so Base UI can
  apply ARIA button behavior correctly.
- Do not place nested interactive controls inside `CollapsibleTrigger`; place them adjacent to the
  trigger or inside the panel.
- `CollapsibleTriggerIcon` is decorative by default. If your custom icon conveys meaning, keep visible
  text in the trigger or intentionally override `aria-hidden`.
- Put padding, borders, and surface styling on inner panel content when precise height animation matters.
- `hiddenUntilFound` is useful for find-in-page discoverability. `keepMounted` is useful when hidden
  content must stay in the DOM for measurement or preserved internal state.

## Intentional differences from Base UI

- Consumers import flat moduix exports (`Collapsible`, `CollapsibleTrigger`, `CollapsiblePanel`,
  `CollapsibleTriggerIcon`) instead of `Collapsible.Root` and friends.
- The wrapper ships with default CSS Module styling and theme-variable hooks; it is not an unstyled
  primitive.
- `CollapsibleTriggerIcon` is moduix-only sugar for the common chevron pattern.
- There is no generated shorthand API such as `items`, `slotProps`, or `classNames` maps. Customization
  stays in explicit composition and `className`.

## Agent notes

- Preserve Base UI disclosure semantics, event handling, focus management, and measured panel
  transitions.
- Preserve the documented `data-slot` values and CSS variable names as public styling hooks.
- Preserve the rule that `CollapsibleTrigger render={...}` opts out of default trigger styling.
- Do not add broad sugar unless it removes common real boilerplate while keeping the explicit
  composition model easy to see.

## Motion tokens

`CollapsiblePanel` now exposes phase-specific motion variables for its enter and exit states. Override `--collapsible-panel-starting-height`, `--collapsible-panel-ending-height`, and the matching `*-opacity`, `*-scale`, and `*-translate-x/y` tokens to layer fade or slide effects on top of the default measured height animation without changing markup.

## Local changelog

- 2026-06-10: Added phase-specific panel motion tokens so collapsible enter/exit animations can be retuned to fade, slide, or mixed effects through CSS variables while preserving the default height-based behavior.
- Rewritten to describe the moduix wrapper contract instead of mirroring the upstream Base UI
  documentation.
- Documented the styling opt-out behavior for custom trigger rendering and the full public CSS variable
  contract.
- Recorded the shipped trigger UX details: disabled hover/active suppression and `user-select: none`.
- Added a compact default root width (`14rem`) plus `--collapsible-width` and
  `--collapsible-max-width` variables to keep layout stable out of the box.