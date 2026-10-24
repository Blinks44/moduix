---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

InputGroup: CSS Modules keep three variables, `--moduix-input-group-width`, `--moduix-input-group-height`, and `--moduix-input-group-radius`; the other 57 `--moduix-input-group-*` variables, including the per-size `-xs`…`-xl` ones, are removed. Colors, padding, typography, focus ring, and separators come from foundation tokens, so override them with a plain class on the part. `--moduix-input-group-height` now applies to every size instead of only `md`. The read-only rule that repeated the default colors is gone; default visuals are unchanged.
A local `size` on `InputGroupInput` now sets its font size and inline padding in CSS Modules too, as it already did in Tailwind; before, the group size always won. Addon and text inherit the group font size from the root. Addon and text drop the `text-overflow: ellipsis` (`truncate` in Tailwind) that never rendered on their inline-flex box; long content still clips.
Tailwind InputGroup in React and Solid imports `cn` from `@/lib/moduix/cn`, so components installed from the registry resolve it. Tailwind drops the no-op `max-w-none` and `basis-auto` classes and builds the clear trigger `xs` size from `data-size`. React and Solid export the `InputGroupSize` type, as Vue already did.
add `InputGroupTextarea` for multi-line input, such as a message composer. It renders `Textarea` without its border, background, focus outline, or resize handle, takes the group font size and inline padding, and drives the group invalid and disabled styles.
`InputGroupAddon` and `InputGroupText` accept `align="inline" | "block"` (default `inline`, mirrored as `data-align`). A block addon is a full-width row above or below the control, placed by DOM order, and switches the group to a column. Use a regular `Button` inside a block addon. New type: `InputGroupAddonAlign`.