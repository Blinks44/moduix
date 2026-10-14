# Avatar

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/avatar
- Chakra UI: https://chakra-ui.com/docs/components/avatar

## Purpose

`Avatar` renders identity media with Ark UI image loading, fallback visibility, and optional
externally owned state.

## Upstream model to preserve

- Use the Ark UI avatar primitive directly.
- Preserve `Root`, `RootProvider`, `Fallback`, and `Image`.
- Preserve Ark callback detail objects and externally owned state through `RootProvider`.
- Keep the image lifecycle and `data-state="visible" | "hidden"` behavior owned by Ark.

## Current behavior contract

- `Avatar` is the only public root component; it creates Ark state and accepts local `size`.
- `AvatarRootProvider` applies the same visual contract to externally created Ark state.
- `size` is the only local behavior-neutral prop. It is available on `Avatar` and
  `AvatarRootProvider`, defaults to `md`, and is always mirrored as `data-size`.
- `AvatarFallback` is an Ark-shaped composition slot; consumers provide its content explicitly.
- `AvatarContext`, `useAvatar`, and `useAvatarContext` are re-exported from `@moduix/react` for the normal advanced path.
- Types `AvatarRootProps`, `AvatarRootProviderProps`, `AvatarGroupProps`, and `AvatarSize` are exported; other Ark type aliases remain direct imports from `@ark-ui/react/avatar`.
- No legacy `render`, delay, loading-state adapter, or callback compatibility API remains.

## Anatomy and exported parts

```text
Avatar
├─ AvatarFallback
└─ AvatarImage

AvatarRootProvider
└─ same parts connected to a useAvatar() store

AvatarGroup
└─ Avatar, Avatar, ...
```

| Part                 | `data-slot`            | Notes                                        |
| -------------------- | ---------------------- | -------------------------------------------- |
| `Avatar`             | `avatar-root`          | Creates Ark state and accepts local `size`.  |
| `AvatarRootProvider` | `avatar-root-provider` | Uses `useAvatar` state and accepts `size`.   |
| `AvatarFallback`     | `avatar-fallback`      | Visible while the image is absent or hidden. |
| `AvatarImage`        | `avatar-image`         | Native image shown after successful loading. |
| `AvatarGroup`        | `avatar-group`         | Styled `div` that overlaps child avatars.    |

## Composition

```tsx
import { Avatar } from '@moduix/react/avatar';

export function AvatarExample() {
  return (
    <Avatar>
      <AvatarFallback>AT</AvatarFallback>
      <AvatarImage src="/avatar.jpg" alt="Alex T." />
    </Avatar>
  );
}
```

For externally owned state, import `useAvatar` from `@moduix/react` and render
`AvatarRootProvider value={avatar}`. Do not wrap that provider with `Avatar` for the same
state instance.

Import `AvatarContext` or `useAvatarContext` from `@moduix/react` for custom image rendering that still preserves Ark
loading state. Keep Ark type aliases on `@ark-ui/react/avatar`. Use
`asChild` with one semantic child when another element must own a part's DOM node.

## Upstream feature coverage

- Anatomy and Basic: all Ark parts use the upstream composition model.
- Events: `onStatusChange(details)` is passed through without remapping.
- Provider and Root Provider: styled `AvatarRootProvider` is public; `useAvatar` is re-exported
  from moduix.
- Context and custom image integrations use `useAvatarContext` from moduix; rarer Ark context
  surfaces remain available directly from Ark UI.
- Stable IDs: Ark `ids` remains available on `Avatar`.
- Fallback content remains explicit, while Ark controls its loading visibility.

## Accessibility and state

- `AvatarImage` renders a native `img`; consumers must provide appropriate `alt` text.
- `AvatarFallback` renders only consumer-provided children.
- Use `alt=""` when an interactive parent already provides the accessible name.
- Refs target the rendered Ark DOM parts: root/provider `div`, fallback `span`, and image `img`.
- `asChild` requires one child with the correct semantics for its role.
- Ark exposes `data-scope="avatar"` and `data-part="root" | "fallback" | "image"`.
- `AvatarImage` and `AvatarFallback` expose `data-state="visible" | "hidden"`.
- Avatar has no form value, `HiddenInput`, `Field`, or `Fieldset` integration.

## Defaults and styling

Both root components accept `className`, receive the root styles, and always set `data-size`
(`md` by default). `data-size` and `data-slot` are written after the consumer props, so they cannot be
overridden by accident.

| `size` | Root size token    | Text token         |
| ------ | ------------------ | ------------------ |
| `xs`   | `--moduix-size-xs` | `--moduix-text-xs` |
| `sm`   | `--moduix-size-sm` | `--moduix-text-sm` |
| `md`   | `--moduix-size-md` | `--moduix-text-md` |
| `lg`   | `--moduix-size-lg` | `--moduix-text-lg` |
| `xl`   | `--moduix-size-xl` | `--moduix-text-lg` |

Public CSS variables:

- `--moduix-avatar-bg`
- `--moduix-avatar-color`
- `--moduix-avatar-font-size`
- `--moduix-avatar-font-weight`
- `--moduix-avatar-radius`
- `--moduix-avatar-size`

State-dependent styling should target Ark `data-state`; local visual hooks should use `data-slot`
or the public CSS variables.

The fallback inherits color from the root and paints no background of its own, so `--moduix-avatar-bg`
and `--moduix-avatar-color` style it. Use a class on `AvatarFallback` or `AvatarImage` for one-off
changes such as a different fallback color or `object-position`. The root line height is `1`.

The root does not clip its children: `AvatarImage` and `AvatarFallback` round themselves with
`border-radius: inherit`, and the fallback clips its own content. This lets a status dot or badge be
positioned absolutely inside `Avatar` and stick out of the circle.

`AvatarGroup` is a flex row: every child after the first gets a negative inline-start margin of
`--moduix-spacing-2`, and direct avatar roots get a ring of `--moduix-border-width-md` in
`--moduix-color-background`. It has no state and no Ark counterpart.

## Intentional sugar and differences from upstream

- moduix supplies visual defaults while Ark UI remains headless.
- `size="xs" | "sm" | "md" | "lg" | "xl"` maps to moduix tokens on both root components.
- `AvatarFallback` remains an explicit composition slot; consumers choose its content.
- moduix adds stable `data-slot` hooks.
- moduix keeps the styled `AvatarRootProvider` and re-exports `useAvatar`, `useAvatarContext`, and
  `AvatarContext`, but does not re-export broader Ark context parts or Ark type aliases beyond the root
  prop types.
- `AvatarGroup` is a styled layout part, as in shadcn and Chakra; it has no `max` or overflow count
  logic, consumers render the `+N` avatar themselves.
- No Chakra-style variant, shape, color palette, badge part, or `icon` prop is added. Those patterns
  remain explicit composition and styling.

## Agent notes

- Preserve `onStatusChange(details)` and the original context method names.
- Keep `AvatarRootProvider` styled like `Avatar`, but never create another state owner inside it.
- Do not reintroduce legacy `render`, delay, or transition attributes.

## Local changelog

- 2026-10-14: Added `AvatarGroup`. Reduced public CSS variables from 12 to 6 (removed
  `fallback-bg`, `fallback-color`, `fallback-padding`, `image-object-fit`, `image-object-position`, and
  `line-height`); the root line height is `1`. Moved clipping from the root to the fallback so status
  dots can overflow the root.
- 2026-10-14: `size` defaults to `md` and is always mirrored as `data-size` on both roots, after the
  consumer props, matching `Switch` and other sized components. Exported `AvatarRootProps`,
  `AvatarRootProviderProps`, `AvatarGroupProps`, and `AvatarSize`. Removed the redundant fallback `line-height: inherit`.
- 2026-09-21: Replaced the compound `Avatar.*` value surface with the shared flat API.
- 2026-09-04: Removed the `AvatarFallback name` convenience API and built-in fallback icon.
  Consumers now provide fallback content explicitly, matching Ark UI composition.