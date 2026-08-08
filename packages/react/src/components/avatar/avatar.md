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

- `Avatar` and `Avatar.Root` are the same styled root component, with `<Avatar>` documented as the
  default consumer path.
- `Avatar.RootProvider` applies the same visual contract to externally created Ark state.
- `size` is the only local behavior-neutral prop. It is available on `Root` and `RootProvider`.
- `Avatar.Fallback` accepts `name` and derives the first grapheme of the first and last words when
  no children are provided, then falls back to a built-in decorative User icon.
- `Avatar.Context`, `useAvatar`, and `useAvatarContext` are re-exported from `@moduix/react` for the normal advanced path; Ark type aliases remain direct imports from `@ark-ui/react/avatar`.
- No legacy `render`, delay, loading-state adapter, or callback compatibility API remains.

## Anatomy and exported parts

```text
Avatar.Root | Avatar.RootProvider
├─ Avatar.Fallback
└─ Avatar.Image
```

| Part                     | `data-slot`            | Notes                                        |
| ------------------------ | ---------------------- | -------------------------------------------- |
| `Avatar` / `Avatar.Root` | `avatar-root`          | Creates Ark state and accepts local `size`.  |
| `Avatar.RootProvider`    | `avatar-root-provider` | Uses `useAvatar` state and accepts `size`.   |
| `Avatar.Fallback`        | `avatar-fallback`      | Visible while the image is absent or hidden. |
| `Avatar.Image`           | `avatar-image`         | Native image shown after successful loading. |

## Composition

```tsx
import { Avatar } from '@moduix/react/avatar';

export function AvatarExample() {
  return (
    <Avatar>
      <Avatar.Fallback name="Alex T." />
      <Avatar.Image src="/avatar.jpg" alt="Alex T." />
    </Avatar>
  );
}
```

For externally owned state, import `useAvatar` from `@moduix/react` and render
`Avatar.RootProvider value={avatar}`. Do not wrap that provider with `Avatar.Root` for the same
state instance.

Import `Avatar.Context` or `useAvatarContext` from `@moduix/react` for custom image rendering that still preserves Ark
loading state. Keep Ark type aliases on `@ark-ui/react/avatar`. Use
`asChild` with one semantic child when another element must own a part's DOM node.

## Upstream feature coverage

- Anatomy and Basic: all Ark parts use the upstream composition model.
- Events: `onStatusChange(details)` is passed through without remapping.
- Provider and Root Provider: styled `Avatar.RootProvider` is public; `useAvatar` is re-exported
  from moduix.
- Context and custom image integrations use `useAvatarContext` from moduix; rarer Ark context
  surfaces remain available directly from Ark UI.
- Stable IDs: Ark `ids` remains available on `Avatar.Root`.
- Fallback sugar: `Avatar.Fallback name` derives initials locally, while an empty fallback renders
  a decorative User icon without changing Ark loading behavior.

## Accessibility and state

- `Avatar.Image` renders a native `img`; consumers must provide appropriate `alt` text.
- `Avatar.Fallback` uses explicit children first and derives grapheme-safe initials from the first
  and last words of `name` when children are absent. If neither produces content, it renders an
  `aria-hidden` User icon.
- Use `alt=""` when an interactive parent already provides the accessible name.
- Refs target the rendered Ark DOM parts: root/provider `div`, fallback `span`, and image `img`.
- `asChild` requires one child with the correct semantics for its role.
- Ark exposes `data-scope="avatar"` and `data-part="root" | "fallback" | "image"`.
- `Avatar.Image` and `Avatar.Fallback` expose `data-state="visible" | "hidden"`.
- Avatar has no form value, `HiddenInput`, `Field`, or `Fieldset` integration.

## Defaults and styling

Both root components accept `className`, receive the root styles, and set `data-size` when `size` is
provided.

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
- `--moduix-avatar-fallback-bg`
- `--moduix-avatar-fallback-color`
- `--moduix-avatar-fallback-icon-size`
- `--moduix-avatar-fallback-padding`
- `--moduix-avatar-font-size`
- `--moduix-avatar-font-weight`
- `--moduix-avatar-image-object-fit`
- `--moduix-avatar-image-object-position`
- `--moduix-avatar-line-height`
- `--moduix-avatar-radius`
- `--moduix-avatar-size`

State-dependent styling should target Ark `data-state`; local visual hooks should use `data-slot`
or the public CSS variables.

`--moduix-avatar-line-height` is inherited by fallback text. Fallback padding uses `border-box`, so
`--moduix-avatar-fallback-padding` stays within the configured avatar size. The built-in icon uses
`data-slot="avatar-fallback-icon"` and `--moduix-avatar-fallback-icon-size`.

## Intentional sugar and differences from upstream

- moduix supplies visual defaults while Ark UI remains headless.
- `size="xs" | "sm" | "md" | "lg" | "xl"` maps to moduix tokens on both root components.
- `Avatar.Fallback name="Alex T."` derives initials for the common case without introducing a
  closed root API.
- An empty `Avatar.Fallback` renders a decorative User icon; explicit children remain the custom
  icon path.
- moduix adds stable `data-slot` hooks.
- moduix keeps `RootProvider` and re-exports `useAvatar` and `useAvatarContext`, but does not
  re-export broader Ark context parts or Ark type aliases.
- No Chakra-style variant, shape, color palette, group, badge, or `icon` prop is added. Those
  patterns remain explicit composition and styling.

## Agent notes

- Preserve `onStatusChange(details)` and the original context method names.
- Keep `RootProvider` styled like `Root`, but never create another state owner inside it.
- Do not reintroduce legacy `render`, delay, or transition attributes.

## Local changelog

- 2026-08-08: Added the default decorative User icon, made generated initials
  Unicode-grapheme-safe, fixed fallback line-height and padding sizing, and added image lifecycle
  regression coverage.
- 2026-07-09: Re-exported `useAvatar` and `useAvatarContext` from moduix and aligned docs/stories
  so the normal advanced path no longer requires direct Ark imports.
- 2026-07-07: Documented `<Avatar>` as the default happy path and added `Avatar.Fallback name` for
  initials-first fallback content.
- 2026-07-02: Removed duplicate Ark type exports, context parts, and state hooks from the moduix
  surface. Kept `RootProvider`, the callable root, all visual parts, and the `size` sugar.
- 2026-06-24: Audited the Ark UI migration, simplified pass-through wiring and state CSS, and
  aligned public docs with Ark provider examples.
- 2026-06-18: Completed Ark UI parity by exporting `RootProvider`, `Context`, `useAvatar`,
  `useAvatarContext`, and related types; added root-provider styling and state selectors; aligned
  stories and docs with Ark composition and provider/context examples.
- 2026-06-17: Migrated Avatar to Ark UI, adopted `Root`, `Image`, and `Fallback`,
  replaced `render` with `asChild`, and removed legacy loading and motion contracts.