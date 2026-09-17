---
'@moduix/react': patch
'@moduix/solid': patch
'@moduix/react-tailwind': patch
'@moduix/solid-tailwind': patch
---

Keep component-owned `data-*` attributes applied after forwarded props in all components.

Consumer-supplied `data-*` props no longer override `data-scope`, `data-part`, `data-slot`, `data-tone`, `data-indicator-position`, `data-size`, `data-variant`, and other state hooks that styles and tests rely on.