# ScrollArea

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/scroll-area

## Purpose

`ScrollArea` is a native scroll viewport with styled overlay scrollbars.

## Public contract

The flat API includes `ScrollArea`, `ScrollAreaRootProvider`, `ScrollAreaViewport`, `ScrollAreaContent`, `ScrollAreaScrollbar`, `ScrollAreaThumb`, `ScrollAreaCorner`, `ScrollAreaContext`, `useScrollArea`, and `useScrollAreaContext`. Public types are `ScrollAreaRootProps`, `ScrollAreaRootProviderProps`, and `ScrollAreaVariant`. The root takes the moduix `fade?: boolean` (vertical fade mask) and `variant?: 'hover' | 'always'` (scrollbar visibility, default `hover`). See the React `scroll-area.md` for styling details.

## Solid adapter notes

- `asChild` takes a render function, as in Ark Solid.
- Ark Solid does not forward component refs through `asChild`; a `ref` passed together with `asChild` stays undefined. This is native Ark behavior and is covered by tests.
- `useScrollArea()` and `useScrollAreaContext()` return reactive store accessors: read state and call methods through the accessor, for example `scrollArea().scrollToEdge({ edge: 'bottom' })`.

## Styling

Ark sets part positions inline. CSS Modules expose `--moduix-scroll-area-fade-size`, `--moduix-scroll-area-scrollbar-size`, and `--moduix-scroll-area-thumb-bg`; the viewport inherits the root `border-radius`.