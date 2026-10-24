# CommandPalette

## Upstream reference

No dedicated Ark command-palette primitive. This family composes
[Dialog](https://ark-ui.com/docs/components/dialog),
[Combobox](https://ark-ui.com/docs/components/combobox), and Vue-local factory parts.
The Vue Tailwind adapter shares this behavior contract.

## Purpose

A searchable command dialog with an optional global keyboard shortcut.

## Public contract

- `CommandPalette` is Ark `DialogRoot`; `CommandPaletteRootProvider` accepts the API from `useDialog`.
  Their props are exported as `CommandPaletteRootProps` and `CommandPaletteRootProviderProps`.
  Ark Vue roots take only `lazyMount` and `unmountOnExit` from the presence options.
- `shortcut` defaults to `false` on both roots. An enabled shortcut renders the internal
  `CommandPaletteShortcut`, which toggles the dialog, ignores repeats and composing input, and
  removes its document listener on unmount.
- Both roots default to `lazyMount`, `unmountOnExit`, and `portalled` enabled.
  `portalRef` chooses a target; `portalled=false` keeps popup infrastructure inline.
- `CommandPalettePanel` composes the backdrop, positioner, and content.
- `CommandPaletteCombobox` requires an Ark collection and preserves its item type. Its defaults
  are `open=true`, `disableLayer=true`, `closeOnSelect=true`, `inputBehavior='autohighlight'`,
  and `selectionBehavior='preserve'`.
- `CommandPaletteSearch` composes a decorative search icon, the input, and the clear trigger. Consumers own collection filtering.

## Preservation notes

- Keep Ark props, detail objects, and Vue models transparent. Intercept only the Combobox `select`
  event: emit once, then close the dialog when `closeOnSelect` is enabled.
- The RootProvider forwards presence completion listeners directly to Ark, once. Do not add a
  second emit while the same listener remains in fallthrough attrs.
- Keep prop updates reactive, consumer classes last, and attrs on their public host.
- Slots remain consumer-owned; ordinary and `asChild` Combobox refs expose the rendered host via
  `$el`. Dialog roots are providers, not DOM hosts.
- Keep the root mounted while changing open state. Preserve Escape dismissal, focus restoration,
  portal placement, and SSR-safe shortcut registration.
- Ark Vue 5.39.3 emits `select` for item clicks. Both styling tracks test selection details,
  a single callback per click, and reactive changes to `closeOnSelect`.

## Styling and accessibility

Preserve Dialog semantics, accessible search and clear labels, Ark state attributes, and `data-slot`
hooks. CSS Modules uses the component stylesheet; Tailwind uses utilities and consumer `class`.