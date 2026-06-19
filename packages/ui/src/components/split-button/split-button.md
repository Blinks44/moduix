---
title: SplitButton
subtitle: Primary action plus a related dropdown built from the moduix Button and Menu wrappers.
description: moduix split button composition with shared size and variant defaults, a ready-made Ark menu trigger, and a default popup content wrapper.
---

# SplitButton

Upstream primitive docs:

- https://ark-ui.com/docs/guides/composition
- https://ark-ui.com/docs/components/menu

`SplitButton` combines a primary `Button.Root` action with a secondary menu trigger. It keeps
Button and Menu behavior intact, but adds the grouped visual treatment and a small composition
contract for the common split-action case.

## Purpose

Use `SplitButton` when one action is the default path, but nearby alternate actions belong in a
small dropdown.

Common examples:

- save vs save as draft
- publish now vs publish later
- create vs create from template
- share vs other share actions

## What is specific to moduix

moduix adds:

- `SplitButton` root that hosts `Menu` state and the grouped visual wrapper.
- shared `variant` and `size` defaults for the primary action and trigger.
- `SplitButtonAction` as the primary button part.
- `SplitButtonTrigger` as a menu trigger that renders a `Button.Root` by default.
- `SplitButtonContent` as the default `Portal -> Menu.Positioner -> Menu.Content` popup wrapper.
- stable `data-slot` hooks for the grouped root, action, and trigger.

The dropdown rows themselves stay on the shared menu API. Use `Menu.Item`, `Menu.Separator`,
`Menu.ItemGroup`, and other menu parts inside `SplitButtonContent`.

## Recommended composition

```tsx
import { SplitButton, SplitButtonAction, SplitButtonContent, SplitButtonTrigger } from 'moduix';

export function Example() {
  return (
    <SplitButton>
      <SplitButtonAction>Save Changes</SplitButtonAction>
      <SplitButtonTrigger />
      <SplitButtonContent>
        <Menu.Item value="save-draft">Save as Draft</Menu.Item>
        <Menu.Item value="duplicate">Duplicate</Menu.Item>
        <Menu.Separator />
        <Menu.Item value="publish">Publish Now</Menu.Item>
      </SplitButtonContent>
    </SplitButton>
  );
}
```

Keep the primary action explicit on `SplitButtonAction`. Put only secondary or alternate actions in
`SplitButtonContent`.

## Parts

| Export               | Role                                                                   |
| -------------------- | ---------------------------------------------------------------------- |
| `SplitButton`        | Root menu state plus grouped visual wrapper.                           |
| `SplitButtonAction`  | Primary action button. Inherits root `variant` and `size` by default.  |
| `SplitButtonTrigger` | Secondary trigger button for the dropdown. Defaults to a chevron icon. |
| `SplitButtonContent` | Recommended popup wrapper around `Menu.Content`.                       |

## Public props

### `SplitButton`

`SplitButton` forwards Ark menu root props such as `open`, `defaultOpen`,
`onOpenChange(details)`, `closeOnSelect`, `positioning`, and `ids`.

| Prop        | Type                                                                                         | Default     | Notes                                                            |
| ----------- | -------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------- |
| `variant`   | `'default' \| 'outline' \| 'secondary' \| 'destructive' \| 'destructive-outline' \| 'ghost'` | `'default'` | Shared default for `SplitButtonAction` and `SplitButtonTrigger`. |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                       | `'md'`      | Shared default for `SplitButtonAction` and `SplitButtonTrigger`. |
| `className` | `string`                                                                                     | -           | Applied to the grouped wrapper element.                          |

### `SplitButtonAction`

`SplitButtonAction` forwards `Button.Root` props except that the default `variant` and `size` come from
`SplitButton` unless you override them on the action itself.

### `SplitButtonTrigger`

`SplitButtonTrigger` forwards Ark menu trigger props such as `disabled` and `asChild`, but it
intentionally owns the default rendered button.

| Prop         | Type                          | Default           | Notes                                                             |
| ------------ | ----------------------------- | ----------------- | ----------------------------------------------------------------- |
| `variant`    | same as `SplitButton.variant` | root value        | Overrides the shared visual variant for the trigger only.         |
| `size`       | same as `SplitButton.size`    | root value        | Overrides the shared size for the trigger only.                   |
| `aria-label` | `string`                      | `'More actions'`  | Applied automatically when the trigger has only the default icon. |
| `children`   | `ReactNode`                   | `ChevronDownIcon` | Replace when the trigger should render custom content.            |

### `SplitButtonContent`

`SplitButtonContent` exports the same type as `MenuContentProps` and renders Ark popup structure
for the common path. Configure popup placement on `SplitButton` through the Ark `positioning` root
prop. The root default is `{ placement: 'bottom-end', gutter: 4 }`.

## Styling and slots

The grouped parts expose:

- `data-slot="split-button-root"`
- `data-slot="split-button-action"`
- `data-slot="split-button-trigger"`

`SplitButton` does not add dedicated `--split-button-*` theme variables. It relies on the existing
`Button.Root` styling contract, so color, sizing, radius, border, and focus styling still come from the
shared `--button-*` variables.

## Intentional differences from Button and Menu

- `SplitButtonTrigger` no longer exposes the Base UI `render` prop; use Ark `asChild` only when a
  custom host is required.
- `SplitButtonAction` follows the Ark-style `Button.Root` surface, so `asChild` replaces Base
  `render` / `nativeButton` for link-like primary actions.
- Dropdown content stays on the shared menu building blocks instead of duplicating menu items under a
  separate split-button namespace.
- The root `variant` excludes the `link` button variant because grouped link-style split buttons do
  not form a coherent control.
- The root `size` excludes icon-only button sizes because the primary action is expected to keep a
  visible label in the default path.

## Agent notes

- Preserve the grouped visual contract by keeping radii and border overlap coordinated between the
  action and trigger.
- Keep menu rows on the shared `Menu*` API unless there is a strong user-facing reason to fork them.
- If dedicated split-button CSS variables are added later, register them in `theme.css` and document
  them here and in docs.

## Local changelog

- Added `SplitButton` as a composition-first grouped action built from the moduix `Button` and
  `Menu` wrappers.
- 2026-06-17: Updated the primary action contract from Base button composition props to Ark-style
  `asChild` through the shared `Button.Root` surface.
- 2026-06-18: Synced SplitButton with Ark-backed `Menu`: root positioning moved to `SplitButton`
  through `positioning`, `SplitButtonTrigger` uses `Menu.Trigger asChild`, and snippets now use
  Ark `Menu.Item value`.