# Avatar

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/avatar

## Purpose

`Avatar` is the moduix wrapper around Ark UI Avatar for compact identity media such as profile
photos, initials, and icon fallbacks.

The wrapper keeps Ark loading and state behavior intact while adding moduix default styles, CSS
variables, stable `data-slot` hooks, and a small root `size` shortcut.

## Upstream model to preserve

- Uses the Ark UI avatar primitive directly.
- Keeps Ark anatomy centered on `Root`, `Image`, and `Fallback`.
- Keeps Ark image lifecycle, `onStatusChange(details)`, and `data-state` visibility model intact.

## Current behavior contract

- Uses Ark composition: `Avatar.Root`, `Avatar.Image`, and `Avatar.Fallback`.
- Supports Ark root props such as `asChild`, `ids`, and `onStatusChange(details)`.
- Keeps Ark `data-state="visible" | "hidden"` attributes on image and fallback parts.
- `size` is the only local root prop. It maps common token sizes to `data-size`.
- The wrapper does not add custom loading state, delay props, or Base UI compatibility aliases.

## Anatomy and exported parts

```text
Avatar.Root
├─ Avatar.Image
└─ Avatar.Fallback
   └─ initials | icon | custom content
```

Every exported part accepts `className` and receives a stable `data-slot`:

| Part              | `data-slot`       | Notes                                      |
| ----------------- | ----------------- | ------------------------------------------ |
| `Avatar.Root`     | `avatar-root`     | Styled Ark root with local `size` sugar.   |
| `Avatar.Image`    | `avatar-image`    | Visible image when loading succeeds.       |
| `Avatar.Fallback` | `avatar-fallback` | Fallback while image is hidden or missing. |

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

Use `Avatar.Image` and `Avatar.Fallback` together for user pictures. Use fallback-only composition
when there is no image source.

Use `asChild` on `Avatar.Root`, `Avatar.Image`, or `Avatar.Fallback` when another element must own
the rendered DOM node.

## Upstream feature coverage

- `Anatomy`: preserved directly through the exported Ark-shaped parts.
- `Basic`: preserved through the standard root/image/fallback path.
- `Events`: preserved through `onStatusChange(details)`.
- `Root Provider` and `Context`: intentionally not exported by the current wrapper surface.
- `Next.js Image` and other custom image integrations: supported via Ark `asChild` and preserved
  visibility semantics, but not wrapped as moduix-specific helpers.

## Accessibility and state

- Ark state and data attributes remain available:
  - `data-scope="avatar"` and `data-part="root" | "image" | "fallback"`
  - `data-state="visible" | "hidden"` on `Avatar.Image` and `Avatar.Fallback`
- Ark callback shapes remain unchanged:
  - `onStatusChange(details)` with `details.status`
- `Avatar.Root` also sets `data-size` when the local `size` prop is provided.

## Defaults and styling

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

## Intentional sugar and differences from upstream

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