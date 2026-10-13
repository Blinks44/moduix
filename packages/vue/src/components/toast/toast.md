# Toast (Vue)

## Upstream reference

[Ark Toast](https://ark-ui.com/docs/components/toast).

## Public contract

ToastToaster consumes createToaster and an optional scoped slot with Ark ToastOptions.
Its default content composes Toast, ToastTitle, ToastDescription, optional ToastActionTrigger
and optional ToastCloseTrigger. Hooks and public parts use the flat moduix exports.

The toaster is portalled to body by default. portalled=false renders inline; portalRef
accepts an element or getter with a body fallback. Native Teleport supports reactive
target/disabled updates without remounting the toaster host.
Nested overlays keep their own portal configuration.

## Preservation notes

Keep reactive VNode content and scoped slots, consumer classes, callbacks, announcements,
queue behavior and inline SSR/hydration. No secondary overlay provider is needed solely
to render the toaster. Other overlay families retain their shared context helper.
Existing skipped direct-Ark Toast/Toaster asChild regressions remain upstream limitations.

## Styling and accessibility

Parts accept class and expose data-slot / Ark state attributes. Tailwind uses utility overrides.
Ark owns live-region semantics and toast lifecycle.

## Responsive layout

On viewports up to and including `40rem`, every `top-*` placement is centered at the top and
every `bottom-*` placement is centered at the bottom. Toasts keep their default `20rem` width
and shrink to fit between Ark's `offsets` and horizontal safe-area insets on narrower screens.
The vertical placement, stack animations, and `gap` between toasts remain Ark-owned; `gap` does
not control viewport padding. Above `40rem`, the configured corner or center placement applies.

## Local changelog

- 2026-10-11: Fixed mobile viewport overflow across all placements; centered toasts through the
  inclusive 40rem breakpoint retain their 20rem width and shrink within offsets and safe-area insets.