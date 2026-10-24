# Toast (Vue)

## Upstream reference

[Ark Toast](https://ark-ui.com/docs/components/toast).

## Public contract

ToastToaster consumes createToaster and an optional scoped slot with Ark ToastOptions.
Its default content composes Toast, ToastTitle, ToastDescription, optional ToastActionTrigger
and optional ToastCloseTrigger. A `loading` toast gets a decorative Spinner before its title.
The root reserves inline-end padding for the close trigger only while one is rendered.
Hooks and public parts use the flat moduix exports.

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
CSS Modules read `--moduix-toast-bg`, `--moduix-toast-border-color`, `--moduix-toast-color` (all
override every type; scope them with `[data-type='…']` for one type) and
`--moduix-toast-description-color`; everything else comes from foundation tokens.
ToastCloseTrigger defaults its label to `Close toast` unless `aria-label` or `aria-labelledby` is
passed. Ark owns live-region semantics and toast lifecycle.

## Responsive layout

On viewports up to and including `40rem`, every `top-*` placement is centered at the top and
every `bottom-*` placement is centered at the bottom. Toasts keep their default `20rem` width
and shrink to fit between Ark's `offsets` and horizontal safe-area insets on narrower screens.
The vertical placement, stack animations, and `gap` between toasts remain Ark-owned; `gap` does
not control viewport padding. Above `40rem`, the configured corner or center placement applies.