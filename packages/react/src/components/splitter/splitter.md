# Splitter

Upstream: https://ark-ui.com/docs/components/splitter

## Purpose

Resizable layout that divides an interface into horizontal or vertical panels.

## Public contract

```tsx
Splitter
├─ SplitterPanel id="a"
├─ SplitterResizeTrigger id="a:b"
│  └─ SplitterResizeTriggerIndicator (default, replaced by children)
└─ SplitterPanel id="b"

SplitterRootProvider
└─ same part tree connected to useSplitter()
```

| Part                             | `data-slot`                         |
| -------------------------------- | ----------------------------------- |
| `Splitter`                       | `splitter-root`                     |
| `SplitterRootProvider`           | `splitter-root-provider`            |
| `SplitterPanel`                  | `splitter-panel`                    |
| `SplitterResizeTrigger`          | `splitter-resize-trigger`           |
| `SplitterResizeTriggerIndicator` | `splitter-resize-trigger-indicator` |

Also exported: `SplitterContext`, `useSplitter`, `useSplitterContext`, `createSplitterRegistry`, and
`SplitterPanelData`.

- Every Ark root prop passes through (`panels`, `defaultSize` / `size`, `orientation`, callbacks,
  `keyboardResizeBy`, `registry`, `nonce`, `ids`). moduix adds no state, does not translate callback
  details, and does not infer panel or trigger ids.
- `SplitterResizeTrigger` renders `SplitterResizeTriggerIndicator` when it has no children and no
  `asChild`. Children replace the indicator; an `asChild` host never gets it.
- A native trigger gets `type="button"`, so a splitter inside a form never submits it. An `asChild`
  host keeps its own `type`.

## Preservation notes

- Ark sets inline `width: 100%` and `height: 100%` on the root. `Splitter` and `SplitterRootProvider`
  remove them, so the CSS defaults (`width: 100%`, `height: 100%`, like Ark) and consumer classes size
  the root. A `style` prop still wins. In a parent without a definite height the root takes its content
  height, so give it a height when the panels have little content or the splitter is vertical.
- Ark sets `overflow: hidden`, flex sizing, `min-*` / `max-*` constraints, and `pointer-events: none`
  during a drag inline on panels; moduix does not style those properties. Long content needs its own
  scroll container inside the panel.
- Ark sets the trigger cursor, `touch-action`, `user-select`, `flex`, and `pointer-events: none` while
  disabled, and injects a global cursor stylesheet while dragging. moduix styles do not repeat them.
- Keep `SplitterResizeTriggerIndicator` inside `SplitterResizeTrigger`; it reads the trigger props
  context. Do not render `Splitter` and `SplitterRootProvider` for one instance.

## Styling and accessibility

- Root: card surface with border, `md` radius, and `sm` shadow. Panels: `spacing-4` padding and no
  surface of their own, so adjacent panels sit flush.
- Trigger: a `1px` flex item that centers a `0.5px` line (`::before`), a transparent hit area
  (`::after`), and the indicator, all absolutely positioned at their static position. Hover and
  dragging tint the line and the indicator border with `muted-foreground` at 40% and raise the
  indicator shadow; dragging also scales the indicator.
- Keyboard `:focus-visible` draws the ring around the indicator, or around the hit area when there is
  no indicator. Dragging suppresses the ring.
- CSS variables: `--moduix-splitter-resize-trigger-line-color` and
  `--moduix-splitter-resize-trigger-size`, because the line and hit area are pseudo-elements. Change
  everything else with a class on the part. Sidebar sets both variables.
- Ark implements the WAI-ARIA Window Splitter pattern: `role="separator"`, `aria-valuenow`,
  `aria-controls`, arrow keys, Home/End, Enter, and F6. Give each trigger an accessible name.