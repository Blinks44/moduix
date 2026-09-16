# @moduix/solid

## 1.1.1

### Patch Changes

### CommandPalette

- cbcda2a: Use the Ark UI Hotkeys export consistently across all adapters.

## 1.1.0

### Minor Changes

- 7af13b7: Fix reviewed component contracts, including stable styling hooks, Alert live-region semantics, Container width with `gutter="none"`, and Solid CommandPalette clear cancellation. Remove unsupported AngleSlider and Carousel API surface, and simplify Button styling internals.

### Patch Changes

- 7af13b7: Align component contracts across framework and styling adapters.
- 7af13b7: Preserve internal `data-slot` hooks and fix Tour overlay layering.

## 1.0.0

### Major Changes

- Keep package imports consistently subpath-based across React, Solid, CSS Modules, and Tailwind distributions, and publish only the documented package entrypoints.

### AspectRatio

- f022e4e: Limit default styling to the ratio container.
  Media sizing, fitting, clipping, and border radius are now consumer-owned, and `--moduix-aspect-ratio-radius` is removed.

### Badge

- f022e4e: Keep direct children unchanged and limit built-in interaction styling to links.
  Use `Badge.Label` explicitly for truncation; button hover and disabled presentation are now consumer-owned, and `--moduix-badge-opacity-disabled` is removed.

### Minor Changes

### Sidebar

- a333616: Add NavigationBadge for counts alongside navigation buttons.
- 9a1018a: Add explicit Menu viewport composition and preserve Solid bound button handlers.

### Avatar

- 32f7db7: Make fallback content explicit and remove generated initials and the built-in fallback icon.

### AngleSlider

- a118470: Require explicit composition of the native form control.

### Checkbox

- a118470: Require explicit composition of the native form control.

### ColorPicker

- a118470: Require explicit composition of the native form control.

### DateInput

- a118470: Require explicit composition of the native form control.

### FileUpload

- a118470: Require explicit composition of the native form control.

### PinInput

- a118470: Require explicit composition of the native form control.

### RadioGroup

- a118470: Require explicit composition of item form controls.

### RatingGroup

- a118470: Require explicit composition of the native form control.

### SegmentGroup

- a118470: Require explicit composition of item form controls.

### Select

- a118470: Require explicit composition of the native form control.

### SignaturePad

- a118470: Require explicit composition of the native form control.

### Slider

- a118470: Require explicit composition of the native form control.

### Switch

- a118470: Require explicit composition of the native form control.

### TagsInput

- a118470: Require explicit composition of the native form control.

### Alert

- 20bb7e9: Require `Alert.Content` to contain title, description, actions, and other message content.

### Patch Changes

### Pagination

- 1901dc5: Preserve localized navigation labels and safe `asChild` composition while removing item transitions.