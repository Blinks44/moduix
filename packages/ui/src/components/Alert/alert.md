# Alert

`Alert` is a standalone moduix component and does not wrap a Base UI primitive.

Use it for inline status, feedback, and system messages. The root supports controlled and
uncontrolled dismissal through `open`, `defaultOpen`, and `onOpenChange`.

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
- `withDismissAnimation`: controls close animation (default: `true`)
- `closeButtonLabel`: accessible label for the built-in close button
- `className` and standard `div` props

## Styling

The component exposes `--alert-*` CSS variables in `src/styles/theme.css`.
Place icons inside `AlertIcon`; SVG icons inherit current color and use `--alert-icon-size`.