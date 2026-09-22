# CommandPalette

Upstream docs:

- Ark UI: no dedicated `command-palette` primitive; this wrapper composes https://ark-ui.com/docs/components/dialog and https://ark-ui.com/docs/components/combobox, and its local leaf parts follow https://ark-ui.com/docs/guides/composition#the-ark-factory
- Chakra UI: no dedicated `command-palette` component; Chakra menu command text informed only the visual command metadata pattern.

## Purpose

`CommandPalette` provides a keyboard-launchable dialog surface with an Ark Combobox-powered searchable command list.

## Upstream model to preserve

The root, trigger, backdrop, positioner, content, title, and description follow Ark
`Dialog`. The root portals the popup infrastructure automatically. Search state, input, and clear trigger,
listbox content, grouped items, item text, item indicator, context, and item context follow Ark
`CommandPaletteCombobox`. Local visual leaves use the Ark factory so they keep `asChild`, ref, and prop-merging
behavior consistent with local-only moduix primitives.

There is no Ark command-palette primitive, so the component is a moduix-owned composite. Do not add legacy render contracts, autocomplete render functions, imperative handles, or hidden `CommandPaletteContent` sugar.

## Current behavior contract

`CommandPalette` and `CommandPaletteRootProvider` portal `CommandPaletteBackdrop` and `CommandPalettePositioner` automatically by default. Set `portalled={false}` to render them inline, or pass `portalRef` to target a custom container. The structural parts remain explicit and independently styleable.

`CommandPalette` owns Ark Dialog state and an optional global shortcut. `shortcut` defaults to `false`; pass `shortcut="mod+k"` or another hotkey string to enable it. Its syntax is parsed by the Ark dependency `@zag-js/hotkeys`; `mod` resolves to Meta on macOS and Control elsewhere. The same shortcut closes an open palette. The component suppresses repeated key presses and cleans up its document listener.

Consumers can use `CommandPalettePanel` for the standard palette shell, or render the explicit
dialog structure when they need custom overlay layout. `CommandPalettePanel` renders `CommandPaletteBackdrop`, `CommandPalettePositioner`,
`CommandPaletteContent`, and `CommandPaletteBody`. `CommandPaletteSearch` renders the standard input-like `CommandPaletteControl`, `CommandPaletteInput`,
and `CommandPaletteClearTrigger` search row.
The combobox requires an Ark collection and defaults to `open={true}`, `inputBehavior="autohighlight"`, `selectionBehavior="preserve"`, `disableLayer={true}`, and `closeOnSelect={true}`. Selection closes the dialog through Ark dialog context. `CommandPaletteClearTrigger` is Ark's `ClearTrigger` part from Combobox with the shared close-button visual style, preserving Ark data hooks while keeping the command-palette focus behavior.

When consumers filter an external `useListCollection`, reset that filter when the dialog closes. Ark Combobox can clear its input on remount, but it does not own the external collection state.

## Anatomy and exported parts

```tsx
<CommandPalette>
  <CommandPaletteTrigger />
  <CommandPalettePanel>
    <CommandPaletteCombobox>
      <CommandPaletteSearch />
      <CommandPaletteList>
        <CommandPaletteEmpty />
        <CommandPaletteItemGroup>
          <CommandPaletteItemGroupLabel />
          <CommandPaletteItem>
            <CommandPaletteItemIcon />
            <CommandPaletteItemText>
              <CommandPaletteItemLabel />
              <CommandPaletteItemDescription />
            </CommandPaletteItemText>
            <CommandPaletteItemMeta />
            <CommandPaletteItemIndicator />
          </CommandPaletteItem>
        </CommandPaletteItemGroup>
      </CommandPaletteList>
      <CommandPaletteFooter />
    </CommandPaletteCombobox>
  </CommandPalettePanel>
</CommandPalette>
```

- `CommandPalette`: Ark Dialog root plus shortcut listener.
- `CommandPaletteRootProvider`: Ark Dialog root provider for externally owned dialog state.
- `CommandPaletteTrigger`: Ark Dialog trigger, styled unless `asChild` is used.
- `CommandPaletteBackdrop`: Ark Dialog backdrop, `data-slot="command-palette-backdrop"`.
- `CommandPalettePositioner`: Ark Dialog positioner, `data-slot="command-palette-positioner"`.
- `CommandPaletteContent`: Ark Dialog content, `data-slot="command-palette-content"`.
- `CommandPalettePanel`: convenience shell that renders backdrop, positioner, content, and body
  without changing the lower-level part contracts.
- `CommandPaletteTitle` / `CommandPaletteDescription`: Ark Dialog accessible title and description.
- `CommandPaletteHeader` / `CommandPaletteBody`: Ark factory-based layout helpers for custom chrome and the combobox body region.
- `CommandPaletteCombobox`: Ark Combobox root with command-palette defaults.
- `CommandPaletteControl`, `CommandPaletteInput`, `CommandPaletteList`, `CommandPaletteEmpty`, `CommandPaletteItemGroup`, `CommandPaletteItemGroupLabel`, `CommandPaletteItem`, `CommandPaletteItemText`, `CommandPaletteItemIndicator`: Ark Combobox parts styled for command-palette layout. `CommandPaletteItemIndicator` renders a default check icon. `CommandPaletteList` includes the local moduix `ScrollArea`.
- `CommandPaletteClearTrigger`: Ark Combobox clear action composed with `CloseButton`; it keeps `data-slot="command-palette-clear-trigger"`.
- `CommandPaletteSearch`: convenience search row that renders `CommandPaletteControl`, `CommandPaletteInput`, and `CommandPaletteClearTrigger`
  with a default input label.
- `CommandPaletteItemIcon`, `CommandPaletteItemLabel`, `CommandPaletteItemDescription`, `CommandPaletteItemMeta`, `CommandPaletteSeparator`, `CommandPaletteFooter`: Ark factory-based moduix leaf parts for command metadata and footer affordances.
- `CommandPaletteKbd`: command-palette scoped wrapper around the local `Kbd`.

## Composition

```tsx
const { collection, filter } = useListCollection({
  initialItems: commands,
  itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
  itemToValue: (item) => item.id,
  filter: contains,
  groupBy: (item) => item.section,
});

<CommandPalette aria-label="Command palette" shortcut="alt+k">
  <CommandPaletteTrigger asChild>
    <Button>Open palette</Button>
  </CommandPaletteTrigger>
  <CommandPalettePanel>
    <CommandPaletteCombobox
      collection={collection}
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <CommandPaletteSearch placeholder="Search commands..." />
      <CommandPaletteList>
        <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
        {collection.group().map(([section, items]) => (
          <CommandPaletteItemGroup key={section}>
            <CommandPaletteItemGroupLabel>{section}</CommandPaletteItemGroupLabel>
            {items.map((item) => (
              <CommandPaletteItem key={item.id} item={item}>
                <CommandPaletteItemText>{item.label}</CommandPaletteItemText>
              </CommandPaletteItem>
            ))}
          </CommandPaletteItemGroup>
        ))}
      </CommandPaletteList>
    </CommandPaletteCombobox>
  </CommandPalettePanel>
</CommandPalette>;
```

## Upstream feature coverage

The wrapper covers the relevant Ark Dialog surface through Ark `useDialog`: controlled and uncontrolled open state, `onOpenChange(details)`, modal/non-modal behavior, focus trapping, escape and outside-interaction dismissal, `ids`, `initialFocusEl`, `finalFocusEl`, lazy mounting, `present`, `CommandPaletteRootProvider`, and Dialog context.

The wrapper covers the relevant Ark Combobox surface for command search: `collection`, `useListCollection`, custom objects via `itemToString` and `itemToValue`, filtering through `onInputValueChange(details)`, grouping through `collection.group()`, `inputBehavior`, `selectionBehavior`, controlled `inputValue` and `value`, `onSelect(details)` with `details.itemValue`, `onValueChange(details)`, `asChild` on Ark parts, and Ark item state attributes.

Ark Combobox examples that are not command-palette relevant remain available on the standalone `Combobox` component, including multiple selection, async search, creatable options, virtualized content, and form-oriented `HiddenInput` examples.

## Accessibility and state

Use `aria-label` on `CommandPalette` or render `CommandPaletteTitle` so Ark Dialog has an accessible name. Recommended command-palette composition uses `aria-label` on the root instead of a visible title. `CommandPaletteSearch` gives the search input a default label; direct `CommandPaletteInput` usage should have its own label or `aria-label`. The default icon-only clear trigger receives a fallback label; a custom `asChild` trigger must provide its own accessible name through the child.

Dialog state uses Ark `data-scope="dialog"`, `data-part`, and `data-state="open" | "closed"` attributes. Combobox state uses Ark `data-scope="combobox"`, `data-part`, `data-state`, `data-highlighted`, `data-disabled`, `data-invalid`, and `data-empty` attributes.

Refs forward to the underlying Ark DOM parts. `CommandPaletteInput` is the input ref target for focus integration. The wrapper does not add a `HiddenInput`; command palettes are action surfaces, not native form controls. Use the standalone `Combobox` for form submission and reset semantics.

## Defaults and styling

The external trigger and search control use `--moduix-size-md`; single-line command items default to `--moduix-size-sm` with `--moduix-spacing-1` block padding. The search control and result rows share a `--moduix-spacing-3` inline gutter; the list adds the same spacing at its block edges, without reserving space for a scrollbar.
Empty messages use the roomier `--moduix-spacing-3` block padding for the dialog surface.

Group labels inherit the shared `--moduix-popup-group-label-*` defaults: muted `xs` text, regular weight,
and `--moduix-spacing-1` block padding. Command-palette-specific variables still take precedence.

Content motion falls back to the shared `--moduix-popup-motion-*` tokens; `--moduix-command-palette-*` content
motion variables remain the more specific override. Backdrop motion remains separate.

The visual contract uses `data-slot="command-palette-*"` hooks on each exported part and on the internal scroll area. `lazyMount` and `unmountOnExit` default to `true` so Ark Presence can run enter and exit animations while still removing the palette after close. Motion is tied to Ark `data-state` on `CommandPaletteBackdrop` and `CommandPaletteContent`, not legacy starting/ending style attributes.

Important CSS variables include `--moduix-command-palette-positioner-padding`, `--moduix-command-palette-width`, `--moduix-command-palette-max-height`, `--moduix-command-palette-bg`, `--moduix-command-palette-border-color`, `--moduix-command-palette-clear-*`, `--moduix-command-palette-control-*`, `--moduix-command-palette-input-*`, `--moduix-command-palette-highlight-*`, and the item/footer/kbd variables. Size and spacing defaults should prefer shared tokens such as `--moduix-size-sm`, `--moduix-size-md`, and `--moduix-spacing-*` over one-off fractional rem values.

## Intentional sugar and differences from upstream

`CommandPalette` can add a global shortcut because neither Ark Dialog nor Ark Combobox owns command-launch behavior. The shortcut is opt-in so pages with multiple palettes do not open every mounted instance from one key press. `@zag-js/hotkeys`, the hotkey parser used by Ark, owns shortcut syntax; use its `mod+k` form for platform-aware Command/Control bindings. The component owns listener cleanup and repeat suppression. `CommandPalettePanel` is narrow workflow sugar for the standard command-palette chrome; use the explicit parts for custom overlay layout. `CommandPaletteSearch` is narrow workflow sugar for the standard input-like search row and includes the clear trigger by default. `CommandPaletteClearTrigger` uses Ark's Combobox `ClearTrigger` part with the shared close-button visual style and clears the Combobox search input rather than the selection value. `CommandPaletteHeader` and `CommandPaletteBody` are layout helpers without hiding the dialog or combobox structure. `CommandPaletteList` wraps its children in the local `ScrollArea`, but omits its visible scrollbar track so command results retain a clean right edge while remaining scrollable. The list is a flex child and does not own a hard-coded height; footer/header space is resolved by the dialog flex layout. `CommandPaletteItemIndicator` renders a default check icon and can share the trailing row layout with `CommandPaletteItemMeta`. `CommandPaletteKbd` composes the local `Kbd` and maps command-palette CSS variables to the shared Kbd contract. `CommandPaletteItemIcon`, `CommandPaletteItemLabel`, `CommandPaletteItemDescription`, `CommandPaletteItemMeta`, `CommandPaletteSeparator`, and `CommandPaletteFooter` are visual Ark factory leaf parts only.

`CommandPaletteCombobox` defaults to an always-open listbox inside the dialog and closes the dialog on selection. Set `closeOnSelect={false}` on `CommandPaletteCombobox` for commands that should keep the palette open.

## Agent notes

Do not reintroduce `legacy autocomplete primitive`, `legacy dialog primitive`, `render` props, `createCommandPaletteHandle`, `CommandPaletteCollection`, or `items` render-function APIs. Keep structural dialog parts explicit and keep search behavior in Ark Combobox collection state. `CommandPalettePanel` and `CommandPaletteSearch` are additive helpers; do not change `CommandPaletteContent` into a hidden backdrop/positioner bundle.

Collections, locale helpers, and advanced combobox state APIs belong to Ark UI. Import
`useListCollection` and `createListCollection` from `@ark-ui/react/collection`, `useFilter` from
`@ark-ui/react/locale`, and direct Ark combobox provider/context APIs from `@ark-ui/react/combobox`
when a workflow needs them. Avoid duplicate command-palette re-exports with the same names because
consumers should compose those Ark helpers directly.

## Mount lifecycle

The portalled overlay content defaults to `lazyMount` and `unmountOnExit`. It is absent from the
DOM until first open and is removed after its exit animation. Set `unmountOnExit={false}` to retain
content after the first open; set both props to `false` only when eager initial rendering is needed.

## Local changelog

- 2026-08-12: Aligned the search control and result-list gutters, and removed the command-palette scrollbar track while retaining scroll behavior.

- 2026-08-01: Documented the existing lazy-mount and unmount-on-exit overlay defaults.

- 2026-07-26: Ignore repeat keydown events for global shortcuts and apply Ark dialog layer indices to overlay stacking.

- 2026-07-23: Kept empty-message block padding at `--moduix-spacing-3` for the command-palette dialog surface.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Normalized command group labels to the shared regular-weight popup-label contract.

- 2026-07-21: Reduced the trigger and search control to the `md` baseline and compacted command items to `--moduix-size-sm`.

- 2026-07-17: Removed `CloseTrigger`, `CloseIcon`, and `Panel.showCloseIcon` so command palettes
  rely on standard dialog dismissal instead of a visible close affordance. Reworked `ClearTrigger`
  to compose `CloseButton` and clear the typed search value rather than the Combobox selection.
- 2026-07-16: Added shared `--moduix-popup-motion-*` fallbacks for content motion; backdrop motion remains separate.
- 2026-07-12: Classified close/header effective values as private `--_command-palette-*`
  implementation variables; public customization continues through the documented non-underscored
  close and header variables.
- 2026-07-10: Documented the accepted global-shortcut grammar and added the explicit custom-composition path to the public docs.
- 2026-07-08: Added `CommandPalettePanel` and `CommandPaletteSearch` helpers for the standard palette shell and input-like
  search row, updated the global shortcut to toggle an open palette, and kept the explicit part
  tree as the custom composition path.
- 2026-07-05: Added `Header` and `CommandPaletteBody` helpers and gave `ItemIndicator` the same default check icon contract used by the other selection overlays.
- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-07-02: Removed `ComboboxRootProvider`, `Context`,
  `ComboboxContext`, `ItemContext`, and public prop type re-exports.
  Keep `CommandPaletteRootProvider`; import advanced combobox state APIs from Ark UI directly when
  needed.

- 2026-06-25: Simplified root state through Ark `useDialog`, moved local visual leaves to the
  Ark factory, added fallback labels for default icon triggers, and normalized several CSS defaults
  to shared size/spacing tokens.
- 2026-06-24: Updated the command palette contract to treat collections and locale filtering as
  direct Ark UI imports instead of moduix re-exports.

- 2026-06-21: Migrated from legacy Dialog/Autocomplete to an Ark Dialog + Ark Combobox composite. Removed imperative handles, Base render props, autocomplete collection render functions, and legacy flat part exports.
- 2026-06-21: Matched Dialog-style enter/exit animation tokens, simplified shortcut matching to primary-modifier shortcuts, and moved result scrolling to the local ScrollArea.
- 2026-06-21: Removed the list height formula, let the list consume remaining flex space above `Footer`, and fixed sticky group labels to pin to the scroll viewport instead of sliding under the input header.
- 2026-06-21: Switched `CommandPaletteKbd` to compose the local `Kbd` while preserving command-palette scoped CSS variables.
- 2026-06-21: Made the global shortcut listener opt-in, added `alt` / `option` shortcut support, and switched docs examples to `alt+k` to avoid the documentation search `Cmd+K` shortcut.
- 2026-06-21: Updated docs and stories to reset external `useListCollection` filters on close so a reopened palette does not show stale filtered results with an empty input.