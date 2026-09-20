# @moduix/vue-tailwind

Private development package for the Tailwind CSS implementation of the moduix Vue component system,
built on [Ark UI](https://ark-ui.com/) primitives. The package mirrors the public contract of
`@moduix/solid-tailwind`: the same component subpaths and Ark-shaped contracts, translated to
native Vue components with Tailwind CSS v4 utility styling.

It is under active development; the package is promoted to a public release once the component set
reaches parity with the shipped React and Solid adapters.

## Development

```bash
pnpm --filter @moduix/vue-tailwind build      # Build the library
pnpm --filter @moduix/vue-tailwind test      # Run tests
pnpm --filter @moduix/vue-tailwind tsc:check # Type-check sources
```

Component ports follow the repository `component-workflow` skill and the `conventions-vue`
conventions. Components are Vue single-file components; Ark primitives are imported from
`@ark-ui/vue`; icons come from `@lucide/vue`. Type checking uses `vue-tsc`; declaration output uses
the Rslib `unplugin-dts` pipeline.

## License

[MIT](./LICENSE.md)