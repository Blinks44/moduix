---
'@moduix/react': patch
'@moduix/solid': patch
'@moduix/react-tailwind': patch
'@moduix/solid-tailwind': patch
---

Signature Pad: Restore the 36px clear trigger default and its CSS Modules focus-ring offset in Tailwind variants, and forbid `asChild` on `Canvas` so the fixed part tree cannot silently lose children.