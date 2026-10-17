# InputGroup

Upstream review (accessed 2026-10-17):

- Ark UI composition: https://ark-ui.com/docs/guides/composition
- Ark UI Field: https://ark-ui.com/docs/components/field
- Chakra UI Input and Group: https://chakra-ui.com/docs/components/input
- shadcn/ui Input Group: https://ui.shadcn.com/docs/components/input-group

Ark UI has no `InputGroup` primitive. `InputGroup` is a moduix-owned composition built from Ark
factory elements, the Ark-backed local `Input` and `Textarea`, `Button`, and `CloseButton`.

| Source                 | Useful difference                                     | moduix decision                                                                   |
| ---------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------- |
| Ark factory and Field  | Polymorphic structural parts and native form behavior | Preserve `asChild`, refs, and the nested Ark input.                               |
| Chakra Input and Group | `startElement`/`endElement` props and attached addons | Keep explicit child parts instead of start/end props.                             |
| shadcn/ui Input Group  | Explicit parts, textarea control, four-way `align`    | Match the parts; `align` is only `inline` or `block`, position follows DOM order. |

## Purpose

`InputGroup` presents one input or textarea with addons, text, or actions as one visual
control while preserving the native semantics of the nested input and buttons. Use `Editable` for
preview-first inline editing.

## Public contract

- Values: `InputGroup`, `InputGroupAddon`, `InputGroupText`, `InputGroupInput`, `InputGroupTextarea`,
  `InputGroupButton`, and `InputGroupClearTrigger`. Types: `InputGroupSize`
  (`'xs' | 'sm' | 'md' | 'lg' | 'xl'`) and `InputGroupAddonAlign` (`'inline' | 'block'`).
- `InputGroup` renders an Ark factory `div`, supports `asChild`, and provides the visual size
  (`md` by default) to its parts. It has no default ARIA role.
- `InputGroupInput` renders `Input`, inherits the group size unless it gets its own `size`, and
  accepts native `onChange(event)`. A local size controls the input font and inline padding; the
  group keeps its own height.
- `InputGroupTextarea` renders `Textarea` with all its props, including `autoresize`. In the group
  it has no border, background, radius, focus outline, or resize handle, takes the group font size
  and inline padding, and grows the group. It has no `size` of its own.
- `InputGroupAddon` and `InputGroupText` render Ark factory `span` elements and support `asChild`.
  The addon has a muted background and separators; the text part is transparent. `align`
  (`inline` by default, mirrored as `data-align`) picks a side placement or, with `block`, a
  full-width row above or below the control; the DOM order sets the side. A block addon switches the
  root to a column. Use a regular `Button` inside a block addon; `InputGroupButton` is for actions
  beside the control.
- `InputGroupButton` renders `Button`, inherits the group size, and defaults to `variant="ghost"`
  and `type="button"`. It keeps its Button size and variant styles but drops its own height, block
  padding, border, and radius so it stretches inside the group without making it taller.
- `InputGroupClearTrigger` renders `CloseButton`: 24px (20px in an `xs` group), centered with an 8px
  end inset, `type="button"`, a decorative close icon, and `aria-label="Clear input"`. Explicit
  `aria-label` or `aria-labelledby` replaces the fallback label; children replace the icon.
- One control (`InputGroupInput` or `InputGroupTextarea`) per group is the supported composition. A
  group with a block addon holds only block addons next to the control.

```text
InputGroup
├─ InputGroupAddon (optional)
├─ InputGroupInput or InputGroupTextarea
├─ InputGroupText (optional)
├─ InputGroupButton (optional)
└─ InputGroupClearTrigger (optional)
```

| Part                     | Stable slot                 |
| ------------------------ | --------------------------- |
| `InputGroup`             | `input-group-root`          |
| `InputGroupInput`        | `input-root`                |
| `InputGroupTextarea`     | `textarea-root`             |
| `InputGroupAddon`        | `input-group-addon`         |
| `InputGroupText`         | `input-group-text`          |
| `InputGroupButton`       | `input-group-button`        |
| `InputGroupClearTrigger` | `input-group-clear-trigger` |

Root, addon, text, and clear trigger also expose `data-scope="input-group"` with a matching
`data-part`; the root and clear trigger expose `data-size`; addon and text expose `data-align`. Component-owned hooks are set after the
props spread, so consumer props cannot replace them. Classes merge with the default styles.

## Accessibility and state

- The nested input owns the accessible name, field state, and native form value. Prefer
  `FieldLabel`; add `role="group"` with an accessible name only when the whole composition needs one.
- The root shows invalid and disabled state from the nested input or textarea with `:has(...)`. A
  disabled group dims once; inside a disabled `Field` or `Fieldset` the outer owner dims instead.
- Buttons and the clear trigger keep native keyboard behavior and do not inherit `Field` disabled
  state; disable each action explicitly when it should be unavailable.
- The clear trigger does not own value state, clear the input, hide itself, or move focus. Handle
  clearing and focus in `onClick` and render it only for non-empty values.

## Styling

- Sizes use foundation tokens: group height `--moduix-size-*`, inline padding, and typography.
  Addon and text inherit the group font size from the root.
- CSS Modules expose `--moduix-input-group-width`, `--moduix-input-group-height` (applies to every
  size), and `--moduix-input-group-radius`. Override colors, padding, and typography with a class
  on the part.
- `.root .input`, `.root .textarea[data-slot='textarea-root']`, and
  `.root .button[data-slot='input-group-button']` are deliberately more specific than the Input,
  Textarea, and Button root rules so the group styles win regardless of stylesheet order.
- Addon and text content shrink and clip instead of forcing the input out of a narrow group.

## Agent notes

- Keep explicit child parts, one grouped control per root, and a root without a default role.
- Keep `align` to `inline` and `block`; the DOM order owns the side. Do not add CSS `order`.
- Do not move value state into the group or mirror child state.
- Keep inline edit and read-only preview on `Editable`.
- Keep `PasswordInput` behavior isolated from this component.