# Alert

`Alert` is a standalone moduix component and does not wrap a Base UI primitive.

Use it for inline status, feedback, and system messages. The public surface stays intentionally
small: one `variant` prop on the root, semantic content parts, and normal child composition for
everything else.

## Parts

- `Alert` (`data-slot="alert-root"`)
- `AlertIcon` (`data-slot="alert-icon"`)
- `AlertContent` (`data-slot="alert-content"`)
- `AlertTitle` (`data-slot="alert-title"`)
- `AlertDescription` (`data-slot="alert-description"`)

## Props

- `Alert`: `variant`, `className`, standard `div` props
- `AlertIcon`, `AlertContent`, `AlertDescription`: standard element props
- `AlertTitle`: standard `h3` props

## Composition

The recommended path is:

```tsx
<Alert>
  <AlertContent>
    <AlertTitle>Update available</AlertTitle>
    <AlertDescription>
      Install the latest version when your workflow allows it.
    </AlertDescription>
  </AlertContent>
</Alert>
```

Add `AlertIcon` when the message benefits from a leading visual cue. Keep extra layout, links, and
actions inside `AlertContent`; the component does not need a dedicated action API for those cases.

`role` defaults to `status`, and switches to `alert` for `variant="destructive"`. Pass an explicit
`role` only when your announcement semantics need to differ from that default.

## Defaults

| Prop      | Default   | Values                                                    |
| --------- | --------- | --------------------------------------------------------- |
| `variant` | `default` | `default`, `info`, `success`, `warning`, `destructive`    |
| `role`    | Auto      | `status` by default, `alert` when `variant="destructive"` |

## Styling

The component exposes `--alert-*` CSS variables in `src/styles/theme.css`. Override them on the
root slot for local theming or at a higher scope for application-wide defaults.

Place icons inside `AlertIcon`; SVG icons inherit current color and use `--alert-icon-size`.
