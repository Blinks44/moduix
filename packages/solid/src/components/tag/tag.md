# Tag (Solid)

`Tag` is a compact presentational label with optional leading content, trailing content, and a
shared close action.

## Current behavior contract

- `Tag` is the root component.
- `Tag` accepts Ark factory `span` props plus `variant` and `size`.
- `TagLabel`, `TagStartElement`, and `TagEndElement` are Ark factory `span` parts.
- `TagCloseTrigger` composes `CloseButton` while retaining Tag data hooks and the
  `aria-label="Remove tag"` fallback for a default native button.
- The component owns no selected or removed state; parent widgets own list mutation and event
  handling.

## Anatomy and stable hooks

| Part               | Element  | `data-slot`         |
| ------------------ | -------- | ------------------- |
| `Tag`              | `span`   | `tag-root`          |
| `TagLabel`        | `span`   | `tag-label`         |
| `TagStartElement` | `span`   | `tag-start-element` |
| `TagEndElement`   | `span`   | `tag-end-element`   |
| `TagCloseTrigger` | `button` | `tag-close-trigger` |

Every part also writes `data-scope="tag"` and its matching `data-part` value.

## Solid composition

Ark Solid uses a render-function `asChild` prop:

```tsx
<Tag
  asChild={(props) => (
    <button {...props()} type="button">
      <TagLabel>Open filter</TagLabel>
    </button>
  )}
  variant="outline"
/>
```

The Ark Solid factory does not forward refs through `asChild`; ordinary refs and custom-host
composition are separate supported paths.

## Accessibility and styling

- The root is a presentational `span` by default.
- `TagCloseTrigger` defaults to `type="button"` and uses `aria-label="Remove tag"` only when it
  is a native button without children or `aria-labelledby`.
- Pass a specific accessible name when several tags are shown together.
- Disabled and `aria-disabled` close triggers do not invoke click handlers.
- `TagLabel` is the truncation boundary; all visual tokens and CSS custom-property overrides are
  kept in `Tag.module.css`.
