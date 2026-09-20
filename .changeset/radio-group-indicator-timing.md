---
'@moduix/react': patch
'@moduix/solid': patch
'@moduix/react-tailwind': patch
'@moduix/solid-tailwind': patch
---

RadioGroup: Remove dead indicator transition declarations and tie the slide timing to the foundation duration token through Ark's `--transition-duration`, so reduced-motion and preset tuning apply to the indicator.