---
'@moduix/react': patch
'@moduix/react-tailwind': patch
'@moduix/solid': patch
'@moduix/solid-tailwind': patch
'@moduix/vue': patch
'@moduix/vue-tailwind': patch
'@moduix/svelte': patch
'@moduix/svelte-tailwind': patch
---

Refine default control density, input borders, focus halo, and form control typography:

- Tighten the default control sizing scale to a 32px (`2rem`) `md` baseline (`24 / 28 / 32 / 36 / 44px`), and shift the `dense` (`28px`) and `soft` (`36px`) presets proportionally.
- Soften default `--moduix-input` borders and `--moduix-ring` focus indicators (`2px` halo width) while keeping high-contrast 3:1 borders in the `contrast` preset.
- Align `Combobox`, `Select`, `NativeSelect`, `Textarea`, `NumberInput`, `PasswordInput`, `DatePicker`, `DateInput`, `Editable`, `InputGroup`, `Listbox`, and `Clipboard` to `14px` desktop typography (with `16px` touch fallback on coarse pointers) and consistent `12px` inline padding.
- Make `DatePicker` more compact (`18rem` default root and popup width, tighter header-to-grid gap) and remove cell color transitions for instant selection feedback when closing the calendar.