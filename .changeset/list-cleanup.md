---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

List: CSS Modules drop all 31 `--moduix-list-*` variables; styles come from foundation tokens, so override them with a class on `List` and style markers with `li::marker`.
The default `marker` now comes from `as` (`ul` → `disc`, `ol` → `decimal`) and `data-marker` always holds the resolved value; the `auto` value is gone. Before, CSS Modules read the marker from the rendered element and Tailwind from `as`, so an `asChild` ordered list without `marker` showed numbers in one package and discs in the other; with `asChild`, pass `marker` to match the child. The native `type` attribute of `ol` never changed the markers and is no longer documented as doing so; set `list-style-type` with a class instead.
A list nested directly in an item now starts one gap below the item text. New `ListIndicator` part renders an icon instead of the native marker: use it with `marker="none"`, and its item becomes a flex row so long text wraps beside the icon.
Tailwind variants set the gap through a private `--_list-gap` property instead of `gap-space-*` (same values). Export the `ListRootProps`, `ListElement`, `ListMarker`, `ListGap`, `ListSize`, and `ListTone` types.