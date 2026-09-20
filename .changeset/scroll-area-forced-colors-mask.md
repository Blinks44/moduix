---
'@moduix/react-tailwind': patch
'@moduix/solid-tailwind': patch
---

ScrollArea: Keep the fade mask disabled in forced-colors mode by gating it behind `not-forced-colors`, and use the spacing token for the mask fade size.