# Steps

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/steps

## Purpose

`Steps` guides users through a numbered process with Ark UI state, accessibility, keyboard, and navigation behavior.

## Upstream model to preserve

The wrapper follows Ark UI `@ark-ui/react/steps`. Preserve the Ark part tree: `Root`, `RootProvider`, `List`, `Item`, `Trigger`, `Indicator`, `Separator`, `Content`, `CompletedContent`, `PrevTrigger`, `NextTrigger`, and `Progress`.

Ark owns `count`, zero-based `index`, `step/defaultStep`, `onStepChange(details)`, `onStepComplete`, `linear`, `isStepValid`, `isStepSkippable`, `onStepInvalid(details)`, `orientation`, `ids`, tablist/tabpanel ARIA, progress percentage, and previous/next navigation.

## Current behavior contract

Consumers import `Steps` from `moduix` and use the short root form:

```tsx
import { Steps } from '@moduix/react/steps';

export function Example() {
  return (
    <Steps count={items.length}>
      <Steps.List>
        {items.map((item, index) => (
          <Steps.Item key={item.title} index={index}>
            <Steps.Trigger>
              <Steps.Indicator />
              <span>{item.title}</span>
            </Steps.Trigger>
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>

      {items.map((item, index) => (
        <Steps.Content key={item.title} index={index}>
          {item.description}
        </Steps.Content>
      ))}

      <Steps.CompletedContent>Done</Steps.CompletedContent>
      <Steps.PrevTrigger>Back</Steps.PrevTrigger>
      <Steps.NextTrigger>Next</Steps.NextTrigger>
    </Steps>
  );
}
```

`Steps.Indicator` is the only intentional visual sugar: when no children are provided, it renders `index + 1` or the shared check icon for completed steps.

## Anatomy and exported parts

```text
Steps
├─ Steps.Progress
├─ Steps.List
│  └─ Steps.Item[index]
│     ├─ Steps.Trigger
│     │  └─ Steps.Indicator
│     └─ Steps.Separator
├─ Steps.Content[index]
├─ Steps.CompletedContent
├─ Steps.PrevTrigger
└─ Steps.NextTrigger

Steps.RootProvider
└─ same part tree connected to Steps.useSteps()
```

| Export                   | `data-slot`               | Notes                                                                              |
| ------------------------ | ------------------------- | ---------------------------------------------------------------------------------- |
| `Steps`                  | `steps-root`              | Root Ark state machine and default export shape.                                   |
| `Steps.RootProvider`     | `steps-root-provider`     | Uses a `Steps.useSteps()` store; do not pair with `Steps.Root` for the same store. |
| `Steps.List`             | `steps-list`              | Ark tablist.                                                                       |
| `Steps.Item`             | `steps-item`              | Requires zero-based `index`.                                                       |
| `Steps.Trigger`          | `steps-trigger`           | Ark tab button, supports `asChild`.                                                |
| `Steps.Indicator`        | `steps-indicator`         | Defaults to number/check icon when children are omitted.                           |
| `Steps.Separator`        | `steps-separator`         | Real Ark connector part.                                                           |
| `Steps.Content`          | `steps-content`           | Ark tabpanel for a matching `index`.                                               |
| `Steps.CompletedContent` | `steps-completed-content` | Ark tabpanel for completion state.                                                 |
| `Steps.PrevTrigger`      | `steps-prev-trigger`      | Previous-step button.                                                              |
| `Steps.NextTrigger`      | `steps-next-trigger`      | Next-step button.                                                                  |
| `Steps.Progress`         | `steps-progress`          | Progressbar using Ark `--percent`.                                                 |

`Steps.useSteps()` creates state for `Steps.RootProvider`. `useStepsContext`,
`useStepsItemContext`, `Steps.Context`, and `Steps.ItemContext` are exported from `@moduix/react`
as low-level Ark-shaped APIs.

## Composition

Use `Steps` for normal usage. Use `Steps.RootProvider` only when state is created outside with
`Steps.useSteps()`.

Use `asChild` instead of the removed legacy `render` prop:

```tsx
<Steps.Trigger asChild>
  <a href="#billing">
    <Steps.Indicator />
    <span>Billing</span>
  </a>
</Steps.Trigger>
```

## Upstream feature coverage

Official Ark examples are covered in docs: Basic, Controlled, Root Provider, Vertical, and
Validation. Moduix also documents `asChild`, `Steps.Progress`, custom CSS variables, and the
default indicator sugar.

Supported upstream behavior includes controlled/uncontrolled state, completion state via `count`, `PrevTrigger`/`NextTrigger`, `RootProvider`, root and item contexts, vertical orientation, `ids`, `linear`, validation callbacks, and skippable-step callbacks.

## Accessibility and state

Ark provides `role="tablist"` on `Steps.List`, `role="tab"` on triggers, `role="tabpanel"` on content, `aria-controls`, `aria-labelledby`, `aria-current="step"`, `aria-selected`, `aria-orientation`, and disabled state for previous/next triggers.

Use `Steps.useSteps()` for externally owned state. Use `useStepsContext`,
`useStepsItemContext`, `Steps.Context`, or `Steps.ItemContext` for inline root and item-state
reads. Callback payloads stay Ark-shaped: `onStepChange(details)` exposes `details.step`, and
`onStepInvalid(details)` exposes `details.step`, `details.action` (`'next'` or `'set'`), and the
optional `details.targetStep`.

Important data/state hooks: `data-scope="steps"`, `data-part`, `data-orientation`, `data-current`, `data-complete`, `data-incomplete`, `data-state="open" | "closed"` on triggers and content, `data-skippable`, `data-complete` on progress, and Ark `--percent` on the root.

## Defaults and styling

The CSS keeps Moduix density, tokens, focus rings, rounded indicators, connector behavior, and button styling while using Ark state attributes. Vertical layouts place navigation beside content on wide screens and above it below `40rem`. Public styling uses `data-slot` hooks and `--moduix-steps-*` variables in `packages/react/src/styles/variables-moduix.css`.

Root class names apply to both `Steps.Root` and `Steps.RootProvider`. `Steps.Progress` renders a track/fill through CSS using the Ark `--percent` runtime variable. Incomplete trigger text styles target Ark `data-incomplete`; completed triggers keep normal inherited text color unless consumers override the state hooks.

## Public CSS variable contract

The public `--moduix-steps-*` contract is listed below. Keep it synchronized with
`Steps.module.css`, `variables-moduix.css`, and the CSS Properties panel in the public docs.

- Layout and state: `--moduix-steps-color`, `--moduix-steps-max-width`, `--moduix-steps-root-gap`, `--moduix-steps-vertical-gap`, `--moduix-steps-gap`, `--moduix-steps-vertical-item-min-height`, `--moduix-steps-trigger-gap`, `--moduix-steps-trigger-radius`, `--moduix-steps-trigger-color-incomplete`, `--moduix-steps-disabled-opacity`
- Focus ring: `--moduix-steps-focus-ring-width`, `--moduix-steps-focus-ring-color`, `--moduix-steps-focus-ring-offset`
- Indicator base and dimensions: `--moduix-steps-indicator-size`, `--moduix-steps-indicator-icon-size`, `--moduix-steps-indicator-border-width`, `--moduix-steps-indicator-radius`, `--moduix-steps-indicator-bg`, `--moduix-steps-indicator-border-color`, `--moduix-steps-indicator-color`, `--moduix-steps-indicator-font-size`, `--moduix-steps-indicator-font-weight`
- Indicator states: `--moduix-steps-indicator-bg-current`, `--moduix-steps-indicator-bg-complete`, `--moduix-steps-indicator-border-color-current`, `--moduix-steps-indicator-border-color-complete`, `--moduix-steps-indicator-border-color-hover`, `--moduix-steps-indicator-color-current`, `--moduix-steps-indicator-color-complete`, `--moduix-steps-indicator-color-hover`
- Separator: `--moduix-steps-separator-thickness`, `--moduix-steps-separator-min-width`, `--moduix-steps-separator-inset`, `--moduix-steps-separator-color`, `--moduix-steps-separator-color-complete`
- Content: `--moduix-steps-content-min-height`, `--moduix-steps-content-padding-x`, `--moduix-steps-content-padding-y`, `--moduix-steps-content-radius`, `--moduix-steps-content-bg`, `--moduix-steps-content-color`, `--moduix-steps-content-font-size`, `--moduix-steps-content-line-height`, `--moduix-steps-completed-content-color`, `--moduix-steps-completed-content-font-weight`
- Previous/next actions: `--moduix-steps-action-height`, `--moduix-steps-action-gap`, `--moduix-steps-action-border-width`, `--moduix-steps-action-border-color`, `--moduix-steps-action-radius`, `--moduix-steps-action-padding-x`, `--moduix-steps-action-padding-y`, `--moduix-steps-action-bg`, `--moduix-steps-action-bg-hover`, `--moduix-steps-action-color`, `--moduix-steps-action-font-size`, `--moduix-steps-action-line-height`, `--moduix-steps-next-action-bg`, `--moduix-steps-next-action-bg-hover`, `--moduix-steps-next-action-border-color`, `--moduix-steps-next-action-color`
- Progress: `--moduix-steps-progress-height`, `--moduix-steps-progress-radius`, `--moduix-steps-progress-bg`, `--moduix-steps-progress-fill-bg`

## Intentional sugar and differences from upstream

`Steps.Indicator` renders `index + 1` or a check icon by default. Upstream Ark leaves indicator content fully consumer-owned.

This migration intentionally removes the old `Stepper` contract: no flat part exports, no `currentStep`, no one-based item step prop, no status override, no `render` prop, and no old title/description/text wrappers. Use Ark `asChild` and regular DOM/content composition instead.

## Agent notes

Do not re-add legacy primitive imports or compatibility aliases. Keep future changes aligned with Ark part names and zero-based state. `Steps.useSteps()` is the moduix-owned state factory for `RootProvider`; the exported context APIs remain low-level Ark-shaped escape hatches. If a new Ark `Steps` part or hook appears upstream, mirror it through `Steps` and the barrel unless there is a documented reason not to.

When changing styling hooks or variables, update `Steps.module.css`, `variables-moduix.css`, stories, docs examples, `website/docs/en/docs/steps.mdx`, and this file together.

## Local changelog

- 2026-08-13: Documented the complete CSS-variable contract and verified linear-validation behavior for direct and next-step navigation.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-31: Moved the focus ring to the trigger so custom compositions remain visible, made the vertical separator RTL-safe, made narrow layouts scroll or stack safely, and synchronized tests and documentation with the exported context APIs.
- 2026-07-11: Exposed `Steps.useSteps()` for the documented `RootProvider` path so consumers do not need a mixed moduix/Ark import for externally owned state.
- 2026-07-03: Simplified the moduix surface to match `combobox`: kept `RootProvider` and visual
  parts, removed re-exported Ark state APIs/types, and pointed advanced state imports to
  `@ark-ui/react/steps`.
- 2026-06-27: Audited the Ark UI migration, tightened incomplete trigger/progress styling to current Ark data attributes, removed docs-only playground leftovers, and aligned docs snippets with the shipped composition.
- 2026-06-21: Migrated `Stepper` to Ark UI `Steps`, renamed the component and registry surface to `steps`, removed legacy render compatibility, adopted Ark state/callback/index contracts, added real content/completed/progress/navigation parts, and documented the breaking API.