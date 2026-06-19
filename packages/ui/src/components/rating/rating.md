# Rating

Upstream primitive docs: there is no dedicated Base UI `Rating` primitive. moduix `Rating`
composes Base UI radio-group semantics into a narrow star-rating control.

## Purpose

`Rating` is the moduix discrete score picker for short 1-to-N feedback such as product reviews,
quality ratings, and satisfaction scores. It keeps the API intentionally small: one grouped control,
one star visual, one selected value, and no fractional or custom-render complexity.

Use it when the user should choose a small integer score. For generic single-choice option sets with
visible labels, use `RadioGroup`.

## Current behavior contract

- Renders one horizontal radio-group-based control with `max` star items.
- Uses one real radio item per score, so keyboard navigation, form submission, and required-state
  behavior come from Base UI radio-group semantics.
- `size` defaults to `md` and writes `data-size` on the root. Supported values are `xs`, `sm`, `md`,
  `lg`, and `xl`.
- `max` defaults to `5` and is normalized to an integer of at least `1`.
- `value` and `defaultValue` are numeric wrapper props. Internally the component maps them to string
  radio values.
- `onValueChange` is simplified to `(value: number) => void`.
- Stars from `1` through the current value are visually filled; higher stars stay outlined.
- `readOnly` preserves the chosen value but blocks user changes.
- `disabled` dims the whole control and blocks interaction.
- The component does **not** support:
  - half steps or arbitrary precision;
  - hover preview state;
  - custom item rendering or icon replacement;
  - user-initiated clearing back to an empty value once a selection exists.
- To clear a selected rating, control the component and set `value={undefined}` from the parent.

## Composition

Basic usage:

```tsx
import { Field, Rating } from 'moduix';

export function SatisfactionField() {
  return (
    <Field>
      <Field.Label>Overall satisfaction</Field.Label>
      <Field.HelperText>Choose the score that best matches your experience.</Field.HelperText>
      <Rating aria-label="Overall satisfaction" defaultValue={4} />
    </Field>
  );
}
```

Controlled usage:

```tsx
import { Rating } from 'moduix';
import { useState } from 'react';

export function ControlledRating() {
  const [value, setValue] = useState(3);

  return <Rating aria-label="Support quality" value={value} onValueChange={setValue} />;
}
```

Form integration:

```tsx
import { Fieldset, Rating } from 'moduix';

export function ReviewScoreField() {
  return (
    <Fieldset>
      <Fieldset.Legend>Review score</Fieldset.Legend>
      <Rating required aria-label="Review score" />
      <Fieldset.HelperText>Choose one score from 1 to 5.</Fieldset.HelperText>
    </Fieldset>
  );
}
```

## Exported API

`Rating` exports one public component plus helper types:

- `Rating`
- `RatingProps`
- `RatingSize`

## Public props

`Rating` accepts Base UI radio-group props except `children`, `value`, `defaultValue`,
`onValueChange`, and `orientation`, plus the wrapper props below.

| Prop            | Type                                   | Default | Notes                                                 |
| --------------- | -------------------------------------- | ------- | ----------------------------------------------------- |
| `value`         | `number`                               | —       | Controlled selected score. Use with `onValueChange`.  |
| `defaultValue`  | `number`                               | —       | Initial uncontrolled selected score.                  |
| `onValueChange` | `(value: number) => void`              | —       | Called when the selected score changes.               |
| `max`           | `number`                               | `5`     | Item count. Normalized to an integer of at least `1`. |
| `size`          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md`    | Scales the whole star row.                            |

Important forwarded props from Base UI radio-group remain available, including:

- `name`, `form`, and `required` for form participation
- `disabled` and `readOnly`
- `aria-label` and `aria-labelledby`
- `className`, `style`, and `render`

## Styling API

Stable hooks:

| Part | Hook                      |
| ---- | ------------------------- |
| root | `data-slot="rating-root"` |
| item | `data-slot="rating-item"` |
| icon | `data-slot="rating-icon"` |

Important state hooks:

- root writes `data-size`
- item writes Base UI state attributes including `data-checked`, `data-unchecked`, `data-disabled`,
  and `data-readonly`
- item writes moduix `data-filled` when the star should be visually filled
- item writes moduix `data-empty` when the star should stay outlined

Public CSS variables:

| Variable                     | Default fallback                | Purpose                                |
| ---------------------------- | ------------------------------- | -------------------------------------- |
| `--rating-active-color`      | `var(--color-primary)`          | Filled star color.                     |
| `--rating-color`             | `var(--color-muted-foreground)` | Empty star color.                      |
| `--rating-disabled-opacity`  | `var(--opacity-disabled)`       | Disabled whole-control opacity.        |
| `--rating-focus-ring-color`  | `var(--color-ring)`             | Focus ring color for the focused star. |
| `--rating-focus-ring-offset` | `0.125rem`                      | Focus ring offset.                     |
| `--rating-focus-ring-width`  | `var(--border-width-sm)`        | Focus ring width.                      |
| `--rating-gap`               | `var(--spacing-1)`              | Gap between stars.                     |
| `--rating-icon-size-xs`      | `0.875rem`                      | Icon size for `xs`.                    |
| `--rating-icon-size-sm`      | `1rem`                          | Icon size for `sm`.                    |
| `--rating-icon-size-md`      | `1.25rem`                       | Icon size for `md`.                    |
| `--rating-icon-size-lg`      | `1.5rem`                        | Icon size for `lg`.                    |
| `--rating-icon-size-xl`      | `1.75rem`                       | Icon size for `xl`.                    |
| `--rating-transition`        | `var(--transition-default)`     | Color and fill transition timing.      |

## UX and accessibility

- Always give the group an accessible name with `aria-label`, `aria-labelledby`, or a surrounding
  labeled field pattern such as `Fieldset.Legend`.
- Each star receives an internal label:
  - interactive: `Rate N out of max`
  - read-only: `N out of max`
- Because the component is radio-group-based, keyboard interaction follows discrete single-choice
  selection semantics rather than slider semantics.
- Once the user selects a score, the component does not provide an in-widget way to clear it. Use a
  parent-controlled reset when an empty value must remain reachable.

## Intentional differences from Base UI

- There is no upstream `Rating` primitive; this is a moduix wrapper built on radio-group semantics.
- The wrapper intentionally fixes the visual to stars and keeps a very small API surface.
- The public `value`, `defaultValue`, and `onValueChange` props are numeric, while the underlying
  primitive still uses radio string values internally.

## Agent notes

- Keep `Rating` narrow. Do not add half-step precision, hover-preview logic, icon replacement, or
  render props unless a concrete user request requires them.
- Preserve the `data-filled` styling contract; Base UI `data-checked` alone is not enough to style
  all stars up to the current value.
- If a future change adds public `--rating-*` variables, register them in `theme.css` and update docs
  in the same task.

## Local changelog

- Added `Rating` as a small radio-group-based star rating component with numeric controlled and
  uncontrolled APIs.
- Added `RatingStarIcon` to the shared UI icon set for reusable star-rating affordances.