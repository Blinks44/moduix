---
title: Separator
subtitle: Thin styled wrapper around the Base UI separator primitive.
description: Accessible divider for horizontal and vertical content separation.
---

# Separator

`Separator` is a single-part component. It keeps the Base UI primitive behavior intact and adds
library styling through `data-slot="separator-root"` and a small CSS variable contract.

## Anatomy

```tsx
import { Separator } from 'moduix';

<Separator />
```

## Styling contract

The root exposes:

- `data-slot="separator-root"`
- `data-orientation="horizontal" | "vertical"`

Supported CSS properties:

- `--separator-color`
- `--separator-length-horizontal`
- `--separator-length-vertical`
- `--separator-thickness`

## Usage

Horizontal separators fill the available width by default.

```tsx
<Separator />
```

Vertical separators are intended for inline layouts and default to `1em` height.

```tsx
<Separator orientation="vertical" />
```

Use `className` for direct styling. All Base UI primitive props, including `render`, still pass
through to the root when you need deeper composition.
