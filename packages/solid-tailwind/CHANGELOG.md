# @moduix/solid-tailwind

## 3.1.0

### Minor Changes

### Alert

- a1a461a: `AlertIndicator` now sizes itself to its content instead of a fixed 16px box, so a size class on the icon (for example `size-6`) resizes the indicator too; before, a larger icon overflowed into the gap and sat off-center next to the title.
  The CSS Modules packages keep 5 `--moduix-alert-*` variables instead of 37: `bg`, `border-color`, `color`, and `indicator-color`, which override every status (scope them with `[data-status='success']` and similar selectors to theme one status), and `description-color`. The per-status, spacing, radius, shadow, border-width, indicator size and offset, title, and description typography variables are removed in favor of foundation tokens; override those with a class on the part. Default visuals are unchanged.
  Removed the no-op title `color: inherit` and, in the Tailwind packages, the unused `group/alert` class. The private indicator color property is renamed to `--_alert-indicator-color`.
  Export the `AlertRootProps` and `AlertStatus` types.

### AngleSlider

- a1a461a: Markers below the value now take the fill color, so they follow `--moduix-angle-slider-indicator-bg` and turn destructive with `invalid`; an invalid thumb keeps its destructive border and gets a destructive focus ring, like `Slider`.
  The ring thickness defaults to `--moduix-spacing-2` in both styling tracks. In Tailwind the ring mask used a fixed `0.5rem` while the start cap, thumb, and markers used spacing tokens, so a density preset misaligned them.
  The CSS Modules packages keep 5 `--moduix-angle-slider-*` variables instead of 25: `size`, `ring-thickness`, `thumb-size`, `indicator-bg`, and `track-bg`. The color, gap, disabled opacity, label and value text, focus ring, invalid, thumb border, background and shadow, marker, and transition variables are removed in favor of foundation tokens; style those with a class on the part. Default visuals are unchanged.
  The Tailwind private fill property is renamed to `--_angle-slider-fill`, and the redundant reduced-motion transition rule is removed (thumb transitions already use token durations).

### AspectRatio

- a1a461a: Export the `AspectRatioRootProps` type, matching the `<Component>RootProps` naming of other components.

### Avatar

- a1a461a: Add `AvatarGroup` for overlapping avatar stacks. `size` defaults to `md` and is always mirrored as `data-size`.
  The CSS Modules packages keep 6 of the 12 `--moduix-avatar-*` variables: `bg`, `color`, `font-size`, `font-weight`, `radius`, and `size`. Removed: `fallback-bg`, `fallback-color`, `fallback-padding`, `image-object-fit`, `image-object-position`, and `line-height`; style the fallback or image with a class on the part. Clipping moved from the root to the fallback, so status indicators can overflow the circle.

### Badge

- a1a461a: The CSS Modules packages keep 3 `--moduix-badge-*` variables instead of 14: `bg`, `border-color`, and `color`, which override every variant. The `border-width`, `dot-size`, `font-size`, `font-weight`, `gap`, `height`, `icon-size`, `line-height`, `padding-x`, `padding-y`, and `radius` variables are removed in favor of foundation tokens; override those with a class on the part. Default visuals are unchanged.
  In the Tailwind packages the hover of filled link badges uses the new `opacity-hover` theme utility instead of a fixed `opacity-90`. It reads `--moduix-opacity-hover`, the same token the CSS Modules packages use, so overriding that token now affects both styling tracks. `cn` knows the new utility, so a consumer class such as `[a&]:hover:opacity-75` still replaces the default.

### Breadcrumbs

- a1a461a: Export the `BreadcrumbsPathLink` and `BreadcrumbsPathProps` types for typing `BreadcrumbsPath` links outside the component.
  `BreadcrumbsEllipsis` now shows a horizontal ellipsis icon instead of the `...` text by default; pass children to keep custom content.
  A native `button` that directly wraps `BreadcrumbsEllipsis`, such as a collapsed-path `MenuTrigger`, is now styled as a breadcrumb trigger with the link hover color and focus ring, so it no longer needs its own reset styles.
  Links, separators, and the ellipsis now inherit the root text color, so setting `color` (or `--moduix-breadcrumbs-color`) on `Breadcrumbs` recolors the whole trail. Default visuals are unchanged.
  The CSS Modules packages drop 13 `--moduix-breadcrumbs-*` variables: `max-width`, `link-color`, `link-radius`, `link-text-decoration`, `link-text-decoration-hover`, `link-underline-offset`, `link-transition`, `focus-ring-color`, `focus-ring-width`, `ellipsis-color`, `ellipsis-size`, `separator-color`, and `separator-font-size`. Style the parts through their `data-slot` selectors or your own class instead.
  Vue: take the default `aria-label` from the shared accessibility labels, as React and Solid already do. The registry item now depends on `a11y-labels`.

### Button

- a1a461a: Replace the 69 per-variant and per-size `--moduix-button-*` variables with 14 generic ones: `bg`, `bg-hover`, `color`, `border-color`, `border-width`, `radius`, `height`, `padding-x`, `padding-y`, `font-size`, `font-weight`, `line-height`, `content-gap`, and `icon-size`. To theme one variant, set them on `[data-slot='button-root'][data-variant='<variant>']`. Focus ring, transition, and disabled opacity now use the foundation tokens directly.
  The `destructive` hover now darkens the background like `default` instead of using `brightness(0.96)`.
  Export the `ButtonRootProps`, `ButtonSize`, and `ButtonVariant` types, and remove dead `cursor` and link `padding-inline` styles.
  Clipboard, Field, FileUpload, Input, PasswordInput, and QrCode no longer read the removed Button variables; their defaults are unchanged. Vue `InputGroupButton` now uses the Button size padding, like React and Solid.

### Card

- a1a461a: Replace the 48 `--moduix-card-*` variables with 7: `bg`, `color`, `border-color`, `border-width`, `shadow`, `radius`, and `spacing`. To theme one variant, set them on `[data-slot='card-root'][data-variant='<variant>']`. Per-variant, per-size, part typography, gap, and focus-ring variables are removed; override those with a class on the part.
  Sections now share one inset: each `CardHeader`, `CardBody`, and `CardFooter` is padded on top and the last one at the bottom. A header-only card is no longer missing its bottom padding, and a header followed by a footer is no longer glued to it. The gap between header and body grows from 16px to the card inset (24px at `md`), like Chakra and shadcn.
  `CardBody` text now uses the card foreground color instead of the muted color.
  Fix `CardLink` with `CardBackground`: the link now covers the body and footer instead of only the header.
  Export the `CardRootProps`, `CardSize`, and `CardVariant` types.

### Carousel

- a1a461a: `CarouselControl` now centers its content, `CarouselAutoplayTrigger` grows with its label instead of overflowing, and hover styles no longer stick after a tap on touch screens.
  The CSS Modules packages keep 9 `--moduix-carousel-*` variables instead of 25: hover, shadow, focus-ring, icon-size, autoplay min-width, indicator-gap, progress-text, and track-radius variables are removed; set those styles with a class on the part. Triggers use the card background and border tokens, and idle indicators use the muted foreground color at 50% in every package, so they stay visible on light surfaces.
  `CarouselAutoplayIndicator` no longer uppercases its label. Vue `CarouselAutoplayIndicator` now forwards the Ark `fallback` slot.

### Chart

- a1a461a: React `renderTooltipBody` now receives the compact moduix body as `defaultBody`, like Solid and Vue, so a wrapped tooltip looks the same as the default one. Tooltip rows that TanStack marks as `active` are highlighted, and Solid `renderTooltipBody` now receives `primaryPoint`.
  The CSS Modules packages keep 7 `--moduix-chart-*` variables instead of 22: the `--moduix-chart-tooltip-*` aliases, axis color, plot radius, border width, and focus-ring variables are removed. Override TanStack's `--ts-chart-tooltip-*` variables on `ChartPlot` instead, and set other styles with a class on the part.
  Tailwind packages style the tooltip through the same `--ts-chart-tooltip-*` variables instead of rewriting `definition.tooltip.className` with `!important` utilities, and `ChartLegendItem` draws its indicator with `::before` like the CSS Modules packages, so it no longer renders an extra span or special-cases `asChild`.

### Checkbox

- a1a461a: A custom icon passed to `CheckboxIndicator` now gets the icon size of the current `size` instead of stretching over the whole control. The default icons render as a direct `svg` child of `CheckboxIndicator`, so the extra span and its `checkbox-indicator-checked-icon` and `checkbox-indicator-indeterminate-icon` slots are gone.
  The CSS Modules packages keep 8 `--moduix-checkbox-*` variables instead of 36: `bg`, `bg-checked`, `border-color`, `color`, `radius`, `gap`, `size`, and `icon-size`. `size` and `icon-size` replace the per-size `-xs`…`-xl` variables and apply to every size. Invalid, hover, focus-ring, transition, disabled, and label typography variables are removed in favor of foundation tokens, and `--moduix-checkbox-group-color` and `--moduix-checkbox-group-gap` are removed; set those with a class on the part. `CheckboxGroup` no longer sets a text color.
  `CheckboxRootProps`, `CheckboxRootProviderProps`, and `CheckboxSize` are exported from every package.

### Clipboard

- a1a461a: `ClipboardInput` and `ClipboardTrigger` no longer add their own styles under `asChild`, so a composed moduix `Input` or `Button` keeps its own padding, transitions, and press feedback. The default icons render as a direct `svg` child of `ClipboardIndicator`, so the extra span and its `clipboard-indicator-idle-icon` and `clipboard-indicator-copied-icon` slots are gone.
  The CSS Modules packages keep 9 `--moduix-clipboard-*` variables instead of 47: `gap`, `control-gap`, `height`, `radius`, `border-color`, `input-bg`, `trigger-bg`, `trigger-bg-hover`, and `icon-size`. `height`, `radius`, and `border-color` apply to the input and the trigger together. Width, color, label, value text, typography, padding, focus-ring, transition, read-only, and disabled variables are removed in favor of foundation tokens, along with the fallbacks to `--moduix-input-*` and `--moduix-button-*`; set those with a class on the part. Dead `data-disabled` styles are removed: Ark sets no such attribute on these parts, and native `disabled` keeps working.
  The input now uses the same 12px inline padding as `Input` (was 14px), and the default copy icon uses a 2.5 stroke so it matches the visual weight of the copied check icon.

### CloseButton

- a1a461a: A disabled button is blocked by one capture-phase handler, as in `Button`, so the extra `onClick` wrapper is gone and `onClick` reaches Ark unchanged (Solid bound `[handler, data]` pairs still work). `CloseButtonProps` is now exported from every package. Vue adapters take the default `Close` label from the shared `a11yLabels` like React and Solid.
  `--moduix-close-button-transition` is removed in favor of `--moduix-transition-default`, and the barely visible 0.94 press opacity is gone. Tailwind packages no longer duplicate the root icon sizing on the default `CloseIcon`.

### Collapsible

- a1a461a: `CollapsibleIndicator` inside a disabled trigger is no longer dimmed twice, and `CollapsibleBody` now has `data-scope="collapsible"` and `data-part="body"` in React and Solid, as in Vue. React and Solid also re-export the Ark Collapsible prop and hook types.
  The CSS Modules packages keep 9 of the 29 `--moduix-collapsible-*` variables (trigger gap, padding and font size, indicator size, content color and font size, body gap and padding) and use the shared foundation keyframes. The removed root width and color, trigger color, background, radius and line-height, focus ring, disabled opacity, transition, indicator rotation and content opacity variables now use foundation tokens; override them with a class on the part. The trigger inherits the root color and has no hover background hook; use `asChild` with your own button for a boxed trigger.

### ColorPicker

- a1a461a: `ColorPickerSwatch` and `ColorPickerValueSwatch` now draw their own checkerboard under translucent colors, so `ColorPickerTrigger` renders only the value swatch by default and you no longer need a `ColorPickerTransparencyGrid` wrapper next to a value swatch. A `ColorPickerSwatchIndicator` composed inside your own `ColorPickerSwatch` now appears for the selected color in the Tailwind packages. Default children of `ColorPickerTrigger`, `ColorPickerArea`, `ColorPickerChannelSlider`, and `ColorPickerSwatchTrigger` are now the exported moduix parts. React and Solid re-export the Ark Color Picker types, as Vue already did, and the Tailwind packages no longer need `class-variance-authority` for this component.
  The CSS Modules packages keep 8 of the 89 `--moduix-color-picker-*` variables (`width`, `radius`, `trigger-size`, `content-width`, `area-height`, `thumb-size`, `channel-slider-height`, `swatch-size`). Colors, spacing, typography, focus rings, disabled opacity, and motion now come from foundation tokens; override them with a class on the part. Popup motion still follows `--moduix-popup-motion-*`. Both styling tracks now share one look for thumb focus (outer ring), the color area border, the swatch focus outline, and hover on touch screens.

### Combobox

- a1a461a: A `ComboboxClearTrigger` rendered without `ComboboxTrigger` now sits at the inline end instead of leaving an empty gap, and the input reserves room for one action instead of two. `ComboboxTrigger` and `ComboboxClearTrigger` share the library focus ring. Items no longer compute their width, so absolutely positioned virtual rows fit the list. React and Solid re-export the Ark Combobox prop and detail types, plus `ComboboxRootProps`, `ComboboxRootProviderProps`, and `ComboboxOptionProps`; Vue adds the detail types.
  The CSS Modules packages keep 5 of the 71 `--moduix-combobox-*` variables (`width`, `radius`, `control-height`, `action-size`, `content-max-height`). Colors, spacing, typography, focus rings, disabled opacity, and motion now come from foundation tokens; override them with a class on the part. Popup motion still follows `--moduix-popup-motion-*`. The input space for the actions now follows `--moduix-combobox-action-size`.
  Disabled items now dim once, through the shared disabled opacity, and keep their regular text color instead of also switching to the muted foreground color.

### CommandPalette

- a1a461a: Items without `CommandPaletteItemIcon` no longer let a long label run under `CommandPaletteItemMeta`; items are a flex row where the text takes the free space and the meta and indicator sit at the end. `CommandPalette` is now the Ark Dialog root with an internal shortcut listener, so every presence prop reaches Ark (Solid used to drop `immediate`; Vue declared `present`, `immediate`, and `skipAnimationOnMount`, which Ark Vue does not support, and they are removed). Reduced motion now shortens the backdrop and content animations even when `--moduix-popup-motion-duration` is customized. Highlighted items use `accent-foreground`, and the Tailwind clear trigger uses the `CloseButton` focus ring.
  Removed `CommandPaletteBody`: `CommandPalettePanel` renders the content directly, and the combobox already fills it. `CommandPaletteTrigger` is unstyled like `DialogTrigger`; compose it with `asChild` and `Button`. The content has a plain popover background and border. The CSS Modules packages keep 2 of the 133 `--moduix-command-palette-*` variables (`width`, `max-height`); colors, spacing, typography, and motion come from foundation tokens, the shared `--moduix-backdrop-*` and `--moduix-popup-motion-*` variables, or a class on the part.
  `CommandPaletteRootProvider` accepts `shortcut` like `CommandPalette`. `CommandPaletteSearch` shows a decorative search icon before the input. `CommandPaletteRootProps` and `CommandPaletteRootProviderProps` are exported.

### Container

- a1a461a: Tailwind gutters now follow the spacing tokens like CSS Modules, so presets such as `dense` change them in both styling tracks. The Tailwind variants drop 15 compound size and gutter classes in favor of two private custom properties; the rendered widths are unchanged.
  Export the `ContainerRootProps`, `ContainerSize`, and `ContainerGutter` types.

### DateInput

- a1a461a: The root is now sized to its content (like `NumberInput`) instead of stretching to `100%`; set `--moduix-date-input-width: 100%` or add `w-full` to stretch it in a form. A disabled date input inside a disabled `Field` or `Fieldset` is no longer dimmed twice, and in Tailwind a focused placeholder segment now uses the foreground color like CSS Modules. The control sets its own font size and line height to match `Input`.
  CSS Modules keep three variables: `--moduix-date-input-width`, `--moduix-date-input-control-height`, and `--moduix-date-input-radius`; the other 30 are removed, override colors and spacing with a plain class instead. `DateInputSeparator` no longer adds `role="presentation"` (it stays `aria-hidden`). React and Solid now re-export the Ark DateInput part props, callback details, and hook types.

### DatePicker

- a1a461a: New `DatePickerMonthTable` and `DatePickerYearTable` render the standard month and year views with the same optional header as `DatePickerDayTable`. `DatePickerDayTable` now reads week numbers from the root `showWeekNumbers` prop (its own `showWeekNumbers` prop is removed) and takes `offset` as a number of months, so a second visible month is `<DatePickerDayTable offset={1} />`.
  Today's date is now marked with a visible ring-colored border. Disabled days, the calendar trigger of a disabled picker, and a disabled picker inside a disabled `Field` or `Fieldset` are no longer dimmed twice; read-only pickers are no longer dimmed. Day cells show the focus ring only on keyboard focus.
  CSS Modules keep five variables: `--moduix-date-picker-width`, `--moduix-date-picker-control-height`, `--moduix-date-picker-radius`, `--moduix-date-picker-content-width`, and `--moduix-date-picker-table-cell-size`; the other 113 are removed, override colors and spacing with a plain class instead. Month and year selects no longer style the `multiple` / `size` list mode. All adapters now re-export the Ark DatePicker callback details, `DateValue`, and hook types.

### Dialog

- a1a461a: CSS Modules keep one variable, `--moduix-dialog-width`; the other 44 `--moduix-dialog-*` variables are removed. Colors, borders, spacing, and typography come from foundation tokens, so override them with a plain class on the part. The backdrop reads the shared `--moduix-backdrop-bg` and `--moduix-backdrop-filter`, and content motion reads the shared `--moduix-popup-motion-*` variables, which also work as a local exception when set on `DialogContent`.
  `DialogHeader` is now a simple vertical stack; it no longer places a `DialogCloseTrigger` in a second column. The Tailwind `DialogCloseIcon` now uses the same focus ring as `CloseButton` and the CSS Modules variant. Vue now exports `DialogRootProps`, `DialogRootProviderProps`, and `DialogContentProps` with the moduix props (`portalled`, `portalRef`, `size`, `placement`, `scrollBehavior`) instead of the bare Ark types, as React and Solid do.

### Drawer

- a1a461a: CSS Modules keep one variable, `--moduix-drawer-island-inset`; the other 70 `--moduix-drawer-*` variables are removed. Colors, borders, spacing, radius, and typography come from foundation tokens, so override them with a plain class on the part (for example `max-height` on `DrawerContent`). The backdrop reads the shared `--moduix-backdrop-bg` and `--moduix-backdrop-filter`.
  `variant="island"` now lives only on `DrawerContent`; the `Drawer` root no longer accepts `variant`, and Ark's default full snap point already gives an island the same behavior. `DrawerTrigger` and `DrawerCloseTrigger` are unstyled, like the Dialog triggers, so compose them with `asChild` and a `Button`. `DrawerBody` inherits the content color instead of the muted description color, and `DrawerFooter` wraps its actions on narrow screens. In the Tailwind packages, side drawers and `DrawerSwipeArea` keep the right corners and edges in RTL, drawer motion follows the foundation easing tokens, and `DrawerCloseIcon` uses the same focus ring as `CloseButton`. React and Solid now export `DrawerRootProps`, `DrawerRootProviderProps`, `DrawerContentProps`, and `DrawerVariant`; Vue exports the moduix component props under the same names.
  `DrawerContent` accepts `size` (`sm`, `md`, `lg`, `xl`; default `md`) that sets the width of `start` and `end` drawers to 18rem, 22rem, 28rem, or 36rem, still capped at `100vw - 2rem`. It is mirrored as `data-size`. Top and bottom drawers are unchanged. The `DrawerSize` type is exported.

### Editable

- a1a461a: The root now fills its container, so entering edit mode no longer changes its width; with `autoResize` it still follows the text width. Long values wrap inside the area, the preview keeps line breaks, and controls are top-aligned, so textarea compositions need no extra styles. A disabled editable is dimmed once (triggers no longer dim again, and the root no longer dims inside a disabled `Field` or `Fieldset`). Edit, submit, and cancel triggers drop their square styling under `asChild`, so a composed `Button` keeps its own look. Keyboard focus on the preview now shows the focus ring.
  CSS Modules keep one variable, `--moduix-editable-area-height` (area height and trigger size); the other 42 are removed, override colors, spacing, and radius with a plain class instead. React and Solid now re-export the Ark Editable part props, callback details, and hook types.

### Field

- a1a461a: `FieldInput`, `FieldTextarea`, and `FieldSelect` are removed. They were styled copies of `Input`, `Textarea`, and `NativeSelect`, which already read the field context, so put those inside `Field` instead (`FieldInput size` becomes `Input htmlSize`). In Solid this also removes the `defaultValue` shim that only those parts carried.
  CSS Modules drop all 38 `--moduix-field-*` variables; styles come from foundation tokens, so override them with a plain class on the part. TagsInput and PasswordInput no longer fall back to `--moduix-field-*` variables. React, Solid, and Vue now re-export the Ark Field part props, context, and hook types.

### Fieldset

- a1a461a: CSS Modules drop all 22 `--moduix-fieldset-*` variables; styles come from foundation tokens, so override them with a plain class on the part. The invalid root border is removed in every adapter: it had zero width by default and never showed, so show group errors with `FieldsetErrorText`. Tailwind roots lose the no-op `max-w-none` and `border-transparent` classes, and the legend drops `inline-block`. React and Solid now re-export the Ark Fieldset part props, context, and hook types, as Vue already did.

### FileUpload

- a1a461a: `FileUploadTrigger` and `FileUploadClearTrigger` are unstyled, like the Dialog and Drawer triggers, so compose them with `asChild` and a `Button`. The clear trigger no longer renders a `CloseButton` or a default `Clear files` label. `FileUploadItems` no longer passes a hard-coded `Remove <name>` label to the delete button, so Ark `translations.deleteFile` names it (`delete file <name>` by default). The root fills its container instead of stopping at 28rem; set `max-width` with a class to limit it. A disabled upload dims the label, dropzone, and items once: the delete button inside an item no longer dims again, and nothing dims again inside a disabled `Field` or `Fieldset`. Items lay out through the named grid areas `preview`, `name`, `meta`, and `delete`, and delete buttons use the foundation focus ring.
  CSS Modules drop all 82 `--moduix-file-upload-*` variables; styles come from foundation tokens, so override them with a plain class on the part. React and Solid now re-export the Ark FileUpload part props, callback details, and hook types.

### FloatingPanel

- a1a461a: CSS Modules drop all 70 `--moduix-floating-panel-*` variables; styles come from foundation tokens, so override them with a plain class on the part. Content motion still reads the shared `--moduix-popup-motion-*` variables.
  `FloatingPanelTrigger` is unstyled, like the Dialog and Drawer triggers, so compose it with `asChild` and a `Button`. `FloatingPanelContent` no longer sets a CSS minimum size, which made the panel larger than its Ark size and moved resize handles away from the pointer; use `minSize` on the root instead. Styles that Ark already overrides inline (positioner z-index, resize-handle offsets, `transform-origin`, the minimized body) are removed. `FloatingPanelCloseIcon` now has the same hover as the stage buttons, and CSS Modules control buttons get the pressed state Tailwind already had. React and Solid now re-export the Ark Floating Panel prop, detail, context, and hook types; Vue exports the moduix `FloatingPanelRootProps` and `FloatingPanelRootProviderProps` with `portalled` and `portalRef`.

### Heading

- a1a461a: CSS Modules drop all 23 `--moduix-heading-*` variables; styles come from foundation typography tokens, so override them with a plain class on `Heading`.
  The default size now always comes from `as` (`h1` → `2xl` through `h6` → `xs`) and `data-size` is always present. Before, CSS Modules read it from the rendered element and Tailwind from `as`, so an `asChild` heading without `size` differed between packages; with `asChild`, pass `size` to match the child.
  Export the `HeadingRootProps`, `HeadingElement`, `HeadingSize`, and `HeadingWeight` types.

### HoverCard

- a1a461a: CSS Modules drop all 36 `--moduix-hover-card-*` variables; styles come from foundation tokens, so override them with a plain class on the part. Content motion now uses the shared `moduix-popup-in` and `moduix-popup-out` keyframes with the same 200ms ease-in-out default as the Tailwind packages and the other popups, and reads only the shared `--moduix-popup-motion-*` variables.
  `HoverCardBody` now scrolls by itself instead of through a selector on `HoverCardContent`. The trigger underline follows `currentColor`, so a `color` class recolors it too, and the unreachable `data-disabled` trigger style is removed: Ark never sets it, and a disabled root only stops the card from opening. React and Solid now re-export the Ark Hover Card part prop, event, detail, and hook types; Vue exports the moduix `HoverCardRootProps` and `HoverCardRootProviderProps` with `portalled` and `portalRef`, plus `HoverCardArrowTipProps` and `HoverCardContextProps`.

### Image

- a1a461a: URLs without a supported CDN or `fallback` now go through Unpic's base transform. Unpic-only props such as `layout`, `priority`, `background`, and `aspectRatio` no longer reach the `<img>` as invalid attributes (React logged warnings for them), and the `layout` styles now apply to local images too, so `layout="fixed"` keeps its exact size and `constrained` caps the width. The loading, decoding, and fetch-priority defaults are unchanged and now come from Unpic instead of hand-written defaults in each adapter.
  The Solid CSS Modules adapter renders native hosts with `@unpic/core` like the Solid Tailwind adapter and no longer depends on `@unpic/solid`; every package now depends on `unpic` for CDN detection. Vue `Image` and `ImageSource` no longer re-expose `$el`, which Vue already provides for the single root element. All adapters now export the `ImageRootProps` and `ImageSourceProps` types.

### ImageCropper

- a1a461a: Images no longer stretch to the viewport. Ark forces `object-fit: fill`, so an image whose ratio differed from the viewport was distorted and an `aspectRatio` crop did not keep that ratio in the natural image; the image now keeps its own ratio, shrinks to fit, and stays centered over the checkerboard. The viewport keeps an 8:5 ratio of its own width instead of a `vw`-based height, so it no longer grows taller than wide in a narrow container.
  CSS Modules drop all 33 `--moduix-image-cropper-*` variables; styles come from foundation tokens, so override them with a class on the part. The checkerboard uses the `muted` and `background` tokens in every package, so it stays visible in dark themes in the Tailwind packages too. The selection focus ring is the foundation outline, handles lose their invisible border and unused transitions, and rules that repeated Ark inline styles are removed.
  `ImageCropperCropArea` no longer strips `asChild` and `children` at runtime; its types still omit them. Vue `ImageCropper` forwards Ark props and emits through attrs like the other roots. All adapters export `ImageCropperCropAreaProps`; React and Solid re-export the Ark part prop, detail, and hook types, and Vue drops the `*BaseProps` type re-exports.

### Input

- a1a461a: The input now has `min-width: 0` (`min-w-0` in Tailwind), so an input with `htmlSize` shrinks in a narrow flex row instead of overflowing it. CSS Modules keep three variables, `--moduix-input-width`, `--moduix-input-height`, and `--moduix-input-radius`; the other 44 `--moduix-input-*` variables, including the per-size `-xs`…`-xl` ones, are removed. Colors, padding, typography, focus ring, transition, and disabled opacity come from foundation tokens, so override them with a plain class on `Input`. `--moduix-input-height` now applies to every size instead of only `md`. The no-op read-only rules and the file-button reads of `--moduix-button-*` variables are gone; default visuals are unchanged.
  The `data-html-size` attribute is removed: with `htmlSize` the native `size` attribute is rendered and CSS Modules select `[size]` for the `auto` width. Tailwind drops the redundant `max-w-none`.
  TagsInput and PasswordInput no longer fall back to `--moduix-input-*` variables, and Vue `InputGroupInput` no longer overrides them; `InputGroup` now removes the Input border, background, and height with a more specific selector in every CSS Modules package, so it no longer depends on stylesheet order. `InputGroupButton` no longer makes the group taller: it kept the Button `min-height` inside the group border, so a group with a button was 2px taller than one without. The grouped-button `padding-inline`, `font-size`, `line-height`, and `color` rules always lost to Button and are removed together with the `--moduix-input-group-button-color` variable; the button keeps its Button size and variant styles as before. Every package exports `InputRootProps` and `InputSize`; Vue drops the `FieldInputProps` re-export, import it from `@ark-ui/vue/field` instead.

### InputGroup

- a1a461a: CSS Modules keep three variables, `--moduix-input-group-width`, `--moduix-input-group-height`, and `--moduix-input-group-radius`; the other 57 `--moduix-input-group-*` variables, including the per-size `-xs`…`-xl` ones, are removed. Colors, padding, typography, focus ring, and separators come from foundation tokens, so override them with a plain class on the part. `--moduix-input-group-height` now applies to every size instead of only `md`. The read-only rule that repeated the default colors is gone; default visuals are unchanged.
  A local `size` on `InputGroupInput` now sets its font size and inline padding in CSS Modules too, as it already did in Tailwind; before, the group size always won. Addon and text inherit the group font size from the root. Addon and text drop the `text-overflow: ellipsis` (`truncate` in Tailwind) that never rendered on their inline-flex box; long content still clips.
  Tailwind InputGroup in React and Solid imports `cn` from `@/lib/moduix/cn`, so components installed from the registry resolve it. Tailwind drops the no-op `max-w-none` and `basis-auto` classes and builds the clear trigger `xs` size from `data-size`. React and Solid export the `InputGroupSize` type, as Vue already did.
  add `InputGroupTextarea` for multi-line input, such as a message composer. It renders `Textarea` without its border, background, focus outline, or resize handle, takes the group font size and inline padding, and drives the group invalid and disabled styles.
  `InputGroupAddon` and `InputGroupText` accept `align="inline" | "block"` (default `inline`, mirrored as `data-align`). A block addon is a full-width row above or below the control, placed by DOM order, and switches the group to a column. Use a regular `Button` inside a block addon. New type: `InputGroupAddonAlign`.

### JsonTreeView

- a1a461a: The branch indicator stays on the first line when a long preview wraps; before, it was centered on the whole row.
  Branch content now opens and closes with the shared `moduix-collapsible-content-*` keyframes and `--moduix-transition-default`, like TreeView; reduced motion turns the animation off.
  Rows no longer set `user-select: none`, so inspected keys and values can be selected and copied.
  The Tailwind packages take the row line height and indentation from foundation tokens instead of fixed `leading-4`, `rem` values, and `min-h-5`, so presets such as `dense` apply to them like in the CSS Modules packages. The focus ring in the CSS Modules packages uses `--moduix-focus-ring-inset-width`, like other components.
  Removed dead disabled styles (Ark's JSON tree has no disabled root or nodes) and no-op resets on the generated rows.

### Kbd

- a1a461a: CSS Modules keep eight `--moduix-kbd-*` variables (`bg`, `border-color`, `border-width`, `color`, `height`, `padding-x`, `radius`, `shadow`) and drop `font-family`, `font-size`, `font-weight`, `line-height`, `min-width`, `padding-y`, `group-gap`, and `group-separator-color`; typography and `KbdGroup` styles come from foundation tokens, so override them with a class. The minimum width always follows `--moduix-kbd-height`.
  The keycap edge shadow now follows the text color in CSS Modules, as it already did in Tailwind, so recoloring a key also tints its edge. `KbdGroup` drops no-op resets for padding, border, background, shadow, and font in every package.
  A keycap now keeps its label on one line instead of breaking it inside a word in narrow containers; `KbdGroup` still wraps between keycaps. A direct `svg` child is sized to 12px with a 4px gap to the label, matching the keycap text; a size class on the icon overrides it.

### Lightbox

- a1a461a: CSS Modules keep two `--moduix-lightbox-*` variables, `content-max-width` and `content-max-height`, and drop the other 61; both now cap `LightboxImage` too, so one override on `LightboxContent` resizes the media. Colors, spacing, typography, and gallery sizing come from foundation tokens, so override them with a class on the part. The backdrop uses the Dialog backdrop motion and reads the shared `--moduix-backdrop-bg` and `--moduix-backdrop-filter`; content motion reads only the shared `--moduix-popup-motion-*` variables with the popup default of 200ms ease-in-out instead of 220ms ease, and exits keep their last frame until unmount. The `moduix-lightbox-backdrop-*` keyframes and `animate-moduix-lightbox-backdrop-*` utilities are removed.
  `LightboxCloseIcon` no longer sets `data-state` and fades together with the content; the Tailwind variant reuses the `CloseButton` focus ring. Gallery thumbnail hover applies only on hover-capable pointers, and the Tailwind and CSS Modules galleries now share the same 12px slide gap and track color. All adapters export `LightboxContext` and the `LightboxRootProps` and `LightboxRootProviderProps` types with `portalled` and `portalRef`, plus `LightboxImageProps`; Vue `LightboxCloseTrigger` declares `asChild`.

### List

- a1a461a: CSS Modules drop all 31 `--moduix-list-*` variables; styles come from foundation tokens, so override them with a class on `List` and style markers with `li::marker`.
  The default `marker` now comes from `as` (`ul` → `disc`, `ol` → `decimal`) and `data-marker` always holds the resolved value; the `auto` value is gone. Before, CSS Modules read the marker from the rendered element and Tailwind from `as`, so an `asChild` ordered list without `marker` showed numbers in one package and discs in the other; with `asChild`, pass `marker` to match the child. The native `type` attribute of `ol` never changed the markers and is no longer documented as doing so; set `list-style-type` with a class instead.
  A list nested directly in an item now starts one gap below the item text. New `ListIndicator` part renders an icon instead of the native marker: use it with `marker="none"`, and its item becomes a flex row so long text wraps beside the icon.
  Tailwind variants set the gap through a private `--_list-gap` property instead of `gap-space-*` (same values). Export the `ListRootProps`, `ListElement`, `ListMarker`, `ListGap`, `ListSize`, and `ListTone` types.
  Remove `tone="subtle"`, matching `Text`. It used the secondary-foreground color, which matches `default` in dark mode and is barely distinguishable in light mode. Use `muted` for secondary content or a class for a custom color.

### Listbox

- a1a461a: The CSS Modules packages keep 2 of the 87 `--moduix-listbox-*` variables, `width` and `content-max-height`. Colors, spacing, typography, focus rings, disabled opacity, the grid and horizontal layout values, and the variables forwarded to `CloseButton` now come from foundation tokens; override them with a class on the part. Items, group labels, and list padding still follow the shared `--moduix-popup-*` variables.
  The Tailwind filter input now reserves the same 44px for `ListboxClearTrigger` as CSS Modules instead of 40px, and Tailwind `ListboxContent` no longer contains overscroll, so page scrolling chains past the list in every package. `ListboxClearTrigger` keeps the `CloseButton` colors, hover, and icon and only sets its size and position. React and Solid re-export the Ark Listbox part props, callback details, and hook types.
  Disabled items now dim once, through the shared disabled opacity, and keep their regular text color instead of also switching to the muted foreground color.

### Marquee

- a1a461a: The CSS Modules packages keep 2 of the 7 `--moduix-marquee-*` variables, `edge-color` and `edge-size`, and drop `width`, `height`, `vertical-height`, `color`, and `edge-z-index`; set the size with a class instead. The `--marquee-edge-color` and `--marquee-edge-size` aliases are removed, so use the `--moduix-marquee-edge-*` variables. A vertical marquee is still `15rem` tall by default.
  The root no longer sets a text color and inherits it from its parent in every package. Styles that Ark already applies inline are no longer repeated: root `position` and `overflow`, viewport size, and edge `pointer-events`; `MarqueeViewport` has no moduix styles or Tailwind classes. CSS Modules now use the shared foundation `moduix-marquee-x` and `moduix-marquee-y` keyframes, as Tailwind already did.
  `prefers-reduced-motion: reduce` now also stops vertical marquees in the CSS Modules packages; before, the vertical animation overrode the reset. React and Solid re-export the Ark Marquee part props, pause details, side, and hook types, as Vue already did, and Vue Tailwind `Marquee` declares its emits like the CSS Modules package.

### Menu

- a1a461a: The CSS Modules packages keep 3 of the 93 `--moduix-menu-*` variables, `popup-min-width`, `popup-max-width`, and `popup-max-height`. Colors, spacing, typography, radius, shadow, the arrow, and the checkbox indicator decoration now come from foundation tokens; override them with a class on the part. Items, check rows, highlight, separators, group labels, and the list padding still follow the shared `--moduix-popup-*` variables, and content motion now uses the shared `moduix-popup-in` and `moduix-popup-out` keyframes with `--moduix-popup-motion-*`, keeping its last frame until unmount as the other popups do.
  `MenuTrigger` and `MenuContextTrigger` are unstyled in every package, like the Dialog and Drawer triggers; compose the trigger with `asChild` and `Button`, and style a context area with a class. `MenuTriggerIcon` is removed; use `MenuIndicator`, which renders the same chevron and also carries the open state. A disabled `tone="destructive"` item is now muted in the CSS Modules packages too instead of staying red, and a trigger item with an open submenu uses the accent text color with its accent background.
  React and Solid export `MenuRootProps`, `MenuRootProviderProps`, `MenuItemProps`, `MenuCheckboxItemProps`, `MenuRadioItemProps`, `MenuIndicatorPosition`, `MenuItemTone`, and the Ark Menu part prop, detail, and hook types. Vue exports the same moduix types from its components instead of the bare Ark ones, plus the Vue emits types, and no longer re-exports the Ark `*BaseProps` types.

### NavigationMenu

- a1a461a: The CSS Modules packages keep 5 of the 56 `--moduix-navigation-menu-*` variables, `content-min-width`, `content-max-width`, `content-max-height`, `viewport-max-width`, and `viewport-max-height`. Colors, spacing, typography, radius, shadow, focus ring, the indicator, the arrow, and z-index now come from foundation tokens; override them with a class on the part. Content and viewport motion use the shared `moduix-popup-in` and `moduix-popup-out` keyframes with `--moduix-popup-motion-*`, and the directional viewport content motion uses the foundation `moduix-navigation-menu-content-*` keyframes, so the `--moduix-navigation-menu-content-*` motion family and `--moduix-navigation-menu-viewport-motion-distance` are removed. In the Tailwind packages the `animate-moduix-navigation-menu-content-*` utilities now read `--moduix-popup-motion-duration` and `--moduix-popup-motion-easing` like the CSS Modules packages.
  The indicator and the horizontal viewport positioner now stay under the open trigger in right-to-left layouts: Ark measures `--trigger-x` and `--viewport-x` from the left edge, so both now use physical `left` placement (the Tailwind indicator and every viewport positioner used the inline start before). The Tailwind indicator now fades out with the viewport instead of disappearing at once, and the CSS Modules focus ring no longer sits 2px away from the control, matching Tailwind.
  React and Solid export the Ark Navigation Menu part prop, value-change detail, and hook types, as Vue already did.

### NumberInput

- a1a461a: `NumberInput` and `NumberInputRootProvider` accept `size` (`xs`, `sm`, `md`, `lg`, `xl`; default `md`), mirrored as `data-size`. It sets the control height, input padding and text size the same way as `Input`, and the trigger icon size; `--moduix-number-input-control-height` still overrides the height for every size. Every package exports `NumberInputSize`, and `NumberInputRootProps` / `NumberInputRootProviderProps` now include `size` (Vue exports the moduix props under these names instead of the Ark ones).
  A disabled number input inside a disabled `Field` or `Fieldset` is no longer dimmed twice; the root keeps full opacity there, as `Input` and `DateInput` do. A trigger that Ark disables at the `min` or `max` value or in read-only mode now shows a muted icon instead of looking clickable.
  CSS Modules keep three variables, `--moduix-number-input-control-height`, `--moduix-number-input-input-width`, and `--moduix-number-input-radius`; the other 30 `--moduix-number-input-*` variables are removed. Colors, borders, focus ring, typography, spacing, and disabled opacity come from foundation tokens, so override them with a plain class on the part. The invalid focus ring is now destructive on the triggers as well as the input, matching the Tailwind packages. Dead `opacity` transitions are removed; default visuals are otherwise unchanged.
  Tailwind drops the no-op `w-auto`, `max-w-none`, and `items-stretch` utilities and the duplicate `data-invalid:` input classes, and uses `shrink-0` instead of `min-w-control-md` on the triggers. Solid Tailwind no longer splits `value` out of the root props only to pass it back. Vue `NumberInputInput` no longer declares a default slot on the void `<input>`. React and Solid now re-export the Ark `NumberInput*` part, details, and hook types, like Vue.

### Pagination

- a1a461a: The CSS Modules packages keep one of the 23 `--moduix-pagination-*` variables, `--moduix-pagination-item-size`, which sets the shared size of page items, ellipses, and triggers. Colors, borders, radius, typography, spacing, focus ring, icon size, and disabled opacity now come from foundation tokens; override them with a class on the part, and target `[data-selected]` on `PaginationItem` for the current page. Triggers with custom content use a plain 12px inline padding instead of clamping `--moduix-pagination-item-padding-inline` with `max()`. Default visuals are unchanged.
  Default-icon triggers drop only their inline padding and keep the square shape through the existing minimum width, so the Tailwind packages use `px-0` instead of `w-control-md p-0`; the edge icon wrapper and the selected-item hover rule lose declarations that had no effect. An icon trigger is now detected by `children == null` only, and Solid reads the resolved children for it instead of the raw prop. Solid `Pagination` and `PaginationRootProvider` no longer split `children` out of the props only to pass them back.
  React and Solid now re-export the Ark Pagination part prop, detail, and hook types (`PaginationRootProps`, `PaginationItemProps`, `PaginationPageChangeDetails`, `UsePaginationReturn`, and the rest), like Vue.
  `PaginationEllipsis` now shows the same horizontal ellipsis icon as `BreadcrumbsEllipsis` instead of the `...` text, sized like the trigger icons; pass children to keep custom content. The ellipsis is always `aria-hidden="true"`, as in Breadcrumbs, so screen readers no longer read "dot dot dot" between page buttons whose labels already announce every page number.

### PasswordInput

- a1a461a: `PasswordInput` and `PasswordInputRootProvider` accept `size` (`xs`, `sm`, `md`, `lg`, `xl`; default `md`), mirrored as `data-size`. It sets the control height, input padding and text size the same way as `Input`, and scales the visibility trigger and icon; `--moduix-password-input-height` still overrides the height for every size. Every package exports `PasswordInputSize`, `PasswordInputRootProps`, and `PasswordInputRootProviderProps` (Vue exports the moduix props under these names instead of the Ark ones), and React and Solid now re-export the Ark part, details, and hook types, like Vue.
  A disabled password input inside a disabled `Field` or `Fieldset` is no longer dimmed twice; the root keeps full opacity there, as `Input` and `NumberInput` do.
  CSS Modules keep three variables, `--moduix-password-input-width`, `--moduix-password-input-height`, and `--moduix-password-input-radius`; the other 30 `--moduix-password-input-*` variables are removed, including `--moduix-password-input-max-width` and the fallback to `--moduix-button-icon-size`. Colors, borders, focus ring, typography, spacing, and disabled opacity come from foundation tokens, so override them with a plain class on the part. The no-op read-only, disabled-input, and `opacity` transition rules are gone; default visuals at `md` are unchanged.
  Tailwind drops the no-op `max-w-none`, `w-full` (control), `min-h-0`, `min-w-control-sm`, `data-readonly:*`, and `disabled:*` utilities, and the control uses the logical `pe-2` instead of `pr-2`, so the trigger keeps its inset in RTL. Vue `PasswordInputContext` reads the Ark context directly instead of passing a placeholder `value` to the Ark component, and the empty `PasswordInputContextProps` type is no longer exported from Vue.

### PinInput

- a1a461a: `PinInput` and `PinInputRootProvider` accept `size` (`xs`, `sm`, `md`, `lg`, `xl`; default `md`), mirrored as `data-size`. It sets the square cell size to the control height scale (24–48px) and scales the cell text; `--moduix-pin-input-input-size` still overrides the cell size for every size. Every package exports `PinInputSize`, `PinInputRootProps`, and `PinInputRootProviderProps` (Vue exports the moduix props under these names instead of the Ark ones and drops the `PinInputEmits` alias of `PinInputRootEmits`), and React and Solid now re-export the Ark part, details, and hook types, like Vue.
  A disabled pin input inside a disabled `Field` or `Fieldset` is no longer dimmed twice; the root keeps full opacity there, as `Input`, `NumberInput`, and `PasswordInput` do.
  CSS Modules keep three variables, `--moduix-pin-input-input-size`, `--moduix-pin-input-gap`, and `--moduix-pin-input-radius`; the other 30 `--moduix-pin-input-*` variables are removed, including `--moduix-pin-input-input-width`/`-height`, `--moduix-pin-input-width`/`-max-width`, `--moduix-pin-input-root-gap`, and the separator and label variables. Colors, borders, focus ring, typography, and disabled opacity come from foundation tokens, so override them with a plain class on the part. The no-op complete-state border, disabled `pointer-events`, and `background-color` transition rules are gone; default visuals at `md` are unchanged.
  Tailwind drops the no-op `w-auto`, `max-w-none`, `disabled:pointer-events-none`, `data-disabled:pointer-events-none`, and separator `items-center justify-center leading-none pointer-events-none` utilities, and uses `p-0` instead of `px-0 py-0`. `PinInputSeparator` no longer adds `role="presentation"` next to `aria-hidden`. React and Solid `PinInput` no longer split `count` (and Solid `children`) out of the props only to pass them back.

### Popover

- a1a461a: CSS Modules drop all 62 `--moduix-popover-*` variables, including the `--moduix-popover-content-*` motion family and `--moduix-popover-transition`. Colors, borders, spacing, sizes, and typography come from foundation tokens, so override them with a plain class on the part. Content motion now uses the shared `moduix-popup-in` and `moduix-popup-out` keyframes with the same 200ms ease-in-out default as the Tailwind packages, and reads only the shared `--moduix-popup-motion-*` variables, which also work as a local exception when set on `PopoverContent`.
  `PopoverBody` is now spaced from a preceding `PopoverHeader` instead of sitting flush against the description. In Vue, `Popover` now follows runtime changes to `portalled` and `modal`; before, it read them once at setup. The Tailwind `PopoverCloseIcon` now uses the same focus ring as `CloseButton` and the CSS Modules variant, and the trigger drops the unreachable `data-disabled` styles: Ark never sets that attribute on popover triggers, so only a native `disabled` trigger is dimmed. React and Solid now re-export the Ark Popover part prop, event, detail, and hook types; Vue exports the moduix `PopoverRootProps` and `PopoverRootProviderProps` with `portalled` and `portalRef` instead of the bare Ark types, and no longer re-exports the Ark `Popover*BaseProps` types.

### ProgressCircular

- a1a461a: Indeterminate progress now spins a quarter-circle arc instead of a dot-sized dash, and stays a visible static arc under reduced motion. CSS Modules keep only `--moduix-progress-circular-size`, `--moduix-progress-circular-thickness`, `--moduix-progress-circular-track-bg`, and `--moduix-progress-circular-range-bg`; the other 17 variables (root color, gap, and width, label and value text typography, range linecap and transition, and the indeterminate color, animation, and dash patterns) are removed, so override those styles with a class on the part. The root no longer forces `--moduix-color-foreground` and inherits the surrounding text color. `ProgressCircularView` is no longer styled with `display: contents`, which could show a hidden view when the reset stylesheet was not loaded. React and Solid now re-export the Ark Progress part prop, details, and hook types; Vue no longer re-exports the Ark `Progress*BaseProps` types.

### ProgressLinear

- a1a461a: The horizontal root now fills its container instead of defaulting to `12rem`, like Chakra UI and shadcn/ui; set `width` on the root to keep a fixed size. Indeterminate progress now sweeps right to left in RTL instead of reversing an animation that ended mid-track. In Tailwind, the vertical indeterminate range fills the track width instead of shrinking to 35%, and reduced motion stops the vertical animation too. CSS Modules keep only `--moduix-progress-linear-track-bg`, `--moduix-progress-linear-range-bg`, and the new `--moduix-progress-linear-track-size`, which replaces `--moduix-progress-linear-track-height` and `--moduix-progress-linear-track-width` and sets the bar thickness in both orientations. The other 22 variables (root color, gap, width, height, and vertical width, label and value text typography, track border and radius, range radius and transition, and the indeterminate color, width, and animations) are removed: set `width` or `height` on the root, or override the style with a class on the part. The root no longer forces `--moduix-color-foreground` and inherits the surrounding text color. `ProgressLinearView` is no longer styled with `display: contents`, which could show a hidden view when the reset stylesheet was not loaded. React and Solid now re-export the Ark Progress part prop, details, and hook types; Vue no longer re-exports the Ark `Progress*BaseProps` types.

### QrCode

- a1a461a: Fix `QrCodeOverlay` being centered on the whole root instead of the code when `QrCodeDownloadTrigger` or other content follows the frame. The root is now a one-column grid and the overlay sits in the frame's cell.
  `QrCodeOverlay` is now a square one third of the frame width, like Chakra UI, instead of a fixed `--moduix-size-lg` (40px). At the default 8rem size it grows to about 43px; on larger codes it scales with the code.
  The CSS Modules packages drop 27 `--moduix-qr-code-*` variables and keep only `--moduix-qr-code-size`. Set the module color with `fill` or `color` on `QrCodeFrame` (or the text color of a parent) instead of `--moduix-qr-code-fill`, and style the overlay and download trigger with a class. The root no longer forces the foreground text color; it inherits it.
  Remove no-op styles (`QrCodePattern` has no default class now) and the dead `data-disabled` download trigger styles.
  Export the Ark part, details, and hook types from React and Solid; Vue no longer exports the `*BaseProps` types and adds `QrCodeValueChangeDetails`.

### RadioGroup

- a1a461a: `size` moves from `RadioGroupItemControl` and `RadioGroupOption` to `RadioGroup` and `RadioGroupRootProvider` and sizes every control in the group, like `Checkbox` and Chakra UI. Replace `<RadioGroupOption size="sm">` on each option with `<RadioGroup size="sm">`. Types `RadioGroupRootProps`, `RadioGroupRootProviderProps`, and `RadioGroupSize` replace `RadioGroupItemControlProps` and `RadioGroupItemControlSize`.
  The control hover background now follows Ark `data-hover`, so it also appears while the item text is hovered. In the Tailwind packages a checked invalid control keeps the destructive border, as in the CSS Modules packages. In the CSS Modules packages a read-only item shows the default cursor, as in Tailwind.
  `RadioGroupIndicator` has `--moduix-radius-md` corners instead of a full pill and uses the moduix ease-in-out timing.
  The CSS Modules packages keep 7 `--moduix-radio-*` variables instead of 39: `bg`, `bg-checked` (now also the checked border), `border-color`, `gap`, `indicator-color`, `indicator-size`, and `size`. `size` and `indicator-size` replace the per-size `-xs`…`-xl` variables and apply to every size. Hover, invalid, focus-ring, transition, disabled, label typography, and all `--moduix-radio-group-*` variables are removed in favor of foundation tokens; set those with a class on the part.
  Remove no-op styles (`position: relative` that Ark sets inline, `outline: 0`, unused transitions) and the `text-inherit` utilities in Tailwind. Vue re-exports `RadioGroupContext`, `RadioGroupItemContext`, and `RadioGroupItemHiddenInput` from Ark directly instead of wrapping them.

### RatingGroup

- a1a461a: The filled default star now inherits the `RatingGroupItemIndicator` color, so a color class or `style` on the indicator recolors it. Previously the star kept the primary color.
  The CSS Modules packages keep 4 `--moduix-rating-group-*` variables instead of 18: `active-color`, `color`, `gap`, and `icon-size`. `icon-size` replaces the per-size `icon-size-xs`…`icon-size-xl` variables and applies to every size. The `root-gap`, `disabled-opacity`, `focus-ring-*`, `label-*`, and `transition` variables are removed in favor of foundation tokens; set those with a class on the part.
  The root no longer sets a muted text color that no part used. Remove no-op item styles (`line-height`, unused color and opacity transitions, `pointer-events: none` on disabled items that Ark already ignores), the stroke transition, the duplicated icon size utilities, and `motion-reduce:transition-none` in Tailwind, where the duration already comes from tokens.

### ScrollArea

- a1a461a: The root no longer sets a text color, so content inherits the color of its container, and the viewport inherits the root `border-radius` instead of a fixed medium radius. A rounded root now also rounds the clipped content and the focus ring.
  The prop types are renamed to `ScrollAreaRootProps` and `ScrollAreaRootProviderProps` (previously `ModuixScrollAreaRootProps` and `ModuixScrollAreaRootProviderProps`), and `ScrollAreaVariant` is exported. In Vue, `ScrollAreaRootProps` and `ScrollAreaRootProviderProps` now include `fade` and `variant` instead of being the bare Ark types.
  The CSS Modules packages keep 3 `--moduix-scroll-area-*` variables instead of 27: `fade-size`, `scrollbar-size`, and `thumb-bg`. The others are removed in favor of foundation tokens; set those with a class on the part.
  Remove styles that Ark already sets inline (positions, `touch-action`, `user-select`) and no-op styles on the content, corner, scrollbar track, and thumb. The scrollbar hover growth in CSS Modules now applies only on devices that support hover, as in Tailwind.

### SegmentGroup

- a1a461a: `SegmentGroup` and `useSegmentGroup` no longer inherit `disabled`, `invalid`, `readOnly`, and `required` from `Field` or `Fieldset`. Ark SegmentGroup does not read them either, and `RadioGroup` already works this way, so pass those props to the group itself.
  `SegmentGroupItemControl` is removed. It was a visual-only Ark radio control that moduix hid with `display: none`; `SegmentGroupItems` no longer renders it, so delete it from custom item trees.
  In the Tailwind packages the indicator no longer animates on the first render and on resize, and it follows `--moduix-duration-normal` (including reduced motion), as in the CSS Modules packages. Hovering a checked item no longer overrides a custom checked text color.
  The CSS Modules packages keep 5 `--moduix-segment-group-*` variables instead of 35: `bg`, `border-color`, `indicator-bg`, `item-color`, and `item-color-checked`. Set indicator motion with Ark `--transition-duration` and `--transition-timing-function` on `SegmentGroupIndicator`; other values come from foundation tokens.
  The indicator sits behind the items with `z-index: -1`, so the label, items, and item text no longer set `position` and `z-index`. Remove no-op styles and the `text-inherit` utility in Tailwind. Vue re-exports `SegmentGroupContext`, `SegmentGroupItemContext`, and `SegmentGroupItemHiddenInput` from Ark directly.
  New: `size` (`sm`, `md`, `lg`, default `md`) on `SegmentGroup` and `SegmentGroupRootProvider` makes the whole group as tall as a `Button` or `Input` of the same size. The default group is now 36px tall instead of 42px. `SegmentGroupItems` also accepts strings, so `items={['React', 'Vue']}` works like `{ value, label }` objects. Types `SegmentGroupRootProps`, `SegmentGroupRootProviderProps`, `SegmentGroupSize`, `SegmentGroupItemOption`, and `SegmentGroupItemsProps` are exported.

### Select

- a1a461a: Add `SelectOption`, a row helper like `ComboboxOption` that renders `SelectItem` with `SelectItemText` and `SelectItemIndicator`; pass `indicator={false}` to hide the check or a node to replace it.
  The CSS Modules packages keep 5 of the 67 `--moduix-select-*` variables (`width`, `radius`, `control-height`, `action-size`, `content-max-height`). Colors, borders, spacing, typography, focus rings, disabled opacity, and motion now come from foundation tokens; override them with a class on the part. Items, group labels, and list padding still follow the shared `--moduix-popup-*` variables, and content motion now uses the shared `moduix-popup-in` and `moduix-popup-out` keyframes with `--moduix-popup-motion-*` instead of `--moduix-select-transition` and `--moduix-select-content-closed-*`. The trigger space reserved for the clear action now follows `--moduix-select-action-size`. `NativeSelect` reads the same `width`, `radius`, `control-height`, and `action-size` variables and drops the others.
  In the Tailwind packages the indicator hover no longer sticks after a tap on touch devices, and `SelectClearTrigger` keeps the `CloseButton` focus ring as in the CSS Modules packages. Items no longer compute their width, and dead styles are removed in every package. React and Solid re-export the Ark Select part prop, detail, and hook types, plus `SelectRootProps`, `SelectRootProviderProps`, `SelectFieldProps`, and `SelectOptionProps`. Vue re-exports Ark `SelectHiddenSelect` directly.
  the trigger reserves room for the clear action only while a clear trigger is visible. A selected value without `clearLabel` (or without `SelectClearTrigger`) no longer loses 22px of text space, so short values fit in narrow selects instead of being cut to an ellipsis.
  Disabled items now dim once, through the shared disabled opacity, and keep their regular text color instead of also switching to the muted foreground color. `--moduix-select-item-disabled-color` is removed from the CSS Modules packages; set a disabled item color with a class on the part if you need one.

### Separator

- a1a461a: CSS Modules drop 7 of 9 `--moduix-separator-*` variables: `border-style`, `length-horizontal`, `length-vertical`, and `thickness-xs` through `thickness-lg`. Keep `--moduix-separator-color` and `--moduix-separator-thickness`; to theme one size, set the thickness on `[data-slot='separator-root'][data-size='<size>']`, and change the length or border style with a plain class. Default visuals are unchanged.
  Export the `SeparatorRootProps`, `SeparatorOrientation`, `SeparatorSize`, and `SeparatorVariant` types.

### Shared styles

- a1a461a: Motion, reduced motion, and base styles now work the same way in every component.

  - Popup content now shares one pair of foundation keyframes, `moduix-popup-in` and `moduix-popup-out`, which read the `--moduix-popup-motion-*` variables. In the Tailwind packages, Popover, Menu, Select, Combobox, Date Picker, Color Picker, Tooltip, Hover Card, Navigation Menu, Tour, Floating Panel, and Dialog use the new `animate-moduix-popup-in` and `animate-moduix-popup-out` utilities, so the shared popup motion variables now apply there as documented. Content scales with the `scale` property instead of `transform`, and the exit keeps its last frame until unmount. The `animate-moduix-menu-open`, `animate-moduix-menu-closed`, `animate-moduix-dialog-content-in`, and `animate-moduix-dialog-content-out` utilities and their keyframes are removed. In the CSS Modules packages, Dialog, Floating Panel, Combobox, Date Picker, and Color Picker use the shared keyframes instead of local copies; Floating Panel motion now uses the same 200ms ease-in-out default as the other pickers and menus.
  - Reduced motion now uses one strategy across the library: presence-driven enter and exit animations are disabled with `animation: none` (Tailwind: `motion-reduce:…:animate-none` with the same state variants) instead of being shortened to 1ms. Ark presence unmounts at once when the animation is `none`, so closing behavior is unchanged. This applies to Accordion, Collapsible, Color Picker, Combobox, Command Palette, Date Picker, Dialog, Drawer, Lightbox, Menu, Navigation Menu, Swap, and Tour, which now match Popover, Hover Card, and the other components that already disabled their animations. Drawer swipe transitions still take 1ms under reduced motion.
  - Reduced motion now wins over state-specific animations. In the Tailwind packages the `motion-reduce:` animation overrides (`animate-none`, `[animation-duration:1ms]`, `[animation-delay:0ms]`) lost to `data-[state=…]:animate-*` on specificity, so popups, dialogs, drawers, accordions, collapsibles, swap, tour, tree view, and marquee kept animating whenever the duration did not come from the foundation tokens (Tour and TreeView use fixed durations, so they always animated). They now carry the same state variants as the animation they cancel (for example `motion-reduce:data-[state]:animate-none`), so they win without `!important`. In the CSS Modules packages the same problem affected HoverCard, NavigationMenu viewport content, Swap, and TreeView; their reduced-motion selectors now match the animation selectors.
  - Tailwind transitions now follow the motion tokens. The foundation theme (`styles/style.css`, shipped in every package) adds `duration-fast`, `duration-normal`, `duration-slow`, and `duration-slower`, which read `--moduix-duration-*`, and every Tailwind component uses them instead of numeric `duration-150`, `duration-200`, and `duration-350` (same timings by default). A changed `--moduix-duration-*` token now retimes the Tailwind packages the same way as the CSS Modules packages, and reduced motion works through the tokens, so the redundant `motion-reduce:transition-none` utilities are removed. The package `cn` helpers register the new durations with `tailwind-merge`, so a consumer `duration-500` still replaces the default. Solid and Vue components import icons from the `@/lib/moduix/icons/ui` barrel, as React does, and the Vue CSS Modules registry `icons` item now ships `icons/ui/index.ts`.
  - Components no longer set `box-sizing: border-box` themselves: the CSS Modules packages removed it from every module and the Tailwind packages dropped the `box-border` class. The required global reset (the moduix reset or an equivalent one in CSS Modules apps, Tailwind Preflight in Tailwind apps) already applies `border-box` to every element and pseudo-element, so layouts are unchanged. Card, Chart, and Splitter read `--moduix-focus-ring-width` without the unreachable `--moduix-border-width-md` fallback; the token is always defined by the foundation.

### Sidebar

- a1a461a: Colors now come from the foundation sidebar tokens (`--moduix-color-sidebar`, `-sidebar-foreground`, `-sidebar-accent`, `-sidebar-accent-foreground`, `-sidebar-border`, `-sidebar-ring`, or `bg-sidebar` and friends in Tailwind), so themes and the dense, soft, and contrast presets restyle the sidebar. The panel background moves from `card` to `sidebar`, slightly darker in the light theme.
  The collapsed icon rail keeps the active and hover backgrounds of navigation buttons instead of making them transparent.
  The CSS Modules packages keep 3 of the 64 `--moduix-sidebar-*` variables (`width`, `height`, `trigger-offset-y`). Set colors through the sidebar tokens and change spacing, radius, shadow, minimum height, or item sizes with a class on the part.
  `SidebarNavigationSubButton` no longer wraps text in a `sidebar-navigation-sub-label` span: put the text in `SidebarLabel`, as in `SidebarNavigationButton`. In Vue this also stops icons from being wrapped together with the text.
  In the Tailwind packages the resize trigger gets the same `0.75rem` hit area and keyboard focus ring as the CSS Modules packages, and `size="sm"` buttons in CSS Modules use the `text-xs` line height as in Tailwind.
  React and Solid export the `SidebarRootProps`, `SidebarSide`, and `SidebarNavigationButtonSize` types. Vue renames the `SidebarProps` type to `SidebarRootProps` and exports `SidebarSide` and `SidebarNavigationButtonSize`.`SelectIndicator` placed directly in `SidebarNavigationButton` sits at the trailing edge again in the CSS Modules packages (it had moved over the leading icon after the Select cleanup); in every package it now stays in the flex row, so long values truncate before the arrow, and it hides in the collapsed rail regardless of stylesheet order.

### SignaturePad

- a1a461a: In read-only mode, `SignaturePadClearTrigger` is now hidden instead of disabled, the same way Ark hides it while the pad is empty. Before, the CSS Modules packages showed it at full opacity, so it looked clickable but did nothing.
  Tailwind packages no longer dim the clear trigger a second time inside a disabled pad, which matches CSS Modules. The clear trigger now uses the standard `CloseButton` focus ring.
  The CSS Modules packages keep 7 `--moduix-signature-pad-*` variables: `width`, `height`, `bg`, `border-color`, `radius`, `stroke-color`, and `guide-color`. The other 33 are removed: `max-width`, `gap`, `color`, `disabled-opacity`, `label-*`, `control-*`, `border-width`, `shadow`, `transition`, `focus-*`, `guide-inset-x`, `guide-bottom`, `guide-border-width`, and all `clear-trigger-*`. To change those styles, add your own class to the part. For the clear trigger, the `--moduix-close-button-*` variables also work.
  `SignaturePadLabel` and `SignaturePadControl` now inherit the root text color, and the control no longer sets a `min-height` that duplicated its height.

### SimpleGrid

- a1a461a: In the CSS Modules packages, the default `display: grid` and one-column template now come from a component stylesheet instead of inline styles, so your own classes can replace them, including responsive templates in media queries. Before, the inline fallback beat every consumer class and only the `style` prop could change the template. Inline styles are now written only for the layout props you pass, as in the Tailwind packages.
  `columns` and `minChildWidth` are no longer validated at render time. An invalid value no longer throws; the browser drops the invalid declaration and the default one-column template applies.
  Export the `SimpleGridRootProps` type.

### Skeleton

- a1a461a: Loaded content is no longer clipped. `overflow: hidden` now applies only while loading, so focus rings, shadows, and badges of revealed content stay visible.
  The Tailwind packages take the pulse from the `--moduix-animation-pulse` foundation token, as the CSS Modules packages do, so overriding the token in a theme applies to both tracks; reduced motion still disables it.
  CSS Modules drop `--moduix-skeleton-animation`. Use `variant="none"` to turn the pulse off, override `--moduix-animation-pulse` to change it globally, or set `animation` in a class for one placeholder.
  Export the `SkeletonRootProps` and `SkeletonVariant` types.

### Slider

- a1a461a: The horizontal root is now a grid that puts `SliderLabel` and `SliderValueText` on one row above the control, like ProgressLinear, so the usual header wrapper is no longer needed. An existing wrapper still works, 8px narrower than the root. The root no longer forces `--moduix-color-foreground` and inherits the surrounding text color.
  `SliderMarkerGroup` now reserves one line for marker labels, so content after a slider with marks no longer overlaps them. Marker dots stay centered in RTL. `SliderDraggingIndicator` no longer stretches in vertical sliders; it sits beside a vertical thumb and above a horizontal one.
  The CSS Modules packages keep 4 `--moduix-slider-*` variables instead of 50: `track-size`, `track-bg`, `range-bg`, and `thumb-size`. The root size, gap, color, label and value text typography, control size, track border and radius, range radius, thumb border, background, radius and shadows, focus ring, invalid colors, marker, dragging indicator, and transition variables are removed in favor of foundation tokens; set `width` or `height` on the root, or override the style with a class on the part.
  Remove styles that Ark already applies inline (`position`, `touch-action`, `user-select`), the thumb `pointer-events: none` while disabled, and the reduced-motion block that the duration tokens already cover. React and Solid now re-export the Ark Slider part prop, details, and hook types; Vue no longer re-exports the Ark `Slider*BaseProps` types.
  the horizontal root now fills its container instead of defaulting to `12rem`, like Chakra UI and shadcn/ui and matching ProgressLinear. Set `width` on the root to keep a fixed size. Vertical sliders are unchanged.

### Spinner

- a1a461a: `decorative` now always sets `aria-hidden="true"` on the root and no longer adds `role="presentation"`, which `aria-hidden` made redundant. A decorative `asChild` host is now hidden too instead of keeping its own semantics; the host must stay non-interactive.
  The CSS Modules packages keep 3 `--moduix-spinner-*` variables instead of 11: `size`, `ring-border-width`, and `ring-track-color`. `size` still overrides every size except `inherit`; the per-size `size-xs`…`size-xl` variables are removed. `--moduix-spinner-color` is removed in favor of `color`, `--moduix-spinner-radius` in favor of the full radius, and `--moduix-spinner-animation` in favor of the `--moduix-animation-spin` token or `animation` on `[data-slot='spinner-indicator']`.
  Tailwind indicators drop `motion-reduce:animate-none`; the spin token already resolves to `none` under reduced motion.
  Export the `SpinnerRootProps` and `SpinnerSize` types.

### SplitButton

- a1a461a: The CSS Modules packages keep 1 `--moduix-split-button-*` variable instead of 10. `--moduix-split-button-separator-color` now holds the full separator color (default `color-mix(in srgb, currentColor 16%, transparent)`) and replaces `--moduix-split-button-separator-opacity`. The separator `inset`, `offset`, and `width` variables and the per-size `trigger-padding-x-*` variables are removed; change them with a class on `SplitButtonTrigger`. Outline variants now hide the separator with `display: none` instead of `opacity: 0`.
  Remove the press-effect reset and `min-width: 0` from the action and trigger: Button already skips its press offset for parts with their own `data-slot`, and the inline-flex group never shrinks them.
  Export the `SplitButtonRootProps`, `SplitButtonActionProps`, `SplitButtonTriggerProps`, `SplitButtonPositionerProps`, `SplitButtonContentProps`, `SplitButtonSize`, and `SplitButtonVariant` types.

### Splitter

- a1a461a: `SplitterResizeTrigger` and `SidebarResizeTrigger` now render `type="button"`, so clicking or pressing Space on a resize handle inside a form no longer submits it. An `asChild` host keeps its own `type`.
  The root now fills its container (`height: 100%`, like Ark UI, Chakra UI, and shadcn/ui) instead of defaulting to `28rem`. Set a height on the root when its parent has none, for example for a vertical splitter or panels with little content. A nested splitter no longer needs a height override.
  The CSS Modules packages keep 2 `--moduix-splitter-*` variables instead of 46: `resize-trigger-line-color` and `resize-trigger-size`, which style the divider line and hit area pseudo-elements. `Splitter` and `SplitterRootProvider` now remove Ark's inline `width` and `height` like the Tailwind packages, so a class sets the root size and `--moduix-splitter-width` and `--moduix-splitter-height` are removed. Change the root, panel, and indicator surfaces, the focus ring, and the disabled opacity with a class on the part.
  Panels drop the `12.5rem` minimum height, which clipped panels in a root shorter than `200px` and had to be reset for vertical splitters, and no longer draw their own card background; the root background shows through, so default visuals stay the same. Panels also drop `overflow: auto` and `min-width`: Ark sets `overflow: hidden` inline, so panels never scrolled. Put long content in a scroll container.
  The divider hover and drag tint in the CSS Modules packages now matches Tailwind (`muted-foreground` at 40%). Remove cursor, `min-width`, `position`, and z-index styles that Ark already applies inline or that had no effect, the trigger opacity transition, and the Tailwind `motion-reduce:before:transition-none` (the duration token already resolves to near zero). The indicator is centered by the trigger's flex alignment instead of `translate(-50%, -50%)`, and the Tailwind indicator now animates its drag scale.
  import `cn` from `@/lib/moduix/cn`, so the component installed from the registry resolves it.

### Stack

- a1a461a: Responsive `direction` is now mobile-first. `{ desktop: 'row' }` keeps the default `column` below `640px` instead of using `row` at both breakpoints; pass `direction="row"` for a row everywhere. A string `direction` no longer adds a desktop utility in the Tailwind packages, so a consumer `flex-col` class now also wins at desktop widths.
  Remove the `--moduix-stack-direction-mobile`, `--moduix-stack-direction-desktop`, and `--moduix-stack-flex` CSS variables. The component always wrote the direction inline, so the theme values never applied, and an inherited `--moduix-stack-flex` made stacks nested inside a `fill` stack grow too. Direction and `fill` now come from the component stylesheet; override them with your own classes. `fill={false}` no longer writes `flex: initial`, which was already the default.
  Export the `StackRootProps` and `StackDirection` types.

### Steps

- a1a461a: The root now fills its container instead of stopping at `52rem`, and no longer forces `--moduix-color-foreground`, so it inherits the surrounding text color. Limit the width with `max-width` in your own class.
  The vertical separator now ends `spacing-2` before the next indicator, matching the gap below the current one, instead of touching it. The next trigger now darkens on hover; before, its hover color equaled its background.
  The CSS Modules packages keep 2 `--moduix-steps-*` variables instead of 65: `indicator-size` and `gap`, which also position the vertical separator. The root, list, item, trigger, indicator, separator, content, completed content, action button, progress, and focus ring variables are removed in favor of foundation tokens; override them with a class on the part.
  Remove styles with no effect: list resets on Ark's `div`, the default `row` and `stretch` flex values, the current indicator background equal to the base one, the indicator opacity transition, the `[data-disabled]` checks on the previous and next triggers (Ark sets only `disabled`), and the Tailwind progress `motion-reduce` override that the duration token already covers.
  React and Solid now re-export the Ark Steps part prop, details, and hook types; all adapters export `StepInvalidDetails`. The Vue root takes its emits from Ark instead of a hand-written copy.

### Switch

- a1a461a: The thumb is now sized and placed from the control box, so a `width` or `height` override on `SwitchControl` (a class in CSS Modules, `w-*` and `h-*` utilities in Tailwind) keeps it square and flush with both ends. Previously the thumb kept its size-preset dimensions and travel and ended up misplaced. Default visuals are unchanged.
  An invalid switch now draws its focus ring in the destructive color, like Checkbox and RadioGroup.
  The checked thumb now follows Ark's `dir` attribute on the thumb instead of `:dir(rtl)`, so right-to-left placement also works when a bundler lowers `:dir()` to `:lang()`.
  The CSS Modules packages keep 5 `--moduix-switch-*` variables instead of 48: `bg`, `bg-checked` (now also the checked border color), `border-color`, `gap`, and `thumb-bg` (both states). Per-size width, height, and thumb size, thumb translate, hover, invalid, focus-ring, transition, disabled-opacity, padding, radius, thumb border, color, shadow, icon-size, and label typography variables are removed in favor of foundation tokens; override those with a class on the part. The root now sets the text color and `SwitchLabel` inherits it.
  React and Solid export the Ark types `SwitchCheckedChangeDetails`, `SwitchContextProps`, `SwitchControlProps`, `SwitchHiddenInputProps`, `SwitchLabelProps`, `SwitchThumbProps`, `UseSwitchContext`, `UseSwitchProps`, and `UseSwitchReturn`, as Vue already did; Vue adds `SwitchThumbProps`.

### Table

- a1a461a: Sticky cells (`data-sticky="start" | "end"`) now keep the striped, hover, and focus row color. Before, their opaque background hid the row state, so a highlighted row broke at the sticky column. Row backgrounds now change without a fade, so the sticky column and the rest of the row switch together.
  In the Tailwind packages a hovered striped row keeps its stripe when the table is not `interactive`, and `numeric` cells no longer wrap, as in the CSS Modules packages. The Vue Tailwind `TableEmpty` default text now comes from `a11yLabels.noResults`.
  Remove the `variant` prop and `data-variant`: `line` had no styles, and `outline` drew a second border inside `TableScrollArea`. Add a border class to `Table` when you need an outer border without the scroll area.
  Remove the `htmlWidth` prop from `TableColumn`; use the native `width` attribute.
  The CSS Modules packages keep 6 `--moduix-table-*` variables instead of 41: `bg` (new, replaces `scroll-area-bg`, `sticky-header-bg`, and `sticky-column-bg`), `border-color`, `cell-padding-x`, `cell-padding-y`, `row-bg-hover` (now also used for focus within), and `row-bg-striped`. Border width, caption, typography, color, footer, empty, column border, column header, scroll area border, radius, and shadow, transition, focus, and z-index variables are removed in favor of foundation tokens; override them with a class on the part.
  Remove styles with no effect: `border-spacing` with collapsed borders, `vertical-align: middle` (the table default), `color: inherit` on cells, `font-family: inherit`, the sticky intersection z-index that never left the sticky header's stacking context, and the duplicate `isolation` on `TableScrollArea`. The Tailwind body and header no longer add `group/table-body` and `group/table-header` classes.
  Export the `TableRootProps` and `TableSize` types.

### Tabs

- a1a461a: `variant="line"` now works with `orientation="vertical"` and draws the line on the inline-end edge of the list. Previously vertical tabs silently switched to the filled indicator, and `data-variant` reported `default`; now `data-variant` always mirrors the `variant` prop, and `TabsRootProvider` no longer reads orientation from the Ark state.
  The indicator is placed from the selected trigger box that Ark measures (`--left`, `--top`, `--width`, `--height`), so it stays aligned when a trigger is taller or shorter than the default. It sits behind the triggers with `z-index: -1`, so triggers no longer set `position` and `z-index`.
  A focused panel keeps its rounded corners; before, `border-radius: inherit` squared them while the focus ring was visible. Trigger focus rings are inset outlines, so the scrolling list no longer clips them at the edges of a `line` list. The vertical list is `min(12rem, 40%)` wide instead of switching width with a viewport media query.
  In the Tailwind packages the trigger height uses `h-control-sm` like the CSS Modules packages.
  The CSS Modules packages keep 7 `--moduix-tabs-*` variables instead of 47: `bg`, `border-color`, `indicator-bg`, `list-bg`, `list-border-color`, `tab-color`, and `tab-color-active` (also the hover and line-indicator color). Size, spacing, radius, typography, focus-ring, disabled, icon, transition, vertical list width, and separate line-indicator variables are removed in favor of foundation tokens; override those with a class on the part, and set indicator motion with Ark `--transition-duration` and `--transition-timing-function` on `TabsIndicator`.
  React and Solid export `TabsRootProps`, `TabsRootProviderProps`, `TabsVariant`, and the Ark types `TabContentProps`, `TabIndicatorProps`, `TabListProps`, `TabTriggerProps`, `TabsContextProps`, `TabsFocusChangeDetails`, `TabsValueChangeDetails`, `UseTabsContext`, `UseTabsProps`, and `UseTabsReturn`; Vue exports `TabsVariant`, and its `TabsRootProps` and `TabsRootProviderProps` now include `variant`.
  New: `size` (`sm`, `md`, `lg`, default `md`) on `Tabs` and `TabsRootProvider` makes the tab list as tall as a `Button` or `Input` of the same size, like `SegmentGroup`. The default list is now 36px tall instead of 42px (triggers 26px instead of 32px). New: `fitted` stretches a horizontal tab list across the root and shares its width equally between the triggers. `TabsSize` is exported in every framework, and `TabsRootProps` and `TabsRootProviderProps` include `size` and `fitted`.

### Tag

- a1a461a: In the Tailwind packages the `TagCloseTrigger` icon is 12px like in the CSS Modules packages; before, the shared close button rule made it 16px inside the 16px trigger.
  `TagCloseTrigger` is now named `Remove tag` unless it receives `aria-label` or `aria-labelledby`, also with custom children or `asChild`. Before, custom children and `asChild` fell back to the generic `Close` name.
  The CSS Modules packages keep 3 `--moduix-tag-*` variables instead of 42: `bg`, `border-color`, and `color`, which override every variant. Per-variant color, size, gap, padding, radius, border-width, typography, icon-size, transition, disabled-opacity, and `--moduix-tag-close-trigger-*` variables are removed in favor of foundation tokens; override those with a class on the part. Default visuals are unchanged.
  A `Tag` rendered as a `button` or `a` through `asChild` shows a pointer cursor, so the render-as-button example no longer needs its own styles.
  New: `size="lg"` (28px minimum height, 14px text), like `Badge`.
  Every framework exports the types `TagRootProps`, `TagSize`, and `TagVariant`.

### TagsInput

- a1a461a: In the Tailwind packages a disabled root no longer dims the clear trigger a second time; before, the shared close button applied its own disabled opacity inside the already dimmed root.
  The CSS Modules packages keep 3 `--moduix-tags-input-*` variables instead of 63: `width`, `min-height`, and `radius`. Color, spacing, typography, focus-ring, transition, tag, trigger, and `clear-trigger` variables are removed in favor of foundation tokens; override those with a class on the part. Default visuals are unchanged.
  `--moduix-tags-input-width` now defaults to `24rem` with `max-width: 100%` (Tailwind `w-96 max-w-full`), so a larger width is no longer capped at 24rem; `--moduix-tags-input-max-width` is removed.
  `TagsInputClearTrigger` passes `aria-label`, `aria-labelledby`, and Ark's translated label straight to the shared close button; the accessible name and attributes are unchanged.
  React and Solid export the Ark tags-input prop and detail types, like Vue. Vue re-exports Ark `TagsInputHiddenInput` directly and adds the `TagsInputLabelProps` types.

### Tailwind

- a1a461a: Component classes read the same foundation tokens as the CSS Modules packages.

  - Tailwind packages: focus rings use the new `outline-focus`, `outline-focus-inset`, `outline-offset-focus`, and `outline-offset-focus-inset` theme utilities instead of fixed `outline-2`, `outline-1`, `outline-offset-2`, and `-outline-offset-1`. They read `--moduix-focus-ring-width`, `--moduix-focus-ring-inset-width`, `--moduix-focus-ring-offset`, and `--moduix-focus-ring-inset-offset`, the same tokens the CSS Modules packages use, so overriding those tokens now changes focus rings in both styling tracks. Default visuals are unchanged. `cn` knows the new utilities, so a consumer class such as `focus-visible:outline-4` still replaces the default. Outlines that draw a border rather than a focus ring (Menu, Navigation Menu, and Popover content) keep `outline-1`.
  - Tailwind packages: disabled and read-only states use the new `opacity-disabled` theme utility instead of a fixed `opacity-50`. It reads `--moduix-opacity-disabled`, the same token the CSS Modules packages use, so overriding that token now dims both styling tracks. The default stays 0.5. `cn` knows the new utility, so a consumer class such as `disabled:opacity-75` still replaces the default.
  - Tailwind: the default border width (`border`, `border-t`, `border-x`, `divide-y`, and similar) now comes from `--moduix-border-width-sm` through the `--default-border-width` theme variable, as in the CSS Modules packages. Overriding the token now changes borders in both styling tracks. Default visuals are unchanged (1px).
  - A size utility on an icon you pass, such as `<StarIcon class="size-5" />`, now overrides the default icon size in `Badge`, `CommandPaletteItemIcon`, `InputGroupAddon`, `InputGroupText`, `NavigationMenuLink`, the `Sidebar` menu buttons and `SidebarGroupAction`, `TabsTrigger`, `Tag`, `TagStartElement`, and `TagEndElement`, as it already did in `Button`. Parts that render their own default icons keep the parent-level `[&>svg]:size-*` override.
  - Use the Tailwind v4 `utility-(--variable)` shorthand instead of `utility-[var(--variable)]` for CSS variable values in component classes. The generated CSS and class merging are unchanged.

### Text

- a1a461a: CSS Modules drop all 22 `--moduix-text-*` variables, including `--moduix-text-line-clamp`; styles come from foundation typography and color tokens, so override them with a plain class on `Text`. `lineClamp` now sets `-webkit-line-clamp` inline in every package, as Tailwind already did.
  `Text` without `align` no longer forces `text-align: start` and now inherits the alignment of its container, for example inside a centered empty state. Tailwind packages add `m-0`, matching the CSS Modules margin reset.
  Solid no longer strips consumer `data-align`, `data-truncate`, and `data-line-clamp` props when the matching prop is unset.
  Remove `tone="subtle"`: it used the secondary-foreground color, which matches `default` in dark mode and is barely distinguishable in light mode. Use `muted` for secondary copy or a class for a custom color.
  Export the `TextRootProps`, `TextElement`, `TextSize`, `TextWeight`, `TextTone`, and `TextAlign` types.

### Textarea

- a1a461a: Add `size="xs" | "sm" | "md" | "lg" | "xl"` (default `md`, mirrored as `data-size`) and the `TextareaSize` type. Inline padding and font size match `Input` of the same size, so stacked controls line up; at the default `md` size the inline padding changes from `--moduix-spacing-3-5` to `--moduix-spacing-3` (`px-3` in Tailwind). The fixed `6rem` minimum height is removed: height now comes from the native `rows` attribute (2 by default) and scales with the size, so set `rows` or a class for a taller field.
  `InputGroupTextarea` inherits the group size unless it gets its own `size`, like `InputGroupInput`, and takes its font from that size instead of inheriting it.
  Inside a disabled `Field`, `FieldRootProvider`, or `Fieldset` the textarea is no longer dimmed a second time on top of the field opacity.
  CSS Modules keep two variables, `--moduix-textarea-width` and `--moduix-textarea-radius`; the other 21 `--moduix-textarea-*` variables, including `--moduix-textarea-min-height`, `--moduix-textarea-resize`, and the no-op read-only ones, are removed. Colors, padding, typography, focus ring, transition, and disabled opacity come from foundation tokens, so override them with a plain class on `Textarea`. Tailwind drops the redundant `max-w-none`.
  The `data-autoresize` attribute and its `overflow-y: hidden` rule are removed: Ark already sets inline `resize` and `overflow` while `autoresize` is on. Solid sets `defaultValue` through `prop:defaultValue` on every path instead of a ref callback, and the unused `applyDefaultValue` and `applyDefaultSelected` helpers are removed from the Solid `defaultValue` internal file. Every package exports `TextareaRootProps`; Vue drops the `FieldTextareaProps` re-export, import it from `@ark-ui/vue/field` instead.

### Timer

- a1a461a: CSS Modules drop all 31 `--moduix-timer-*` variables; styles come from foundation tokens, so override a part with a class or a `data-slot` selector.
  The time area now uses the `text-2xl` line height instead of `text-sm`, so wrapped rows no longer overlap; it is 12px taller by default. The letter-spacing reset is removed.
  `TimerActionTrigger` transitions only its background color, and its disabled styles apply to the native `disabled` state only, without the `aria-disabled` rule.
  React and Solid export the Ark part prop types, `UseTimerProps`, `UseTimerReturn`, `UseTimerContext`, and `TimerTickDetails`, as Vue already did.

### Toast

- a1a461a: In the Tailwind packages the `success`, `warning`, and `error` backgrounds are opaque like in the CSS Modules packages and `Alert`; before, a 90% transparent tint let page content show through the toast. The exit transition uses the foundation duration tokens instead of hard-coded `350ms` and `200ms`, so presets and reduced motion apply to it as well.
  The CSS Modules packages keep 4 `--moduix-toast-*` variables instead of 61: `bg`, `border-color`, and `color`, which override every type (scope them with `[data-type='success']` and similar selectors to theme one type), and `description-color`. Per-type, size, spacing, typography, motion, action trigger, and `--moduix-toast-close-*` variables are removed in favor of foundation tokens; override those with a class on the part. The close trigger is a `CloseButton`, so use `--moduix-close-button-*` for it. Default visuals are unchanged.
  Removed no-op styles: `pointer-events`, `min-width`, and `min-height` on the root (Ark positions it with inline styles), the `box-shadow` transition, and the title `color: inherit`. `ToastActionTrigger` transitions only its background color, with the default transition token.
  React and Solid export the Ark types `CreateToasterProps`, `CreateToasterReturn`, `ToastActionOptions`, `ToastActionTriggerProps`, `ToastCloseTriggerProps`, `ToastContextProps`, `ToastDescriptionProps`, `ToastOptions`, `ToastPlacement`, `ToastPromiseOptions`, `ToastRootProps`, `ToastStatus`, `ToastStatusChangeDetails`, `ToastTitleProps`, `ToastType`, and `UseToastContext`, plus `ToasterProps` with `portalled` and `portalRef`, as Vue already did.New: the default `ToastToaster` renderer shows a decorative `Spinner` before the title of a `loading` toast, so `toaster.loading()` and the pending state of `toaster.promise()` no longer look like an `info` toast. The `toast` registry items now depend on `spinner`.
  The root reserves inline-end padding for the close trigger only when a `ToastCloseTrigger` is rendered inside it, so toasts created with `closable: false` use the full width (16px instead of 44px inline-end padding).

### Toc

- a1a461a: In the Tailwind packages `TocIndicator` keeps Ark's measurements when a parent of the list defines its own `--top` or `--height`, as `CollapsibleContent` does; before, the indicator inside a collapsible navigation took the height of the whole content. The offsets of links, the indicator, and `TocRail` use the spacing tokens instead of fixed `rem` values, so presets such as `dense` apply to them like in the CSS Modules packages.
  Links clip only on the inline axis, so long labels with `TocRail` truncate with an ellipsis instead of overflowing the navigation and making it scroll horizontally.
  The CSS Modules packages drop all 36 `--moduix-table-of-contents-*` variables; styles come from foundation tokens, so override a part with a class or a `data-slot` selector, and change the navigation column with `grid-template-columns` on `Toc`. Default visuals are unchanged.
  Removed no-op styles: `scroll-behavior: smooth` on `TocContent` (Ark scrolls with `scrollBehavior`), the reduced-motion overrides that the duration tokens already cover, the root `box-sizing`, and explicit grid placement of the content for `placement="left"` (the content takes the free cell next to the navigation).
  React and Solid export the Ark types `TocActiveChangeDetails`, `TocContentProps`, `TocContextProps`, `TocIndicatorProps`, `TocItemData`, `TocItemProps`, `TocLinkProps`, `TocListProps`, `TocNavProps`, `TocRootProps`, `TocRootProviderProps`, `TocTitleProps`, `UseTocContext`, `UseTocProps`, and `UseTocReturn`, as Vue already did. Every framework exports `TocRailProps`.
  `TocRail` lines no longer break for 2px where the heading depth changes: the line before a branch now reaches the start of the next curve.

### Toggle

- a1a461a: The CSS Modules packages keep 6 `--moduix-toggle-*` variables instead of 55: `bg`, `bg-hover` (hover and active), `bg-pressed` (also the pressed border), `border-color`, `color`, and `color-pressed`. They apply to every variant, so to theme one variant set them on `[data-slot='toggle-root'][data-variant='<variant>']`. Per-variant, per-size, active, radius, border-width, gap, typography, icon-size, focus-ring, transition, and disabled-opacity variables are removed in favor of foundation tokens; override those with a class. Default visuals are unchanged, and `ToggleGroup` items follow the same variables.
  In the Tailwind packages a size utility on an icon, such as `size-5`, now overrides the default 16px icon size inside `Toggle` and `ToggleIndicator`, as in `Button`. Remove the redundant hover media query, `box-border`, `display: block` on icons, `text-inherit` on the indicator, the pressed ghost text color that matched the default, and the dead disabled `cursor`.
  React and Solid export the Ark types `ToggleContextProps`, `ToggleIndicatorProps`, `UseToggleContext`, `UseToggleProps`, and `UseToggleReturn`, as Vue already did.

### ToggleGroup

- a1a461a: The CSS Modules packages keep 2 `--moduix-toggle-group-*` variables instead of 12: `bg` and `border-color`, which now apply to every variant (`outline` and `ghost` defaults stay private). Removed: `border-width`, `color`, `gap`, `ghost-bg`, `ghost-border-color`, `ghost-padding`, `item-radius`, `outline-bg`, `padding`, and `radius`. Set gap, padding, and radius with a class on the group or item, and recolor unpressed items with `--moduix-toggle-color` on the group. Default visuals are unchanged.
  React and Solid export the Ark types `ToggleGroupContextProps`, `ToggleGroupValueChangeDetails`, `UseToggleGroupContext`, `UseToggleGroupProps`, and `UseToggleGroupReturn`, as Vue already does.

### Tooltip

- a1a461a: CSS Modules drop all 41 `--moduix-tooltip-*` variables, including the `--moduix-tooltip-popup-*` motion family and `--moduix-tooltip-transition`. Colors, borders, spacing, sizes, and typography come from foundation tokens, so override them with a plain class on the part. Content motion now uses the shared `moduix-popup-in` and `moduix-popup-out` keyframes with the same 200ms ease-in-out default as the Tailwind packages, and reads only the shared `--moduix-popup-motion-*` variables.
  When several valued triggers share one tooltip, only the current trigger shows the open background instead of all of them. Long content now grows with its text instead of spilling past the surface at a fixed 24rem height. In the Tailwind packages, a tooltip that Ark switches instantly between triggers (`data-instant`) no longer plays its enter animation, as in the CSS Modules packages; the trigger drops the unreachable `data-disabled` styles, and trigger and content use the `text-sm` token line height. React and Solid now re-export the Ark Tooltip part prop, detail, and hook types, as Vue already does.

### Tour

- a1a461a: Floating steps with `placement: 'center'` now sit in the viewport center instead of starting at it, and floating `top` and `bottom` steps stay centered in RTL.
  The CSS Modules packages drop all 83 `--moduix-tour-*` variables, including `--moduix-tour-z-index` and the content and backdrop motion families. Styles come from foundation tokens, so override a part with a class or a `data-slot` selector; the backdrop still reads the shared `--moduix-backdrop-bg` and `--moduix-backdrop-filter`. Content motion uses the shared `moduix-popup-in` and `moduix-popup-out` keyframes, and the backdrop uses the dialog backdrop keyframes, in both styling tracks; the Tailwind backdrop no longer hard-codes 200ms, so reduced-motion and duration tokens apply to it.
  `TourCloseTrigger` is now unstyled, like `DialogCloseTrigger`; use `TourCloseIcon` for the styled icon-only close button, which now relies on `CloseButton` defaults and keeps only its position and hover colors. Overlay layers stack from the new `--moduix-z-tour` token (65, between popups and toasts) plus Ark's `--tour-layer`, so a tour started from an open dialog or popover shows above it; before, it rendered at 50 under the dialog. Open tour content also restores pointer events that a modal dialog disables outside itself, so its actions stay clickable. The Tailwind packages use the token instead of hard-coded `50` and `60`. Dialog steps center with `safe center`, so the top of tall content stays reachable on short screens. Progress text and the action row no longer use CSS `order`, so the visual order follows the markup.
  React and Solid export the Ark Tour part props, step, callback detail, and hook types, as Vue already did. Every framework exports `TourActionListProps`.

### TreeView

- a1a461a: Long names in `TreeViewBranchText` and `TreeViewItemText` now truncate with an ellipsis; before, the text was cut off because `text-overflow` does not apply to a flex container. Icons inside the text are inline and centered on the text line, with the same size and spacing as before.
  The row highlight now starts `--moduix-spacing-1` before the row content, so the branch indicator no longer touches the edge of the hover, selected, and focus highlight, and a nested row's highlight stays clear of its parent's indent guide. Content and guide positions are unchanged.
  The CSS Modules packages keep 2 of the 53 `--moduix-tree-view-*` variables, `width` and `indent`; `indent` now defaults to `var(--moduix-spacing-4)` (16px, as before) instead of `1rem`. Colors, spacing, typography, focus rings, disabled opacity, checkbox, rename input, and transition values now come from foundation tokens; override them with a class or a `data-slot` selector.
  Branch content opens and closes with the shared `moduix-collapsible-content-*` keyframes and `--moduix-transition-default` in both styling tracks instead of a fixed 150ms, so duration presets apply to it. The Tailwind packages use spacing and size tokens for the row height, indentation, and indent guide instead of fixed `rem` values, so presets such as `dense` apply to them like in the CSS Modules packages.
  Removed dead disabled styles on the root (Ark's tree root has no disabled state; disable nodes with `isNodeDisabled`) and other no-op styles.
  React `TreeViewNodeCheckboxIndicator` forwards its ref to the wrapper `span`. React and Solid export the Ark TreeView part props, callback detail, and hook types, as Vue already did.
  Disabled items now dim once, through the shared disabled opacity, and keep their regular text color instead of also switching to the muted foreground color. `--moduix-tree-view-item-disabled-color` is removed from the CSS Modules packages; set a disabled item color with a class on the part if you need one.

### Patch Changes

### Accordion

- a1a461a: In the Tailwind packages a disabled item's trigger is now dimmed, keeps the default cursor, and no longer gets the hover and pressed background. The trigger styles used `data-disabled`, which Ark sets on the item, indicator, and content but not on the trigger; they now use `:disabled` like the CSS Modules packages.
  The CSS Modules packages keep 11 of the 19 `--moduix-accordion-*` variables. The removed `color`, `disabled-opacity`, `focus-ring-color`, `focus-ring-offset`, `focus-ring-width`, `icon-open-transform`, `item-border-width`, and `trigger-bg` variables now use foundation tokens; override them with a class on the part (for example `[data-state='open']` on `AccordionItemIndicator` for a different rotation). Default visuals are unchanged.
  Removed the no-op `[hidden]` rule on `AccordionItemContent`: the foundation reset and Tailwind Preflight already hide it.

### Empty

- a1a461a: CSS Modules keep only the six root-surface variables (`--moduix-empty-bg`, `-border-color`, `-border-width`, `-color`, `-padding`, `-radius`) and drop the other 17 (`gap`, `shadow`, and the per-part `icon-*`, `content-*`, `title-*`, `description-*`, `actions-gap`); style those parts with a class instead.
  `EmptyActions` now outranks the Button root class when wrapping long button and link labels, so the result no longer depends on stylesheet order. Redundant `min-width` and `max-width` rules are removed from the icon, title, description, and actions in every package.

### Highlight

- a1a461a: Remove the `--moduix-highlight-shadow` variable and the no-op `box-shadow: none` and `text-decoration: none` styles (`shadow-none` and `no-underline` in Tailwind); a native `<mark>` has neither, and `text-decoration: none` cannot cancel an underline inherited from a link. Set `box-shadow` in your own class if you need one.
  Vue packages export the moduix `HighlightRootProps` type instead of re-exporting Ark's `HighlightProps`, `HighlightChunk`, and `UseHighlightProps`; the last two only describe Ark's `useHighlight`, which moduix does not export. Import them from `@ark-ui/vue/highlight` when needed.

### NativeSelect

- a1a461a: The Tailwind packages now use the same spacing as the CSS Modules packages and `Select`: 14px text padding at the start and 46px at the end (it was 12px and 44px), 14px inline padding in list mode, and 14px end padding in forced-colors mode.
  Dead styles are removed in every package: the background-color transition on a select whose background never changes, `line-height` and `display` rules on the indicator icon, the disabled check on the indicator hover (a disabled select already has `pointer-events: none`), and in Tailwind the duplicate invalid focus outline and `bg-transparent`. Default visuals are otherwise unchanged.

### Solid

- a1a461a: Wrapper-owned `data-*` hooks are no longer declared in prop types or split out of the forwarded props, and `asChild` is forwarded with the rest of the props instead of a separate attribute. Behavior is unchanged: the hooks are still written after forwarded props and cannot be overridden.

### Swap

- a1a461a: The CSS Modules packages keep only `--moduix-swap-transition`. The nine keyframe variables (`--moduix-swap-enter-starting-*`, `--moduix-swap-exit-ending-*`, `--moduix-swap-rotate-*`, `--moduix-swap-flip-*`) are removed; use a custom `animation` name for a different motion, as the Tailwind packages already do.
  Removed no-op styles: `grid-template-areas` (Ark pins each indicator to `grid-area: 1 / 1`) and `color: inherit` / `text-inherit` on indicators.
  The Vue packages export `SwapRootProps`, `SwapRootProviderProps`, and `SwapIndicatorProps` from the moduix components, so `SwapRootProps` now includes `animation`.

### Typeset

- a1a461a: `TypesetScroll` now owns its `overflow-x: auto`, so it scrolls wide content even outside a `Typeset` root or inside a `.not-typeset` subtree; before, it was a focusable wrapper that did not scroll there. Table cells with `align="left"` or `align="right"` (GFM column alignment) keep that physical alignment in right-to-left content; before, `right` was mapped to `end` and `left` was overridden by `start`.
  Link hover underline is wrapped in `@media (hover: hover)`, so it no longer sticks after a tap on touch devices. Colors, borders, radius, and focus rings use foundation tokens directly instead of `currentColor` fallbacks, and duplicate or no-op rules (`margin-trim`, repeated heading `strong` weight and marker colors) are removed. Rendered output with foundation styles is unchanged.
  The Vue Tailwind package ships the same `Typeset.module.css` as every other adapter instead of a global `Typeset.css`, so the global `.typeset` and `.typeset-scroll` classes are no longer emitted; target `data-slot="typeset"` and `data-slot="typeset-scroll"` instead. Registry consumers receive `Typeset.module.css`.

## 3.0.1

### Patch Changes

### Toast

- 32dafc1: Fix mobile viewport overflow by centering top and bottom placements up to 40rem

## 3.0.0

### Major Changes

- Ship React, Solid, and the first Vue adapters, including their Tailwind variants, on the same `3.0.0` release line.
- Use flat component exports: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogRootProvider`, and `DialogContext`, rather than compound `Dialog.*` APIs or duplicate `DialogRoot` aliases.
- Configure dismissible overlay layers with `--moduix-z-popup`; `--moduix-z-modal` no longer controls these overlays.

### Clipboard

- Remove `ClipboardCopyText`.
  Pass `copied="Copied"` and children directly to `ClipboardIndicator` for text content; the icon defaults are unchanged.

### Minor Changes

### AngleSlider

- c7359a1: Redesign the dial as a circular track that fills from the top with a masked conic-gradient arc, a circle thumb matching the linear Slider, and the value text centered in the dial.
  `AngleSliderDial` now renders the centered `ValueText` between `Control` children and `Thumb`; the pointer press suppresses the keyboard focus ring during and after the drag while keyboard focus keeps its ring.
  The public `--moduix-angle-slider-*` variable set was retuned; the needle thumb, inner disc, center dot, and track/control border variables were removed.

### Patch Changes

- Update Ark UI to `^5.39.3` and simplify component styles and TypeScript integration while preserving native events, refs, portals, and controlled state.
- Fix Lightbox motion and image previews, Listbox focus styling, and collapsed Tailwind Sidebar icons.
- Foundation CSS uses `light-dark()` and scoped derived tokens. Raw CSS requires Chrome/Edge 123+, Firefox 120+, or Safari/iOS 17.5+.

- Consolidate the default accessible labels (clear triggers, close buttons, loading text, and friends) into shared internal helpers and ship them as `a11y-labels` registry items so every component entry point resolves its label imports after a shadcn install.
- Switch every component barrel to `export * from './Component.js'` and normalize the `.js` extension in Tailwind barrels, so new component exports no longer need barrel updates in four packages.

### Carousel

- c7359a1: Use the ring color token for control hover and pressed border instead of a border/foreground mix.

### Chart

- Render the default tooltip body through the styled Moduix tooltip instead of the duplicated unstyled TanStack-style fallback, and derive machine options with `splitProps`.

### CommandPalette

- Call `preventDefault` on the clear-trigger click in Solid adapters before resetting the input, matching the React adapters and preventing parent handlers from also reacting to the click.
- c7359a1: Keep component-owned `data-*` attributes applied after forwarded props in all components.

  Consumer-supplied `data-*` props no longer override `data-scope`, `data-part`, `data-slot`, `data-tone`, `data-indicator-position`, `data-size`, `data-variant`, and other state hooks that styles and tests rely on.

### Highlight

- c7359a1: Replace arbitrary box-decoration utilities with `box-decoration-clone` in Tailwind variants and drop the no-op font reset from CSS Modules variants.

### JsonTreeView

- c7359a1: Group the duplicated branch-control and item utility pairs in Tailwind variants and document that indentation guides ship unstyled.

### JsonTreeView

- c7359a1: Extract the duplicated Tailwind root class string into a shared constant, map `theme()` colors to CSS variables, and gate the row hover highlight behind pointer-capable media.

### Navigation Menu

- c7359a1: Expose `useNavigationMenu` as a top-level export in Solid adapters, matching the React adapters.

### NumberInput

- c7359a1: Remove dead `data-focus` styles on triggers and input, bare `data-invalid` styles on triggers, and the no-op `border-x-current` utility.

### Pagination

- c7359a1: Treat explicit `false` children as empty triggers so they keep the fixed icon-trigger footprint, align the text-trigger padding fallback with the item default, and drop redundant line-height utilities from Tailwind variants.

### PasswordInput

- c7359a1: Route Solid `defaultValue` through a single force-prop mechanism and gate hover styles behind pointer-capable media while keyboard focus highlighting stays intact.
  Also exposes `PasswordInput`, `usePasswordInput`, and `usePasswordInputContext` as named exports from the React adapter and removes redundant line-height utilities from Tailwind variants.

### PinInput

- c7359a1: Remove redundant line-height utilities from Label and Input so presets can retune them.

### Popover

- c7359a1: Point the Tailwind arrow size at the real spacing token so the default arrow renders at full size again.

### Popover

- c7359a1: Align the header clear-icon reserve with the CSS Modules descendant rule, theme the arrow size through the spacing token, and export `PopoverRootProps` and `PopoverRootProviderProps` types from the React adapters.

### ProgressCircular

- c7359a1: Move the Tailwind indeterminate ring animation to the shared `moduix-progress-circular-indeterminate` keyframes so reduced-motion and preset tuning follow foundation tokens, and use `wrap-anywhere` for label text wrapping.

### QR Code

- c7359a1: Remove the redundant line-height utility from the download trigger.

### RadioGroup

- c7359a1: Remove dead indicator transition declarations and tie the slide timing to the foundation duration token through Ark's `--transition-duration`, so reduced-motion and preset tuning apply to the indicator.

### RatingGroup

- c7359a1: Restore the keyboard focus ring with `:focus-visible`, add reduced-motion guards to Tailwind indicators, and stop consumer `data-size` props from being overridden by the root.

### ScrollArea

- c7359a1: Keep the fade mask disabled in forced-colors mode by gating it behind `not-forced-colors`, and use the spacing token for the mask fade size.

### ScrollArea

- c7359a1: Match the Tailwind scrollbar growth timing with the CSS Modules track.

### SegmentGroup

- c7359a1: Default the shared `useSegmentGroup` hook to horizontal orientation so `RootProvider` compositions match the `Root` default, and align the Tailwind focus-ring offset with the CSS Modules track.

### Select

- c7359a1: Position the chevron indicator from the base Indicator class in Tailwind variants so advanced customizations match the CSS Modules layout, and route the popup z-index through the popup layer token.

### Select

- c7359a1: Drive trigger end padding from the placeholder-shown state instead of a clear-trigger `has()` selector so the padding stays predictable with custom triggers, and render the clear trigger before the indicator in advanced customization examples.

### Separator

- c7359a1: Privatize the internal per-size thickness plumbing and reset Tailwind root margins; per-size theming stays on the public `--moduix-separator-thickness-*` variables.

### Sidebar

- c7359a1: Remove the dead `sidebar-input` and `sidebar-separator` slot hooks, guard owned data attributes in Tailwind variants, and add the missing navigation sub-button focus ring.

### Signature Pad

- c7359a1: Restore the 36px clear trigger default and its CSS Modules focus-ring offset in Tailwind variants, and forbid `asChild` on `Canvas` so the fixed part tree cannot silently lose children.

### Slider

- c7359a1: Keep the owned read-only hook ahead of consumer props in Solid adapters.
- Add the missing `PopupArrowIcon` and `ScrubCursorIcon` exports plus the internal icons barrel to the Solid adapters, matching the React adapters.

### Split Button

- c7359a1: Fix the trigger padding specificity against size variants, forward Solid trigger refs through the trigger composition, add the overlay portal registry dependency, and share the menu popup classes with `Menu`.
- 7d65606: Keep internal Menu and Toggle recipes out of public component entry points.

### Steps

- c7359a1: Add the missing Next trigger hover to Tailwind variants and remove dead disabled-state defenses from prev/next triggers.

### Swap

- c7359a1: Keep the owned animation hook ahead of consumer props in every adapter and drop class declarations pinned by Ark inline styles.

### Switch

- c7359a1: Keep checked invalid borders visible in Tailwind variants, guard the owned size hook against consumer overrides, and align the width fallback geometry.

### Table

- c7359a1: Guard owned data hooks from consumer overrides in Tailwind variants, left-align Tailwind column headers, scope striped rows to the body, and add reduced-motion and hover guards.

### Tabs

- c7359a1: Tie the Tailwind indicator motion to foundation duration tokens so reduced-motion and preset tuning apply, keep the owned variant hook authoritative in every adapter, and drop the redundant vertical guard from the CSS Modules line selectors.

### Tag

- c7359a1: Match the Tailwind close-trigger hover alpha with the CSS Modules track.

### Tags Input

- c7359a1: Hide item delete triggers in read-only state so the presentation matches the documented contract, gate the delete-trigger hover behind pointer-capable media, and align Tailwind hover and focus details with CloseButton defaults.

### Text

- c7359a1: Make line clamp win over truncate deterministically in Tailwind variants instead of relying on generated CSS order.

### Timer

- c7359a1: Export `TimerSegmentsProps` from the React adapter so `@moduix/react/timer` types match the other adapters, and add reduced-motion guards to Tailwind action triggers.

### Toast

- c7359a1: Bake the closed-state easing into Tailwind transition shorthands, add reduced-motion parity, gate the action trigger hover behind pointer-capable media, and remove the never-functional close transition and z-index hooks along with stale documented defaults.

### Table of Contents

- c7359a1: Keep `useToc` reactive to late props in Solid adapters, apply full root props in the React `RootProvider`, expose the nav color variable, align the link focus ring and reduced-motion behavior between tracks, and document the `autoScroll` default.

### Toggle Group

- c7359a1: Compose items from the exported toggle variants instead of a duplicated recipe, re-export the composition types from the React adapter, and align the unselected item color with the documented color bridge contract.

### Toggle

- c7359a1: Render icon sizes square by moving the base minimum height into the size variants and restore the missing focus ring in the solid-tailwind variant.

### Tooltip

- c7359a1: Correct the documented shadow default, drop dead arrow declarations and the positioner max-height, theme the arrow size through the spacing token, add a popup z-index fallback to the Tailwind positioner, and export root props types from the React adapters.

### Tour

- c7359a1: Correct the documented content transition default to the popup motion tokens, align the spotlight layer index with backdrop and content, and export root props types from the React adapters.

### Tree View

- c7359a1: Render the checkbox indicator inside its documented `data-slot` wrapper in React adapters, share the Tailwind row recipe between branch control and item, and gate row hover behind pointer-capable media in CSS Modules.

### Typeset

- c7359a1: Tokenize the mark highlight and link focus ring, and document that `TypesetScroll` is designed to live inside a `Typeset` boundary.

## 2.0.0

### Major Changes

- c7359a1: Align the Solid and Tailwind adapter majors on the 2.x line now that the component set, contracts, tests, and styling tracks are in full parity with the React adapters.
  This alignment release carries no breaking API changes; the component fixes it ships are listed in this release.

### Minor Changes

### AngleSlider

- c7359a1: Redesign the dial as a circular track that fills from the top with a masked conic-gradient arc, a circle thumb matching the linear Slider, and the value text centered in the dial.
  `AngleSliderDial` now renders the centered `ValueText` between `Control` children and `Thumb`; the pointer press suppresses the keyboard focus ring during and after the drag while keyboard focus keeps its ring.
  The public `--moduix-angle-slider-*` variable set was retuned; the needle thumb, inner disc, center dot, and track/control border variables were removed.

### Patch Changes

### Carousel

- c7359a1: Use the ring color token for control hover and pressed border instead of a border/foreground mix.
- c7359a1: Keep component-owned `data-*` attributes applied after forwarded props in all components.

  Consumer-supplied `data-*` props no longer override `data-scope`, `data-part`, `data-slot`, `data-tone`, `data-indicator-position`, `data-size`, `data-variant`, and other state hooks that styles and tests rely on.

### Highlight

- c7359a1: Replace arbitrary box-decoration utilities with `box-decoration-clone` in Tailwind variants and drop the no-op font reset from CSS Modules variants.

### JsonTreeView

- c7359a1: Group the duplicated branch-control and item utility pairs in Tailwind variants and document that indentation guides ship unstyled.

### JsonTreeView

- c7359a1: Extract the duplicated Tailwind root class string into a shared constant, map `theme()` colors to CSS variables, and gate the row hover highlight behind pointer-capable media.

### Navigation Menu

- c7359a1: Expose `useNavigationMenu` from the NavigationMenu component entry point in Solid adapters, matching the React adapters.

### NumberInput

- c7359a1: Remove dead `data-focus` styles on triggers and input, bare `data-invalid` styles on triggers, and the no-op `border-x-current` utility.

### Pagination

- c7359a1: Treat explicit `false` children as empty triggers so they keep the fixed icon-trigger footprint, align the text-trigger padding fallback with the item default, and drop redundant line-height utilities from Tailwind variants.

### PasswordInput

- c7359a1: Route Solid `defaultValue` through a single force-prop mechanism and gate hover styles behind pointer-capable media while keyboard focus highlighting stays intact.
  Also exposes `PasswordInput`, `usePasswordInput`, and `usePasswordInputContext` as named exports from the React adapter and removes redundant line-height utilities from Tailwind variants.

### PinInput

- c7359a1: Remove redundant line-height utilities from Label and Input so presets can retune them.

### Popover

- c7359a1: Point the Tailwind arrow size at the real spacing token so the default arrow renders at full size again.

### Popover

- c7359a1: Align the header clear-icon reserve with the CSS Modules descendant rule, theme the arrow size through the spacing token, and export `PopoverRootProps` and `PopoverRootProviderProps` types from the React adapters.

### ProgressCircular

- c7359a1: Move the Tailwind indeterminate ring animation to the shared `moduix-progress-circular-indeterminate` keyframes so reduced-motion and preset tuning follow foundation tokens, and use `wrap-anywhere` for label text wrapping.

### QR Code

- c7359a1: Remove the redundant line-height utility from the download trigger.

### RadioGroup

- c7359a1: Remove dead indicator transition declarations and tie the slide timing to the foundation duration token through Ark's `--transition-duration`, so reduced-motion and preset tuning apply to the indicator.

### RatingGroup

- c7359a1: Restore the keyboard focus ring with `:focus-visible`, add reduced-motion guards to Tailwind indicators, and stop consumer `data-size` props from being overridden by the root.

### ScrollArea

- c7359a1: Keep the fade mask disabled in forced-colors mode by gating it behind `not-forced-colors`, and use the spacing token for the mask fade size.

### ScrollArea

- c7359a1: Match the Tailwind scrollbar growth timing with the CSS Modules track.

### SegmentGroup

- c7359a1: Default the shared `useSegmentGroup` hook to horizontal orientation so `RootProvider` compositions match the `Root` default, and align the Tailwind focus-ring offset with the CSS Modules track.

### Select

- c7359a1: Position the chevron indicator from the base Indicator class in Tailwind variants so advanced customizations match the CSS Modules layout, and route the popup z-index through the popup layer token.

### Select

- c7359a1: Drive trigger end padding from the placeholder-shown state instead of a clear-trigger `has()` selector so the padding stays predictable with custom triggers, and render the clear trigger before the indicator in advanced customization examples.

### Separator

- c7359a1: Privatize the internal per-size thickness plumbing and reset Tailwind root margins; per-size theming stays on the public `--moduix-separator-thickness-*` variables.

### Sidebar

- c7359a1: Remove the dead `sidebar-input` and `sidebar-separator` slot hooks, guard owned data attributes in Tailwind variants, and add the missing navigation sub-button focus ring.

### Signature Pad

- c7359a1: Restore the 36px clear trigger default and its CSS Modules focus-ring offset in Tailwind variants, and forbid `asChild` on `Canvas` so the fixed part tree cannot silently lose children.

### Slider

- c7359a1: Keep the owned read-only hook ahead of consumer props in Solid adapters.

### Split Button

- c7359a1: Fix the trigger padding specificity against size variants, forward Solid trigger refs through the trigger composition, add the overlay portal registry dependency, and share the menu popup classes with `Menu`.

### Steps

- c7359a1: Add the missing Next trigger hover to Tailwind variants and remove dead disabled-state defenses from prev/next triggers.

### Swap

- c7359a1: Keep the owned animation hook ahead of consumer props in every adapter and drop class declarations pinned by Ark inline styles.

### Switch

- c7359a1: Keep checked invalid borders visible in Tailwind variants, guard the owned size hook against consumer overrides, and align the width fallback geometry.

### Table

- c7359a1: Guard owned data hooks from consumer overrides in Tailwind variants, left-align Tailwind column headers, scope striped rows to the body, and add reduced-motion and hover guards.

### Tabs

- c7359a1: Tie the Tailwind indicator motion to foundation duration tokens so reduced-motion and preset tuning apply, keep the owned variant hook authoritative in every adapter, and drop the redundant vertical guard from the CSS Modules line selectors.

### Tag

- c7359a1: Match the Tailwind close-trigger hover alpha with the CSS Modules track.

### Tags Input

- c7359a1: Hide item delete triggers in read-only state so the presentation matches the documented contract, gate the delete-trigger hover behind pointer-capable media, and align Tailwind hover and focus details with CloseButton defaults.

### Text

- c7359a1: Make line clamp win over truncate deterministically in Tailwind variants instead of relying on generated CSS order.

### Timer

- c7359a1: Export `TimerSegmentsProps` from the React adapter so `@moduix/react/timer` types match the other adapters, and add reduced-motion guards to Tailwind action triggers.

### Toast

- c7359a1: Bake the closed-state easing into Tailwind transition shorthands, add reduced-motion parity, gate the action trigger hover behind pointer-capable media, and remove the never-functional close transition and z-index hooks along with stale documented defaults.

### Table of Contents

- c7359a1: Keep `useToc` reactive to late props in Solid adapters, apply full root props in the React `RootProvider`, expose the nav color variable, align the link focus ring and reduced-motion behavior between tracks, and document the `autoScroll` default.

### Toggle Group

- c7359a1: Compose items from the exported toggle variants instead of a duplicated recipe, re-export the composition types from the React adapter, and align the unselected item color with the documented color bridge contract.

### Toggle

- c7359a1: Render icon sizes square by moving the base minimum height into the size variants and restore the missing focus ring in the solid-tailwind variant.

### Tooltip

- c7359a1: Correct the documented shadow default, drop dead arrow declarations and the positioner max-height, theme the arrow size through the spacing token, add a popup z-index fallback to the Tailwind positioner, and export root props types from the React adapters.

### Tour

- c7359a1: Correct the documented content transition default to the popup motion tokens, align the spotlight layer index with backdrop and content, and export root props types from the React adapters.

### Tree View

- c7359a1: Render the checkbox indicator inside its documented `data-slot` wrapper in React adapters, share the Tailwind row recipe between branch control and item, and gate row hover behind pointer-capable media in CSS Modules.

### Typeset

- c7359a1: Tokenize the mark highlight and link focus ring, and document that `TypesetScroll` is designed to live inside a `Typeset` boundary.

## 1.1.1

### Patch Changes

### CommandPalette

- cbcda2a: Use the Ark UI Hotkeys export consistently across all adapters.

## 1.1.0

### Minor Changes

- 7af13b7: Fix reviewed component contracts, including stable styling hooks, Alert live-region semantics, Container width with `gutter="none"`, and Solid CommandPalette clear cancellation. Remove unsupported AngleSlider and Carousel API surface, and simplify Button styling internals.

### Patch Changes

- 7af13b7: Align component contracts across framework and styling adapters.
- 7af13b7: Preserve internal `data-slot` hooks and fix Tour overlay layering.

## 1.0.0

### Major Changes

- f022e4e: Publish the complete Tailwind CSS v4 component package with the same component subpaths as the CSS Modules distribution.
  Includes framework-native package exports, shared styles, presets, and shadcn-compatible registry items.

### Minor Changes

### Sidebar

- a333616: Add NavigationBadge for counts alongside navigation buttons.
- 9a1018a: Add explicit Menu viewport composition and preserve Solid bound button handlers.

### Alert

- 20bb7e9: Require `AlertContent` to contain title, description, actions, and other message content.

### Patch Changes

### AspectRatio

- f022e4e: Limit default styling to the ratio container.
  Media sizing, fitting, clipping, and border radius are now consumer-owned, and `--moduix-aspect-ratio-radius` is removed.

### Badge

- f022e4e: Keep direct children unchanged and limit built-in interaction styling to links.
  Use `BadgeLabel` explicitly for truncation; button hover and disabled presentation are now consumer-owned, and `--moduix-badge-opacity-disabled` is removed.