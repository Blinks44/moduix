# Toast (Solid)

`Toast` is the moduix wrapper around Ark UI Solid Toast for transient feedback, status changes,
queued notifications, and direct toast actions.

The wrapper preserves Ark's store-first model: `createToaster(options)` creates the store and
`ToastToaster` renders that store with a render prop. The flat exports are `Toast`, `ToastContext`,
`ToastTitle`, `ToastDescription`, `ToastActionTrigger`, `ToastCloseTrigger`, and `ToastToaster`.
`createToaster` and `useToastContext` are also available as standalone exports.

## Behavior contract

- `ToastToaster` portals to `document.body` by default. Set `portalled={false}` to render inline, or
  pass `portalRef` to target a custom container.
- Without a render prop, `ToastToaster` renders non-null title and description values, an action when
  present, and a close trigger unless `closable: false` is set.
- `ToastTitle` and `ToastDescription` read their current values from Ark context when children
  are omitted. Explicit `null` children remain empty.
- `ToastCloseTrigger` uses the moduix `CloseButton` by default and defaults its accessible
  label to `Close toast`.
- Ark store methods and callback detail objects pass through unchanged, including `create`,
  `success`, `error`, `warning`, `info`, `loading`, `promise`, `update`, `dismiss`, `remove`,
  placement, overlap, gap, max, duration, remove delay, hotkey, offsets, and status changes.

## Anatomy and data hooks

```text
createToaster()
└─ Overlay subtree
   └─ ToastToaster
      └─ Toast
         ├─ ToastTitle
         ├─ ToastDescription
         ├─ ToastActionTrigger
         └─ ToastCloseTrigger
```

| Part                 | `data-slot`            |
| -------------------- | ---------------------- |
| `Toast`              | `toast-root`           |
| `ToastToaster`       | `toast-toaster`        |
| `ToastTitle`         | `toast-title`          |
| `ToastDescription`   | `toast-description`    |
| `ToastActionTrigger` | `toast-action-trigger` |
| `ToastCloseTrigger`  | `toast-close-trigger`  |

Ark's `data-scope`, `data-part`, state attributes, and runtime layout variables (`--x`, `--y`,
`--scale`, `--z-index`, `--height`, `--opacity`, and `--gap`) remain intact for styling and
animation.

## Solid composition

Ark Solid uses a render-function `asChild` prop:

```tsx
<ToastCloseTrigger
  asChild={(props) => (
    <button {...props()} type="button">
      Dismiss
    </button>
  )}
  aria-label="Dismiss notification"
>
  Dismiss
</ToastCloseTrigger>
```

The Ark Solid factory does not forward refs through `asChild`. The native rendered parts keep
ordinary ref behavior, while `asChild` composition is supported as a separate native path; the
wrapper does not re-inject refs into that unsupported combination.

## Upstream

- Ark UI: https://ark-ui.com/docs/components/toast