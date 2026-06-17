# Avatar

Upstream primitive docs: https://ark-ui.com/docs/components/avatar

## Purpose

`Avatar` is the moduix wrapper around Ark UI Avatar for compact identity media such as profile
photos, initials, and icon fallbacks.

The wrapper keeps Ark loading/state behavior and adds moduix default styles, CSS variables,
`data-slot` hooks, and a small root `size` shortcut.

## Current behavior contract

- Uses Ark composition: `Avatar.Root`, `Avatar.Image`, and `Avatar.Fallback`.
- Supports Ark root props such as `asChild`, `ids`, and `onStatusChange(details)`.
- Keeps Ark `data-state="visible" | "hidden"` attributes on image and fallback parts.
- `size` is the only local root prop. It maps common token sizes to `data-size`.
- The wrapper does not add custom loading state, delay props, or Base UI compatibility aliases.

## Composition

```tsx
import { Avatar } from 'moduix';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export function AvatarExample() {
  return (
    <Avatar.Root>
      <Avatar.Image src={avatarImage} alt="Alex T." />
      <Avatar.Fallback>LT</Avatar.Fallback>
    </Avatar.Root>
  );
}
```

```text
Avatar.Root
├─ Avatar.Image
└─ Avatar.Fallback
   └─ initials | icon | custom content
```

Use `Avatar.Image` and `Avatar.Fallback` together for user pictures. Use fallback-only composition
when there is no image source.

Use `asChild` on `Avatar.Root`, `Avatar.Image`, or `Avatar.Fallback` when another element must own
the rendered DOM node.

`onStatusChange` stays Ark-shaped and exposes the current image lifecycle through
`details.status`. Use it when surrounding UI needs to react to loading or error states.

## Defaults and styling

Every exported part accepts `className` and receives a stable `data-slot`:

| Part              | `data-slot`       |
| ----------------- | ----------------- |
| `Avatar.Root`     | `avatar-root`     |
| `Avatar.Image`    | `avatar-image`    |
| `Avatar.Fallback` | `avatar-fallback` |

Ark state/data attributes remain available to consumers:

- `data-scope="avatar"` and `data-part="root" | "image" | "fallback"`
- `data-state="visible" | "hidden"` on `Avatar.Image` and `Avatar.Fallback`

`Avatar.Root` also sets `data-size` when the local `size` prop is provided.

| `size` | Root size token | Text token  |
| ------ | --------------- | ----------- |
| `xs`   | `--size-xs`     | `--text-xs` |
| `sm`   | `--size-sm`     | `--text-sm` |
| `md`   | `--size-md`     | `--text-md` |
| `lg`   | `--size-lg`     | `--text-lg` |
| `xl`   | `--size-xl`     | `--text-lg` |

Primary CSS variables:

| Variable                         | Default                      |
| -------------------------------- | ---------------------------- |
| `--avatar-bg`                    | `var(--color-muted)`         |
| `--avatar-color`                 | `var(--color-foreground)`    |
| `--avatar-fallback-bg`           | `var(--avatar-bg)`           |
| `--avatar-fallback-color`        | `inherit`                    |
| `--avatar-fallback-padding`      | `0`                          |
| `--avatar-font-size`             | `var(--text-md)`             |
| `--avatar-font-weight`           | `var(--weight-medium)`       |
| `--avatar-image-object-fit`      | `cover`                      |
| `--avatar-image-object-position` | `center`                     |
| `--avatar-line-height`           | `var(--line-height-text-md)` |
| `--avatar-radius`                | `var(--radius-full)`         |
| `--avatar-size`                  | `var(--size-md)`             |

## Intentional differences from Ark UI

- moduix ships pre-styled defaults; Ark is headless.
- moduix exports only the Ark-shaped namespace API: `Avatar.Root`, `Avatar.Image`,
  `Avatar.Fallback`.
- moduix keeps the local `size` prop on `Avatar.Root` as styling sugar for common token sizes.

## Agent notes

- Preserve Ark callback shape: `onStatusChange(details)` with `details.status`.
- Do not reintroduce Base UI `render` or `delay` contracts.
- Keep styling hooks aligned with Ark `data-state` and `data-part` instead of Base UI transition
  attributes.

## Local changelog

- 2026-06-17: Migrated Avatar from Base UI to Ark UI, adopted namespace parts
  (`Avatar.Root/Image/Fallback`), replaced `render` with Ark `asChild`, and moved docs/examples to
  `onStatusChange(details)` and Ark state attributes.
- 2026-06-17: Removed Base UI-only image motion tokens and other legacy compatibility surface that
  no longer exists in the Ark wrapper.