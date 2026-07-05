# CommandPalette

Upstream docs:

- Ark UI: no dedicated `command-palette` primitive; this wrapper composes https://ark-ui.com/docs/components/dialog and https://ark-ui.com/docs/components/combobox, and its local leaf parts follow https://ark-ui.com/docs/guides/composition#the-ark-factory
- Chakra UI: no dedicated `command-palette` component; Chakra menu command text informed only the visual command metadata pattern.

## Purpose

`CommandPalette` provides a keyboard-launchable dialog surface with an Ark Combobox-powered searchable command list.

## Upstream model to preserve

The root, trigger, backdrop, positioner, content, close trigger, title, and description follow Ark
`Dialog`. The root portals the popup infrastructure automatically. Search state, input, clear trigger,
listbox content, grouped items, item text, item indicator, context, and item context follow Ark
`Combobox`. Local visual leaves use the Ark factory so they keep `asChild`, ref, and prop-merging
behavior consistent with local-only moduix primitives.

There is no Ark command-palette primitive, so the component is a moduix-owned composite. Do not add legacy render contracts, autocomplete render functions, imperative handles, or hidden `Content` sugar.

## Current behavior contract

`Root` and `RootProvider` portal `Backdrop` and `Positioner` automatically by default. Set `portalled={false}` to render them inline, or pass `portalRef` to target a custom container. The structural parts remain explicit and independently styleable.

`CommandPalette` / `CommandPalette.Root` owns Ark Dialog state and an optional global shortcut listener. `shortcut` defaults to `false`; pass `shortcut="alt+k"` or another primary-modifier shortcut to enable it. The supported format is one primary modifier (`mod`, `ctrl`, `control`, `meta`, `cmd`, `command`, `alt`, or `option`) plus one key. `mod` accepts either Meta or Control so the component does not need platform detection. Editable targets are ignored. `shortcutTarget={null}` skips registration.

Consumers render the explicit dialog structure and place `CommandPalette.Combobox` inside `CommandPalette.Content`. The combobox requires an Ark collection and defaults to `open={true}`, `inputBehavior="autohighlight"`, `selectionBehavior="preserve"`, `disableLayer={true}`, and `closeOnSelect={true}`. Selection closes the dialog through Ark dialog context. `CommandPalette.CloseTrigger` and `CommandPalette.ClearTrigger` render default icon-only buttons with accessible labels unless consumers provide children, labels, or `asChild`.
`CommandPalette.CloseIcon`, `Header`, and `Body` provide the same thin close-button and layout-helper
pattern used by the other dialog-like wrappers.

When consumers filter an external `useListCollection`, reset that filter when the dialog closes. Ark Combobox can clear its input on remount, but it does not own the external collection state.

## Anatomy and exported parts

```tsx
<CommandPalette>
  <CommandPalette.Trigger />
  <CommandPalette.Backdrop />
  <CommandPalette.Positioner>
    <CommandPalette.Content>
      <CommandPalette.CloseIcon />
      <CommandPalette.Header>
        <CommandPalette.Title />
        <CommandPalette.Description />
      </CommandPalette.Header>
      <CommandPalette.Body>
        <CommandPalette.Combobox>
          <CommandPalette.Control>
            <CommandPalette.Input />
            <CommandPalette.ClearTrigger />
          </CommandPalette.Control>
          <CommandPalette.List>
            <CommandPalette.Empty />
            <CommandPalette.ItemGroup>
              <CommandPalette.ItemGroupLabel />
              <CommandPalette.Item>
                <CommandPalette.ItemIcon />
                <CommandPalette.ItemText>
                  <CommandPalette.ItemLabel />
                  <CommandPalette.ItemDescription />
                </CommandPalette.ItemText>
                <CommandPalette.ItemMeta />
                <CommandPalette.ItemIndicator />
              </CommandPalette.Item>
            </CommandPalette.ItemGroup>
          </CommandPalette.List>
          <CommandPalette.Footer />
        </CommandPalette.Combobox>
      </CommandPalette.Body>
    </CommandPalette.Content>
  </CommandPalette.Positioner>
</CommandPalette>
```

- `CommandPalette` / `CommandPalette.Root`: Ark Dialog root plus shortcut listener.
- `CommandPalette.RootProvider`: Ark Dialog root provider for externally owned dialog state.
- `CommandPalette.Trigger`: Ark Dialog trigger, styled unless `asChild` is used.
- `CommandPalette.Backdrop`: Ark Dialog backdrop, `data-slot="command-palette-backdrop"`.
- `CommandPalette.Positioner`: Ark Dialog positioner, `data-slot="command-palette-positioner"`.
- `CommandPalette.Content`: Ark Dialog content, `data-slot="command-palette-content"`.
- `CommandPalette.Title` / `CommandPalette.Description`: Ark Dialog accessible title and description.
- `CommandPalette.CloseTrigger`: Ark Dialog close trigger with a default close icon and label.
- `CommandPalette.CloseIcon`: icon-only close-button helper built on the shared `CloseButton`.
- `CommandPalette.Header` / `CommandPalette.Body`: Ark factory-based layout helpers for title/description and the combobox body region.
- `CommandPalette.Combobox`: Ark Combobox root with command-palette defaults.
- `CommandPalette.Control`, `Input`, `ClearTrigger`, `List`, `Empty`, `ItemGroup`, `ItemGroupLabel`, `Item`, `ItemText`, `ItemIndicator`: Ark Combobox parts styled for command-palette layout. `ClearTrigger` renders a default icon and label, and `ItemIndicator` renders a default check icon. `List` includes the local moduix `ScrollArea`.
- `CommandPalette.ItemIcon`, `ItemLabel`, `ItemDescription`, `ItemMeta`, `Separator`, `Footer`: Ark factory-based moduix leaf parts for command metadata and footer affordances.
- `CommandPalette.Kbd`: command-palette scoped wrapper around the local `Kbd.Root`.

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
  <CommandPalette.Trigger asChild>
    <Button>Open palette</Button>
  </CommandPalette.Trigger>
  <CommandPalette.Backdrop />
  <CommandPalette.Positioner>
    <CommandPalette.Content>
      <CommandPalette.CloseIcon />
      <CommandPalette.Header>
        <CommandPalette.Title>Quick actions</CommandPalette.Title>
        <CommandPalette.Description>
          Search commands, pages, and settings.
        </CommandPalette.Description>
      </CommandPalette.Header>
      <CommandPalette.Body>
        <CommandPalette.Combobox
          collection={collection}
          onInputValueChange={(details) => filter(details.inputValue)}
        >
          <CommandPalette.Control>
            <CommandPalette.Input aria-label="Search commands" />
            <CommandPalette.ClearTrigger aria-label="Clear search" />
          </CommandPalette.Control>
          <CommandPalette.List>
            <CommandPalette.Empty>No commands found.</CommandPalette.Empty>
            {collection.group().map(([section, items]) => (
              <CommandPalette.ItemGroup key={section}>
                <CommandPalette.ItemGroupLabel>{section}</CommandPalette.ItemGroupLabel>
                {items.map((item) => (
                  <CommandPalette.Item key={item.id} item={item}>
                    <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
                  </CommandPalette.Item>
                ))}
              </CommandPalette.ItemGroup>
            ))}
          </CommandPalette.List>
        </CommandPalette.Combobox>
      </CommandPalette.Body>
    </CommandPalette.Content>
  </CommandPalette.Positioner>
</CommandPalette>;
```

## Upstream feature coverage

The wrapper covers the relevant Ark Dialog surface through Ark `useDialog`: controlled and uncontrolled open state, `onOpenChange(details)`, modal/non-modal behavior, focus trapping, escape and outside-interaction dismissal, `ids`, `initialFocusEl`, `finalFocusEl`, lazy mounting, `present`, `RootProvider`, and `Context`.

The wrapper covers the relevant Ark Combobox surface for command search: `collection`, `useListCollection`, custom objects via `itemToString` and `itemToValue`, filtering through `onInputValueChange(details)`, grouping through `collection.group()`, `inputBehavior`, `selectionBehavior`, controlled `inputValue` and `value`, `onSelect(details)` with `details.itemValue`, `onValueChange(details)`, `asChild` on Ark parts, and Ark item state attributes.

Ark Combobox examples that are not command-palette relevant remain available on the standalone `Combobox` component, including multiple selection, async search, creatable options, virtualized content, and form-oriented `HiddenInput` examples.

## Accessibility and state

Use `aria-label` on `CommandPalette` or render `CommandPalette.Title` so Ark Dialog has an accessible name. `CommandPalette.Input` should have its own label or `aria-label` for the search field. Default icon-only close and clear triggers receive fallback labels; custom `asChild` triggers must provide their own accessible name through the child.

Dialog state uses Ark `data-scope="dialog"`, `data-part`, and `data-state="open" | "closed"` attributes. Combobox state uses Ark `data-scope="combobox"`, `data-part`, `data-state`, `data-highlighted`, `data-disabled`, `data-invalid`, and `data-empty` attributes.

Refs forward to the underlying Ark DOM parts. `CommandPalette.Input` is the input ref target for focus integration. The wrapper does not add a `HiddenInput`; command palettes are action surfaces, not native form controls. Use the standalone `Combobox` for form submission and reset semantics.

## Defaults and styling

The visual contract uses `data-slot="command-palette-*"` hooks on each exported part and on the internal scroll area. `lazyMount` and `unmountOnExit` default to `true` so Ark Presence can run enter and exit animations while still removing the palette after close. Motion is tied to Ark `data-state` on `Backdrop` and `Content`, not legacy starting/ending style attributes.

Important CSS variables include `--command-palette-positioner-padding`, `--command-palette-width`, `--command-palette-max-height`, `--command-palette-bg`, `--command-palette-border-color`, `--command-palette-control-padding-*`, `--command-palette-highlight-*`, `--command-palette-scrollbar-*`, and the item/footer/kbd variables. Size and spacing defaults should prefer shared tokens such as `--size-sm`, `--size-md`, and `--spacing-*` over one-off fractional rem values.

## Intentional sugar and differences from upstream

`CommandPalette` can add a global shortcut listener because neither Ark Dialog nor Ark Combobox owns command-launch behavior. The listener is opt-in so pages with multiple palettes do not open every mounted instance from one key press. `CommandPalette.CloseTrigger` and `CommandPalette.ClearTrigger` render a default close icon and label when used as icon-only controls. `CommandPalette.CloseIcon`, `Header`, and `Body` mirror the dialog-like helper pattern without hiding the dialog or combobox structure. `CommandPalette.List` wraps its children in the local `ScrollArea` so command results use moduix scrollbars by default. The list is a flex child and does not own a hard-coded height; footer/header space is resolved by the dialog flex layout. `CommandPalette.ItemIndicator` renders a default check icon and can share the trailing row layout with `ItemMeta`. `CommandPalette.Kbd` composes the local `Kbd.Root` and maps command-palette CSS variables to the shared Kbd contract. `CommandPalette.ItemIcon`, `ItemLabel`, `ItemDescription`, `ItemMeta`, `Separator`, and `Footer` are visual Ark factory leaf parts only.

`CommandPalette.Combobox` defaults to an always-open listbox inside the dialog and closes the dialog on selection. Set `closeOnSelect={false}` on `CommandPalette.Combobox` for commands that should keep the palette open.

## Agent notes

Do not reintroduce `legacy autocomplete primitive`, `legacy dialog primitive`, `render` props, `createCommandPaletteHandle`, `CommandPaletteCollection`, or `items` render-function APIs. Keep structural dialog parts explicit and keep search behavior in Ark Combobox collection state.

Collections, locale helpers, and advanced combobox state APIs belong to Ark UI. Import
`useListCollection` and `createListCollection` from `@ark-ui/react/collection`, `useFilter` from
`@ark-ui/react/locale`, and direct Ark combobox provider/context APIs from `@ark-ui/react/combobox`
when a workflow needs them. Avoid duplicate command-palette re-exports with the same names because
consumers should compose those Ark helpers directly.

## Local changelog

- 2026-07-05: Added `CloseIcon`, `Header`, and `Body` helpers and gave `ItemIndicator` the same default check icon contract used by the other selection overlays.
- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-07-02: Removed `CommandPalette.ComboboxRootProvider`, `CommandPalette.Context`,
  `CommandPalette.ComboboxContext`, `CommandPalette.ItemContext`, and public prop type re-exports.
  Keep `CommandPalette.RootProvider`; import advanced combobox state APIs from Ark UI directly when
  needed.

- 2026-06-25: Simplified root state through Ark `useDialog`, moved local visual leaves to the
  Ark factory, added fallback labels for default icon triggers, and normalized several CSS defaults
  to shared size/spacing tokens.
- 2026-06-24: Updated the command palette contract to treat collections and locale filtering as
  direct Ark UI imports instead of moduix re-exports.

- 2026-06-21: Migrated from legacy Dialog/Autocomplete to an Ark Dialog + Ark Combobox composite. Removed imperative handles, Base render props, autocomplete collection render functions, and legacy flat part exports.
- 2026-06-21: Matched Dialog-style enter/exit animation tokens, simplified shortcut matching to primary-modifier shortcuts, and moved result scrolling to the local ScrollArea.
- 2026-06-21: Removed the list height formula, let the list consume remaining flex space above `Footer`, and fixed sticky group labels to pin to the scroll viewport instead of sliding under the input header.
- 2026-06-21: Switched `CommandPalette.Kbd` to compose the local `Kbd.Root` while preserving command-palette scoped CSS variables.
- 2026-06-21: Made the global shortcut listener opt-in, added `alt` / `option` shortcut support, and switched docs examples to `alt+k` to avoid the Fumadocs `Cmd+K` shortcut.
- 2026-06-21: Updated docs and stories to reset external `useListCollection` filters on close so a reopened palette does not show stale filtered results with an empty input.