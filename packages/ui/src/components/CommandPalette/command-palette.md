# CommandPalette

Upstream primitive docs:

- Dialog: https://base-ui.com/react/components/dialog.md
- Autocomplete: https://base-ui.com/react/components/autocomplete.md

## Purpose

`CommandPalette` is a full-featured command palette built as a thin composition of Base UI `Dialog`
and `Autocomplete`. It provides a modal (or non-modal) overlay with a search input, filtered result
list, grouped items, keyboard navigation, and a built-in global keyboard shortcut.

Use it when the user needs fast keyboard-driven access to commands, pages, or settings — the classic
`⌘+K` experience.

## Current behavior contract

- `CommandPalette` owns dialog state via an internal or external handle and registers the global
  keyboard shortcut.
- `CommandPaletteContent` is the recommended default shell. It renders the portal, optional backdrop,
  viewport, popup, and an inline always-open `Autocomplete` root. Use `CommandPaletteContent` for
  the standard command palette layout.
- The individual layout parts (`CommandPalettePortal`, `CommandPaletteBackdrop`,
  `CommandPaletteViewport`, `CommandPalettePopup`) are exported for custom composition when the
  default shell is too opinionated.
- Items are filtered in real time as the user types. The `itemToStringValue` prop determines the
  search surface for each item.
- `CommandPaletteItem` closes the dialog on click by default (`closeOnSelect={true}`). Pass
  `closeOnSelect={false}` to suppress this — useful when the item runs a side-effect but the palette
  should stay open.
- `CommandPaletteContent` reads `modal` from context, drops the backdrop and allows pointer
  interaction outside the popup when `modal={false}` is set on `CommandPalette`.
- The shortcut listener skips editable targets (`input`, `textarea`, `select`, `contenteditable`).
- `mod` resolves to `Meta` on macOS / iOS and to `Ctrl` everywhere else.
- If `shortcut={false}`, no keydown listener is registered.
- If `shortcutTarget={null}`, no keydown listener is registered.
- When no `handle` is provided, an internal handle is created automatically.
- `CommandPaletteStatus` is a visually-rendered but screen-reader-focused live region; place it
  after the input wrap to announce result counts.

## Composition

Standard usage with `CommandPaletteContent`:

```tsx
import {
  CommandPalette,
  CommandPaletteClear,
  CommandPaletteCollection,
  CommandPaletteContent,
  CommandPaletteEmpty,
  CommandPaletteFooter,
  CommandPaletteGroup,
  CommandPaletteGroupLabel,
  CommandPaletteInput,
  CommandPaletteInputWrap,
  CommandPaletteItem,
  CommandPaletteItemDescription,
  CommandPaletteItemIcon,
  CommandPaletteItemLabel,
  CommandPaletteItemMeta,
  CommandPaletteItemText,
  CommandPaletteKbd,
  CommandPaletteList,
  CommandPaletteTrigger,
} from 'moduix';
import { Button } from 'moduix';
import { PlusIcon, ArrowUpRightIcon, StarIcon, BellIcon } from '@/icons';

type CommandItem = {
  id: string;
  section: string;
  label: string;
  description: string;
  shortcut?: string;
  icon: React.ReactNode;
};

type CommandGroup = {
  value: string;
  items: CommandItem[];
};

const commandGroups: CommandGroup[] = [
  {
    value: 'Create',
    items: [
      {
        id: 'new-project',
        section: 'Create',
        label: 'New project',
        description: 'Start a blank workspace',
        shortcut: 'N',
        icon: <PlusIcon />,
      },
      {
        id: 'invite-team',
        section: 'Create',
        label: 'Invite teammates',
        description: 'Send access to the current organization',
        shortcut: 'I',
        icon: <PlusIcon />,
      },
    ],
  },
  {
    value: 'Navigate',
    items: [
      {
        id: 'recent',
        section: 'Navigate',
        label: 'Open recent work',
        description: 'Jump back to a recently edited file',
        shortcut: 'R',
        icon: <ArrowUpRightIcon />,
      },
    ],
  },
];

export function CommandPaletteDemo() {
  return (
    <CommandPalette shortcut="mod+k">
      <CommandPaletteTrigger render={<Button />}>
        Search commands <kbd>⌘K</kbd>
      </CommandPaletteTrigger>

      <CommandPaletteContent<CommandItem>
        aria-label="Command palette"
        items={commandGroups}
        itemToStringValue={(item) => `${item.label} ${item.description} ${item.section}`}
      >
        <CommandPaletteInputWrap>
          <CommandPaletteInput
            aria-label="Search commands"
            placeholder="Search commands, pages, and settings..."
          />
          <CommandPaletteClear aria-label="Clear search" />
        </CommandPaletteInputWrap>

        <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>

        <CommandPaletteList>
          {(group: CommandGroup) => (
            <CommandPaletteGroup key={group.value} items={group.items}>
              <CommandPaletteGroupLabel>{group.value}</CommandPaletteGroupLabel>
              <CommandPaletteCollection>
                {(item: CommandItem) => (
                  <CommandPaletteItem key={item.id} value={item}>
                    <CommandPaletteItemIcon>{item.icon}</CommandPaletteItemIcon>
                    <CommandPaletteItemText>
                      <CommandPaletteItemLabel>{item.label}</CommandPaletteItemLabel>
                      <CommandPaletteItemDescription>
                        {item.description}
                      </CommandPaletteItemDescription>
                    </CommandPaletteItemText>
                    {item.shortcut ? (
                      <CommandPaletteItemMeta>{item.shortcut}</CommandPaletteItemMeta>
                    ) : null}
                  </CommandPaletteItem>
                )}
              </CommandPaletteCollection>
            </CommandPaletteGroup>
          )}
        </CommandPaletteList>

        <CommandPaletteFooter>
          <span>
            <CommandPaletteKbd>↑↓</CommandPaletteKbd> navigate
          </span>
          <span>
            <CommandPaletteKbd>Enter</CommandPaletteKbd> run
          </span>
          <span>
            <CommandPaletteKbd>Esc</CommandPaletteKbd> close
          </span>
        </CommandPaletteFooter>
      </CommandPaletteContent>
    </CommandPalette>
  );
}
```

Recommended tree:

```text
CommandPalette
├─ CommandPaletteTrigger (optional)
└─ CommandPaletteContent [items, itemToStringValue]
   ├─ CommandPaletteInputWrap
   │  ├─ CommandPaletteInput [placeholder, aria-label]
   │  └─ CommandPaletteClear [aria-label]
   ├─ CommandPaletteStatus (optional, for async feedback)
   ├─ CommandPaletteEmpty
   └─ CommandPaletteList
      └─ CommandPaletteGroup [items]
         ├─ CommandPaletteGroupLabel
         └─ CommandPaletteCollection
            └─ CommandPaletteItem [value, closeOnSelect?]
               ├─ CommandPaletteItemIcon (optional)
               ├─ CommandPaletteItemText
               │  ├─ CommandPaletteItemLabel
               │  └─ CommandPaletteItemDescription (optional)
               └─ CommandPaletteItemMeta (optional)
   └─ CommandPaletteFooter (optional)
      └─ CommandPaletteKbd (optional)
```

For flat (non-grouped) items, omit `CommandPaletteGroup`, `CommandPaletteGroupLabel`, and
`CommandPaletteCollection` and render `CommandPaletteItem` directly inside `CommandPaletteList`.

### External handle

Use `createCommandPaletteHandle` to open or close the palette imperatively:

```tsx
import { createCommandPaletteHandle, CommandPalette, CommandPaletteContent } from 'moduix';

const handle = createCommandPaletteHandle();

// Open programmatically, e.g., from a menu item:
handle.open(null);

export function AppCommandPalette() {
  return (
    <CommandPalette handle={handle} shortcut={false}>
      <CommandPaletteContent ...>
        {/* ... */}
      </CommandPaletteContent>
    </CommandPalette>
  );
}
```

### Custom composition

Compose the low-level parts directly when the default `CommandPaletteContent` shell does not fit
your layout. Use `Autocomplete` from `moduix` to wire up the filtering root manually:

```tsx
import { Autocomplete } from 'moduix';
import {
  CommandPalette,
  CommandPaletteBackdrop,
  CommandPalettePopup,
  CommandPalettePortal,
  CommandPaletteViewport,
  CommandPaletteInputWrap,
  CommandPaletteInput,
  CommandPaletteClear,
  CommandPaletteEmpty,
  CommandPaletteList,
  CommandPaletteItem,
} from 'moduix';

export function CustomPalette() {
  return (
    <CommandPalette shortcut="mod+k">
      <CommandPalettePortal>
        <CommandPaletteBackdrop />
        <CommandPaletteViewport>
          <CommandPalettePopup aria-label="Custom command palette">
            <Autocomplete
              autoHighlight="always"
              inline
              keepHighlight
              open
              items={items}
              itemToStringValue={(item) => item.label}
            >
              <CommandPaletteInputWrap>
                <CommandPaletteInput placeholder="Search..." />
                <CommandPaletteClear aria-label="Clear" />
              </CommandPaletteInputWrap>
              <CommandPaletteEmpty>No results.</CommandPaletteEmpty>
              <CommandPaletteList>
                {(item) => (
                  <CommandPaletteItem key={item.id} value={item}>
                    {item.label}
                  </CommandPaletteItem>
                )}
              </CommandPaletteList>
            </Autocomplete>
          </CommandPalettePopup>
        </CommandPaletteViewport>
      </CommandPalettePortal>
    </CommandPalette>
  );
}
```

### Executing actions on select

Attach an `onClick` handler to `CommandPaletteItem`. The dialog closes automatically after the
click unless `closeOnSelect={false}` is set.

```tsx
<CommandPaletteItem value={item} onClick={() => executeCommand(item.id)}>
  {item.label}
</CommandPaletteItem>
```

## Exported parts

| Part                            | Element  | `data-slot`                        | Notes                                                                                            |
| ------------------------------- | -------- | ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| `CommandPalette`                | none     | —                                  | Root state: dialog + shortcut. Use `handle`, `modal`, `shortcut`, `shortcutTarget`.              |
| `CommandPaletteTrigger`         | `button` | `command-palette-trigger`          | Opens the palette. Skips built-in styles when `render` is used.                                  |
| `CommandPalettePortal`          | portal   | —                                  | Renders children into `document.body`. Accepts `container` and `keepMounted`.                    |
| `CommandPaletteBackdrop`        | `div`    | `command-palette-backdrop`         | Dimmed + blurred modal overlay. Omitted automatically by `CommandPaletteContent` when non-modal. |
| `CommandPaletteViewport`        | `div`    | `command-palette-viewport`         | Fixed full-screen scroll container.                                                              |
| `CommandPalettePopup`           | `div`    | `command-palette-popup`            | Styled floating panel. Accepts `className`, `aria-label`, `aria-labelledby`.                     |
| `CommandPaletteClose`           | `button` | `command-palette-close`            | Closes the dialog without selecting. Use inside the popup for an explicit close button.          |
| `CommandPaletteContent`         | composed | —                                  | Convenience shell: portal + backdrop + viewport + popup + autocomplete root.                     |
| `CommandPaletteInputWrap`       | `div`    | `command-palette-input-wrap`       | Flex row containing the input and clear button.                                                  |
| `CommandPaletteInput`           | `input`  | `command-palette-input`            | Search input. Always provide `aria-label` or a visible label.                                    |
| `CommandPaletteClear`           | `button` | `command-palette-clear`            | Clears the input. Renders `CloseIcon` by default; pass `children` to override.                   |
| `CommandPaletteStatus`          | `div`    | `command-palette-status`           | ARIA live region for async status messages (e.g. "Loading…", "5 results").                       |
| `CommandPaletteEmpty`           | `div`    | `command-palette-empty`            | Shown when the filtered list is empty.                                                           |
| `CommandPaletteList`            | listbox  | `command-palette-list`             | Renders items or groups. `data-empty` applied when list is empty.                                |
| `CommandPaletteGroup`           | group    | `command-palette-group`            | Groups items. Accepts `items` and renders children via render prop.                              |
| `CommandPaletteGroupLabel`      | label    | `command-palette-group-label`      | Sticky group heading.                                                                            |
| `CommandPaletteCollection`      | none     | `command-palette-collection`       | Renders items from the parent group's `items` prop via render prop.                              |
| `CommandPaletteItem`            | option   | `command-palette-item`             | Selectable command row. `closeOnSelect` defaults to `true`.                                      |
| `CommandPaletteItemIcon`        | `span`   | `command-palette-item-icon`        | Square bordered icon box. Renders any React node (icon component, image, emoji).                 |
| `CommandPaletteItemText`        | `span`   | `command-palette-item-text`        | Grid wrapper for label + description stacking.                                                   |
| `CommandPaletteItemLabel`       | `span`   | `command-palette-item-label`       | Primary truncated label.                                                                         |
| `CommandPaletteItemDescription` | `span`   | `command-palette-item-description` | Secondary truncated description.                                                                 |
| `CommandPaletteItemMeta`        | `span`   | `command-palette-item-meta`        | Right-side metadata (shortcut hint, badge, etc.).                                                |
| `CommandPaletteSeparator`       | `div`    | `command-palette-separator`        | Horizontal divider between sections.                                                             |
| `CommandPaletteFooter`          | `div`    | `command-palette-footer`           | Bottom bar for keyboard hints or action links.                                                   |
| `CommandPaletteKbd`             | `kbd`    | `command-palette-kbd`              | Monospace keyboard key badge. Styled to match the palette surface.                               |

## Public props

### `CommandPalette`

Extends `DialogPrimitive.Root.Props`. Key props:

| Prop             | Type                              | Default    | Description                                                                                |
| ---------------- | --------------------------------- | ---------- | ------------------------------------------------------------------------------------------ |
| `modal`          | `boolean`                         | `true`     | When `true`, renders a backdrop and traps focus. When `false`, allows interaction outside. |
| `shortcut`       | `string \| false`                 | `'mod+k'`  | Global keyboard shortcut. `mod` resolves to `Meta` on macOS/iOS and `Ctrl` elsewhere.      |
| `shortcutTarget` | `Document \| HTMLElement \| null` | `document` | Element to attach the keydown listener to. Pass `null` to disable the listener.            |
| `handle`         | `DialogPrimitive.Handle`          | internal   | External handle from `createCommandPaletteHandle()` for imperative open/close control.     |
| `open`           | `boolean`                         | —          | Controlled open state.                                                                     |
| `defaultOpen`    | `boolean`                         | `false`    | Uncontrolled initial open state.                                                           |
| `onOpenChange`   | `(open: boolean) => void`         | —          | Called when the open state changes.                                                        |

Shortcut string format: modifier keys joined with `+`, key last.
Recognized modifiers: `mod`, `ctrl`/`control`, `meta`/`cmd`/`command`, `alt`/`option`, `shift`.
Examples: `'mod+k'`, `'ctrl+shift+p'`, `'alt+k'`.

### `CommandPaletteContent`

Extends `DialogPrimitive.Popup.Props`. Additional props forwarded to the autocomplete root:

| Prop                | Type                                       | Default  | Description                                                        |
| ------------------- | ------------------------------------------ | -------- | ------------------------------------------------------------------ |
| `items`             | `readonly ItemValue[] \| readonly Group[]` | —        | Data source. Groups must have an `items` array.                    |
| `itemToStringValue` | `(item: ItemValue) => string`              | —        | Converts an item to the string used for filtering and ARIA labels. |
| `value`             | `ItemValue`                                | —        | Controlled selected value.                                         |
| `defaultValue`      | `ItemValue`                                | —        | Uncontrolled default selected value.                               |
| `onValueChange`     | `(value: ItemValue, ...) => void`          | —        | Called when the selected value changes.                            |
| `filter`            | `(options: FilterOptions) => boolean`      | built-in | Custom filter function. Return `false` to hide an item.            |
| `filteredItems`     | `readonly ItemValue[]`                     | —        | Pre-filtered items for async/server-side filtering.                |
| `limit`             | `number`                                   | —        | Maximum number of items to render.                                 |

The autocomplete inside `CommandPaletteContent` is always open (`open: true`), always highlights the
first result (`autoHighlight: 'always'`), keeps the highlight stable after filtering
(`keepHighlight: true`), and renders inline (`inline: true`).

### `CommandPaletteItem`

Extends `AutocompletePrimitive.Item.Props`.

| Prop            | Type        | Default | Description                                                                         |
| --------------- | ----------- | ------- | ----------------------------------------------------------------------------------- |
| `value`         | `ItemValue` | —       | The item value. Required.                                                           |
| `closeOnSelect` | `boolean`   | `true`  | When `true`, closes the palette after clicking this item.                           |
| `disabled`      | `boolean`   | `false` | Disables the item. Adds `data-disabled` and removes pointer events.                 |
| `onClick`       | handler     | —       | Called before `closeOnSelect` logic. Call `event.preventDefault()` to cancel close. |

## Defaults and styling

Every exported visual part accepts `className`. State-bearing parts carry `data-slot` (see the table
above) for CSS targeting.

### Data attributes from Base UI

| Attribute             | Where it appears | Meaning                                              |
| --------------------- | ---------------- | ---------------------------------------------------- |
| `data-open`           | backdrop, popup  | Dialog is open.                                      |
| `data-starting-style` | backdrop, popup  | Element is entering. Used for enter transitions.     |
| `data-ending-style`   | backdrop, popup  | Element is leaving. Used for exit transitions.       |
| `data-highlighted`    | item             | Item is keyboard-highlighted (hovered via keyboard). |
| `data-selected`       | item             | Item is the current selected value.                  |
| `data-disabled`       | item             | Item is disabled.                                    |
| `data-empty`          | list             | List has no visible items after filtering.           |

### CSS variables

All variables are scoped to `@layer ui.components`. Override them on the component root or any
ancestor.

#### Global / shared

| Variable                              | Default                           |
| ------------------------------------- | --------------------------------- |
| `--command-palette-bg`                | `var(--color-popover)`            |
| `--command-palette-color`             | `var(--color-popover-foreground)` |
| `--command-palette-muted-color`       | `var(--color-muted-foreground)`   |
| `--command-palette-divider-width`     | `var(--border-width-sm)`          |
| `--command-palette-divider-color`     | `var(--color-border)`             |
| `--command-palette-focus-ring-width`  | `var(--border-width-sm)`          |
| `--command-palette-focus-ring-color`  | `var(--color-ring)`               |
| `--command-palette-focus-ring-offset` | `var(--border-width-sm)`          |
| `--command-palette-icon-size`         | `1rem`                            |

#### Trigger

| Variable                                 | Default                      |
| ---------------------------------------- | ---------------------------- |
| `--command-palette-trigger-gap`          | `var(--spacing-2)`           |
| `--command-palette-trigger-height`       | `var(--size-lg)`             |
| `--command-palette-trigger-padding-y`    | `0.5rem`                     |
| `--command-palette-trigger-padding-x`    | `0.875rem`                   |
| `--command-palette-trigger-border-width` | `var(--border-width-sm)`     |
| `--command-palette-trigger-border-color` | `var(--color-border)`        |
| `--command-palette-trigger-radius`       | `var(--radius-md)`           |
| `--command-palette-trigger-bg`           | `var(--color-background)`    |
| `--command-palette-trigger-bg-hover`     | `var(--color-accent)`        |
| `--command-palette-trigger-color`        | `var(--color-foreground)`    |
| `--command-palette-trigger-font-size`    | `var(--text-md)`             |
| `--command-palette-trigger-line-height`  | `var(--line-height-text-md)` |

#### Backdrop

| Variable                                | Default                                   |
| --------------------------------------- | ----------------------------------------- |
| `--command-palette-backdrop-bg`         | `var(--backdrop-bg, rgb(8 12 20 / 0.42))` |
| `--command-palette-backdrop-blur`       | `8px`                                     |
| `--command-palette-backdrop-transition` | `var(--transition-default)`               |

#### Viewport

| Variable                             | Default                                   |
| ------------------------------------ | ----------------------------------------- |
| `--command-palette-viewport-padding` | `10dvh var(--spacing-4) var(--spacing-4)` |

#### Popup

| Variable                         | Default                                                     |
| -------------------------------- | ----------------------------------------------------------- |
| `--command-palette-width`        | `37.5rem`                                                   |
| `--command-palette-max-width`    | `calc(100vw - var(--spacing-8, 2rem))`                      |
| `--command-palette-max-height`   | `34rem`                                                     |
| `--command-palette-border-width` | `var(--border-width-sm)`                                    |
| `--command-palette-border-color` | `color-mix(in oklab, var(--color-border) 84%, transparent)` |
| `--command-palette-radius`       | `var(--radius-lg)`                                          |
| `--command-palette-top-bg`       | `color-mix(in oklab, var(--color-popover) 96%, white 4%)`   |
| `--command-palette-shadow`       | `var(--shadow-lg)`                                          |
| `--command-palette-transition`   | `var(--transition-default)`                                 |
| `--command-palette-scale`        | `var(--scale-popup)`                                        |

#### Input wrap

| Variable                                 | Default            |
| ---------------------------------------- | ------------------ |
| `--command-palette-input-gap`            | `var(--spacing-2)` |
| `--command-palette-input-height`         | `4rem`             |
| `--command-palette-input-wrap-padding-y` | `var(--spacing-3)` |
| `--command-palette-input-wrap-padding-x` | `var(--spacing-4)` |

#### Input

| Variable                                    | Default                         |
| ------------------------------------------- | ------------------------------- |
| `--command-palette-input-control-height`    | `2.25rem`                       |
| `--command-palette-input-font-size`         | `var(--text-lg)`                |
| `--command-palette-input-line-height`       | `var(--line-height-text-lg)`    |
| `--command-palette-input-placeholder-color` | `var(--color-muted-foreground)` |

#### Clear button

| Variable                           | Default               |
| ---------------------------------- | --------------------- |
| `--command-palette-clear-size`     | `1.75rem`             |
| `--command-palette-clear-radius`   | `var(--radius-md)`    |
| `--command-palette-clear-bg-hover` | `var(--color-accent)` |

#### Status / Empty

| Variable                               | Default                      |
| -------------------------------------- | ---------------------------- |
| `--command-palette-status-padding-y`   | `0.25rem`                    |
| `--command-palette-status-padding-x`   | `var(--spacing-4)`           |
| `--command-palette-status-font-size`   | `var(--text-xs)`             |
| `--command-palette-status-line-height` | `var(--line-height-text-xs)` |
| `--command-palette-empty-padding-y`    | `0.75rem`                    |
| `--command-palette-empty-padding-x`    | `var(--spacing-4)`           |
| `--command-palette-empty-font-size`    | `var(--text-sm)`             |
| `--command-palette-empty-line-height`  | `var(--line-height-text-sm)` |

#### List

| Variable                                  | Default            |
| ----------------------------------------- | ------------------ |
| `--command-palette-list-padding-y`        | `var(--spacing-2)` |
| `--command-palette-list-padding-x`        | `var(--spacing-2)` |
| `--command-palette-list-scroll-padding-y` | `var(--spacing-2)` |

#### Group

| Variable                                    | Default                      |
| ------------------------------------------- | ---------------------------- |
| `--command-palette-group-gap`               | `0.125rem`                   |
| `--command-palette-group-padding-bottom`    | `var(--spacing-2)`           |
| `--command-palette-group-label-padding-y`   | `0.375rem`                   |
| `--command-palette-group-label-padding-x`   | `0.75rem`                    |
| `--command-palette-group-label-font-size`   | `var(--text-xs)`             |
| `--command-palette-group-label-font-weight` | `var(--weight-semibold)`     |
| `--command-palette-group-label-line-height` | `var(--line-height-text-xs)` |

#### Item

| Variable                                         | Default                         |
| ------------------------------------------------ | ------------------------------- |
| `--command-palette-item-gap`                     | `var(--spacing-3)`              |
| `--command-palette-item-min-height`              | `3rem`                          |
| `--command-palette-item-padding-y`               | `0.5rem`                        |
| `--command-palette-item-padding-x`               | `0.75rem`                       |
| `--command-palette-item-radius`                  | `var(--radius-md)`              |
| `--command-palette-item-color`                   | `var(--color-foreground)`       |
| `--command-palette-item-font-size`               | `var(--text-sm)`                |
| `--command-palette-item-line-height`             | `var(--line-height-text-sm)`    |
| `--command-palette-highlight-bg`                 | `var(--color-accent)`           |
| `--command-palette-highlight-color`              | `var(--color-foreground)`       |
| `--command-palette-item-icon-box-size`           | `2rem`                          |
| `--command-palette-item-icon-border-width`       | `var(--border-width-sm)`        |
| `--command-palette-item-icon-border-color`       | `var(--color-border)`           |
| `--command-palette-item-icon-radius`             | `var(--radius-md)`              |
| `--command-palette-item-icon-bg`                 | `var(--color-muted)`            |
| `--command-palette-item-icon-color`              | `var(--color-muted-foreground)` |
| `--command-palette-item-icon-size`               | `1rem`                          |
| `--command-palette-item-text-gap`                | `0.125rem`                      |
| `--command-palette-item-label-font-weight`       | `var(--weight-medium)`          |
| `--command-palette-item-description-font-size`   | `var(--text-xs)`                |
| `--command-palette-item-description-line-height` | `var(--line-height-text-xs)`    |
| `--command-palette-item-meta-font-size`          | `var(--text-xs)`                |
| `--command-palette-item-meta-line-height`        | `var(--line-height-text-xs)`    |

#### Separator / Footer / Kbd

| Variable                               | Default                         |
| -------------------------------------- | ------------------------------- |
| `--command-palette-separator-margin-y` | `var(--spacing-2)`              |
| `--command-palette-separator-margin-x` | `var(--spacing-2)`              |
| `--command-palette-footer-gap`         | `var(--spacing-3)`              |
| `--command-palette-footer-padding-y`   | `0.625rem`                      |
| `--command-palette-footer-padding-x`   | `var(--spacing-4)`              |
| `--command-palette-footer-font-size`   | `var(--text-xs)`                |
| `--command-palette-footer-line-height` | `var(--line-height-text-xs)`    |
| `--command-palette-kbd-min-width`      | `1.25rem`                       |
| `--command-palette-kbd-height`         | `1.25rem`                       |
| `--command-palette-kbd-border-width`   | `var(--border-width-sm)`        |
| `--command-palette-kbd-border-color`   | `var(--color-border)`           |
| `--command-palette-kbd-radius`         | `var(--radius-sm)`              |
| `--command-palette-kbd-padding-x`      | `0.375rem`                      |
| `--command-palette-kbd-bg`             | `var(--color-muted)`            |
| `--command-palette-kbd-color`          | `var(--color-muted-foreground)` |
| `--command-palette-kbd-font-family`    | `var(--font-mono)`              |
| `--command-palette-kbd-font-size`      | `0.6875rem`                     |
| `--command-palette-kbd-line-height`    | `1rem`                          |

## Accessibility and UX notes

- Always provide `aria-label` on `CommandPaletteInput` or use an associated visible label.
- Provide `aria-label` or `aria-labelledby` on `CommandPalettePopup` (or pass it to
  `CommandPaletteContent`) so assistive technologies can announce the dialog name.
- Keyboard navigation is handled by Base UI: `ArrowUp`/`ArrowDown` moves between items, `Enter`
  selects, `Escape` closes the dialog and returns focus to the trigger.
- The backdrop closes the dialog when clicked in `modal` mode (Base UI default behavior).
- `CommandPaletteStatus` should be used for async feedback ("Loading…", "3 results found"). It is
  a live region that announces changes. Only render content when there is something meaningful to say;
  the element is visually hidden when empty.
- `CommandPaletteTrigger` skips built-in button styles when the Base UI `render` prop is used,
  allowing any custom element to act as the trigger. This matches the pattern used by other trigger
  wrappers in the library.
- `CommandPaletteClear` is automatically hidden by Base UI when the input is empty.
- `CommandPaletteKbd` is a visual-only keyboard hint element. It does not add keyboard bindings.

## Intentional differences from Base UI

- Consumers import flat named exports (`CommandPalette`, `CommandPaletteItem`, etc.), not
  `Dialog.Root`, `Autocomplete.Item`.
- All visual parts are styled by default via CSS Modules and theme variables.
- `CommandPaletteContent` is a moduix-only convenience wrapper. It composes the dialog portal,
  backdrop, viewport, popup, and autocomplete root into a single component.
- `CommandPaletteItem` adds `closeOnSelect` sugar (not in Base UI) to close the dialog automatically
  on click.
- The global keyboard shortcut listener with `mod+k`, platform detection, and editable-target guard
  are moduix additions.
- The internal `createCommandPaletteHandle` is a re-export of `DialogPrimitive.createHandle`.
- Item layout parts (`CommandPaletteItemIcon`, `CommandPaletteItemText`, `CommandPaletteItemLabel`,
  `CommandPaletteItemDescription`, `CommandPaletteItemMeta`) are moduix-only layout helpers; Base UI
  has no equivalent.

## Agent notes

- Preserve the `open: true`, `inline: true`, `autoHighlight: 'always'`, and `keepHighlight: true`
  autocomplete defaults inside `CommandPaletteContent`. These are essential for the palette UX and
  must not be removed as cleanup.
- Preserve all `data-slot` values; they are the public styling contract for consumers targeting parts
  with CSS.
- Preserve the `closeOnSelect` logic in `CommandPaletteItem`. It reads `handle` from context to call
  `handle.close()` imperatively.
- Preserve the `modal` context value; `CommandPaletteContent` reads it to conditionally render the
  backdrop and apply the non-modal viewport class.
- Do not remove the `shortcutTarget === null` early-exit guard; consumers use it to disable the
  listener without setting `shortcut={false}`.
- The `CommandPaletteTrigger` style skipping behavior (`render ? className : mergeClassName(...)`) is
  intentional and must be preserved for API consistency with other trigger wrappers.
- Keep all CSS variables as documented. They are the public override API for consumers.

## Local changelog

- Removed dead `isGroupedItems` guard in `CommandPaletteContent` — both branches rendered identical
  JSX; the autocomplete root accepts both flat and grouped item arrays natively.
- Removed internal `CommandPaletteGroup<ItemValue>` type used only by the dead code.
- Removed no-op `data-slot` from `CommandPalettePortal` — the portal renders no DOM wrapper element,
  so the attribute was never applied.
- Rewrote local documentation to describe the moduix wrapper API, composition model, all exported
  parts, CSS variables, accessibility notes, and intentional differences from Base UI.