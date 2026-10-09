# Menu (Vue)

## Upstream reference

[Ark Menu](https://ark-ui.com/docs/components/menu).

## Public contract

Menu and MenuRootProvider use the flat family-prefixed parts. MenuRootProvider receives
the unwrapped API from useMenu; machine callbacks belong to that hook, while provider
presence events remain on the provider.

Both composition paths default portalled, lazyMount and unmountOnExit to true.
MenuPositioner owns the portal boundary: pass portalled=false for inline content,
or portalRef for a custom destination. These defaults apply to CSS Modules and Tailwind.

## Preservation notes

Optional locally declared Boolean props need an explicit default: Vue otherwise turns
an absent portalled prop into false before OverlayPortalProvider can apply its own default.
Keep portal context reactive and separate from Ark machine state. Do not insert a DOM
wrapper around the renderless root/provider merely to attach styles or a ref.

Native part refs/asChild hosts, controlled open/checked values, callback details,
submenu composition, Escape focus return and SSR/hydration remain Ark-shaped.

## Styling and accessibility

Rendered parts accept class and expose data-slot plus Ark state/data attributes.
CSS Modules uses component tokens; Tailwind uses utility/class overrides. Ark owns
menu roles, roving focus, dismissal and keyboard navigation.

## Local changelog

- 2026-10-04: Align Tailwind MenuRootProvider's omitted portalled default with Menu and CSS Modules.