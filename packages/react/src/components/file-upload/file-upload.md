# FileUpload

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/file-upload
- Chakra UI: https://chakra-ui.com/docs/components/file-upload

## Purpose

`FileUpload` lets users select, drag, preview, validate, and remove files while preserving native form integration.

## Upstream model to preserve

The wrapper follows Ark UI React `@ark-ui/react/file-upload`. Keep the Ark part tree, accepted/rejected file state,
callback detail objects, the internally rendered native form input, `RootProvider`, context, and state hooks intact.

## Current behavior contract

- `FileUpload.Root` and `FileUpload.RootProvider` are thin styled wrappers over Ark primitives.
- Controlled state uses Ark `acceptedFiles`; uncontrolled state uses `defaultAcceptedFiles`.
- `onFileChange(details)`, `onFileAccept(details)`, and `onFileReject(details)` keep Ark detail objects unchanged.
- Validation uses Ark props such as `accept`, `maxFiles`, `minFileSize`, `maxFileSize`, `validate`, and
  `transformFiles`.
- `Root` and `RootProvider` append the native form input automatically. Configure native form behavior
  with their Ark props such as `name`, `form`, and `required`.
- `Dropzone.disableClick` should be used when a nested `Trigger` opens the file picker.

## Anatomy and exported parts

```text
FileUpload.Root | FileUpload.RootProvider
├─ FileUpload.Label
├─ FileUpload.Dropzone (optional)
│  ├─ FileUpload.DropzoneIcon
│  └─ FileUpload.Trigger
├─ FileUpload.Trigger (when no dropzone is used)
├─ FileUpload.ItemGroup[type]
│  ├─ FileUpload.Items (compact accepted-file sugar)
│  └─ FileUpload.Context
│     └─ FileUpload.Item[file]
│        ├─ FileUpload.ItemPreview[type]
│        │  ├─ FileUpload.ItemPreviewImage
│        │  └─ FileUpload.ItemPreviewIcon
│        ├─ FileUpload.ItemName
│        ├─ FileUpload.ItemMetadata[file]
│        ├─ FileUpload.ItemSizeText
│        └─ FileUpload.ItemDeleteTrigger
├─ FileUpload.ClearTrigger
└─ native input (automatic)
```

- `FileUpload.Root` -> `data-slot="file-upload-root"`
- `FileUpload.RootProvider` -> `data-slot="file-upload-root-provider"`
- `FileUpload.Context` -> Ark context render-prop export
- `FileUpload.Label` -> `data-slot="file-upload-label"`
- `FileUpload.Dropzone` -> `data-slot="file-upload-dropzone"`
- `FileUpload.DropzoneIcon` -> `data-slot="file-upload-dropzone-icon"`
- `FileUpload.Trigger` -> `data-slot="file-upload-trigger"`
- `FileUpload.ItemGroup` -> `data-slot="file-upload-item-group"`
- `FileUpload.Item` -> `data-slot="file-upload-item"`
- `FileUpload.Items` -> renders image cards and file rows with a preview, name, metadata, and delete control
- `FileUpload.ItemPreview` -> `data-slot="file-upload-item-preview"`
- `FileUpload.ItemPreviewImage` -> `data-slot="file-upload-item-preview-image"`
- `FileUpload.ItemPreviewIcon` -> `data-slot="file-upload-item-preview-icon"`
- `FileUpload.ItemName` -> `data-slot="file-upload-item-name"`
- `FileUpload.ItemMetadata` -> `data-slot="file-upload-item-metadata"`; renders file type and `ItemSizeText`
- `FileUpload.ItemSizeText` -> `data-slot="file-upload-item-size-text"`
- `FileUpload.ItemDeleteTrigger` -> `data-slot="file-upload-item-delete-trigger"`
- `FileUpload.ClearTrigger` -> `data-slot="file-upload-clear-trigger"`

## Composition

Canonical composition:

```tsx
import { FileUpload } from '@moduix/react';

export function FileUploadDemo() {
  return (
    <FileUpload maxFiles={3}>
      <FileUpload.Label>Attachments</FileUpload.Label>
      <FileUpload.Trigger>Choose files</FileUpload.Trigger>
      <FileUpload.ItemGroup>
        <FileUpload.Items />
      </FileUpload.ItemGroup>
    </FileUpload>
  );
}
```

## Upstream feature coverage

- Basic upload: supported with `Root`, `Label`, `Trigger`, `ItemGroup`, and `Item`.
- File previews: `Items` shows image thumbnails and a generic file icon by default. `ItemPreview.type` is a regular
  expression predicate, so custom composition must render one matching preview per file rather than a matching part
  plus the `type=".*"` fallback.
- Clear trigger: supported with `ClearTrigger`; its default path composes Ark behavior with
  `CloseButton` and uses the standard close icon.
- Dropzone: supported with `Dropzone`; use `disableClick` when a nested `Trigger` is rendered.
- Accepted file types: supported through `accept`.
- Rejected files and errors: supported through `FileUpload.Context.rejectedFiles`,
  `ItemGroup type="rejected"`, and validation props.
- Error handling: supported through `onFileReject(details)`, `validate`, `maxFiles`, `maxFileSize`, `minFileSize`,
  and `accept`.
- Initial files: supported through `defaultAcceptedFiles`.
- Controlled files: supported through `acceptedFiles` and `onFileChange(details)`.
- Forms and fields: supported through root `name`, `required`, `invalid`, `disabled`, and `readOnly`
  props plus Ark `Field.Root` / `Fieldset.Root` context.
- Directory upload: supported through `directory`; consumers can read `file.webkitRelativePath`.
- Media capture: supported through `capture`.
- Pasting files: supported through `useFileUpload()` with `RootProvider` and `setClipboardFiles()`.
- File transforms: supported through `transformFiles(files)`.
- Root provider is preserved through `FileUpload.RootProvider`. `FileUpload.Context`, `useFileUpload()`, and
  `useFileUploadContext()` are re-exported from moduix without changing Ark contracts.

## Accessibility and state

- Ark owns keyboard, pointer, focus, drag/drop, file input, and form behavior.
- `Label` labels the hidden file input and trigger through Ark-generated IDs.
- Refs forward to the underlying public Ark DOM part. The internal native input is not exposed as a
  separate ref target.
- `Field.Root` and `Fieldset.Root` can provide disabled, invalid, required, and read-only context.
- Ark applies `data-scope="file-upload"`, part-specific `data-part`, and state attributes including
  `data-disabled`, `data-readonly`, `data-invalid`, `data-required`, `data-dragging`, and `data-type`.
- Use the `ids` root prop when external labels or descriptions need stable accessibility IDs.

## Defaults and styling

The upload trigger and standard file rows follow the shared `--size-md` baseline; preview rows can
grow with their content.

- `className` is supported on every visual part. `Items` intentionally has no configuration surface: image files are
  compact vertical cards with a thumbnail, name, and metadata; other files are horizontal rows with an icon, name,
  type, and localized size. Custom rows use the explicit context composition.
- `DropzoneIcon` defaults to the moduix `UploadIcon` when children are omitted.
- `ItemPreview` defaults to `var(--spacing-10)` (2.5rem) square for a file row; item names clamp to one line so
  long names do not increase row height.
- `--file-upload-item-preview-icon-size` controls fallback preview glyphs, while
  `--file-upload-image-item-max-width` caps compact image cards without hard-wiring consumer layout.
- `ItemDeleteTrigger` defaults to the moduix `TrashIcon` when children are omitted.
- `ClearTrigger` composes the shared `CloseButton` by default. It uses the moduix `CloseIcon` when
  children are omitted; text children retain the expanded action layout.
- Public styling hooks are Ark `data-scope` / `data-part`, Ark state attributes, and moduix `data-slot`.
- Public component tokens live under `--file-upload-*` in `packages/react/src/lib/moduix/styles/theme.css`.
- Item layout selectors use the public `data-slot` hooks for previews and size text.
- The item metadata separator uses logical inline spacing, so its rhythm follows RTL text flow.
- Empty `ItemGroup` parts are hidden so they do not add root spacing before accepted or rejected files exist.
- No Ark runtime CSS variables are required by this primitive.

## Intentional sugar and differences from upstream

- moduix adds styling defaults and stable `data-slot` attributes.
- moduix adds a decorative `DropzoneIcon` helper for upload surfaces.
- moduix adds `ItemPreviewIcon` and includes image and fallback previews in `Items`; explicit `ItemPreview` matching
  remains available for MIME-specific previews such as videos and PDFs.
- moduix adds default icons for dropzone and delete triggers, and composes the shared `CloseButton`
  for the clear trigger.
- The wrapper renders the native form input internally. `ItemGroup` and `Item` remain explicit so
  consumers choose how to show accepted and rejected files.
- Callback details and validation errors are not renamed.
- moduix re-exports Ark context and state hooks through its package barrel, and exposes `Context` on the namespace.
- `Items` is an accepted-file list for common attachment flows; it renders an image card or file row using
  `ItemPreview`, `ItemName`, `ItemMetadata`, and the default icon-only `ItemDeleteTrigger`. Use the explicit
  `Context` composition for MIME-specific previews, rejected files, or custom rows; select exactly one preview per
  file so a fallback does not overlap a matching image preview.

## Agent notes

- Document form behavior through root props; the root renders the native form input automatically.
- Keep `Dropzone.disableClick` in examples that nest `Trigger` inside `Dropzone`.
- Do not add local file-state adapters; Ark already supports controlled and uncontrolled modes.
- Keep docs, stories, registry, local markdown, and `--file-upload-*` variables synchronized when the part tree or
  styling contract changes.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Aligned the default upload trigger with the Button `md` baseline.

- 2026-07-19: Switched item-metadata separator spacing to a logical inline property for RTL.
- 2026-07-19: Increased the default file-row preview box to `var(--spacing-10)` (2.5rem) and clamped item names to
  one line.

- 2026-07-19: Fixed default and documentation preview composition to render one image or fallback preview per file.

- 2026-07-19: Added `ItemMetadata` and redesigned default accepted files as image cards or metadata-rich file rows.

- 2026-07-19: Added default image and generic-file previews to `Items`, plus `ItemPreviewIcon` for explicit
  MIME-matched preview composition.

- 2026-07-17: Composed the default clear trigger with `CloseButton`, preserving Ark state,
  translations, and `asChild` composition while mapping clear-action tokens to the shared styles.

- 2026-07-13: Native form controls are now rendered automatically; the former public form-control part was removed.

- 2026-07-10: Added moduix-owned context and state-hook exports plus `Items` for compact accepted-file lists. The
  recommended composition now uses `Items`; explicit context composition remains available for custom file rows.
- 2026-07-02: Removed duplicate Ark context, hook, and type exports from the moduix surface. Kept `RootProvider`,
  explicit visual parts, and the existing icon sugar.
- 2026-06-25: Added public docs coverage for `ClearTrigger`, completed the CSS variables reference, switched item
  layout selectors to `data-slot`, and normalized fractional fallback sizes to the component spacing scale.
- 2026-06-22: Hid empty `ItemGroup` parts to remove extra root gap before files are selected.
- 2026-06-22: Added the Ark UI `FileUpload` component family, CSS Modules styling, provider/context exports, local
  docs, stories, public package export, and registry integration.