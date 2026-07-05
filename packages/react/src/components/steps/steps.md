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
import { Steps } from '@moduix/react';

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
Steps.Root
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
└─ same part tree connected to Ark useSteps()
```

| Export                   | `data-slot`               | Notes                                                                             |
| ------------------------ | ------------------------- | --------------------------------------------------------------------------------- |
| `Steps` / `Steps.Root`   | `steps-root`              | Root Ark state machine and default export shape.                                  |
| `Steps.RootProvider`     | `steps-root-provider`     | Uses an Ark `useSteps()` store; do not pair with `Steps.Root` for the same store. |
| `Steps.List`             | `steps-list`              | Ark tablist.                                                                      |
| `Steps.Item`             | `steps-item`              | Requires zero-based `index`.                                                      |
| `Steps.Trigger`          | `steps-trigger`           | Ark tab button, supports `asChild`.                                               |
| `Steps.Indicator`        | `steps-indicator`         | Defaults to number/check icon when children are omitted.                          |
| `Steps.Separator`        | `steps-separator`         | Real Ark connector part.                                                          |
| `Steps.Content`          | `steps-content`           | Ark tabpanel for a matching `index`.                                              |
| `Steps.CompletedContent` | `steps-completed-content` | Ark tabpanel for completion state.                                                |
| `Steps.PrevTrigger`      | `steps-prev-trigger`      | Previous-step button.                                                             |
| `Steps.NextTrigger`      | `steps-next-trigger`      | Next-step button.                                                                 |
| `Steps.Progress`         | `steps-progress`          | Progressbar using Ark `--percent`.                                                |

Advanced Ark state helpers such as `useSteps`, `useStepsContext`, `useStepsItemContext`,
`Steps.Context`, and `Steps.ItemContext` are imported directly from `@ark-ui/react/steps` when
needed.

## Composition

Use `Steps.Root` or the short `Steps` root for normal usage. Use `Steps.RootProvider` only when
state is created outside with Ark `useSteps()`.

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

Official Ark examples are covered in stories and docs: Basic, Controlled, Root Provider, and Vertical. Moduix also documents `asChild`, `Steps.Progress`, custom CSS variables, and the default indicator sugar.

Supported upstream behavior includes controlled/uncontrolled state, completion state via `count`, `PrevTrigger`/`NextTrigger`, `RootProvider`, root and item contexts, vertical orientation, `ids`, `linear`, validation callbacks, and skippable-step callbacks.

## Accessibility and state

Ark provides `role="tablist"` on `Steps.List`, `role="tab"` on triggers, `role="tabpanel"` on content, `aria-controls`, `aria-labelledby`, `aria-current="step"`, `aria-selected`, `aria-orientation`, and disabled state for previous/next triggers.

Use Ark state hooks directly from `@ark-ui/react/steps` for inline root reads, item state, and
externally owned state. Callback payloads stay Ark-shaped, such as `onStepChange(details)` with
`details.step`.

Important data/state hooks: `data-scope="steps"`, `data-part`, `data-orientation`, `data-current`, `data-complete`, `data-incomplete`, `data-state="open" | "closed"` on triggers and content, `data-skippable`, `data-complete` on progress, and Ark `--percent` on the root.

## Defaults and styling

The CSS keeps Moduix density, tokens, focus rings, rounded indicators, connector behavior, and button styling while using Ark state attributes. Public styling uses `data-slot` hooks and `--steps-*` variables in `packages/react/src/lib/moduix/styles/theme.css`.

Root class names apply to both `Steps.Root` and `Steps.RootProvider`. `Steps.Progress` renders a track/fill through CSS using the Ark `--percent` runtime variable. Incomplete trigger text styles target Ark `data-incomplete`; completed triggers keep normal inherited text color unless consumers override the state hooks.

## Intentional sugar and differences from upstream

`Steps.Indicator` renders `index + 1` or a check icon by default. Upstream Ark leaves indicator content fully consumer-owned.

This migration intentionally removes the old `Stepper` contract: no flat part exports, no `currentStep`, no one-based item step prop, no status override, no `render` prop, and no old title/description/text wrappers. Use Ark `asChild` and regular DOM/content composition instead.

## Agent notes

Do not re-add legacy primitive imports or compatibility aliases. Keep future changes aligned with Ark part names and zero-based state. If a new Ark `Steps` part or hook appears upstream, mirror it through `Steps` and the barrel unless there is a documented reason not to.

When changing styling hooks or variables, update `Steps.module.css`, `theme.css`, stories, docs examples, `apps/docs/content/docs/steps.mdx`, and this file together.

## Local changelog

- 2026-07-03: Simplified the moduix surface to match `combobox`: kept `RootProvider` and visual
  parts, removed re-exported Ark state APIs/types, and pointed advanced state imports to
  `@ark-ui/react/steps`.
- 2026-06-27: Audited the Ark UI migration, tightened incomplete trigger/progress styling to current Ark data attributes, removed docs-only playground leftovers, and aligned docs snippets with the shipped composition.
- 2026-06-21: Migrated `Stepper` to Ark UI `Steps`, renamed the component and registry surface to `steps`, removed legacy render compatibility, adopted Ark state/callback/index contracts, added real content/completed/progress/navigation parts, and documented the breaking API.