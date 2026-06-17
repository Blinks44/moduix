# CopyButton

Upstream references:

- Local button contract: `../button/button.md`
- Ark UI composition guide: https://ark-ui.com/docs/guides/composition

## Purpose

`CopyButton` is the moduix action button for copying a known string value to the system clipboard. It
keeps the local `Button.Root` visual contract, adds a default copy action, and provides transient
copied feedback without turning clipboard behavior into app-specific toast logic.

Use it when the copied value is already known at render time: tokens, invite links, IDs, commands,
and short snippets. For richer clipboard flows with surrounding field layout, compose it next to
`Input`, `PasswordInput`, or custom text content.

## Current behavior contract

- Renders one local `Button.Root` and forwards its ref to that button.
- Requires a `value` string and copies it with `navigator.clipboard.writeText(value)` on click.
- Defaults `type="button"` so it behaves like an action button inside forms.
- Preserves normal `Button.Root` props such as `variant`, `size`, `disabled`, `asChild`,
  `className`, and event handlers.
- If the consumer `onClick` prevents default, the copy action does not run.
- If `children` is omitted, the button is icon-only and:
  - defaults to `size="icon-md"` unless `size` is passed explicitly;
  - renders `CopyIcon` normally and `CheckIcon` while copied;
  - auto-generates `aria-label` from the current copy state unless `aria-label` or
    `aria-labelledby` is provided.
- If `children` is a plain string or number, `CopyButton` temporarily swaps that visible label to
  `copyLabels.copied` after success.
- If `children` is more complex JSX, `CopyButton` leaves the visible button content untouched and only
  handles clipboard behavior plus copied-state attributes.
- Successful copy sets transient copied state for `copiedDuration` milliseconds.
- A visually hidden live region announces the copied label so screen reader users receive transient
  success feedback reliably.
- Clipboard failures are surfaced through `onCopyError`. If no `onCopyError` is provided, the
  component rethrows the error asynchronously instead of swallowing it silently.

## Composition

Basic icon-only usage:

```tsx
import { CopyButton } from 'moduix';

export function TokenCopyButton() {
  return <CopyButton aria-label="Copy API token" value="maps-platform-token" />;
}
```

With visible text:

```tsx
import { CopyButton } from 'moduix';

export function InviteCopyButton() {
  return <CopyButton value="https://moduix.dev/invite/maps">Copy invite link</CopyButton>;
}
```

When `children` is plain text like this, the visible label temporarily switches to `Copied` after a
successful copy.

Next to field content:

```tsx
import { CopyButton, Field, FieldDescription, FieldLabel } from 'moduix';

export function TokenField() {
  return (
    <Field>
      <FieldLabel>API token</FieldLabel>
      <FieldDescription>Copy the token for local development.</FieldDescription>
      <div>
        <span>maps-platform-token</span>
        <CopyButton aria-label="Copy API token" value="maps-platform-token" />
      </div>
    </Field>
  );
}
```

## Exported API

`CopyButton` exports:

- `CopyButton`
- `CopyButtonProps`

## Public props

`CopyButton` accepts the local `Button.Root` props except it overrides `onClick` to layer clipboard
behavior, plus the props below.

| Prop             | Type                               | Default                              | Notes                                                                                                                                                                                 |
| ---------------- | ---------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`          | `string`                           | —                                    | Clipboard text written on click.                                                                                                                                                      |
| `copiedDuration` | `number`                           | `2000`                               | How long copied state stays active after success.                                                                                                                                     |
| `copyLabels`     | `{ copy: string; copied: string }` | `{ copy: 'Copy', copied: 'Copied' }` | `copy` is the default icon-only label before click; `copied` is used for copied feedback in the live region, the icon-only label after success, and plain-text children while copied. |
| `onCopy`         | `(value: string) => void`          | —                                    | Called after successful clipboard write.                                                                                                                                              |
| `onCopyError`    | `(error: unknown) => void`         | —                                    | Called when clipboard write fails.                                                                                                                                                    |

Important inherited `Button.Root` props still available:

- `variant`, `size`, `disabled`, `type`, `className`
- `asChild`
- `aria-label`, `aria-labelledby`, and `children`
- normal button event handlers, including `onClick`

`copyLabels` is mainly useful when the default English feedback should be customized:

- icon-only button: `copy` -> default accessible label before click, `copied` -> accessible label after success
- text button with plain string children: `copied` -> temporary visible replacement text after success
- all variants: `copied` -> screen-reader announcement text from the live region

## Styling API

Stable hooks:

| Part        | Hook                          |
| ----------- | ----------------------------- |
| button root | `data-slot="copy-button"`     |
| live region | internal visually hidden span |

Important state hooks:

- root keeps the normal local `Button.Root` data hooks: `data-variant`, `data-size`, and disabled state
- root writes `data-copied` while transient copied state is active

`CopyButton` does not add public `--copy-button-*` variables. Style it through:

- the inherited `--button-*` token surface
- `className` on the button root
- `[data-copied]` selectors for copied-state styling

## UX and accessibility

- Icon-only usage should have an accessible name. The default icon-only path handles this
  automatically from `copyLabels`, but custom icon-only children should provide `aria-label` or
  `aria-labelledby`.
- The live region announces `copyLabels.copied` after success so transient feedback reaches assistive
  technologies.
- `CopyButton` intentionally does not show a toast or tooltip by itself. Surrounding feedback remains
  an app-level composition choice.
- Clipboard writes depend on browser clipboard support and secure context rules.

## Intentional differences from Base UI

- Import from `moduix`, not `@base-ui/react/button`, when you want a styled copy action with built-in
  clipboard behavior.
- `CopyButton` is a moduix convenience wrapper over the local `Button.Root`, not a raw primitive re-export.
- The wrapper adds one narrow workflow sugar: copy known text plus transient copied feedback.

## Agent notes

- Keep the component narrow. Do not add tooltip, toast, field wrapper, or async loading APIs unless a
  concrete request requires them.
- Preserve the live-region announcement and timer cleanup behavior; the copied state is transient and
  should not rely on `aria-label` changes alone.
- Keep default icon-only sizing and labeling in sync with stories and docs.

## Local changelog

- Added `CopyButton` as a small clipboard-action wrapper over the local `Button.Root`.
- Added `CopyIcon` to the shared UI icon set for copy-to-clipboard affordances.
- 2026-06-17: Updated inherited button references from Base `render` / `nativeButton` /
  `focusableWhenDisabled` to Ark-style `asChild`.