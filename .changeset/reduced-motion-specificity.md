---
'@moduix/react': patch
'@moduix/react-tailwind': patch
'@moduix/solid': patch
'@moduix/solid-tailwind': patch
'@moduix/vue': patch
'@moduix/vue-tailwind': patch
---

Reduced motion now wins over state-specific animations. In the Tailwind packages the `motion-reduce:` animation overrides (`animate-none`, `[animation-duration:1ms]`, `[animation-delay:0ms]`) lost to `data-[state=…]:animate-*` on specificity, so popups, dialogs, drawers, accordions, collapsibles, swap, tour, tree view, and marquee kept animating whenever the duration did not come from the foundation tokens (Tour and TreeView use fixed durations, so they always animated). They now carry the same state variants as the animation they cancel (for example `motion-reduce:data-[state]:animate-none`), so they win without `!important`. In the CSS Modules packages the same problem affected HoverCard, NavigationMenu viewport content, Swap, and TreeView; their reduced-motion selectors now match the animation selectors.