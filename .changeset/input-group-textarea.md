---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

InputGroup: add `InputGroupTextarea` for multi-line input, such as a message composer. It renders `Textarea` without its border, background, focus outline, or resize handle, takes the group font size and inline padding, and drives the group invalid and disabled styles.
`InputGroupAddon` and `InputGroupText` accept `align="inline" | "block"` (default `inline`, mirrored as `data-align`). A block addon is a full-width row above or below the control, placed by DOM order, and switches the group to a column. Use a regular `Button` inside a block addon. New type: `InputGroupAddonAlign`.