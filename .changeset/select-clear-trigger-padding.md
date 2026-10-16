---
'@moduix/react': patch
'@moduix/react-tailwind': patch
'@moduix/solid': patch
'@moduix/solid-tailwind': patch
'@moduix/vue': patch
'@moduix/vue-tailwind': patch
---

Select: the trigger reserves room for the clear action only while a clear trigger is visible. A selected value without `clearLabel` (or without `SelectClearTrigger`) no longer loses 22px of text space, so short values fit in narrow selects instead of being cut to an ellipsis.