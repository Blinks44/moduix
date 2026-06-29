# Splitter

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/splitter
- Zag: https://zagjs.com/components/react/splitter

## Purpose

Resizable layout primitive for dividing an interface into horizontal or vertical panels.

## Upstream model to preserve

`Splitter` is a thin wrapper over Ark UI's splitter primitive and preserves the Ark part tree, percentage-based panel sizing, constraints, collapse/expand behavior, keyboard resizing, context APIs, root-provider pattern, and shared registry support for nested multi-drag layouts.

The upstream model is:

- `Root` owns `panels`, `defaultSize` / `size`, orientation, resize callbacks, ids, keyboard step, nonce, and optional `registry`.
- `Panel` renders each resizable region and requires a stable `id` matching the `panels` array.
- `ResizeTrigger` connects two adjacent panels with an id such as `"a:b"` and renders the accessible window-splitter handle.
- `ResizeTriggerIndicator` is an optional visual child of `ResizeTrigger`.
- `Context`, `useSplitterContext()`, `useSplitter()`, and `RootProvider` expose Ark state and methods without a local state layer.

## Current behavior contract

`Splitter` exposes Ark props directly. It does not translate callback details, manage sizes locally, infer panel ids, or render hidden panels. Consumers pass `panels` and render matching `Panel` / `ResizeTrigger` parts explicitly.

`Splitter.Root` and `Splitter.RootProvider` add a default inline sizing style that resolves `--splitter-width` and `--splitter-height`. This keeps moduix sizing variables effective because Ark's root props include inline `width: 100%` and `height: 100%`.

`Splitter` also exports `createSplitterRegistry` and `getSplitterLayout` from Ark. The namespaced `Splitter.createRegistry` and `Splitter.getLayout` aliases mirror Ark's namespace API.

## Anatomy and exported parts

```tsx
Splitter / Splitter.Root
├─ Splitter.Context (optional render-prop access)
├─ Splitter.Panel id="a"
├─ Splitter.ResizeTrigger id="a:b"
│  └─ Splitter.ResizeTriggerIndicator (optional)
└─ Splitter.Panel id="b"

Splitter.RootProvider
└─ same part tree connected to useSplitter()
```

| Part                              | Stable hook                                     | Notes                                                   |
| --------------------------------- | ----------------------------------------------- | ------------------------------------------------------- |
| `Splitter` / `Splitter.Root`      | `data-slot="splitter-root"`                     | Root machine, panel constraints, size state, callbacks. |
| `Splitter.RootProvider`           | `data-slot="splitter-root-provider"`            | Renders from `useSplitter()` state.                     |
| `Splitter.Panel`                  | `data-slot="splitter-panel"`                    | Resizable region, id must match a panel entry.          |
| `Splitter.ResizeTrigger`          | `data-slot="splitter-resize-trigger"`           | Accessible button handle between adjacent panels.       |
| `Splitter.ResizeTriggerIndicator` | `data-slot="splitter-resize-trigger-indicator"` | Optional visual indicator inside a resize trigger.      |
| `Splitter.Context`                | -                                               | Render-prop access to the Ark API.                      |

## Composition

```tsx
<Splitter
  panels={[
    { id: 'a', minSize: 20 },
    { id: 'b', minSize: 20 },
  ]}
  defaultSize={[40, 60]}
>
  <Splitter.Panel id="a">A</Splitter.Panel>
  <Splitter.ResizeTrigger id="a:b">
    <Splitter.ResizeTriggerIndicator />
  </Splitter.ResizeTrigger>
  <Splitter.Panel id="b">B</Splitter.Panel>
</Splitter>
```

Use `size` with `onResize(details)` for controlled layouts. Use `onResizeStart`, `onResizeEnd`, `onCollapse`, and `onExpand` with the original Ark detail objects. Use `orientation="vertical"` for stacked panels and keep a stable root height.

Use `Splitter.Context` or `useSplitterContext()` for inline or reusable child parts that need methods such as `resizePanel`, `collapsePanel`, `expandPanel`, `setSizes`, and `resetSizes`. Use `useSplitter()` plus `Splitter.RootProvider` when state must be created outside the rendered part tree.

For nested splitters that should resize together at handle intersections, create a shared registry with `createSplitterRegistry()` or `Splitter.createRegistry()` and pass it to each root.

## Upstream feature coverage

The wrapper supports the Ark examples for basic usage, context access, vertical orientation, collapsible panels, multiple panels, root-provider usage, resize indicator, dynamic collapsible behavior, and nested/shared registry layouts.

Zag notes preserved by the wrapper:

- `defaultSize` and controlled `size` are percentage arrays and should total `100`.
- `panels` defines constraints such as `minSize`, `maxSize`, `collapsible`, and `collapsedSize`.
- `keyboardResizeBy` configures arrow-key resize distance.
- `nonce` is passed through for the cursor stylesheet Ark injects.
- `ids` can be used when external composition needs stable accessibility and interaction ids.

## Accessibility and state

Ark implements the WAI-ARIA Window Splitter pattern. `ResizeTrigger` renders a button with keyboard and pointer handling, focus state, and panel relationship metadata from Ark.

Data attributes from Ark:

- `Root`: `data-scope="splitter"`, `data-part="root"`, `data-orientation`, `data-dragging`
- `Panel`: `data-scope="splitter"`, `data-part="panel"`, `data-orientation`, `data-dragging`, `data-id`, `data-index`
- `ResizeTrigger`: `data-scope="splitter"`, `data-part="resize-trigger"`, `data-id`, `data-orientation`, `data-focus`, `data-dragging`, `data-disabled`

Refs are forwarded to the actual Ark-rendered root, panel, trigger, and indicator elements. `asChild` is preserved on all Ark parts that expose it; custom trigger hosts must keep button semantics and keyboard/focus behavior.

## Defaults and styling

Every styled part accepts `className`, merged with moduix defaults through `clsx` and `normalizeClassName`. The CSS module uses flat selectors, Ark data attributes, and stable `data-slot` hooks.

The root defaults to inline `width: var(--splitter-width, 100%)` and `height: var(--splitter-height, 28rem)` plus a card background, an outer border, rounded corners, clipping, and a small shadow. Panels get `min-height: 12.5rem`, padding, `overflow: auto`, and a flat card background so adjacent panels sit flush. Vertical splitters reset panel min height through `--splitter-panel-min-height-vertical` so top/bottom panels can resize inside the fixed root height. The resize trigger contributes only a `1px` divider to layout; its transparent hit area overlaps the divider, and the line and handle stay neutral on hover, focus, and drag by default. Focus- and drag-specific variables are available for consumers that want active styling, but their fallbacks match the idle state. `ResizeTriggerIndicator` is centered absolutely over the divider and renders as a narrow rounded handle with a background fill, stable border, and shadow.

All public `--splitter-*` variables used by the component are declared in `src/lib/moduix/styles/theme.css`. Common overrides include `--splitter-height`, `--splitter-bg`, `--splitter-border-color`, `--splitter-radius`, `--splitter-shadow`, `--splitter-panel-bg`, `--splitter-panel-min-height`, `--splitter-panel-min-height-vertical`, `--splitter-panel-padding`, `--splitter-resize-trigger-size`, `--splitter-resize-trigger-line-color`, `--splitter-resize-trigger-line-color-dragging`, `--splitter-resize-trigger-indicator-bg`, `--splitter-resize-trigger-indicator-bg-dragging`, `--splitter-resize-trigger-indicator-border-color`, `--splitter-resize-trigger-indicator-border-color-dragging`, `--splitter-resize-trigger-indicator-shadow`, and `--splitter-resize-trigger-indicator-shadow-dragging`.

## Intentional sugar and differences from upstream

moduix adds visual defaults and `data-slot` hooks only. It does not add shortcut props, hidden panel composition, custom callbacks, local controlled/uncontrolled state, or inferred trigger ids.

The namespace includes `Splitter.createRegistry` and `Splitter.getLayout` to match Ark's namespace shape, while named exports expose `createSplitterRegistry` and `getSplitterLayout`.

## Agent notes

Keep `ResizeTriggerIndicator` optional and inside `ResizeTrigger`; it depends on trigger props context from Ark. Do not render both `Root` and `RootProvider` for one splitter instance. Keep `panels` ids synchronized with rendered `Panel` ids and adjacent trigger ids.

## Local changelog

- 2026-06-22: Added Ark-backed `Splitter` with styled parts, context/provider hooks, registry helpers, theme variables, docs, and registry integration.
- 2026-06-22: Refined default styling to use a thin splitter line plus rounded indicator handle, and enlarged docs/story demos for practical resizing.
- 2026-06-22: Tightened the handle and added polished panel surface defaults with minimum panel height.
- 2026-06-22: Moved the default surface to `Root` and made the resize trigger behave like a `1px` divider between flush panels.
- 2026-06-23: Centered the resize indicator over the divider, fixed vertical resizing by resetting vertical panel min height, and moved context example controls above the panels.
- 2026-06-23: Removed drag-time divider color changes so the separator stays neutral in nested splitters too.
- 2026-06-23: Added drag-state CSS variables for the divider and handle with neutral default fallbacks.
- 2026-06-23: Kept focus and drag handle styles neutral by default while preserving CSS variables for consumer opt-in styling.
- 2026-06-23: Stabilized vertical Storybook and docs examples with direct root height on first render while keeping Storybook's centered layout.
- 2026-06-27: Aligned focus styling with Ark's `data-focus` state and refreshed docs examples/CSS variable coverage after the Ark migration review.
- 2026-06-27: Moved root width/height defaults into the wrapper's inline style so `--splitter-width` and `--splitter-height` override Ark's inline root layout.