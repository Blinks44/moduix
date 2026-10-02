# Swap

## Upstream reference

- Ark UI: https://ark-ui.com/docs/utilities/swap (accessed 2026-10-02)

## Purpose

`Swap` layers two visual states in one grid cell and animates between them. The surrounding
control owns interaction, accessible naming, and any announcements.

## Public contract

- Flat exports: `Swap`, `SwapRootProvider`, `SwapIndicator`, `useSwap`, and `useSwapContext`.
- `swap` selects the `on` or `off` indicator; it is a prop, not a locally owned model.
- `animation` defaults to `scale` and accepts `fade`, `scale`, `rotate`, `flip`, or a custom name.
- `SwapRootProvider` accepts a `useSwap` store. Use a computed props object for reactive inputs.
- Render the two indicators as direct children of the root so their grid and preset animations
  stay scoped to the same Swap instance.

## Preservation notes

Ark owns presence, initial visibility, lazy mounting, and exit unmounting. Forward `lazyMount`,
`unmountOnExit`, attrs, native listeners, and `asChild` directly. The installed Vue primitive
does not expose React's `hideMode`; do not emulate it.

All three parts retain native Vue component refs through `$el`, including semantic `asChild`
hosts. SSR and hydration must preserve the rendered hosts. Ark intentionally omits initial
indicator `data-state` when skipping mount animation; transitions expose `open` and `closed`.

## Styling and accessibility

| Part               | Styling hook                     |
| ------------------ | -------------------------------- |
| `Swap`             | `data-slot="swap-root"`          |
| `SwapRootProvider` | `data-slot="swap-root-provider"` |
| `SwapIndicator`    | `data-slot="swap-indicator"`     |

Ark supplies `data-scope="swap"`, part attributes, `data-swap`, and indicator `data-type`.
moduix sets `data-animation` on the root. Consumer classes are merged last. CSS Modules use
the shared `--moduix-swap-*` variables; Tailwind uses native utilities and consumer classes.
Reduced motion shortens animations to 1ms without changing presence.

The default hosts are spans, with no button or live-region behavior. When composing an icon or
label inside a button, hide the visual indicators with `aria-hidden="true"` and keep the current
accessible name on the button.

## Differences from upstream

moduix adds visual recipes, stable styling hooks, and the default `scale` animation. It does not
add state, interaction, aliases, or a compatibility layer.

## Local changelog

- 2026-10-02: Reviewed both Vue tracks and documented the native provider, refs, presence,
  styling, and accessibility contract.