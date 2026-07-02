# moduix

## Unreleased

### Major Changes

- Simplify `Badge` by removing its public prop and variant type aliases. Derive consumer types from
  `ComponentProps<typeof Badge>` when needed.

### Minor Changes

- Add `InputGroup.Root` and namespaced `InputGroup` part aliases while preserving the existing
  named exports.
- Add `QrCode` as an Ark UI-backed component with frame, pattern, overlay, download trigger,
  provider/context exports, docs, and registry metadata.
- Complete the Avatar Ark UI contract with `RootProvider`, `Context`, `useAvatar`,
  `useAvatarContext`, and their public types.
- Finalize the Toast Ark UI migration with direct toaster type exports, token-aligned styles,
  mobile sizing, and explicit `null` title and description content.

## 1.0.5

### Patch Changes

- 6f75f82: New styles for indicators in select-like popups

## 1.0.4

### Patch Changes

- 4d0850a: update deps

## 1.0.3

### Patch Changes

- b5e2fcc: New animation tokens for components with interactive popups
  New small component Tag

## 1.0.2

### Patch Changes

- 0b79dae: update deps

## 1.0.1

### Patch Changes

- 0959302: Alert and Toast updates for colors, new tokens for success/warning

## 1.0.0

### Major Changes

- d5e0852: Add shadcn registry along npm install, all components ready to first release, api and styles consistent across all present components

### Patch Changes

- d5e0852: Add shadcn registry (poc), update Accordion defaults

## 0.11.3

### Patch Changes

- a2e7db1: Deploy fixes and styles regression for several components

## 0.11.2

### Patch Changes

- c6ee677: Remove cjs exports, now library only esm

## 0.11.1

### Patch Changes

- 3bc5ee5: Switch vite-library mode to tsdown

## 0.11.0

### Minor Changes

- 3197e84: New components: AspectRatio, Table, CopyButton, Empty, PasswordInput, SplitButton, Stepper.
  Small api updates for each component

## 0.10.0

### Minor Changes

- faa61f6: Api updates for remaining components, breadcrumbs fixes, lightbox fixes

## 0.9.1

### Patch Changes

- a239b37: [Drawer] new Island variant

## 0.9.0

### Minor Changes

- fad6c0a: New components: Badge, Alert, CommandPalette, Kbd, InputGroup, Card

## 0.8.5

### Patch Changes

- fb939b0: Fix animation styles in Autocomplete

## 0.8.4

### Patch Changes

- 3ef298a: [Lightbox] simplify css for different bundlers

## 0.8.3

### Patch Changes

- 3558c3e: Fix Bleed full styles

## 0.8.2

### Patch Changes

- 828cc89: Refactor ScrollArea horizontal api

## 0.8.1

### Patch Changes

- 667c7e7: Expand more css variables for styling

## 0.8.0

### Minor Changes

- e80cba3: [breadcrumbs] New component

## 0.7.1

### Patch Changes

- 2904d6f: New component Pagination
- cf75b46: New component Lightbox

## 0.7.0

### Minor Changes

- 473136d: API synced and simplified across all components

### Patch Changes

- 473136d: infra changes

## 0.6.5

### Patch Changes

- 4fd31bb: Refactor for z-indexes

## 0.6.4

### Patch Changes

- b1d9ab4: Add repository to package.json

## 0.6.3

### Patch Changes

- fbcb9e6: Updates for ci releases

## 0.6.2

### Patch Changes

- 29760f0: Expand API exports, docs updates

## 0.6.1

### Minor Changes

- Ready for first public release
- Simplification API for all components