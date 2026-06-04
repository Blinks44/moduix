# Stepper

Upstream primitive docs: none. `Stepper` is a moduix-native composition pattern.

## Purpose

`Stepper` presents ordered progress through a flow, checklist, or onboarding sequence. It does not
own form state, route state, or panel rendering. The component stays composition-first: consumers
render the visible steps, choose whether they are clickable, and decide how step changes affect the
rest of the UI.

## Current behavior contract

Basic usage:

```tsx
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperList,
  StepperTitle,
  StepperTrigger,
} from 'moduix';

export function Example() {
  return (
    <Stepper currentStep={2}>
      <StepperList>
        <StepperItem step={1}>
          <StepperTrigger render={<div />}>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>Account</StepperTitle>
              <StepperDescription>Create the workspace owner account.</StepperDescription>
            </StepperContent>
          </StepperTrigger>
        </StepperItem>
        <StepperItem step={2}>
          <StepperTrigger render={<div />}>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>Profile</StepperTitle>
              <StepperDescription>Set team details and locale.</StepperDescription>
            </StepperContent>
          </StepperTrigger>
        </StepperItem>
      </StepperList>
    </Stepper>
  );
}
```

- `Stepper` renders a navigation landmark and defaults `aria-label` to `"Steps"`.
- `StepperList` renders the ordered list container and inherits the current orientation from
  `Stepper`.
- `StepperItem` requires a numeric `step` value. When `Stepper` receives `currentStep`, item state is
  derived automatically: lower steps become `completed`, the matching step becomes `current`, and
  higher steps stay `inactive`.
- `StepperItem` can override derived state with `status="inactive" | "current" | "completed"`.
- `StepperTrigger` defaults to a native `<button type="button">`. Use `render={<div />}` for a
  display-only stepper or `render={<a />}` / router-link composition when the step should navigate.
- `StepperIndicator` renders the step number by default and swaps to the built-in check icon for
  completed steps unless custom children are provided.
- Current steps automatically receive `aria-current="step"` on `StepperItem` and `StepperTrigger`.

## Composition

Public parts:

```text
Stepper
`- StepperList
   `- StepperItem
      `- StepperTrigger
         |- StepperIndicator
         `- StepperContent
            |- StepperTitle
            `- StepperDescription
```

The wrapper keeps the structure explicit:

- `Stepper` owns orientation and current-step context only.
- `StepperItem` owns one step number and resolved status only.
- `StepperTrigger` is the only interactive part. Disable it directly when a step should not be
  reachable yet.
- Connectors are decorative CSS on `StepperItem`; there is no exported separator part.

## Defaults and styling

Stable `data-slot` hooks:

| Part                 | `data-slot`           |
| -------------------- | --------------------- |
| `Stepper`            | `stepper-root`        |
| `StepperList`        | `stepper-list`        |
| `StepperItem`        | `stepper-item`        |
| `StepperTrigger`     | `stepper-trigger`     |
| `StepperIndicator`   | `stepper-indicator`   |
| `StepperContent`     | `stepper-content`     |
| `StepperTitle`       | `stepper-title`       |
| `StepperDescription` | `stepper-description` |

Important state/style hooks:

- `data-orientation="horizontal" | "vertical"` is applied to `Stepper`, `StepperList`, `StepperItem`,
  `StepperTrigger`, `StepperIndicator`, and `StepperContent`.
- `data-state="inactive" | "current" | "completed"` is applied to `StepperItem`, `StepperTrigger`,
  `StepperIndicator`, `StepperContent`, `StepperTitle`, and `StepperDescription`.
- Disabled styling on `StepperTrigger` reacts to `[aria-disabled='true']`, `[data-disabled]`, and
  native `[disabled]`.
- Connector styling is driven by `StepperItem::after`; completed items switch the connector to the
  active color.

Public CSS variables:

| Variable                                     | Default                                           |
| -------------------------------------------- | ------------------------------------------------- |
| `--stepper-color`                            | `var(--color-foreground)`                         |
| `--stepper-connector-color`                  | `var(--color-border)`                             |
| `--stepper-connector-color-active`           | `var(--color-foreground)`                         |
| `--stepper-connector-inset`                  | `0.5rem`                                          |
| `--stepper-connector-thickness`              | `var(--border-width-sm)`                          |
| `--stepper-content-gap`                      | `0.25rem`                                         |
| `--stepper-description-color`                | `var(--color-muted-foreground)`                   |
| `--stepper-description-font-size`            | `var(--text-xs)`                                  |
| `--stepper-description-line-height`          | `var(--line-height-text-xs)`                      |
| `--stepper-description-color-current`        | `var(--stepper-description-color)`                |
| `--stepper-disabled-opacity`                 | `var(--opacity-disabled)`                         |
| `--stepper-focus-ring-color`                 | `var(--color-ring)`                               |
| `--stepper-focus-ring-offset`                | `2px`                                             |
| `--stepper-focus-ring-width`                 | `var(--border-width-sm)`                          |
| `--stepper-gap`                              | `var(--spacing-4)`                                |
| `--stepper-indicator-bg`                     | `var(--color-background)`                         |
| `--stepper-indicator-bg-completed`           | `var(--color-foreground)`                         |
| `--stepper-indicator-bg-current`             | `var(--stepper-indicator-bg)`                     |
| `--stepper-indicator-border-color`           | `var(--color-border)`                             |
| `--stepper-indicator-border-color-completed` | `var(--color-foreground)`                         |
| `--stepper-indicator-border-color-current`   | `var(--stepper-indicator-border-color-completed)` |
| `--stepper-indicator-border-color-hover`     | `var(--stepper-indicator-border-color-current)`   |
| `--stepper-indicator-border-width`           | `var(--border-width-sm)`                          |
| `--stepper-indicator-color`                  | `var(--color-muted-foreground)`                   |
| `--stepper-indicator-color-completed`        | `var(--color-background)`                         |
| `--stepper-indicator-color-current`          | `var(--color-foreground)`                         |
| `--stepper-indicator-color-hover`            | `var(--stepper-indicator-color-current)`          |
| `--stepper-indicator-font-size`              | `var(--text-sm)`                                  |
| `--stepper-indicator-font-weight`            | `var(--weight-semibold)`                          |
| `--stepper-indicator-icon-size`              | `0.875rem`                                        |
| `--stepper-indicator-radius`                 | `var(--radius-full)`                              |
| `--stepper-indicator-size`                   | `2rem`                                            |
| `--stepper-title-color`                      | `currentColor`                                    |
| `--stepper-title-color-current`              | `var(--stepper-title-color)`                      |
| `--stepper-title-color-hover`                | `var(--color-foreground)`                         |
| `--stepper-title-font-size`                  | `var(--text-sm)`                                  |
| `--stepper-title-font-weight`                | `var(--weight-medium)`                            |
| `--stepper-title-line-height`                | `var(--line-height-text-sm)`                      |
| `--stepper-trigger-gap`                      | `var(--spacing-3)`                                |

## Intentional differences from Base UI

- `Stepper` is not a Base UI primitive wrapper. It is a moduix-native compound component.
- There is no high-level `items` array prop, panel management API, or wizard state machine. Render
  steps in JSX and keep navigation logic in consumer code.
- There is no dedicated separator part. Connectors are part of the styling contract instead of the
  JSX structure.
- `StepperTrigger` keeps render composition like other moduix link-like parts, but defaults to native
  button behavior for the common interactive path.

## Agent notes

- Keep `step` required on `StepperItem`; the current implementation does not auto-number from child
  position.
- Preserve automatic `aria-current="step"` behavior for the current item and trigger.
- If connector geometry or CSS variables change, update `Stepper.module.css`, `theme.css`, stories,
  docs examples, and this file in the same task.
- Do not add a large data-driven wizard API unless a user explicitly requests it.

## Local changelog

- Added the initial moduix Stepper component as a composition-first ordered progress pattern with
  orientation support, derived step status, render composition for interactive or static usage, and a
  built-in completed-state check indicator.