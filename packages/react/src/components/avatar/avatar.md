# Avatar

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/avatar
- Chakra UI: https://chakra-ui.com/docs/components/avatar

## Purpose

`Avatar` renders identity media with Ark UI image loading, fallback visibility, context access, and
externally owned state.

## Upstream model to preserve

- Use the Ark UI avatar primitive directly.
- Preserve `Root`, `RootProvider`, `Fallback`, `Image`, and `Context`.
- Preserve `useAvatar`, `useAvatarContext`, Ark callback detail objects, and context state methods.
- Keep the image lifecycle and `data-state="visible" | "hidden"` behavior owned by Ark.

## Current behavior contract

- `Avatar` and `Avatar.Root` are the same styled root component.
- `Avatar.RootProvider` applies the same visual contract to state created by `useAvatar`.
- `Avatar.Context` exposes the Ark context through a render prop.
- `useAvatar` and `useAvatarContext` are exported from `moduix`.
- `size` is the only local behavior-neutral prop. It is available on `Root` and `RootProvider`.
- No legacy `render`, delay, loading-state adapter, or callback compatibility API remains.

## Anatomy and exported parts

```text
Avatar.Root | Avatar.RootProvider
├─ Avatar.Fallback
├─ Avatar.Image
└─ Avatar.Context (optional)
```

| Part                  | `data-slot`            | Notes                                          |
| --------------------- | ---------------------- | ---------------------------------------------- |
| `Avatar.Root`         | `avatar-root`          | Creates Ark state and accepts local `size`.    |
| `Avatar.RootProvider` | `avatar-root-provider` | Uses `useAvatar` state and accepts `size`.     |
| `Avatar.Fallback`     | `avatar-fallback`      | Visible while the image is absent or hidden.   |
| `Avatar.Image`        | `avatar-image`         | Native image shown after successful loading.   |
| `Avatar.Context`      | none                   | Render-prop access to the current Ark context. |

Public hooks and types include `useAvatar`, `useAvatarContext`, `AvatarStatusChangeDetails`,
`AvatarContextProps`, `UseAvatarProps`, `UseAvatarReturn`, `UseAvatarContext`, part prop types, and
the local `AvatarSize`, `AvatarRootProps`, and `AvatarRootProviderProps`.

## Composition

```tsx
import { Avatar } from '@moduix/react';

export function AvatarExample() {
  return (
    <Avatar.Root>
      <Avatar.Fallback>LT</Avatar.Fallback>
      <Avatar.Image src="/avatar.jpg" alt="Alex T." />
    </Avatar.Root>
  );
}
```

For externally owned state, call `useAvatar()` and render `Avatar.RootProvider value={avatar}`.
Do not wrap that provider with `Avatar.Root` for the same state instance.

Use `Avatar.Context` for inline state reads and `useAvatarContext` in reusable custom descendants.
Use `asChild` with one semantic child when another element must own a part's DOM node.

## Upstream feature coverage

- Anatomy and Basic: all Ark parts use the upstream composition model.
- Events: `onStatusChange(details)` is passed through without remapping.
- Context: `Avatar.Context` and `useAvatarContext` are public.
- Provider and Root Provider: `useAvatar` and styled `Avatar.RootProvider` are public.
- Custom image integrations: `useAvatarContext().getImageProps()` remains available for framework
  image components.
- Stable IDs: Ark `ids` remains available on `Avatar.Root` and through `useAvatar`.

## Accessibility and state

- `Avatar.Image` renders a native `img`; consumers must provide appropriate `alt` text.
- Use `alt=""` when an interactive parent already provides the accessible name.
- Refs target the rendered Ark DOM parts: root/provider `div`, fallback `span`, and image `img`.
- `asChild` requires one child with the correct semantics for its role.
- Ark exposes `data-scope="avatar"` and `data-part="root" | "fallback" | "image"`.
- `Avatar.Image` and `Avatar.Fallback` expose `data-state="visible" | "hidden"`.
- Context exposes `loaded`, `setSrc`, `setLoaded`, and `setError`.
- Avatar has no form value, `HiddenInput`, `Field`, or `Fieldset` integration.

## Defaults and styling

Both root components accept `className`, receive the root styles, and set `data-size` when `size` is
provided.

| `size` | Root size token | Text token  |
| ------ | --------------- | ----------- |
| `xs`   | `--size-xs`     | `--text-xs` |
| `sm`   | `--size-sm`     | `--text-sm` |
| `md`   | `--size-md`     | `--text-md` |
| `lg`   | `--size-lg`     | `--text-lg` |
| `xl`   | `--size-xl`     | `--text-lg` |

Public CSS variables:

- `--avatar-bg`
- `--avatar-color`
- `--avatar-fallback-bg`
- `--avatar-fallback-color`
- `--avatar-fallback-padding`
- `--avatar-font-size`
- `--avatar-font-weight`
- `--avatar-image-object-fit`
- `--avatar-image-object-position`
- `--avatar-line-height`
- `--avatar-radius`
- `--avatar-size`

State-dependent styling should target Ark `data-state`; local visual hooks should use `data-slot`
or the public CSS variables.

## Intentional sugar and differences from upstream

- moduix supplies visual defaults while Ark UI remains headless.
- `size="xs" | "sm" | "md" | "lg" | "xl"` maps to moduix tokens on both root components.
- moduix adds stable `data-slot` hooks.
- No Chakra-only fallback `name`, variant, shape, color palette, group, badge, or icon API is added.
  Those patterns remain explicit composition and styling.

## Agent notes

- Keep the complete Ark provider/context/hook surface exported from the package barrel.
- Preserve `onStatusChange(details)` and the original context method names.
- Keep `RootProvider` styled like `Root`, but never create another state owner inside it.
- Do not reintroduce legacy `render`, delay, or transition attributes.

## Local changelog

- 2026-06-24: Audited the Ark UI migration, simplified pass-through wiring and state CSS, and
  aligned public docs with Ark provider examples.
- 2026-06-18: Completed Ark UI parity by exporting `RootProvider`, `Context`, `useAvatar`,
  `useAvatarContext`, and related types; added root-provider styling and state selectors; aligned
  stories and docs with Ark composition and provider/context examples.
- 2026-06-17: Migrated Avatar to Ark UI, adopted `Root`, `Image`, and `Fallback`,
  replaced `render` with `asChild`, and removed legacy loading and motion contracts.