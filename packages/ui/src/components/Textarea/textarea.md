---
title: Textarea
subtitle: A multi-line native textarea with moduix styling tokens.
description: A reusable textarea component for long-form input with Field integration.
---

# Textarea

`Textarea` is a thin styled wrapper over Base UI `Field.Control` that renders a native
`<textarea>` with moduix tokens.

## Anatomy

```tsx
import { Textarea } from '@test/moduix';

<Textarea />;
```

`Textarea` is a single styled root and keeps `data-slot="textarea-root"` as its styling hook.

## Props

- All native `<textarea>` props pass through directly.
- `autoResize`: enables CSS-based auto-resize in browsers that support `field-sizing: content`.
- `className`: direct styling entry point for the root element.

## Composition

- Works on its own or inside `Field` for labels, descriptions, and validation.
- Keeps native controlled and uncontrolled textarea behavior.
- Keeps `autoResize` as a small opt-in sugar for the common grow-with-content workflow without
  replacing the native textarea contract.
- Forwards its ref to the native `<textarea>`.

## Styling

- Base UI state attributes such as `data-invalid`, `data-focused`, and `data-filled` remain
  available on the root element.
- The component exposes `--textarea-*` CSS variables in `src/styles/theme.css` for consumer
  overrides.

## Accessibility

- Provide an accessible name using a `<label>` or `FieldLabel`.
- For validation messages and form metadata, use the component together with `Field`,
  `FieldDescription`, and `FieldError`.