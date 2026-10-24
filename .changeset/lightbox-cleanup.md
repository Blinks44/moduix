---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Lightbox: CSS Modules keep two `--moduix-lightbox-*` variables, `content-max-width` and `content-max-height`, and drop the other 61; both now cap `LightboxImage` too, so one override on `LightboxContent` resizes the media. Colors, spacing, typography, and gallery sizing come from foundation tokens, so override them with a class on the part. The backdrop uses the Dialog backdrop motion and reads the shared `--moduix-backdrop-bg` and `--moduix-backdrop-filter`; content motion reads only the shared `--moduix-popup-motion-*` variables with the popup default of 200ms ease-in-out instead of 220ms ease, and exits keep their last frame until unmount. The `moduix-lightbox-backdrop-*` keyframes and `animate-moduix-lightbox-backdrop-*` utilities are removed.
`LightboxCloseIcon` no longer sets `data-state` and fades together with the content; the Tailwind variant reuses the `CloseButton` focus ring. Gallery thumbnail hover applies only on hover-capable pointers, and the Tailwind and CSS Modules galleries now share the same 12px slide gap and track color. All adapters export `LightboxContext` and the `LightboxRootProps` and `LightboxRootProviderProps` types with `portalled` and `portalRef`, plus `LightboxImageProps`; Vue `LightboxCloseTrigger` declares `asChild`.