# SplitButton

Upstream docs (accessed 2026-08-13):

- Ark UI: no dedicated Split Button primitive; use https://ark-ui.com/docs/components/menu and
  https://ark-ui.com/docs/guides/composition
- Chakra UI: https://chakra-ui.com/docs/components/button#split-menu
- shadcn/ui: https://ui.shadcn.com/docs/components/base/button-group and
  https://ui.shadcn.com/docs/components/base/dropdown-menu

## Purpose

`SplitButton` combines one primary action with an adjacent Ark Menu trigger for related alternate
actions.

## Upstream model to preserve

- There is no Ark Split Button state machine or anatomy to mirror directly.
- The menu popup behavior, keyboard navigation, focus lifecycle, controlled open state, callbacks,
  positioning, ids, lazy mounting, and typeahead come from the shared Ark-backed `Menu` wrapper.
- The primary action and trigger are moduix `Button` surfaces grouped with a Chakra-style attached
  visual treatment.
- Ark composition stays visible: popup structure is `SplitButtonPositioner -> SplitButtonContent`,
  not a hidden `SplitButtonContent` convenience wrapper.

## Current behavior contract

`SplitButton` inherits the Menu overlay contract: `SplitButtonPositioner` is portalled automatically by default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container. `SplitButtonPositioner` and `SplitButtonContent` remain explicit and styleable.

- The flat public API exposes `SplitButton` as the root and
  `SplitButtonAction`, `SplitButtonTrigger`, `SplitButtonPositioner`, and `SplitButtonContent` as
  its parts.
- The root renders a semantic `role="group"`; `aria-label` and `aria-labelledby` name the related
  controls without being forwarded into Ark Menu state props.
- Root props forward `Menu` behavior props, including `open`, `defaultOpen`,
  `onOpenChange(details)`, `onSelect(details)`, `closeOnSelect`, `positioning`, `ids`, `lazyMount`,
  `unmountOnExit`, and `typeahead`.
- Root `variant` and `size` provide shared defaults for `SplitButtonAction` and `SplitButtonTrigger`.
- `SplitButtonAction` forwards the shared `Button` API except root-provided `size` and `variant` become the
  default values.
- `SplitButtonTrigger` renders a moduix `Button` as the Ark `MenuTrigger` host and defaults to a
  chevron icon with `aria-label="More actions"` when no children are provided. Custom trigger content
  is passed through `children`; `SplitButtonTrigger` does not expose its own `asChild` path.
- `SplitButtonPositioner` and `SplitButtonContent` expose the real popup structure. Consumers place
  shared `Menu.*` rows inside `SplitButtonContent`.

## Anatomy and exported parts

```text
SplitButton
├─ SplitButtonAction
├─ SplitButtonTrigger
└─ Overlay subtree (automatically portalled)
   └─ SplitButtonPositioner
      └─ SplitButtonContent
         ├─ MenuItem
         ├─ MenuSeparator
         └─ other shared Menu parts
```

Every exported DOM part accepts `className` and receives stable styling hooks:

| Part                    | `data-slot`               | Notes                                           |
| ----------------------- | ------------------------- | ----------------------------------------------- |
| `SplitButton`           | `split-button-root`       | Semantic group around the two attached buttons. |
| `SplitButtonAction`     | `split-button-action`     | Primary Button action.                          |
| `SplitButtonTrigger`    | `split-button-trigger`    | Ark Menu trigger rendered through Button.       |
| `SplitButtonPositioner` | `split-button-positioner` | Ark Menu positioner with runtime CSS variables. |
| `SplitButtonContent`    | `split-button-content`    | Ark Menu content surface with menu state attrs. |

## Composition

```tsx
import { Menu, MenuTrigger, MenuItem, MenuSeparator } from '@moduix/react/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '@moduix/react/split-button';

export function SplitButtonExample() {
  return (
    <SplitButton>
      <SplitButtonAction>Save Changes</SplitButtonAction>
      <SplitButtonTrigger />
      <SplitButtonPositioner>
        <SplitButtonContent>
          <MenuItem value="save-draft">Save as Draft</MenuItem>
          <MenuItem value="duplicate">Duplicate</MenuItem>
          <MenuSeparator />
          <MenuItem value="publish">Publish Now</MenuItem>
        </SplitButtonContent>
      </SplitButtonPositioner>
    </SplitButton>
  );
}
```

## Upstream feature coverage

| Evidence                                                                             | Classification       | Moduix decision                                                                           |
| ------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------- |
| Ark Menu owns trigger, positioning, content, focus, and keyboard behavior.           | Required correctness | Preserve the shared `Menu` contract and explicit `Positioner -> Content` anatomy.         |
| Chakra composes an attached Button and Menu for its split-menu example.              | Consumer friction    | Keep shared root `variant` and `size` defaults with an attached visual treatment.         |
| shadcn Button Group uses `role="group"` and recommends a contextual accessible name. | Required correctness | Render a semantic group and accept `aria-label` or `aria-labelledby` on the root.         |
| shadcn exposes generic group separators and multiple overlay recipes.                | Rejected complexity  | Keep the focused SplitButton API instead of adding generic group or duplicate menu parts. |

- Ark Menu anatomy is preserved for the popup path through `SplitButtonPositioner`, `SplitButtonContent`, and
  shared `MenuItem`/group/checkbox/radio/separator rows.
- Ark Menu controlled and uncontrolled open state is preserved through root props and
  `onOpenChange(details)`.
- Ark Menu selection callbacks are preserved through root `onSelect(details)` and item-level
  `onSelect`.
- Ark Menu positioning, custom ids, lazy mounting, unmount-on-exit, typeahead, highlighted item
  state, disabled rows, links via `MenuItem asChild`, grouped rows, checkbox rows, and radio rows are
  available through the shared `Menu` parts inside `SplitButtonContent`.
- Ark Menu `RootProvider`, `Context`, item context, and hooks are intentionally not re-exported under
  `SplitButton` because Ark has no split-button primitive. Use the shared `Menu` API directly when
  external menu state or context reads are required.
- Chakra's split-menu recipe is covered by the attached Button + Menu grouping, but Chakra visual
  tokens are not copied.

## Accessibility and state

- The primary action is a real button by default and can use `asChild` for a single compatible custom
  child, such as a link.
- The attached controls are exposed as a semantic group. Consumers should provide `aria-label` or
  `aria-labelledby` when the surrounding context does not already identify the group.
- The trigger is a moduix `Button` host wired to Ark `MenuTrigger`; it receives menu keyboard
  behavior, `aria-expanded`, `aria-controls`, and state attributes from Ark.
- `SplitButtonTrigger` custom visible content goes through `children` on the built-in Button host
  so the Ark trigger and moduix Button contracts stay on the same element.
- Root callbacks keep Ark detail objects, including `onOpenChange(details)`.
- `SplitButtonPositioner` preserves Ark Menu positioning variables: `--reference-width`,
  `--reference-height`, `--available-width`, `--available-height`, `--x`, `--y`, `--z-index`, and
  `--transform-origin`.
- `SplitButtonContent` preserves Ark Menu content state attributes such as `data-state`,
  `data-placement`, `data-side`, `data-nested`, and `data-has-nested`.

## Defaults and styling

- Root `variant` defaults to `'default'`.
- Root `size` defaults to `'md'`, which uses Button's `--moduix-size-md` baseline.
- Root `positioning` defaults to `{ placement: 'bottom-end', gutter: 4 }`.
- `Trigger` defaults to `ChevronDownIcon` and `aria-label="More actions"` when icon-only.
- Root `variant` excludes `Button`'s `link` variant.
- Root `size` excludes icon-only button sizes.
- Shared Button and Menu variables still own the two controls and popup. The attached treatment is
  independently themeable through the public `--moduix-split-button-*` variables below.

| Variable                                     | Default                         |
| -------------------------------------------- | ------------------------------- |
| `--moduix-split-button-separator-color`      | `currentColor`                  |
| `--moduix-split-button-separator-inset`      | `var(--moduix-spacing-1-5)`     |
| `--moduix-split-button-separator-offset`     | `0`                             |
| `--moduix-split-button-separator-opacity`    | `0.16`                          |
| `--moduix-split-button-separator-width`      | `var(--moduix-border-width-sm)` |
| `--moduix-split-button-trigger-padding-x-xs` | `var(--moduix-spacing-2)`       |
| `--moduix-split-button-trigger-padding-x-sm` | `var(--moduix-spacing-2-5)`     |
| `--moduix-split-button-trigger-padding-x-md` | `var(--moduix-spacing-3)`       |
| `--moduix-split-button-trigger-padding-x-lg` | `var(--moduix-spacing-3-5)`     |
| `--moduix-split-button-trigger-padding-x-xl` | `var(--moduix-spacing-4)`       |

## Intentional sugar and differences from upstream

- `SplitButton` is a moduix-owned composition, not an Ark primitive wrapper.
- Shared root `variant` and `size` defaults are local sugar over Button.
- The default chevron trigger is local sugar over Menu Trigger.
- Flat named exports (`SplitButtonAction`, `SplitButtonTrigger`, `SplitButtonPositioner`, and
  `SplitButtonContent`) are the public component parts. Use them with the `SplitButton` root.
- Ark prop and utility types are not re-exported from moduix. Import upstream types directly only
  when a consumer needs them.
- `SplitButtonContent` is the actual menu content part. It does not render `Positioner`
  internally.

## Agent notes

- Do not add a fake split-button provider/context API. Use `Menu` state helpers directly for advanced
  menu state patterns.
- Keep popup structure explicit. Do not reintroduce a wrapper that hides `Positioner`.
- Preserve the grouped visual contract by keeping action and trigger radii and border overlap
  coordinated.
- Keep alternate actions on shared `Menu.*` rows rather than adding split-button-specific item parts.

## Local changelog

- 2026-08-13: Added semantic group markup and contextual group naming through `aria-label` and
  `aria-labelledby`; synchronized interaction coverage, stories, localized docs, and registry output.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Documented that the default `md` action and trigger inherit Button's compact `--moduix-size-md` baseline.

- 2026-07-07: Removed the trigger-level `asChild` escape hatch so `SplitButtonTrigger` keeps one
  stable Ark Menu trigger host instead of a nested `asChild` chain.
- 2026-07-03: Removed `SplitButton` prop/type re-exports from the public moduix surface. Use the
  flat parts directly and import upstream helper types from Ark only when needed.
- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-27: Clarified the trigger DOM contract after the Ark Menu migration: the host keeps the
  Button data scope with `data-slot="split-button-trigger"` while Ark supplies trigger ARIA, state,
  keyboard behavior, and focus management.
- Added `SplitButton` as a composition-first grouped action built from the moduix `Button` and
  `Menu` wrappers.
- 2026-06-17: Updated the primary action contract from Base button composition props to Ark-style
  `asChild` through the shared `Button` surface.
- 2026-06-18: Synced SplitButton with Ark-backed `Menu`: root positioning moved to `SplitButton`
  through `positioning`, `SplitButtonTrigger` uses `MenuTrigger asChild`, and snippets now use Ark
  `MenuItem value`.
- 2026-06-21: Completed Ark-style migration for the no-primitive split-button composition: removed
  the namespace-first part assembly, adopted flat part exports, exposed explicit
  `Positioner -> Content` popup structure, and documented Ark Menu as the behavior source.