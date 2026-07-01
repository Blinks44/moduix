# SplitButton

Upstream docs:

- Ark UI: no dedicated Split Button primitive; use https://ark-ui.com/docs/components/menu and
  https://ark-ui.com/docs/guides/composition
- Chakra UI: https://chakra-ui.com/docs/components/button#split-menu

## Purpose

`SplitButton` combines one primary action with an adjacent Ark Menu trigger for related alternate
actions.

## Upstream model to preserve

- There is no Ark Split Button state machine or anatomy to mirror directly.
- The menu popup behavior, keyboard navigation, focus lifecycle, controlled open state, callbacks,
  positioning, ids, lazy mounting, and typeahead come from the shared Ark-backed `Menu` wrapper.
- The primary action and trigger are moduix `Button` surfaces grouped with a Chakra-style attached
  visual treatment.
- Ark composition stays visible: popup structure is `Positioner -> Content`, not a hidden
  `Content` convenience wrapper.

## Current behavior contract

`SplitButton.Root` inherits the Menu overlay contract: `Positioner` is portalled automatically by default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container. `Positioner` and `Content` remain explicit and styleable.

- Public API is namespace-first for split-button-owned parts: `SplitButton`,
  `SplitButton.Root`, `SplitButton.Action`, `SplitButton.Trigger`, `SplitButton.Positioner`, and
  `SplitButton.Content`.
- `SplitButton` is the short root form and is equivalent to `SplitButton.Root`.
- Root props forward `Menu.Root` behavior props, including `open`, `defaultOpen`,
  `onOpenChange(details)`, `onSelect(details)`, `closeOnSelect`, `positioning`, `ids`, `lazyMount`,
  `unmountOnExit`, and `typeahead`.
- Root `variant` and `size` provide shared defaults for `Action` and `Trigger`.
- `Action` forwards the shared `Button` API except root-provided `size` and `variant` become the
  default values.
- `Trigger` renders a moduix `Button` as the Ark `Menu.Trigger` host and defaults to a chevron icon
  with `aria-label="More actions"` when no children are provided.
- `SplitButton.Positioner` and `SplitButton.Content` expose the real popup
  structure. Consumers place shared `Menu.*` rows inside `SplitButton.Content`.

## Anatomy and exported parts

```text
SplitButton.Root
├─ SplitButton.Action
├─ SplitButton.Trigger
└─ Overlay subtree (automatically portalled)
   └─ SplitButton.Positioner
      └─ SplitButton.Content
         ├─ Menu.Item
         ├─ Menu.Separator
         └─ other shared Menu parts
```

Every exported DOM part accepts `className` and receives stable styling hooks:

| Part                     | `data-slot`               | Notes                                           |
| ------------------------ | ------------------------- | ----------------------------------------------- |
| `SplitButton.Root`       | `split-button-root`       | Grouped visual wrapper around the two buttons.  |
| `SplitButton.Action`     | `split-button-action`     | Primary Button action.                          |
| `SplitButton.Trigger`    | `split-button-trigger`    | Ark Menu trigger rendered through Button.       |
| `SplitButton.Positioner` | `split-button-positioner` | Ark Menu positioner with runtime CSS variables. |
| `SplitButton.Content`    | `split-button-content`    | Ark Menu content surface with menu state attrs. |

## Composition

```tsx
import { Menu, SplitButton } from '@moduix/react';

export function SplitButtonExample() {
  return (
    <SplitButton>
      <SplitButton.Action>Save Changes</SplitButton.Action>
      <SplitButton.Trigger />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.Item value="save-draft">Save as Draft</Menu.Item>
          <Menu.Item value="duplicate">Duplicate</Menu.Item>
          <Menu.Separator />
          <Menu.Item value="publish">Publish Now</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}
```

## Upstream feature coverage

- Ark Menu anatomy is preserved for the popup path through `Positioner`, `Content`, and
  shared `Menu.Item`/group/checkbox/radio/separator rows.
- Ark Menu controlled and uncontrolled open state is preserved through root props and
  `onOpenChange(details)`.
- Ark Menu selection callbacks are preserved through root `onSelect(details)` and item-level
  `onSelect`.
- Ark Menu positioning, custom ids, lazy mounting, unmount-on-exit, typeahead, highlighted item
  state, disabled rows, links via `Menu.Item asChild`, grouped rows, checkbox rows, and radio rows are
  available through the shared `Menu` parts inside `SplitButton.Content`.
- Ark Menu `RootProvider`, `Context`, item context, and hooks are intentionally not re-exported under
  `SplitButton` because Ark has no split-button primitive. Use the shared `Menu` API directly when
  external menu state or context reads are required.
- Chakra's split-menu recipe is covered by the attached Button + Menu grouping, but Chakra visual
  tokens are not copied.

## Accessibility and state

- The primary action is a real button by default and can use `asChild` for a single compatible custom
  child, such as a link.
- The trigger is a moduix `Button` host wired to Ark `Menu.Trigger`; it receives menu keyboard
  behavior, `aria-expanded`, `aria-controls`, and state attributes from Ark.
- `SplitButton.Trigger` `asChild` is forwarded to the inner Button. Use it only with one semantic
  child that can receive button props, Ark Menu trigger ARIA, and keyboard behavior.
- Root callbacks keep Ark detail objects, including `onOpenChange(details)`.
- `SplitButton.Positioner` preserves Ark Menu positioning variables: `--reference-width`,
  `--reference-height`, `--available-width`, `--available-height`, `--x`, `--y`, `--z-index`, and
  `--transform-origin`.
- `SplitButton.Content` preserves Ark Menu content state attributes such as `data-state`,
  `data-placement`, `data-side`, `data-nested`, and `data-has-nested`.

## Defaults and styling

- Root `variant` defaults to `'default'`.
- Root `size` defaults to `'md'`.
- Root `positioning` defaults to `{ placement: 'bottom-end', gutter: 4 }`.
- `Trigger` defaults to `ChevronDownIcon` and `aria-label="More actions"` when icon-only.
- Root `variant` excludes `Button`'s `link` variant.
- Root `size` excludes icon-only button sizes.
- The component does not define public `--split-button-*` theme variables. It relies on shared
  Button and Menu variables, plus component CSS for border radius and separator treatment.

## Intentional sugar and differences from upstream

- `SplitButton` is a moduix-owned composition, not an Ark primitive wrapper.
- Shared root `variant` and `size` defaults are local sugar over Button.
- The default chevron trigger is local sugar over Menu Trigger.
- Flat named exports (`SplitButtonAction`, `SplitButtonTrigger`, `SplitButtonContent`) are removed;
  use `SplitButton.Action`, `SplitButton.Trigger`, and explicit popup parts.
- `SplitButton.Content` is the actual menu content part. It does not render `Positioner`
  internally.

## Agent notes

- Do not add a fake split-button provider/context API. Use `Menu` state helpers directly for advanced
  menu state patterns.
- Keep popup structure explicit. Do not reintroduce a wrapper that hides `Positioner`.
- Preserve the grouped visual contract by keeping action and trigger radii and border overlap
  coordinated.
- Keep alternate actions on shared `Menu.*` rows rather than adding split-button-specific item parts.

## Local changelog

- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-27: Clarified the trigger DOM contract after the Ark Menu migration: the host keeps the
  Button data scope with `data-slot="split-button-trigger"` while Ark supplies trigger ARIA, state,
  keyboard behavior, and focus management.
- Added `SplitButton` as a composition-first grouped action built from the moduix `Button` and
  `Menu` wrappers.
- 2026-06-17: Updated the primary action contract from Base button composition props to Ark-style
  `asChild` through the shared `Button.Root` surface.
- 2026-06-18: Synced SplitButton with Ark-backed `Menu`: root positioning moved to `SplitButton`
  through `positioning`, `SplitButtonTrigger` uses `Menu.Trigger asChild`, and snippets now use Ark
  `Menu.Item value`.
- 2026-06-21: Completed Ark-style migration for the no-primitive split-button composition: removed
  flat part exports, adopted namespace-first `SplitButton.*` parts, exposed explicit
  `Portal -> Positioner -> Content` popup structure, and documented Ark Menu as the behavior source.