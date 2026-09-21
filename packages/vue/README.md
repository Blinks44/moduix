# @moduix/vue

Private development package for the Vue implementation of the moduix component system, built on
[Ark UI](https://ark-ui.com/) primitives and styled with CSS Modules.

The package mirrors the public contract of `@moduix/solid`: the same component subpaths, flat named
parts, and Ark-shaped composition, translated to native Vue components. The family name is the root
and every other value uses the family prefix, such as `Accordion`, `AccordionItem`, and
`AccordionRootProvider`. It is under active
development; packages are promoted to a public release once the component set reaches parity with
the shipped React and Solid adapters.

## Development

```bash
pnpm --filter @moduix/vue build      # Build the library
pnpm --filter @moduix/vue test      # Run tests
pnpm --filter @moduix/vue tsc:check # Type-check sources
```

Component ports follow the repository `component-workflow` skill and the `conventions-vue`
conventions. Components are Vue single-file components; Ark primitives are imported from
`@ark-ui/vue`; icons come from `@lucide/vue`. Type checking uses `vue-tsc`; declaration output uses
the Rslib `unplugin-dts` pipeline.

## License

[MIT](./LICENSE.md)