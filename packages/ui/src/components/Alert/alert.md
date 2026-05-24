# Alert

`Alert` is a standalone moduix component and does not wrap a Base UI primitive.

Use it for inline status, feedback, and system messages. The root supports controlled and
uncontrolled dismissal through `open`, `defaultOpen`, and `onOpenChange`.
All exported parts forward refs to their underlying DOM elements.

## Parts

- `Alert` (`data-slot="alert-root"`)
- `AlertIcon` (`data-slot="alert-icon"`)
- `AlertContent` (`data-slot="alert-content"`)
- `AlertTitle` (`data-slot="alert-title"`)
- `AlertDescription` (`data-slot="alert-description"`)
- `AlertClose` (`data-slot="alert-close"`)

## Props

- `variant`: `default` | `info` | `success` | `warning` | `destructive` (default: `default`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `open`: controlled visibility state
- `defaultOpen`: initial uncontrolled visibility state (default: `true`)
- `onOpenChange`: called when visibility changes
- `withCloseButton`: renders the built-in `CloseButton`
- `closeButton`: overrides the built-in top-right close button content
- `withDismissAnimation`: controls close animation (default: `true`)
- `closeButtonLabel`: accessible label for the built-in close button
- `ref`: forwarded to the root `div`
- `className` and standard `div` props

`AlertTitle` supports `as` to change the rendered tag when the default `h3` does not fit the
surrounding heading structure.

`AlertClose` can be rendered manually for custom placement or custom button content. `closeButton`
overrides the built-in top-right close button, and takes precedence over `withCloseButton`.

## Defaults

| Prop                   | Default       | Values                                                               |
| ---------------------- | ------------- | -------------------------------------------------------------------- |
| `variant`              | `default`     | `default`, `info`, `success`, `warning`, `destructive`               |
| `size`                 | `md`          | `sm`, `md`, `lg`                                                     |
| `defaultOpen`          | `true`        | `true`, `false`                                                      |
| `withCloseButton`      | `false`       | `true`, `false`                                                      |
| `closeButton`          | `undefined`   | React node rendered inside the built-in top-right `AlertClose`       |
| `withDismissAnimation` | `true`        | `true`, `false`                                                      |
| `closeButtonLabel`     | `Close alert` | Any accessible text label for the built-in close button              |
| `role`                 | Auto          | `status` by default, `alert` when `variant="destructive"`, or custom |

## Styling

The component exposes `--alert-*` CSS variables in `src/styles/theme.css`.
Place icons inside `AlertIcon`; SVG icons inherit current color and use `--alert-icon-size`.