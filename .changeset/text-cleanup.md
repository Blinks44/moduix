---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Text: CSS Modules drop all 22 `--moduix-text-*` variables, including `--moduix-text-line-clamp`; styles come from foundation typography and color tokens, so override them with a plain class on `Text`. `lineClamp` now sets `-webkit-line-clamp` inline in every package, as Tailwind already did.
`Text` without `align` no longer forces `text-align: start` and now inherits the alignment of its container, for example inside a centered empty state. Tailwind packages add `m-0`, matching the CSS Modules margin reset.
Solid no longer strips consumer `data-align`, `data-truncate`, and `data-line-clamp` props when the matching prop is unset.
Remove `tone="subtle"`: it used the secondary-foreground color, which matches `default` in dark mode and is barely distinguishable in light mode. Use `muted` for secondary copy or a class for a custom color.
Export the `TextRootProps`, `TextElement`, `TextSize`, `TextWeight`, `TextTone`, and `TextAlign` types.