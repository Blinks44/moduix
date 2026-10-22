---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

List: Remove `tone="subtle"`, matching `Text`. It used the secondary-foreground color, which matches `default` in dark mode and is barely distinguishable in light mode. Use `muted` for secondary content or a class for a custom color.