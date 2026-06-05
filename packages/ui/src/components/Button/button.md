# Button

Upstream primitive docs: https://base-ui.com/react/components/button.md

`Button` is the primary action control in moduix. It is a thin styled wrapper over Base UI
`Button` that keeps the primitive's interaction behavior and adds the library visual contract:
variants, sizes, `data-slot`, `data-variant`, `data-size`, and `--button-*` CSS variables.

## Basic usage

```tsx
import { Button } from 'moduix';

export function SaveButton() {
  return <Button>Save Changes</Button>;
}
```

Use `variant` for visual intent and `size` for control density:

```tsx
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="destructive-outline">Remove</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Open docs</Button>

<Button size="xs">Extra-small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra-large</Button>
```

## Parts

| Part      | Element | Data attributes                                                    | Purpose                                  |
| --------- | ------- | ------------------------------------------------------------------ | ---------------------------------------- |
| `Button`  | button  | `data-slot="button-root"`, `data-variant="<variant>"`, `data-size` | Root interactive control and style hook. |
| child svg | `svg`   | none                                                               | Direct icon children are sized by CSS.   |

`Button` has one public part. It does not expose `classNames`, `slotProps`, internal icons, or extra
structural slots; compose icons, spinners, and labels as children.

## Public props

`Button` accepts Base UI `Button` props plus the moduix visual props below.

| Prop        | Type                                                                                                   | Default     | Notes                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------ | ----------- | ----------------------------------------------------- |
| `variant`   | `'default' \| 'outline' \| 'secondary' \| 'destructive' \| 'destructive-outline' \| 'ghost' \| 'link'` | `'default'` | Sets `data-variant` and variant colors.               |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'icon-sm' \| 'icon-md' \| 'icon-lg'`                          | `'md'`      | Sets `data-size`, dimensions, padding, and font size. |
| `className` | Base UI `className` prop                                                                               | -           | Merged with the CSS module root class.                |

Exported helper types:

- `ButtonProps`
- `ButtonSize`
- `ButtonVariant`

Base UI passthrough remains available for interaction behavior, including `disabled`,
`focusableWhenDisabled`, `render`, `nativeButton`, `style`, event handlers, and native button
attributes such as `type`.

## Composition

Use children for icons and loading affordances. Direct child SVG icons inherit `currentColor` and are
sized with `--button-icon-size`.

```tsx
import { Button, PlusIcon, Spinner, StarIcon } from 'moduix';

export function ButtonExamples() {
  return (
    <>
      <Button>
        <PlusIcon />
        Create Item
      </Button>

      <Button size="icon-md" variant="outline" aria-label="Add to favorites">
        <StarIcon />
      </Button>

      <Button disabled focusableWhenDisabled aria-busy>
        <Spinner decorative size="sm" />
        Saving
      </Button>
    </>
  );
}
```

For icon-only buttons, use an `icon-*` size and provide an accessible name with `aria-label` or an
equivalent labeling mechanism.

`render` can replace the rendered element while keeping the Button styles and Base UI behavior:

```tsx
<Button render={<a href="/docs/button" />} nativeButton={false} variant="outline">
  Open Button Docs
</Button>
```

Prefer a real link component for navigation when button keyboard semantics are not desired. Use
`Button` for actions and action-like controls.

## Styling API

Use `className` for local styling and CSS variables for token-level customization. The root exposes
stable selectors through `data-slot="button-root"`, `data-variant`, and `data-size`.

States inherited from Base UI include `disabled` and `data-disabled`. moduix CSS also targets the
native `[disabled]` attribute. Disabled buttons reduce opacity, use `cursor: default`, and disable
pointer events.

Public CSS variables:

| Variable                                            | Default/fallback                                | Affects                        |
| --------------------------------------------------- | ----------------------------------------------- | ------------------------------ |
| `--button-border-width`                             | `var(--border-width-sm)`                        | Root border width              |
| `--button-color`                                    | `var(--color-foreground)`                       | Base text/icon color           |
| `--button-content-gap`                              | `var(--spacing-2)`                              | Gap between children           |
| `--button-disabled-opacity`                         | `var(--opacity-disabled)`                       | Disabled opacity               |
| `--button-focus-ring-color`                         | `var(--color-ring)`                             | Focus-visible outline color    |
| `--button-focus-ring-offset`                        | `var(--button-border-width)`                    | Focus-visible outline offset   |
| `--button-focus-ring-width`                         | `var(--border-width-md)`                        | Focus-visible outline width    |
| `--button-font-size`                                | `var(--text-sm)`                                | Base font size                 |
| `--button-font-weight`                              | `var(--weight-medium)`                          | Font weight                    |
| `--button-icon-size`                                | `1rem`                                          | Direct child SVG size          |
| `--button-line-height`                              | `var(--line-height-text-sm)`                    | Base line height               |
| `--button-radius`                                   | `var(--radius-md)`                              | Border radius                  |
| `--button-transition`                               | `var(--transition-default)`                     | State transition timing        |
| `--button-default-bg`                               | `var(--color-primary)`                          | `default` background           |
| `--button-default-bg-hover`                         | `var(--color-foreground)`                       | `default` hover background     |
| `--button-default-border-color`                     | `var(--color-primary)`                          | `default` border               |
| `--button-default-color`                            | `var(--color-primary-foreground)`               | `default` text/icon color      |
| `--button-outline-bg`                               | `var(--color-background)`                       | `outline` background           |
| `--button-outline-bg-hover`                         | `var(--color-accent)`                           | `outline` hover background     |
| `--button-outline-border-color`                     | `var(--color-border)`                           | `outline` border               |
| `--button-outline-color`                            | `var(--color-foreground)`                       | `outline` text/icon color      |
| `--button-secondary-bg`                             | `var(--color-secondary)`                        | `secondary` background         |
| `--button-secondary-bg-hover`                       | `var(--color-accent)`                           | `secondary` hover background   |
| `--button-secondary-border-color`                   | `var(--color-secondary)`                        | `secondary` border             |
| `--button-secondary-color`                          | `var(--color-secondary-foreground)`             | `secondary` text/icon color    |
| `--button-destructive-bg`                           | `var(--color-destructive)`                      | `destructive` background       |
| `--button-destructive-border-color`                 | `var(--color-destructive)`                      | `destructive` border           |
| `--button-destructive-color`                        | `var(--color-primary-foreground)`               | `destructive` text/icon color  |
| `--button-destructive-hover-brightness`             | `0.96`                                          | `destructive` hover filter     |
| `--button-destructive-outline-bg`                   | `var(--color-background)`                       | `destructive-outline` bg       |
| `--button-destructive-outline-bg-hover`             | `var(--color-destructive)`                      | `destructive-outline` hover bg |
| `--button-destructive-outline-border-color`         | `var(--color-destructive)`                      | `destructive-outline` border   |
| `--button-destructive-outline-color`                | `var(--color-destructive)`                      | `destructive-outline` color    |
| `--button-destructive-outline-color-hover`          | `var(--button-destructive-color)`               | `destructive-outline` hover    |
| `--button-ghost-bg`                                 | `transparent`                                   | `ghost` background             |
| `--button-ghost-bg-hover`                           | `var(--color-accent)`                           | `ghost` hover background       |
| `--button-ghost-border-color`                       | `transparent`                                   | `ghost` border                 |
| `--button-ghost-color`                              | `var(--color-foreground)`                       | `ghost` text/icon color        |
| `--button-link-color`                               | `var(--color-primary)`                          | `link` color                   |
| `--button-link-color-hover`                         | `var(--color-foreground)`                       | `link` hover color             |
| `--button-link-text-decoration`                     | `underline`                                     | `link` text decoration         |
| `--button-link-underline-offset`                    | `0.25em`                                        | `link` underline offset        |
| `--button-padding-x-xs` / `--button-padding-y-xs`   | `0.625rem` / `0.25rem`                          | `xs` padding                   |
| `--button-padding-x-sm` / `--button-padding-y-sm`   | `0.75rem` / `0.375rem`                          | `sm` padding                   |
| `--button-padding-x-md` / `--button-padding-y-md`   | `1rem` / `0.5rem`                               | `md` padding                   |
| `--button-padding-x-lg` / `--button-padding-y-lg`   | `1.25rem` / `0.625rem`                          | `lg` padding                   |
| `--button-padding-x-xl` / `--button-padding-y-xl`   | `1.5rem` / `0.75rem`                            | `xl` padding                   |
| `--button-font-size-xs` / `--button-line-height-xs` | `var(--text-xs)` / `var(--line-height-text-xs)` | `xs` text sizing               |
| `--button-font-size-lg` / `--button-line-height-lg` | `var(--text-md)` / `var(--line-height-text-md)` | `lg` text sizing               |
| `--button-font-size-xl` / `--button-line-height-xl` | `var(--text-lg)` / `var(--line-height-text-lg)` | `xl` text sizing               |
| `--button-size-xs`                                  | `var(--size-xs)`                                | `xs` min height                |
| `--button-size-sm`                                  | `var(--size-sm)`                                | `sm` min height                |
| `--button-size-md`                                  | `var(--size-lg)`                                | `md` min height                |
| `--button-size-lg`                                  | `var(--size-xl)`                                | `lg` min height                |
| `--button-size-xl`                                  | `3.5rem`                                        | `xl` min height                |
| `--button-size-icon-sm`                             | `var(--size-sm)`                                | `icon-sm` square size          |
| `--button-size-icon-md`                             | `var(--size-lg)`                                | `icon-md` square size          |
| `--button-size-icon-lg`                             | `var(--size-xl)`                                | `icon-lg` square size          |

Example:

```css
.dangerAction {
  --button-destructive-bg: color-mix(in oklab, var(--color-destructive) 90%, black);
  --button-focus-ring-color: var(--color-destructive);
  --button-radius: var(--radius-full);
}
```

## UX and accessibility

- Use `Button` for actions. Use links for navigation unless you intentionally need button semantics.
- Pass `type="submit"` explicitly for form submit buttons; the default path is action-button oriented.
- Keep visible labels concise. Icon-only buttons must have an accessible name.
- Use `disabled` for unavailable actions. Use `focusableWhenDisabled` for pending states that start
  from a focused click so focus is not lost while the button is disabled.
- Use `aria-busy` for loading/pending actions and include a text label such as "Saving" alongside
  decorative spinners.
- The component does not manage loading, confirmation, routing, or async state. Keep those concerns in
  application code.

## Intentional differences from Base UI

- Import from `moduix`, not `@base-ui/react/button`, when using the library component.
- The moduix wrapper is styled by default and always writes `data-slot="button-root"`.
- `variant` and `size` are moduix props; they are not Base UI primitive props.
- The wrapper keeps Base UI passthrough behavior instead of re-documenting the full primitive API.
- No `classNames`, `slotProps`, `leftIcon`, `rightIcon`, or `loading` props are exposed. Use children
  composition for those cases.

## Agent notes

- Preserve the single-root wrapper shape unless a real public composition need appears.
- Keep variants and sizes synchronized across `Button.tsx`, `Button.module.css`, stories, docs
  examples, and theme-level `--button-*` variables.
- Do not add new visual props when children or CSS variables already express the scenario clearly.
- If a new public CSS variable is added to `Button.module.css`, register it in `theme.css` and update
  the docs examples CSS properties table.

## Local changelog

- Rewrote the local documentation to describe the moduix wrapper instead of Base UI examples.
- Exported `ButtonProps`, `ButtonSize`, and `ButtonVariant` so consumers can type wrappers without
  duplicating the variant and size unions.