---
'@moduix/react': patch
'@moduix/solid': patch
'@moduix/vue': patch
---

The CSS Modules `reset.css` reads `--moduix-font-sans` and `--moduix-font-mono` instead of hard-coded font stacks, like Tailwind Preflight. The previous stacks remain fallbacks when `reset.css` is used alone.