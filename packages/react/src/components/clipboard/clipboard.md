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

- `Clipboard` and `ClipboardRootProvider` are thin styled wrappers over the Ark primitives.
- `onValueChange(details)` and `onStatusChange(details)` keep the Ark `details` objects unchanged.
- `timeout` is the Ark copied-state duration; the default remains Ark's default instead of a local renamed prop.
- `ClipboardInput` is the editable or read-only text surface for the current value.
- `ClipboardTrigger` is the copy action button. It stays structural and does not hide `ClipboardIndicator` or `ClipboardValueText`.
- `ClipboardIndicator` adds leaf-level icon sugar: default idle and copied icons when no custom content is provided.
- `ClipboardCopyText` adds matching text sugar: `Copy` while idle and `Copied` while copied unless the consumer overrides them.
- `ClipboardValueText` exposes the current value as text when an input field is not the right surface.
- `ClipboardRootProvider` keeps the styled root for clipboard state created with `useClipboard()`.
- `ClipboardContext`, `useClipboard()`, and `useClipboardContext()` re-export Ark state access without changing its arguments or return value. Ark type aliases remain direct imports from `@ark-ui/react/clipboard`.
- `Clipboard` is the only root value; every other part uses a `Clipboard`-prefixed named export.
- The root no longer caps width by default; consumers opt into a cap with `--moduix-clipboard-max-width`.
- The old `CopyButton` API, prop names, live-region wrapper, and button-only mental model were removed in favor of the Ark family.

## Anatomy and exported parts

```text
Clipboard | ClipboardRootProvider
├─ ClipboardLabel (optional)
├─ ClipboardControl
│  ├─ ClipboardInput or ClipboardValueText
│  └─ ClipboardTrigger
│     ├─ ClipboardIndicator (optional)
│     └─ ClipboardCopyText (optional)
```

- `Clipboard` -> `data-slot="clipboard-root"`
- `ClipboardRootProvider` -> `data-slot="clipboard-root-provider"`
- `ClipboardLabel` -> `data-slot="clipboard-label"`
- `ClipboardControl` -> `data-slot="clipboard-control"`
- `ClipboardInput` -> `data-slot="clipboard-input"`
- `ClipboardTrigger` -> `data-slot="clipboard-trigger"`
- `ClipboardIndicator` -> `data-slot="clipboard-indicator"`
- `ClipboardCopyText` -> `data-slot="clipboard-copy-text"`
- `ClipboardValueText` -> `data-slot="clipboard-value-text"`

Default icon sugar:

- idle icon -> `data-slot="clipboard-indicator-idle-icon"`
- copied icon -> `data-slot="clipboard-indicator-copied-icon"`

## Composition

Canonical editable-field composition:

```tsx
import {
  Clipboard,
  ClipboardControl,
  ClipboardCopyText,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardTrigger,
} from '@moduix/react/clipboard';

export function ClipboardDemo() {
  return (
    <Clipboard defaultValue="https://moduix.dev/docs/clipboard">
      <ClipboardLabel>Copy this link</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput readOnly />
        <ClipboardTrigger>
          <ClipboardIndicator />
          <ClipboardCopyText />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  );
}
```

`ClipboardInput` and `ClipboardTrigger` keep Ark `asChild` support for migration paths where a
consumer wants another semantic input or button element to own the rendered node.

## Upstream feature coverage

- Basic composition: supported with `Clipboard`, `ClipboardLabel`, `ClipboardControl`, `ClipboardInput`, `ClipboardTrigger`, `ClipboardIndicator`, and `ClipboardCopyText`.
- Controlled value: supported via `value`, `defaultValue`, and `onValueChange(details)`.
- Copy status: supported via `onStatusChange(details)` and Ark `data-copied` attributes.
- Timeout: supported via Ark `timeout`.
- Value text pattern: supported with `ClipboardValueText`.
- Root provider pattern: supported with `useClipboard()` and `ClipboardRootProvider`.
- `ClipboardContext`, `useClipboard()`, and `useClipboardContext()` are available as flat top-level exports.

## Accessibility and state

- Ark handles the clipboard write, copied-state timing, and trigger semantics.
- Refs on `Clipboard`, `ClipboardRootProvider`, `ClipboardInput`, `ClipboardTrigger`,
  `ClipboardIndicator`, `ClipboardCopyText`, and `ClipboardValueText` forward to their underlying
  Ark part targets.
- `onStatusChange(details)` exposes Ark copy-status details without remapping.
- Ark applies `data-copied` to the root, label, control, input, and trigger while copied state is active.
- Ark applies `data-readonly` on `ClipboardInput` when read-only.
- Ark does not expose a root-level disabled state. Consumers disable `ClipboardInput` and
  `ClipboardTrigger` through their native `disabled` props; moduix styles both native disabled
  parts consistently.
- `ClipboardTrigger` keeps Ark keyboard and focus behavior. Do not replace it with a custom click handler layer.
- `ClipboardCopyText` inherits Ark indicator semantics through `ClipboardIndicator`, so copied-state text still follows the same copied timing and `data-copied` state as the trigger.
- The wrapper no longer adds a separate live region. Accessibility follows the Ark clipboard contract directly.
- `ClipboardContext`, `useClipboard()`, `useClipboardContext()`, and `ClipboardRootProvider` are the moduix-owned advanced state path.

## Defaults and styling

The text input and copy trigger use the shared `--moduix-size-md` baseline; the input's default block padding is `--moduix-spacing-1`.

- `className` is supported on every exported visual part.
- `ClipboardIndicator` defaults to `CopyIcon` and `CheckIcon`.
- `ClipboardCopyText` defaults to `Copy` and `Copied`.
- Styles follow Ark `data-part` hooks and keep `data-copied` available for opt-in customization.
- Public component tokens live under `--moduix-clipboard-*` in `packages/foundation/src/styles/variables-moduix.css`.
- Input and trigger tokens intentionally fall back to the existing `--moduix-input-*` and `--moduix-button-*` families where that keeps the visual system aligned.
- `--moduix-clipboard-max-width` defaults to `none` instead of a fixed cap.
- Copied-state styling should target Ark `data-copied` directly; there is no separate `--moduix-clipboard-*-copied` token layer.
- The trigger follows the moduix button interaction model with hover, focus-visible, pressed, and
  reduced-motion-aware feedback.

## Intentional sugar and differences from upstream

- moduix adds styling defaults for all exported parts.
- moduix adds default indicator icons and default copy-status text only; that is the only behavior sugar beyond styling.
- Default copied-state styling is intentionally neutral for `ClipboardInput` and `ClipboardTrigger`, matching the Ark examples more closely.
- moduix keeps `ClipboardRootProvider` and re-exports `useClipboard` as a flat top-level hook, but does not re-export Ark type aliases.
- `CopyButton` was removed as a breaking change. Consumers must switch to `Clipboard` parts and Ark callback names.
- No legacy prop aliases remain. `copiedDuration`, `copyLabels`, `onCopy`, and `onCopyError` do not exist on the new surface.

## Agent notes

- Keep the family Ark-shaped. Do not collapse the composition back into a single button wrapper.
- Preserve the explicit trigger/input/value-text structure in docs, stories, and registry output.
- Keep the flat value surface: `Clipboard` is the only root value and every other part uses a
  `Clipboard`-prefixed named export.
- If the visual contract changes, keep `--moduix-clipboard-*` tokens and the docs CSS properties section in sync.

## Local changelog

- 2026-09-21: Replaced the compound `Clipboard.*` value surface with the shared flat API. `Clipboard`
  is now the only root value; every other part uses a `Clipboard`-prefixed named export and the
  clipboard hooks are top-level `use*` exports.
- 2026-08-09: Covered refs, context access, default copy affordances, and native disabled semantics;
  aligned disabled input and pressed trigger styling with the public component contract.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Aligned the default input and copy trigger to `--moduix-size-md` and compacted input padding.

- 2026-07-09: Restored `ClipboardContext`, `useClipboard()`, and `useClipboardContext()` for the public `RootProvider` path; documented `asChild` as advanced customization and covered the copied state in Storybook.
- 2026-07-07: Added `ClipboardCopyText`, switched the recommended consumer path to the short `<Clipboard>` root form in examples, and removed the default max-width cap.
- 2026-07-02: Removed duplicate Ark type exports, `ClipboardContext`, and clipboard state hook re-exports from the moduix surface. Kept `RootProvider`, the callable root, and all styled visual parts.
- 2026-06-24: Synced RootProvider docs with the shipped `ClipboardRootProvider` API and removed stale copied-state styling tokens from examples.
- 2026-06-18: Replaced `CopyButton` with an Ark UI `Clipboard` component family and removed the legacy button-only API.