---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

**Breaking.** Select, Listbox, and Menu no longer export the `ItemTextContent`, `ItemTextIcon`, and `ItemTextLabel` parts.
Put the icon directly inside `ItemText` before the label (`<SelectItemText><Icon />{label}</SelectItemText>`). A direct SVG child gets a 16px size and a gap before the text, and the text truncates with an ellipsis.
`MenuItemText` now keeps one line with an ellipsis instead of wrapping, like Select and Listbox.