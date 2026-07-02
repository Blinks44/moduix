# Clipboard

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/clipboard
- Chakra UI: https://chakra-ui.com/docs/components/clipboard

## Purpose

`Clipboard` is the moduix Ark-backed clipboard family for displaying, editing, and copying string values.

## Upstream model to preserve

The wrapper follows Ark UI `Clipboard` for state, copy lifecycle, and composition. Keep the Ark part tree and callback
shapes intact: `Root`, `RootProvider`, `Label`, `Control`, `Input`, `Trigger`, `Indicator`, and `ValueText`.

## Current behavior contract

- `Clipboard.Root` and `Clipboard.RootProvider` are thin styled wrappers over the Ark primitives.
- `onValueChange(details)` and `onStatusChange(details)` keep the Ark `details` objects unchanged.
- `timeout` is the Ark copied-state duration; the default remains Ark's default instead of a local renamed prop.
- `Clipboard.Input` is the editable or read-only text surface for the current value.
- `Clipboard.Trigger` is the copy action button. It stays structural and does not hide `Indicator` or `ValueText`.
- `Clipboard.Indicator` adds only leaf-level sugar: default idle and copied icons when no custom content is provided.
- `Clipboard.ValueText` exposes the current value as text when an input field is not the right surface.
- `Clipboard.RootProvider` keeps the styled root for clipboard state created with Ark `useClipboard()`.
- Ark context hooks and Ark type aliases are not re-exported from moduix. Import those directly from `@ark-ui/react/clipboard` when an advanced workflow needs them.
- The old `CopyButton` API, prop names, live-region wrapper, and button-only mental model were removed in favor of the Ark family.

## Anatomy and exported parts

```text
Clipboard.Root | Clipboard.RootProvider
├─ Clipboard.Label (optional)
├─ Clipboard.Control
│  ├─ Clipboard.Input or Clipboard.ValueText
│  └─ Clipboard.Trigger
│     └─ Clipboard.Indicator (optional but recommended)
```

- `Clipboard.Root` -> `data-slot="clipboard-root"`
- `Clipboard.RootProvider` -> `data-slot="clipboard-root-provider"`
- `Clipboard.Label` -> `data-slot="clipboard-label"`
- `Clipboard.Control` -> `data-slot="clipboard-control"`
- `Clipboard.Input` -> `data-slot="clipboard-input"`
- `Clipboard.Trigger` -> `data-slot="clipboard-trigger"`
- `Clipboard.Indicator` -> `data-slot="clipboard-indicator"`
- `Clipboard.ValueText` -> `data-slot="clipboard-value-text"`

Default icon sugar:

- idle icon -> `data-slot="clipboard-indicator-idle-icon"`
- copied icon -> `data-slot="clipboard-indicator-copied-icon"`

## Composition

Canonical editable-field composition:

```tsx
import { Clipboard } from '@moduix/react';

export function ClipboardDemo() {
  return (
    <Clipboard.Root defaultValue="https://moduix.dev/docs/clipboard">
      <Clipboard.Label>Copy this link</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input readOnly />
        <Clipboard.Trigger aria-label="Copy link">
          <Clipboard.Indicator />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard.Root>
  );
}
```

## Upstream feature coverage

- Basic composition: supported with `Root`, `Label`, `Control`, `Input`, `Trigger`, and `Indicator`.
- Controlled value: supported via `value`, `defaultValue`, and `onValueChange(details)`.
- Copy status: supported via `onStatusChange(details)` and Ark `data-copied` attributes.
- Timeout: supported via Ark `timeout`.
- Value text pattern: supported with `Clipboard.ValueText`.
- Root provider pattern: supported with Ark `useClipboard()` and `Clipboard.RootProvider`.
- Context access remains available directly from `@ark-ui/react/clipboard`.

## Accessibility and state

- Ark handles the clipboard write, copied-state timing, and trigger semantics.
- `onStatusChange(details)` exposes Ark copy-status details without remapping.
- Ark applies `data-copied` to `Root`, `Label`, `Control`, `Input`, and `Trigger` while copied state is active.
- Ark applies `data-readonly` on `Clipboard.Input` when read-only.
- `Clipboard.Trigger` keeps Ark keyboard and focus behavior. Do not replace it with a custom click handler layer.
- The wrapper no longer adds a separate live region. Accessibility follows the Ark clipboard contract directly.
- `Clipboard.RootProvider` is the only advanced state surface re-exported by moduix. Ark `useClipboardContext()` stays available directly from `@ark-ui/react/clipboard`.

## Defaults and styling

- `className` is supported on every exported visual part.
- `Clipboard.Indicator` defaults to `CopyIcon` and `CheckIcon`.
- Styles follow Ark `data-part` hooks and keep `data-copied` available for opt-in customization.
- Public component tokens live under `--clipboard-*` in `packages/react/src/lib/moduix/styles/theme.css`.
- Input and trigger tokens intentionally fall back to the existing `--input-*` and `--button-*` families where that keeps the visual system aligned.
- Copied-state styling should target Ark `data-copied` directly; there is no separate `--clipboard-*-copied` token layer.

## Intentional sugar and differences from upstream

- moduix adds styling defaults for all exported parts.
- moduix adds default indicator icons only; that is the only behavior sugar beyond styling.
- Default copied-state styling is intentionally neutral for `Input` and `Trigger`, matching the Ark examples more closely.
- moduix keeps `RootProvider`, but does not re-export Ark context parts, state hooks, or Ark type aliases.
- `CopyButton` was removed as a breaking change. Consumers must switch to `Clipboard` parts and Ark callback names.
- No legacy prop aliases remain. `copiedDuration`, `copyLabels`, `onCopy`, and `onCopyError` do not exist on the new surface.

## Agent notes

- Keep the family Ark-shaped. Do not collapse the composition back into a single button wrapper.
- Preserve the explicit trigger/input/value-text structure in docs, stories, and registry output.
- If the visual contract changes, keep `--clipboard-*` tokens and the docs CSS properties section in sync.

## Local changelog

- 2026-07-02: Removed duplicate Ark type exports, `Clipboard.Context`, and clipboard state hook re-exports from the moduix surface. Kept `RootProvider`, the callable root, and all styled visual parts.
- 2026-06-24: Synced RootProvider docs with the shipped `Clipboard.RootProvider` API and removed stale copied-state styling tokens from examples.
- 2026-06-18: Replaced `CopyButton` with an Ark UI `Clipboard` component family and removed the legacy button-only API.