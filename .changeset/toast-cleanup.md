---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Toast: in the Tailwind packages the `success`, `warning`, and `error` backgrounds are opaque like in the CSS Modules packages and `Alert`; before, a 90% transparent tint let page content show through the toast. The exit transition uses the foundation duration tokens instead of hard-coded `350ms` and `200ms`, so presets and reduced motion apply to it as well.
The CSS Modules packages keep 4 `--moduix-toast-*` variables instead of 61: `bg`, `border-color`, and `color`, which override every type (scope them with `[data-type='success']` and similar selectors to theme one type), and `description-color`. Per-type, size, spacing, typography, motion, action trigger, and `--moduix-toast-close-*` variables are removed in favor of foundation tokens; override those with a class on the part. The close trigger is a `CloseButton`, so use `--moduix-close-button-*` for it. Default visuals are unchanged.
Removed no-op styles: `pointer-events`, `min-width`, and `min-height` on the root (Ark positions it with inline styles), the `box-shadow` transition, and the title `color: inherit`. `ToastActionTrigger` transitions only its background color, with the default transition token.
React and Solid export the Ark types `CreateToasterProps`, `CreateToasterReturn`, `ToastActionOptions`, `ToastActionTriggerProps`, `ToastCloseTriggerProps`, `ToastContextProps`, `ToastDescriptionProps`, `ToastOptions`, `ToastPlacement`, `ToastPromiseOptions`, `ToastRootProps`, `ToastStatus`, `ToastStatusChangeDetails`, `ToastTitleProps`, `ToastType`, and `UseToastContext`, plus `ToasterProps` with `portalled` and `portalRef`, as Vue already did.New: the default `ToastToaster` renderer shows a decorative `Spinner` before the title of a `loading` toast, so `toaster.loading()` and the pending state of `toaster.promise()` no longer look like an `info` toast. The `toast` registry items now depend on `spinner`.
The root reserves inline-end padding for the close trigger only when a `ToastCloseTrigger` is rendered inside it, so toasts created with `closable: false` use the full width (16px instead of 44px inline-end padding).