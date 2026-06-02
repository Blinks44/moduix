# Lightbox

Upstream primitive docs: https://base-ui.com/react/components/dialog.md

## Purpose

`Lightbox` is the moduix image-preview overlay built on top of Base UI `Dialog`. It keeps the
dialog lifecycle, focus management, escape handling, and portal behavior from Base UI, then adds:

- image-oriented default styling;
- a high-level `LightboxContent` wrapper for the common preview flow;
- `LightboxImage` as the default thumbnail-to-preview helper;
- `LightboxGallery` for delegated image capture from external markup;
- public `data-slot` hooks and `--lightbox-*` CSS variables.

Use it for image enlargement and image-only overlays. For general dialogs, use `Dialog`.

## Current behavior contract

Recommended path:

```tsx
import { Lightbox, LightboxContent, LightboxImage } from 'moduix';

export function Example() {
  return (
    <Lightbox>
      <LightboxImage
        src={thumbnail}
        fullSrc={fullSize}
        alt="Mountain ridge at sunset"
        className={styles.previewImage}
      />
      <LightboxContent />
    </Lightbox>
  );
}
```

How the default path works:

- `LightboxImage` renders the trigger image and stores the active image data for the root.
- `LightboxContent` renders the default portal, backdrop, viewport, popup, frame, and close button.
- When `LightboxContent` has no `children`, it renders the active image from `LightboxImage`.
- `fullSrc` is optional; when omitted, the preview reuses `src`.

This wrapper is intentionally image-first. If the popup content is not just a preview image, compose
the lower-level parts directly or pass explicit `children` to `LightboxContent`.

## Composition

Recommended exported parts:

```text
Lightbox
├─ LightboxTrigger
│  └─ LightboxImage (optional helper)
└─ LightboxContent
   ├─ LightboxPortal
   │  ├─ LightboxBackdrop
   │  └─ LightboxViewport
   │     ├─ LightboxCloseButton (optional)
   │     └─ LightboxPopup
   │        └─ LightboxFrame
   │           └─ content
```

Public parts and slots:

| Part                  | Slot data attribute                  | Notes                                                                         |
| --------------------- | ------------------------------------ | ----------------------------------------------------------------------------- |
| `Lightbox`            | -                                    | Root state provider, renders no element.                                      |
| `LightboxTrigger`     | `data-slot="lightbox-trigger"`       | Base UI trigger wrapper.                                                      |
| `LightboxPortal`      | `data-slot="lightbox-portal"`        | Portal wrapper for advanced composition.                                      |
| `LightboxBackdrop`    | `data-slot="lightbox-backdrop"`      | Default modal scrim.                                                          |
| `LightboxViewport`    | `data-slot="lightbox-viewport"`      | Fixed centering container.                                                    |
| `LightboxPopup`       | `data-slot="lightbox-popup"`         | The dialog popup node.                                                        |
| `LightboxContent`     | -                                    | Convenience composition; applies popup props to `LightboxPopup`.              |
| `LightboxClose`       | `data-slot="lightbox-close"`         | Low-level close primitive.                                                    |
| `LightboxCloseButton` | `data-slot="lightbox-close-button"`  | Default icon close control backed by `CloseButton`.                           |
| `LightboxFrame`       | `data-slot="lightbox-frame"`         | Centers preview content and applies image sizing styles.                      |
| `LightboxImage`       | `data-slot="lightbox-image"`         | Trigger helper for preview images.                                            |
| `LightboxGallery`     | -                                    | Delegated capture helper; renders a controlled `Lightbox` internally.         |
| default preview image | `data-slot="lightbox-content-image"` | Applied to the image rendered by `LightboxContent` when children are omitted. |

Default high-level usage:

```tsx
<Lightbox>
  <LightboxImage src={thumbnail} fullSrc={fullSize} alt="Preview image" />
  <LightboxContent />
</Lightbox>
```

Custom trigger:

```tsx
<Lightbox>
  <LightboxTrigger className={styles.triggerButton}>Open image</LightboxTrigger>
  <LightboxContent>
    <img src={fullSize} alt="Preview image" className={styles.contentImage} />
  </LightboxContent>
</Lightbox>
```

Advanced composition:

```tsx
<Lightbox>
  <LightboxImage src={thumbnail} alt="Preview image" className={styles.previewImage} />
  <LightboxPortal>
    <LightboxBackdrop />
    <LightboxViewport>
      <LightboxCloseButton />
      <LightboxPopup className={styles.popup}>
        <LightboxFrame>
          <LightboxClose nativeButton={false} render={<div />}>
            <img src={fullSize} alt="Preview image" />
          </LightboxClose>
        </LightboxFrame>
      </LightboxPopup>
    </LightboxViewport>
  </LightboxPortal>
</Lightbox>
```

Use low-level parts when you need a custom portal target, different overlay structure, custom layout
inside the popup, or a different dismissal affordance.

## Public props

`Lightbox` intentionally does not export wrapper-specific prop aliases. Most public props come
directly from Base UI `Dialog` parts, with a few narrow helper props added by moduix.

### `Lightbox`

Thin wrapper around `Dialog.Root`. Common root props include:

| Prop                   | Notes                                                                   |
| ---------------------- | ----------------------------------------------------------------------- |
| `open` / `defaultOpen` | Controlled and uncontrolled open state.                                 |
| `onOpenChange`         | State change callback.                                                  |
| `onOpenChangeComplete` | Useful when cleanup should wait for closing transitions.                |
| `modal`                | Passed through to Base UI dialog behavior.                              |
| `handle`               | Supports Base UI dialog handles; `createLightboxHandle` is re-exported. |
| `children`             | Normal dialog composition.                                              |

`Lightbox` stores the active preview image for helper-based flows. If outside code opens the root
imperatively and the content is not tied to a trigger interaction, pass explicit `children` to
`LightboxContent` or compose the popup manually.

### `LightboxImage`

`LightboxImage` is the narrow helper for the standard thumbnail-to-preview flow.

| Prop                | Type / behavior                                                            |
| ------------------- | -------------------------------------------------------------------------- |
| `src`               | Required preview image source for the trigger image.                       |
| `fullSrc`           | Optional larger asset used by `LightboxContent` when children are omitted. |
| `alt`               | Passed to both the trigger image and the default preview image.            |
| `className`         | Applied to the rendered `<img>`.                                           |
| other `<img>` props | Passed through to the rendered image element.                              |

Behavior notes:

- The helper applies the default zoom cursor styling itself.
- Clicking the helper image updates the active preview image for the root before the popup opens.
- For multi-image galleries with explicit composition, the active helper image is whichever helper
  was last activated. If you need full gallery state control, use controlled `open` state or
  `LightboxGallery`.

### `LightboxContent`

`LightboxContent` applies Base UI popup props to `LightboxPopup` and renders the default overlay
structure around it.

Helper props added by moduix:

| Prop                  | Default       | Notes                                                                           |
| --------------------- | ------------- | ------------------------------------------------------------------------------- |
| `showCloseButton`     | `true`        | Shows or hides `LightboxCloseButton`.                                           |
| `closeOnContentClick` | `true`        | Wraps the frame content in `LightboxClose` so pointer clicks close the overlay. |
| `closeLabel`          | `Close image` | Accessible label for `LightboxCloseButton`.                                     |

All other popup props such as `className`, `style`, `render`, `initialFocus`, `finalFocus`, and
transition-related Base UI props pass through to `LightboxPopup`.

Important constraint:

- When `closeOnContentClick` is `true`, clicking anywhere inside the content area closes the
  lightbox. Set `closeOnContentClick={false}` for interactive children such as links, buttons,
  media controls, or forms.

### `LightboxGallery`

`LightboxGallery` is the delegated-capture helper for external or CMS-rendered markup.

| Prop                  | Default | Notes                                                                           |
| --------------------- | ------- | ------------------------------------------------------------------------------- |
| `selector`            | `img`   | Used with `Element.closest(...)` to find the clicked or activated gallery item. |
| `rootRef`             | -       | Preferred way to scope delegated capture to a specific subtree.                 |
| `rootSelector`        | -       | String selector fallback when a ref is not practical.                           |
| `className`           | -       | Applied to the internal `LightboxContent` popup.                                |
| `closeLabel`          | -       | Forwarded to the internal `LightboxContent`.                                    |
| `showCloseButton`     | -       | Forwarded to the internal `LightboxContent`.                                    |
| `closeOnContentClick` | -       | Forwarded to the internal `LightboxContent`.                                    |

Behavior notes:

- `data-lightbox-src` is preferred over `currentSrc`, which is preferred over `src`.
- If `selector` matches a wrapper element instead of the image itself, `LightboxGallery` looks for
  the first nested `<img>` inside that matched element.
- Keyboard activation is supported only when the matched element is already keyboard-focusable.
  `LightboxGallery` does not add button semantics, labels, or `tabIndex` to arbitrary markup.

Recommended delegated usage:

```tsx
<section ref={rootRef}>
  <button type="button" className={styles.card}>
    <img src={thumbnail} data-lightbox-src={fullSize} alt="Preview image" />
  </button>
</section>
<LightboxGallery rootRef={rootRef} selector="button" />
```

For accessible galleries you fully control, prefer explicit `LightboxTrigger` or `LightboxImage`
composition over delegated capture.

### Low-level parts

`LightboxTrigger`, `LightboxPortal`, `LightboxBackdrop`, `LightboxViewport`, `LightboxPopup`, and
`LightboxClose` are thin wrappers over the corresponding Base UI dialog parts.

`LightboxCloseButton` is a thin `LightboxClose` wrapper that renders `CloseButton` by default and
defaults its `aria-label` to `Close image`.

`LightboxFrame` is a styled `div` wrapper for centering preview content inside the popup.

## Defaults and styling

The wrapper keeps styling deliberately small:

- `LightboxTrigger` only adds `cursor: zoom-in` when it renders the default trigger element.
- `LightboxImage` applies the same zoom cursor styling to the helper image.
- `LightboxContent` always renders the default portal structure unless you drop to low-level parts.
- `LightboxFrame` applies the image sizing rules to descendant `img` elements.
- `LightboxCloseButton` maps the component-local `--lightbox-close-*` variables into the shared
  `CloseButton` styling contract.

Public CSS variables from `theme.css`:

| CSS variable                      | Default                                    |
| --------------------------------- | ------------------------------------------ |
| `--lightbox-backdrop-bg`          | `var(--backdrop-bg, var(--color-overlay))` |
| `--lightbox-backdrop-blur`        | `4px`                                      |
| `--lightbox-backdrop-transition`  | `var(--transition-default)`                |
| `--lightbox-close-bg`             | `var(--color-background)`                  |
| `--lightbox-close-bg-hover`       | `var(--color-muted)`                       |
| `--lightbox-close-color`          | `var(--color-foreground)`                  |
| `--lightbox-close-color-hover`    | `var(--color-foreground)`                  |
| `--lightbox-close-icon-size`      | `0.875rem`                                 |
| `--lightbox-close-offset-right`   | `var(--spacing-4)`                         |
| `--lightbox-close-offset-top`     | `var(--spacing-4)`                         |
| `--lightbox-close-radius`         | `var(--radius-sm)`                         |
| `--lightbox-close-size`           | `2rem`                                     |
| `--lightbox-focus-ring-color`     | `var(--color-ring)`                        |
| `--lightbox-height`               | `80dvh`                                    |
| `--lightbox-image-enter-duration` | `240ms`                                    |
| `--lightbox-image-enter-scale`    | `0.9`                                      |
| `--lightbox-image-max-height`     | `80dvh`                                    |
| `--lightbox-image-max-width`      | `80vw`                                     |
| `--lightbox-image-radius`         | `var(--radius-md)`                         |
| `--lightbox-image-shadow`         | `var(--shadow-lg)`                         |
| `--lightbox-max-height`           | `80dvh`                                    |
| `--lightbox-max-width`            | `80vw`                                     |
| `--lightbox-scale`                | `0.82`                                     |
| `--lightbox-transition`           | `220ms ease`                               |
| `--lightbox-viewport-padding`     | `var(--spacing-4)`                         |
| `--lightbox-width`                | `80vw`                                     |

Public state hooks used in styles:

- `[data-starting-style]` and `[data-ending-style]` on backdrop, viewport, and popup for entry/exit
  transitions inherited from Base UI.
- `data-slot="lightbox-*"` hooks on all exported visual parts.

There are no variants, slot prop bags, `classNames` maps, or parallel styling APIs. Style through
`className`, composition, and the documented CSS variables.

## Accessibility and UX

- Base UI provides the dialog accessibility lifecycle: focus management, escape-key dismissal, portal
  behavior, and modal semantics.
- Keep a visible close affordance unless your product has a very strong reason not to. `showCloseButton`
  defaults to `true` for that reason.
- Prefer specific labels such as `Close preview` or `Close image` when multiple close controls can
  appear on one page.
- Use `LightboxTrigger` or focusable custom markup when keyboard access matters. `LightboxGallery`
  does not make arbitrary CMS markup focusable.
- `LightboxImage` is the best path for a single image trigger. For galleries with extra metadata,
  captions, or controls inside the popup, prefer explicit children or full custom composition.
- Do not rely on `closeOnContentClick` when the popup contains interactive descendants.

## Intentional differences from Base UI

- moduix ships a complete image-preview composition (`LightboxContent`) instead of exposing only raw
  dialog parts.
- `LightboxImage` and `LightboxGallery` are moduix helpers; they are not Base UI dialog APIs.
- `LightboxContent` adds `showCloseButton`, `closeOnContentClick`, and `closeLabel` as narrow DX
  sugar for the common preview workflow.
- moduix documents image-specific slots and `--lightbox-*` variables as part of the public styling
  contract.
- The local docs describe the moduix wrapper contract only. Base UI dialog docs remain the source for
  primitive-level lifecycle details not changed by the wrapper.

## Agent notes

- Preserve the thin dialog-wrapper architecture. Do not add feature flags for captions, carousels,
  thumbnails, or arbitrary gallery logic into `Lightbox` itself.
- Preserve the current exported parts and `data-slot="lightbox-*"` hooks unless the public API is
  intentionally changed.
- Keep `LightboxContent` as the high-level default path. Any new sugar must stay narrow and remove
  real repeated boilerplate.
- If `LightboxImage`, `LightboxContent`, `LightboxGallery`, styling hooks, or close-control behavior
  changes, update Storybook stories, `apps/docs/content/docs/lightbox.mdx`, and
  `apps/docs/src/components/examples/lightbox.tsx` in the same task.
- Keep the CSS properties docs in sync with `packages/ui/src/styles/theme.css`.

## Local changelog

- Rewrote the local docs around the actual moduix `Lightbox` contract instead of generic Base UI
  dialog behavior.
- Documented the exported parts, helper props, `data-slot` hooks, CSS variables, delegated gallery
  limitations, and `closeOnContentClick` interaction caveat.
- Clarified the recommended usage split between `LightboxImage`, explicit composition, and
  `LightboxGallery`.