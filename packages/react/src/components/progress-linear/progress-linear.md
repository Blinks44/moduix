# ProgressLinear

Upstream (accessed 2026-10-18):

- Ark UI: https://ark-ui.com/docs/components/progress-linear
- Chakra UI: https://chakra-ui.com/docs/components/progress
- shadcn/ui: https://ui.shadcn.com/docs/components/progress

| Source    | Useful difference                                                                     | moduix decision                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Ark UI    | Root, Label, ValueText, Track, Range, View, RootProvider; `null` for indeterminate    | **Required correctness:** keep every linear part, Ark state, ARIA on the track, and callback details.                                          |
| Chakra UI | `size`, `variant`, `shape`, `striped`, `animated`, `colorPalette`; full-width default | **Adopted:** full-width default. **Rejected for now:** visual props; `--moduix-progress-linear-track-size` and a class on the part cover them. |
| shadcn/ui | One closed `Progress` (root = track) with a translated indicator                      | **Rejected:** keep the explicit Ark composition so label, value text, and views stay available.                                                |

## Purpose

`ProgressLinear` shows determinate or indeterminate progress in a horizontal or vertical bar. Use
`ProgressCircular` for the SVG anatomy; circular Ark parts are not exported here.

## Current behavior contract

- Ark owns value state (`value`, `defaultValue`, `onValueChange(details)`), `min`, `max`,
  `formatOptions`, `locale`, `translations`, `ids`, and `orientation`. `null` renders indeterminate
  progress.
- Ark writes `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and an
  `aria-label` from `translations.value(details)` to `ProgressLinearTrack`. Pass `aria-label` or `aria-labelledby` to the track to
  name the task; `ProgressLinearLabel` is visible text only and creates no ARIA relationship.
- `ProgressLinearValueText` renders Ark's formatted percent with `aria-live="polite"`. To show the
  `translations.value` wording, render it inside `ProgressLinearContext` with `progress.valueAsString`
  as its child.
- `ProgressLinearView` renders Ark's state view unstyled; Ark hides it with `hidden` when the state
  does not match.
- `ProgressLinearRootProvider` connects the parts to `useProgress()` state; `ProgressLinearContext`
  and `useProgressContext()` read state below a root or provider.
- Ark writes `dir` from `LocaleProvider` to every part; the RTL styles follow that attribute.
- Exports the Ark part, details, and hook types.

## Anatomy

```text
ProgressLinear / ProgressLinearRootProvider  data-slot="progress-linear-root[-provider]"
├─ ProgressLinearLabel                        data-slot="progress-linear-label"
├─ ProgressLinearValueText                    data-slot="progress-linear-value-text"
├─ ProgressLinearTrack                        data-slot="progress-linear-track"
│  └─ ProgressLinearRange                     data-slot="progress-linear-range"
└─ ProgressLinearView                         data-slot="progress-linear-view"
```

## Defaults and styling

- The root is a full-width grid (label and value text on the first row, the track below), like
  Chakra UI and shadcn/ui; label and value text wrap long words. Vertical roots are `max-content`
  wide and `12rem` tall. Set `width` or `height` on the root to change them.
- CSS Modules expose `--moduix-progress-linear-track-size` (bar thickness: height when horizontal,
  width when vertical), `--moduix-progress-linear-track-bg`, and `--moduix-progress-linear-range-bg`.
  Everything else comes from foundation tokens; override it with a class on the part.
- Ark sets the range `width` (horizontal) or `height` (vertical); the range transitions that size.
  The vertical track is a bottom-aligned flex container, so the range fills from the bottom.
- Indeterminate progress sweeps a 35% range from the start edge to the end edge with the foundation
  `moduix-progress-linear-indeterminate[-vertical]` keyframes. In RTL the horizontal range is
  mirrored with `scale: -1 1`, so it sweeps right to left. Under reduced motion the range stays
  still at the start edge.
- State hooks come from Ark: `data-state="indeterminate|loading|complete"`, `data-value`, `data-max`,
  and `data-orientation`.

## Composition

```tsx
<ProgressLinear defaultValue={24}>
  <ProgressLinearLabel>Export data</ProgressLinearLabel>
  <ProgressLinearValueText />
  <ProgressLinearTrack aria-label="Export data">
    <ProgressLinearRange />
  </ProgressLinearTrack>
</ProgressLinear>
```

## Agent notes

Do not add hidden structural wrappers for label, value text, track, or range. Do not remap Ark
callback detail objects or replace `ProgressLinearRootProvider` with a local state layer. When
changing styling hooks or CSS variables, update docs examples, this file, `variables-moduix.css`,
and the registry output.