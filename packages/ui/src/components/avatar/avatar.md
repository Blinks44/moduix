# Avatar

Upstream primitive docs: https://base-ui.com/react/components/avatar.md

## Purpose

`Avatar` displays compact identity media: a loaded image, initials, an icon, or custom fallback
content. The moduix component is a thin styled wrapper over Base UI Avatar primitives. It keeps
Base UI image loading and fallback behavior, but exposes project-specific part names, `data-slot`
hooks, default CSS, and a small root `size` shortcut.

## Current behavior contract

- `Avatar` renders the root primitive and defaults visually to a medium circular inline-flex box.
- `AvatarImage` renders the image primitive. It is shown only when the image source loads
  successfully and keeps Base UI transition status attributes.
- `AvatarFallback` renders fallback content while the image is absent, delayed, loading, or failed.
- `className`, `style`, `render`, event handlers, `alt`, `src`, `delay`, and Base UI lifecycle props
  are forwarded to the underlying primitive parts.
- The wrappers do not create their own loading state, focus behavior, or accessibility labels.

## Basic usage

```tsx
import { Avatar, AvatarFallback, AvatarImage } from 'moduix';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src={avatarImage} alt="Alex T." />
      <AvatarFallback delay={600}>LT</AvatarFallback>
    </Avatar>
  );
}
```

## Composition

```text
Avatar
├─ AvatarImage
└─ AvatarFallback
   └─ initials | icon | custom content
```

Use `AvatarImage` and `AvatarFallback` together for user pictures. Use fallback-only composition
when there is no image source.

```tsx
import { Avatar, AvatarFallback } from 'moduix';

export function AvatarFallbackOnlyDemo() {
  return (
    <div className={styles.row}>
      <Avatar size="xs">
        <AvatarFallback>XS</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
  );
}
```

```css
.row {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}
```

Use `render` on `Avatar` when the root needs to compose with another element.

```tsx
import { Avatar, AvatarFallback, AvatarImage } from 'moduix';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export function AvatarLinkDemo() {
  return (
    <Avatar render={<a href="mailto:alex@example.com" />} size="xl" className={styles.linkAvatar}>
      <AvatarImage className={styles.linkAvatarImage} src={avatarImage} alt="Alex T." />
      <AvatarFallback className={styles.linkAvatarFallback} delay={600}>
        LT
      </AvatarFallback>
    </Avatar>
  );
}
```

## Props

### `Avatar`

`Avatar` accepts Base UI root props plus:

| Prop   | Type                                   | Default | Description                                     |
| ------ | -------------------------------------- | ------- | ----------------------------------------------- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md`    | Sets the root size, font size, and line height. |

Common forwarded root props:

- `className`: merged with the library root class. Base UI state callback class names are preserved.
- `style`: forwarded to the root primitive.
- `render`: replaces the rendered root element while preserving primitive behavior.
- Standard root DOM/event props supported by Base UI.

### `AvatarImage`

`AvatarImage` accepts Base UI image props. Common props:

- `src`, `srcSet`, `sizes`, `alt`, `loading`, `decoding`, and standard image props.
- `className`: merged with the library image class.
- `onLoadingStatusChange`: receives Base UI image loading status changes.
- `render`: replaces the rendered image element through Base UI composition.

### `AvatarFallback`

`AvatarFallback` accepts Base UI fallback props. Common props:

- `delay`: milliseconds to wait before showing fallback content. Use this to avoid a brief fallback
  flash while a real image is loading.
- `children`: initials, short text, an icon, or custom fallback content.
- `className`: merged with the library fallback class.
- `render`: replaces the rendered fallback element through Base UI composition.

## Defaults and styling

Exported parts include stable `data-slot` hooks:

| Part             | `data-slot`       |
| ---------------- | ----------------- |
| `Avatar`         | `avatar-root`     |
| `AvatarImage`    | `avatar-image`    |
| `AvatarFallback` | `avatar-fallback` |

`Avatar` also sets `data-size` when the `size` prop is provided. Omitting `size` keeps the CSS
default medium size without adding `data-size`.

| `size` | Root size token | Text token  |
| ------ | --------------- | ----------- |
| `xs`   | `--size-xs`     | `--text-xs` |
| `sm`   | `--size-sm`     | `--text-sm` |
| `md`   | `--size-md`     | `--text-md` |
| `lg`   | `--size-lg`     | `--text-lg` |
| `xl`   | `--size-xl`     | `--text-lg` |

Public CSS variables are declared in `src/styles/theme.css` and can be overridden on the root or a
wrapper class:

| Variable                         | Default                      | Used by             |
| -------------------------------- | ---------------------------- | ------------------- |
| `--avatar-bg`                    | `var(--color-muted)`         | Root background     |
| `--avatar-color`                 | `var(--color-foreground)`    | Root text color     |
| `--avatar-fallback-bg`           | `var(--avatar-bg)`           | Fallback background |
| `--avatar-fallback-color`        | `inherit`                    | Fallback color      |
| `--avatar-fallback-padding`      | `0`                          | Fallback padding    |
| `--avatar-font-size`             | `var(--text-md)`             | Root font size      |
| `--avatar-font-weight`           | `var(--weight-medium)`       | Root font weight    |
| `--avatar-image-object-fit`      | `cover`                      | Image fit           |
| `--avatar-image-object-position` | `center`                     | Image position      |
| `--avatar-line-height`           | `var(--line-height-text-md)` | Root line height    |
| `--avatar-radius`                | `var(--radius-full)`         | Root radius         |
| `--avatar-size`                  | `var(--size-md)`             | Root width/height   |
| `--avatar-transition`            | `var(--transition-default)`  | Image fade          |

`AvatarImage` keeps Base UI transition attributes:

- `data-starting-style`: present while the image animates in.
- `data-ending-style`: present while the image animates out.

## Accessibility and UX

- Avatar semantics depend on surrounding UI. If adjacent text already identifies the person, prefer
  `alt=""` on `AvatarImage` and `aria-hidden="true"` on purely visual fallback initials.
- If the avatar is the only identity cue, provide meaningful `alt` text.
- For interactive roots created with `render`, the rendered element must provide its own accessible
  name, such as link text or `aria-label`.
- Icon-only fallback content should be treated as decorative unless it is the only accessible label.
- Keep `AvatarFallback` in the tree with image avatars so identity remains visible if the image
  fails to load.

## Intentional differences from Base UI

- Import named moduix parts from `moduix`: `Avatar`, `AvatarImage`, and `AvatarFallback`. Do not use
  the upstream `Avatar.Root`, `Avatar.Image`, `Avatar.Fallback` namespace in project examples.
- The component ships default styles and project tokens. It is not an unstyled primitive.
- The root adds `data-slot="avatar-root"` and supports a project-level `size` prop.
- We do not export Base UI state or prop alias types from this component; keep the public type
  surface small unless a named type adds real value.

## Limitations and recommendations

- `size` is intentionally limited to common token sizes. Use `--avatar-size`,
  `--avatar-font-size`, and `--avatar-line-height` for custom dimensions.
- The root is non-interactive by default. Use `render` only when the avatar really acts as a link or
  control, and preserve correct semantics on the rendered element.
- Avoid putting long names in the fallback. Use short initials, a compact label, or an icon.
- Do not add slot-prop bags or `classNames` maps; the public styling model is explicit parts plus
  CSS variables.

## Agent notes

- Preserve the thin wrapper shape. Do not duplicate Base UI loading state or reimplement fallback
  timing.
- Keep examples aligned with Storybook and docs previews: when a preview uses multiple sizes or CSS
  overrides, the code sample should show the same composition and relevant CSS.
- If a public prop, CSS variable, `data-slot`, or default changes, update this file, Storybook, and
  docs examples together.

## Motion tokens

`AvatarImage` now exposes phase-specific motion variables for its enter and exit states. Override the matching `--avatar-image-starting/ending-opacity`, `*-scale`, and `*-translate-x/y` tokens to keep the default fade or turn the image appearance into a subtle slide or zoom without changing the component structure.

## Local changelog

- 2026-06-10: Added phase-specific image motion tokens so avatar image appearance can be retuned to fade, slide, or zoom through CSS variables while preserving the shipped fade default.
- Rewrote the local documentation to describe the moduix wrapper instead of the Base UI namespace
  API, including project parts, CSS variables, accessibility guidance, and real examples.
- Added `size` on `Avatar` as narrow DX sugar for the repeated `xs`/`sm`/`md`/`lg`/`xl` sizing
  pattern while preserving CSS variable overrides.