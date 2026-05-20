---
title: Textarea
subtitle: A multi-line native textarea with moduix styling tokens.
description: A reusable textarea component for long-form input with size and resize controls.
---

# Textarea

`Textarea` renders a native `<textarea>` through Base UI `Field.Control` and applies moduix
design tokens for consistent styling and Field validation integration.

## Anatomy

```tsx
import { Textarea } from '@2gis/moduix';

<Textarea />;
```

## API

- `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` (default: `'md'`)
- `resize`: `'none' | 'both' | 'horizontal' | 'vertical'` (default: `'vertical'`)
- `autoResize`: `boolean` (default: `false`) - grows height to fit content and disables manual resize handle
- Accepts all native `<textarea>` props.

## Accessibility

- Provide an accessible name using a `<label>` or `FieldLabel`.
- For validation messages and form metadata, use the component together with `Field`, `FieldDescription`, and `FieldError`.