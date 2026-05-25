# Alert

`Alert` is a standalone moduix component and does not wrap a Base UI primitive.

Use it for inline status, feedback, and system messages. The component is intentionally thin:
semantic slots, a `variant` prop for intent, and regular composition for everything else.

## Parts

- `Alert` (`data-slot="alert-root"`)
- `AlertIcon` (`data-slot="alert-icon"`)
- `AlertContent` (`data-slot="alert-content"`)
- `AlertTitle` (`data-slot="alert-title"`)
- `AlertDescription` (`data-slot="alert-description"`)

## Props

- `Alert`: `variant`, `className`, standard `div` props
- `AlertTitle`: standard `h3` props
- `AlertIcon`, `AlertContent`, `AlertDescription`: standard element props

`role` defaults to `status`, and switches to `alert` for `variant="destructive"`.

## Defaults

| Prop      | Default   | Values                                                    |
| --------- | --------- | --------------------------------------------------------- |
| `variant` | `default` | `default`, `info`, `success`, `warning`, `destructive`    |
| `role`    | Auto      | `status` by default, `alert` when `variant="destructive"` |

## Styling

The component exposes `--alert-*` CSS variables in `src/styles/theme.css`.
Place icons inside `AlertIcon`; SVG icons inherit current color and use `--alert-icon-size`.