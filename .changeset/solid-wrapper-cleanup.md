---
'@moduix/solid': patch
'@moduix/solid-tailwind': patch
---

Simplify Solid component wrappers: wrapper-owned `data-*` hooks are no longer declared in prop types or split out of the forwarded props, and `asChild` is forwarded with the rest of the props instead of a separate attribute. Behavior is unchanged: the hooks are still written after forwarded props and cannot be overridden.