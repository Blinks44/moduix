---
'@moduix/vue': patch
'@moduix/vue-tailwind': patch
---

Lightbox: Rename the internal `lightbox` helper module to `lightbox-bind`, so it no longer overwrites `Lightbox.js` on case-insensitive file systems such as macOS and Windows.