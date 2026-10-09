# Avatar

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/avatar

## Purpose

`Avatar` renders identity media with Ark-managed image loading and fallback visibility.

## Public contract

The flat API is `Avatar`, `AvatarRootProvider`, `AvatarFallback`, `AvatarImage`, `AvatarContext`, `useAvatar`, and `useAvatarContext`. Both roots accept the local `size` values `xs`, `sm`, `md`, `lg`, and `xl`; `onStatusChange(details)` keeps Ark's detail shape.

## Preservation notes

- Keep image loading and visible/hidden state owned by Ark, including externally supplied state through `AvatarRootProvider`.
- `AvatarFallback` renders consumer children. Preserve Solid's native `class` and callback-ref semantics.

## Styling and accessibility

`AvatarImage` renders an image, so callers provide appropriate `alt` text. Keep `data-size` and `data-slot` hooks on the styled parts.