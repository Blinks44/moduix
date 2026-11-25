---
'@moduix/solid': patch
'@moduix/solid-tailwind': patch
---

Mark the Solid `ToastToaster` portal wrapper with `data-live-announcer` so opening a modal `Dialog` does not set `aria-hidden="true"` on live toast notifications.