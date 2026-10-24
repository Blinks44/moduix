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
- `ClipboardInput` is the read-only text surface for the current value. Ark always renders it with
  `readOnly` and `data-readonly`; change the value through `value` or `ClipboardContext.setValue()`.
- `ClipboardTrigger` is the copy action button. It stays structural and does not hide `ClipboardIndicator` or `ClipboardValueText`.
- `ClipboardIndicator` adds leaf-level sugar: default `CopyIcon` and `CheckIcon` as direct `svg` children when no custom content is provided. Text usage passes `copied="Copied"` and children directly.
- `ClipboardInput` and `ClipboardTrigger` drop their own styles under `asChild`, so a composed moduix `Input` or `Button` keeps its look.
- `ClipboardValueText` exposes the current value as text when an input field is not the right surface.
- `ClipboardRootProvider` keeps the styled root for clipboard state created with `useClipboard()`.
- `ClipboardContext`, `useClipboard()`, and `useClipboardContext()` re-export Ark state access without changing its arguments or return value. Ark type aliases remain direct imports from `@ark-ui/react/clipboard`.
- `Clipboard` is the only root value; every other part uses a `Clipboard`-prefixed named export.
- The root fills its container; set width or a cap with `className`.
- The old `CopyButton` API, prop names, live-region wrapper, and button-only mental model were removed in favor of the Ark family.

## Anatomy and exported parts

```text
Clipboard | ClipboardRootProvider
├─ ClipboardLabel (optional)
├─ ClipboardControl
│  ├─ ClipboardInput or ClipboardValueText
│  └─ ClipboardTrigger
│     └─ ClipboardIndicator (optional)
```

- `Clipboard` -> `data-slot="clipboard-root"`
- `ClipboardRootProvider` -> `data-slot="clipboard-root-provider"`
- `ClipboardLabel` -> `data-slot="clipboard-label"`
- `ClipboardControl` -> `data-slot="clipboard-control"`
- `ClipboardInput` -> `data-slot="clipboard-input"`
- `ClipboardTrigger` -> `data-slot="clipboard-trigger"`
- `ClipboardIndicator` -> `data-slot="clipboard-indicator"`
- `ClipboardValueText` -> `data-slot="clipboard-value-text"`

## Composition

Canonical editable-field composition:

```tsx
import {
  Clipboard,
  ClipboardControl,
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
        <ClipboardInput />
        <ClipboardTrigger>
          <ClipboardIndicator copied="Copied">Copy</ClipboardIndicator>
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  );
}
```

`ClipboardInput` and `ClipboardTrigger` keep Ark `asChild` support for paths where a consumer wants
another input or button element, such as moduix `Input` and `Button`, to own the rendered node. The
child then brings its own styles.

## Upstream feature coverage

- Basic composition: supported with `Clipboard`, `ClipboardLabel`, `ClipboardControl`, `ClipboardInput`, `ClipboardTrigger`, and `ClipboardIndicator`.
- Controlled value: supported via `value`, `defaultValue`, and `onValueChange(details)`.
- Copy status: supported via `onStatusChange(details)` and Ark `data-copied` attributes.
- Timeout: supported via Ark `timeout`.
- Value text pattern: supported with `ClipboardValueText`.
- Root provider pattern: supported with `useClipboard()` and `ClipboardRootProvider`.
- `ClipboardContext`, `useClipboard()`, and `useClipboardContext()` are available as flat top-level exports.

## Accessibility and state

- Ark handles the clipboard write, copied-state timing, and trigger semantics.
- Refs on `Clipboard`, `ClipboardRootProvider`, `ClipboardInput`, `ClipboardTrigger`,
  `ClipboardIndicator`, and `ClipboardValueText` forward to their underlying Ark part targets.
- `onStatusChange(details)` exposes Ark copy-status details without remapping.
- Ark applies `data-copied` to the root, label, control, input, and trigger while copied state is active.
- Ark applies `data-readonly` on `ClipboardInput`; the input is always read-only.
- Ark does not expose a root-level disabled state or `data-disabled` on these parts. Consumers
  disable `ClipboardInput` and `ClipboardTrigger` through their native `disabled` props; moduix
  styles `:disabled` on both.
- Ark gives `ClipboardTrigger` the accessible name "Copy to clipboard" ("Copied to clipboard" while
  copied). It replaces visible trigger text, so pass `aria-label` when the text says more.
- `ClipboardTrigger` keeps Ark keyboard and focus behavior. Do not replace it with a custom click handler layer.
- The wrapper no longer adds a separate live region. Accessibility follows the Ark clipboard contract directly.
- `ClipboardContext`, `useClipboard()`, `useClipboardContext()`, and `ClipboardRootProvider` are the moduix-owned advanced state path.

## Defaults and styling

- The input and trigger share one height (`--moduix-size-md`), radius, and border color, so they
  line up in `ClipboardControl`.
- `className` is supported on every exported visual part.
- `ClipboardIndicator` defaults to `CopyIcon` and `CheckIcon`; text content is passed directly (`copied="Copied"`, children `Copy`).
- Public component variables in `packages/foundation/src/styles/variables-moduix.css`: `gap`,
  `control-gap`, `height`, `radius`, `border-color`, `input-bg`, `trigger-bg`, `trigger-bg-hover`,
  and `icon-size` under `--moduix-clipboard-*`. Typography, focus ring, transition, and disabled
  opacity come from foundation tokens.
- Copied-state styling targets Ark `data-copied` directly.
- The trigger keeps hover, focus-visible, and pressed opacity feedback without press translation
  or scaling. Movement is reserved for standalone Button roots.

## Intentional sugar and differences from upstream

- moduix adds styling defaults for all exported parts.
- moduix adds default indicator icons only; that is the only behavior sugar beyond styling.
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