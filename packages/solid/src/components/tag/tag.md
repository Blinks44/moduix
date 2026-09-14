# Tag (Solid)

`Tag` is a compact presentational label with optional leading content, trailing content, and a
shared close action.

## Current behavior contract

- `Tag` is the root shorthand and is equivalent to `Tag.Root`.
- `Tag` accepts Ark factory `span` props plus `variant` and `size`.
- `Tag.Label`, `Tag.StartElement`, and `Tag.EndElement` are Ark factory `span` parts.
- `Tag.CloseTrigger` composes `CloseButton.Root` while retaining Tag data hooks and the
  `aria-label="Remove tag"` fallback for a default native button.
- The component owns no selected or removed state; parent widgets own list mutation and event
  handling.

## Anatomy and stable hooks

| Part               | Element  | `data-slot`         |
| ------------------ | -------- | ------------------- |
| `Tag` / `Tag.Root` | `span`   | `tag-root`          |
| `Tag.Label`        | `span`   | `tag-label`         |
| `Tag.StartElement` | `span`   | `tag-start-element` |
| `Tag.EndElement`   | `span`   | `tag-end-element`   |
| `Tag.CloseTrigger` | `button` | `tag-close-trigger` |

Every part also writes `data-scope="tag"` and its matching `data-part` value.

## Solid composition

Ark Solid uses a render-function `asChild` prop:

```tsx
<Tag
  asChild={(props) => (
    <button {...props()} type="button">
      <Tag.Label>Open filter</Tag.Label>
    </button>
  )}
  variant="outline"
/>
```

The Ark Solid factory does not forward refs through `asChild`; ordinary refs and custom-host
composition are separate supported paths.

## Accessibility and styling

- The root is a presentational `span` by default.
- `Tag.CloseTrigger` defaults to `type="button"` and uses `aria-label="Remove tag"` only when it
  is a native button without children or `aria-labelledby`.
- Pass a specific accessible name when several tags are shown together.
- Disabled and `aria-disabled` close triggers do not invoke click handlers.
- `Tag.Label` is the truncation boundary; all visual tokens and CSS custom-property overrides are
  kept in `Tag.module.css`.