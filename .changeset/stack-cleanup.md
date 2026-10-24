---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Stack: Responsive `direction` is now mobile-first. `{ desktop: 'row' }` keeps the default `column` below `640px` instead of using `row` at both breakpoints; pass `direction="row"` for a row everywhere. A string `direction` no longer adds a desktop utility in the Tailwind packages, so a consumer `flex-col` class now also wins at desktop widths.
Remove the `--moduix-stack-direction-mobile`, `--moduix-stack-direction-desktop`, and `--moduix-stack-flex` CSS variables. The component always wrote the direction inline, so the theme values never applied, and an inherited `--moduix-stack-flex` made stacks nested inside a `fill` stack grow too. Direction and `fill` now come from the component stylesheet; override them with your own classes. `fill={false}` no longer writes `flex: initial`, which was already the default.
Export the `StackRootProps` and `StackDirection` types.