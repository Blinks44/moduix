# @moduix/svelte

## 3.2.2

### Patch Changes

- 5b0db9e: Republish the Svelte packages through the automated release workflow to verify npm trusted publishing.

## 3.2.1

- First release of `@moduix/svelte`, with the same component set as the React, Solid, and Vue packages.
- Ship Svelte 5 components backed by Ark UI `^5.25.1`, with CSS Modules, foundation styles, optional presets, and shadcn-compatible registry sources.
- Use flat component exports such as `Dialog`, `DialogTrigger`, `DialogContent`, `DialogRootProvider`, and `DialogContext`.
- The package ships `.svelte` source under the `svelte` export condition. The application's Svelte compiler builds it, so SvelteKit server rendering works without extra configuration. Requires Svelte 5.29 or later.