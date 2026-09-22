# PasswordInput

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/password-input
- Chakra UI: https://chakra-ui.com/docs/components/password-input

## Purpose

PasswordInput renders a secure text input whose value can be revealed or hidden with an accessible
visibility trigger.

## Upstream model to preserve

The wrapper follows Ark UI `PasswordInput` exactly: `Root`, `RootProvider`, `Context`, `Label`,
`Control`, `Input`, `VisibilityTrigger`, `Indicator`, and `usePasswordInput`. Visibility state
belongs to the Ark root and uses `defaultVisible`, `visible`, and `onVisibilityChange(details)`.

## Current behavior contract

`PasswordInput` is the styled root and is equivalent to `PasswordInput`. `PasswordInputField`
is the default visible control, input, visibility trigger, and indicator. Consumers compose Ark
parts directly for native input props such as `value`, `defaultValue`, `placeholder`, and `onChange`.
Root props include Ark's `autoComplete`, `name`, `required`,
`disabled`, `readOnly`, `invalid`, `ids`, `translations`, and `ignorePasswordManagers`.

## Anatomy and exported parts

```tsx
<PasswordInput>
  <PasswordInputLabel />
  <PasswordInputField />
</PasswordInput>
```

For advanced customization, replace `PasswordInputField` with its explicit Ark parts:

```tsx
<PasswordInput>
  <PasswordInputLabel />
  <PasswordInputControl>
    <PasswordInputInput />
    <PasswordInputVisibilityTrigger>
      <PasswordInputIndicator />
    </PasswordInputVisibilityTrigger>
  </PasswordInputControl>
</PasswordInput>
```

| Part                                   | Hook                                            | Notes                             |
| -------------------------------------- | ----------------------------------------------- | --------------------------------- |
| `PasswordInput` / `PasswordInput` | `data-slot="password-input-root"`               | Ark root.                         |
| `PasswordInputRootProvider`           | `data-slot="password-input-root-provider"`      | Use with `usePasswordInput`.      |
| `PasswordInputContext`                | -                                               | Render-prop access to root state. |
| `PasswordInputLabel`                  | `data-slot="password-input-label"`              | Ark label.                        |
| `PasswordInputField`                  | `data-slot="password-input-control"`            | Default visible parts.            |
| `PasswordInputControl`                | `data-slot="password-input-control"`            | Positions input and trigger.      |
| `PasswordInputInput`                  | `data-slot="password-input-input"`              | Native input part.                |
| `PasswordInputVisibilityTrigger`      | `data-slot="password-input-visibility-trigger"` | Toggle button.                    |
| `PasswordInputIndicator`              | `data-slot="password-input-indicator"`          | Defaults to moduix eye icons.     |

## Composition

```tsx
<PasswordInput autoComplete="current-password">
  <PasswordInputLabel>Password</PasswordInputLabel>
  <PasswordInputField />
</PasswordInput>
```

## Upstream feature coverage

The wrapper supports all relevant Ark examples: basic composition, `autoComplete`, controlled
visibility, `ignorePasswordManagers`, `RootProvider`, strength meter composition, `Field`
integration, and validation through `invalid`. No legacy prop aliases are preserved.

## Accessibility and state

Ark owns the input `type`, visibility trigger labels, ARIA wiring, and visibility state. Use
`translations.visibilityTrigger` for localized trigger labels. `PasswordInputInput` is the part form
libraries should target for value refs. `Field` and `Fieldset` state is inherited through
Ark context for `disabled`, `invalid`, `required`, and `readOnly`. There is no `HiddenInput` part for
this primitive.

Ark data attributes to preserve include `data-scope="password-input"`, `data-part`, `data-state` on
`Input`, `VisibilityTrigger`, and `Indicator`, plus `data-disabled`, `data-invalid`, `data-readonly`,
and `data-required` where upstream provides them. `Control` receives `data-disabled`,
`data-invalid`, and `data-readonly`; shell styling should target those Ark attributes instead of
deriving state through descendant selectors.

## Defaults and styling

The control follows Input's compact `--moduix-size-md` baseline; its visibility trigger remains a `--moduix-size-sm` icon control. The root fills its container by default; use `--moduix-password-input-max-width` when a constrained field is required.

The wrapper adds moduix classes, `data-slot` hooks, default visibility icons, and
`--moduix-password-input-*` CSS variables for visual customization. Ark does not expose component-specific
runtime CSS variables for this primitive. Styling should target Ark attributes or stable moduix
`data-slot` hooks. The `Input` part must stay visually in sync with `Input` and `FieldInput`: the
same padding, typography, invalid state, disabled opacity, and readonly surface all flow from the
shared `--moduix-input-*` tokens unless a password-specific override is intentional. The bordered field
shell lives on `PasswordInputControl`, so the input text area stays borderless and stops before the
visibility trigger instead of extending underneath it. Keep docs CSS variables synchronized with the
full public `--moduix-password-input-*` list in `packages/foundation/src/styles/variables-moduix.css`.

## Intentional sugar and differences from upstream

`PasswordInputField` is the default fixed composition sugar. Its `className` and ref target the
control; use the lower-level parts when input props, structure, or children must differ.
`PasswordInputIndicator` defaults to `EyeClosedIcon` for the hidden fallback and `EyeIcon` for the
visible state. Consumers can pass `fallback` and children to replace both icons. Legacy single-node
props from the previous custom implementation were removed: `onValueChange`, `onVisibleChange`,
`visibilityToggleLabels`, `size`, and root-level input props such as `placeholder` now belong to
Ark's root/input parts as appropriate.

## Agent notes

Keep the wrapper thin and use the flat public API. Do not rebuild local visibility state or reintroduce
`InputGroup` as the implementation. If Ark adds new password-input parts, mirror them through the
component and barrel exports with the same flat naming style.

## Local changelog

- 2026-08-11: Applied disabled opacity once at the root so the complete field shares one coherent
  disabled state; corrected the documented vertical-padding and disabled-opacity fallbacks.

- 2026-07-29: Removed the default password-field width cap, fixed duplicated disabled opacity, and
  made the readonly visibility trigger visually non-interactive.

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Aligned the default password control with the compact Input `md` baseline.

- 2026-07-10: Added `PasswordInputField` as the default fixed visible-part composition; direct Ark
  part composition remains the advanced path.
- 2026-07-03: Simplified the public surface to match `Combobox`: kept `RootProvider` and
  `usePasswordInput`, removed moduix re-exports for Ark context APIs and duplicate type aliases.
- 2026-06-26: Simplified `PasswordInputControl` styling to use Ark state attributes directly,
  removed an unused focus-border token, aligned padding fallbacks with shared Input tokens, and
  synced public docs with the full password-input CSS variable contract.
- 2026-06-20: Added missing public password-input styling variables and aligned trigger/icon
  defaults with the shared Button tokens.
- 2026-06-20: Moved the shared field shell styling to `PasswordInputControl` so the input area
  ends before the visibility trigger instead of rendering underneath the eye button.
- 2026-06-20: Migrated PasswordInput from the custom InputGroup implementation to Ark UI
  `@ark-ui/react/password-input`; replaced the legacy single-node API with Ark parts, state details,
  provider/context hooks, Ark data attributes, and moduix CSS variables.
