# Steps

Upstream: https://ark-ui.com/docs/components/steps

## Purpose

Guides users through a numbered, multi-step process.

## Public contract

```tsx
Steps
├─ StepsProgress (optional)
├─ StepsList
│  └─ StepsItem index={n}
│     ├─ StepsTrigger
│     │  └─ StepsIndicator (number or check icon by default)
│     └─ StepsSeparator
├─ StepsContent index={n}
├─ StepsCompletedContent
├─ StepsPrevTrigger
└─ StepsNextTrigger

StepsRootProvider
└─ same part tree connected to useSteps()
```

| Part                    | `data-slot`               |
| ----------------------- | ------------------------- |
| `Steps`                 | `steps-root`              |
| `StepsRootProvider`     | `steps-root-provider`     |
| `StepsList`             | `steps-list`              |
| `StepsItem`             | `steps-item`              |
| `StepsTrigger`          | `steps-trigger`           |
| `StepsIndicator`        | `steps-indicator`         |
| `StepsSeparator`        | `steps-separator`         |
| `StepsContent`          | `steps-content`           |
| `StepsCompletedContent` | `steps-completed-content` |
| `StepsPrevTrigger`      | `steps-prev-trigger`      |
| `StepsNextTrigger`      | `steps-next-trigger`      |
| `StepsProgress`         | `steps-progress`          |

Also exported: `StepsContext`, `StepsItemContext`, `useSteps`, `useStepsContext`,
`useStepsItemContext`, and the Ark part prop, details, and hook types.

- Every Ark root prop passes through (`count`, `step` / `defaultStep`, `linear`, `isStepValid`,
  `isStepSkippable`, `orientation`, `ids`, callbacks). Indexes are zero-based; the step value equals
  `count` when the flow is complete. moduix adds no state and does not translate callback details.
- `StepsIndicator` without children renders `index + 1`, or the shared check icon for a completed
  step. Children replace it. This is the only sugar; Ark leaves the indicator empty.

## Preservation notes

- Ark sets `role="tablist"`, `tab`, and `tabpanel`, `aria-current="step"`, `type="button"` and
  `disabled` on the previous and next triggers, `hidden` on inactive panels, and
  `role="progressbar"` with `aria-valuenow` on `StepsProgress`. Give `StepsProgress` an
  `aria-label`.
- Ark writes `--percent` on the root; the `StepsProgress` fill (`::before`) reads it.
- Do not render `Steps` and `StepsRootProvider` for one instance.

## Styling

- The root fills its container. Horizontal: the list sits above the content. Vertical: the list sits
  beside the content and stacks above it below `40rem`; a narrow horizontal list scrolls.
- Items share the row (`flex: 1 1 0`); the last item takes its content width and hides its separator.
- The vertical separator is positioned from the indicator size and the list gap, so both are CSS
  variables: `--moduix-steps-indicator-size` and `--moduix-steps-gap`. It keeps a `spacing-2` gap to
  both indicators. Change everything else with a class on the part.
- Indicator: outlined while incomplete (hover darkens it), foreground outline when current, filled with
  a check icon when complete. Content panels are muted `10rem` cards. Previous is an outline button,
  next is a solid foreground button.