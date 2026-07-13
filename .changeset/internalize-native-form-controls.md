---
'@moduix/react': patch
---

Render native form controls automatically for Ark-backed form components.
Removes public `HiddenInput`, `HiddenSelect`, and `ItemHiddenInput` parts. `Select`, `DateInput`, and `SignaturePad` expose semantic root props for their special form behavior.
Document virtualized `Select` form submission and custom `SignaturePad` value serialization.