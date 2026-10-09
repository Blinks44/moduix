# Lightbox (Vue)

## Upstream reference

Lightbox is an image composition of [Ark Dialog](https://ark-ui.com/docs/components/dialog),
not a dedicated upstream Lightbox primitive.

## Public contract

Use Lightbox, its prefixed parts and useLightbox / useLightboxContext.
Backdrop and Positioner are portalled by default; the root accepts portalled / portalRef.
LightboxImage is a styled native image; closeOnClick respects consumer preventDefault.
Its native click event is emitted once before closing, including merged Vue listeners.
LightboxGallery supplies layout, not image data or carousel state.

LightboxBind binds a semantic button/link selected inside rootRef or rootSelector.
rootRef accepts an element, ref or getter; onImageSelect receives src, optional alt and the image element.
Source precedence is data-lightbox-src, nonempty currentSrc, then src.
An explicitly empty data-lightbox-src excludes the image instead of falling back.
Native clicks already cancelled with event.preventDefault() do not select an image or open the dialog.

## Preservation notes

Ark owns open state, focus restoration and dismissal. Ref / asChild composition stays native Vue.
Bind listeners mount on the client and clean up through watchEffect; no new wrapper DOM is added.
Responsive sources, explicit overrides, empty-currentSrc fallback and SSR/hydration are tested.

## Styling and accessibility

Visual parts accept class and expose data-slot / Ark attributes. Tailwind uses utility overrides.
Keep semantic external triggers and an accessible dialog title or aria-label.

Render LightboxCloseIcon inside LightboxContent, outside LightboxBody, so it stays in Ark's
accessibility tree and focus trap. Content fades while its direct Body child owns scale/translate
motion; the fixed close control stays pinned to the viewport. Both styling tracks use the same
foundation keyframes and preserve reduced-motion exit cleanup.

## Local changelog

- 2026-10-05: Kept the close control inside Content and moved scale/translate motion to Body.

- 2026-10-03: Bind falls back to src when currentSrc is empty.