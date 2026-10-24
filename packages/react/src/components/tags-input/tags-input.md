# TagsInput

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/tags-input
- Chakra UI: https://chakra-ui.com/docs/components/tags-input
- Zag API: https://zagjs.com/components/react/tags-input

## Purpose

`TagsInput` lets users enter, edit, remove, and submit a list of string tags from one input-like
control. Ark owns the state machine, keyboard navigation, focus, validation, translations, and data
attributes; the wrapper adds classes, `data-slot` hooks, default icons, and `TagsInputItems`.

## Anatomy

```text
TagsInput (or TagsInputRootProvider)
├─ TagsInputLabel
├─ TagsInputControl
│  ├─ TagsInputItems                 (sugar for the item tree below)
│  │  └─ TagsInputItem
│  │     ├─ TagsInputItemPreview
│  │     │  ├─ TagsInputItemText
│  │     │  └─ TagsInputItemDeleteTrigger
│  │     └─ TagsInputItemInput
│  ├─ TagsInputInput
│  └─ TagsInputClearTrigger
└─ TagsInputHiddenInput              (only for native forms)
```

| Export                       | `data-slot`                      | Notes                                        |
| ---------------------------- | -------------------------------- | -------------------------------------------- |
| `TagsInput`                  | `tags-input-root`                | Ark root.                                    |
| `TagsInputRootProvider`      | `tags-input-root-provider`       | Root for state from `useTagsInput`.          |
| `TagsInputLabel`             | `tags-input-label`               |                                              |
| `TagsInputControl`           | `tags-input-control`             | Input shell; wraps tags.                     |
| `TagsInputItems`             | none                             | Renders the standard item tree from context. |
| `TagsInputItem`              | `tags-input-item`                | Requires `index` and `value`.                |
| `TagsInputItemPreview`       | `tags-input-item-preview`        | Visible tag.                                 |
| `TagsInputItemText`          | `tags-input-item-text`           | Truncates with an ellipsis.                  |
| `TagsInputItemDeleteTrigger` | `tags-input-item-delete-trigger` | `CloseIcon` when it has no children.         |
| `TagsInputItemInput`         | `tags-input-item-input`          | Edit-mode input; keep it inside the item.    |
| `TagsInputInput`             | `tags-input-input`               | Entry input.                                 |
| `TagsInputClearTrigger`      | `tags-input-clear-trigger`       | Shared `CloseButton` unless `asChild`.       |
| `TagsInputHiddenInput`       | none                             | Ark part re-exported as is.                  |
| `TagsInputContext`           | none                             | Ark render-prop root context.                |
| `TagsInputItemContext`       | none                             | Ark render-prop item context.                |

Hooks `useTagsInput`, `useTagsInputContext`, and `useTagsInputItemContext` and the Ark prop and
detail types are re-exported from `@ark-ui/react/tags-input`.

## Behavior contract

- Ark props, callbacks, and detail objects pass through unchanged; there are no local aliases.
- `TagsInputItems` has no props. For custom tag content, map `tagsInput.value` from
  `TagsInputContext` and compose the item parts; the "Advanced customization" example does this.
- `TagsInputClearTrigger` renders `CloseButton` through Ark `asChild`, so Ark's label
  (`translations.clearTriggerLabel`, default `Clear all tags`), anatomy, `disabled`, and `hidden`
  land on that button. Custom children replace the icon. `aria-label` and `aria-labelledby` pass
  through. With `asChild` the child owns its host and visuals.
- Native forms need an explicit `TagsInputHiddenInput` and `name` on the root.
- The React module declares `'use client'`.

## Styling

- The root is 24rem wide and never exceeds its container. The one-line control is
  `--moduix-size-md` high; wrapped tags grow it.
- Read-only hides the entry input, item delete triggers, and the clear trigger.
- A disabled root dims once. Inside a disabled Field or Fieldset the root does not dim again. An item
  delete trigger dims on its own only when its item is disabled.
- Item delete triggers are 16px with a 12px icon, like `TagCloseTrigger`. The clear trigger is a
  24px `CloseButton` with a 16px icon and a 1px focus ring.
- Public CSS Modules variables: `--moduix-tags-input-width`, `--moduix-tags-input-min-height`, and
  `--moduix-tags-input-radius`. Colors, spacing, typography, and tag geometry use foundation tokens;
  override them with a class on the part.