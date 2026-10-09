# moduix

## 3.0.0

### Major Changes

- First release of `@moduix/vue`, aligned with all six React, Solid, and Vue adapters at `3.0.0`.
- Ship Vue-native components backed by Ark UI `^5.39.3`, with CSS Modules, foundation styles, optional presets, and shadcn-compatible registry sources.
- Use flat component exports such as `Dialog`, `DialogTrigger`, `DialogContent`, `DialogRootProvider`, and `DialogContext`.
- Field controls use native Ark Vue props and events. Initialize `v-model` in the parent and reset the model in the form reset handler; no React-like default/reset state is added.
- Configure dismissible overlay layers with `--moduix-z-popup`.
- Foundation CSS uses `light-dark()` and scoped derived tokens. Raw CSS requires Chrome/Edge 123+, Firefox 120+, or Safari/iOS 17.5+.