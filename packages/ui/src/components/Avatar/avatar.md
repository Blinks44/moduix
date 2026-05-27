---
title: Avatar
description: Compact identity media with image and fallback slots.
---

# Avatar

`Avatar` is a thin styled wrapper over the Base UI avatar primitive. It keeps the public API short:
one root, one image slot, and one fallback slot.

Use it for user identities, team members, assignees, and compact entity thumbnails where the image
may be missing, delayed, or broken.

## Basic

The default path is to render `AvatarImage` and `AvatarFallback` together so the primitive can
switch between them based on loading state.

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

## Anatomy

```text
Avatar
├─ AvatarImage
└─ AvatarFallback
   └─ initials | icon | custom content
```

| Part             | Role                                                                 |
| ---------------- | -------------------------------------------------------------------- |
| `Avatar`         | Root slot. Controls size, shape, shared color, and `render` support. |
| `AvatarImage`    | Visible image when the source loads successfully.                    |
| `AvatarFallback` | Fallback content during loading, missing image, or image error.      |

## Composition

`Avatar`, `AvatarImage`, and `AvatarFallback` all accept `className` and preserve the underlying
Base UI composition API such as `render`.

Recommended rules:

- Keep `AvatarImage` and `AvatarFallback` inside the same `Avatar`.
- Use `AvatarFallback delay` to avoid a fallback flash during normal image loading.
- Style size and typography from the root with CSS variables such as `--avatar-size`,
  `--avatar-font-size`, and `--avatar-line-height`.
- Style image cropping with `--avatar-image-object-fit` and `--avatar-image-object-position`.
- Use `render` on the root when the avatar should behave like a link or button.

```tsx
<Avatar render={<a href="/team/alex-thompson" aria-label="Open Alex Thompson profile" />}>
  <AvatarImage src={avatarImage} alt="" />
  <AvatarFallback aria-hidden="true">AT</AvatarFallback>
</Avatar>
```

## Examples

### Fallback only

```tsx
import { Avatar, AvatarFallback } from 'moduix';
import styles from './avatar-demo.module.css';

export function AvatarFallbackOnlyDemo() {
  return (
    <div className={styles.row}>
      <Avatar className={styles.sizeXs}>
        <AvatarFallback>XS</AvatarFallback>
      </Avatar>
      <Avatar className={styles.sizeSm}>
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className={styles.sizeLg}>
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar className={styles.sizeXl}>
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
  );
}
```

### Broken image

```tsx
import { Avatar, AvatarFallback, AvatarImage } from 'moduix';

export function AvatarImageErrorDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://example.com/does-not-exist.png" alt="Broken image example" />
      <AvatarFallback>NA</AvatarFallback>
    </Avatar>
  );
}
```

## Custom Composition

### Interactive root

```tsx
import { Avatar, AvatarFallback, AvatarImage } from 'moduix';
import styles from './avatar-demo.module.css';

export function AvatarLinkDemo() {
  return (
    <Avatar render={<a href="mailto:alex@example.com" />} className={styles.linkAvatar}>
      <AvatarImage className={styles.linkAvatarImage} src={avatarImage} alt="Alex T." />
      <AvatarFallback className={styles.linkAvatarFallback} delay={600}>
        LT
      </AvatarFallback>
    </Avatar>
  );
}
```

### Icon fallback

```tsx
import { Avatar, AvatarFallback, ComputerIcon } from 'moduix';
import styles from './avatar-demo.module.css';

export function AvatarIconFallbackDemo() {
  return (
    <Avatar className={styles.iconAvatar}>
      <AvatarFallback>
        <ComputerIcon className={styles.iconAvatarGlyph} />
      </AvatarFallback>
    </Avatar>
  );
}
```

## Accessibility

- If nearby text already names the person, use `alt=""` and mark fallback initials as
  `aria-hidden="true"`.
- If the avatar is the only visible identity cue, provide meaningful `alt` text.
- If the root is interactive through `render`, give the rendered element an accessible name.
- If the fallback is icon-only, put the accessible name on the interactive root rather than on the
  icon itself.
