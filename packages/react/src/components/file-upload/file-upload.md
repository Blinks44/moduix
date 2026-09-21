# FileUpload

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/file-upload
- Chakra UI: https://chakra-ui.com/docs/components/file-upload

## Purpose

`FileUpload` lets users select, drag, preview, validate, and remove files while preserving native form integration.

## Upstream model to preserve

The wrapper follows Ark UI React `@ark-ui/react/file-upload`. Keep the Ark part tree, accepted/rejected file state,
callback detail objects, the explicit native form input, `FileUploadRootProvider`, context, and state hooks intact.

## Current behavior contract

- `FileUpload` and `FileUploadRootProvider` are thin styled wrappers over Ark primitives.
- Controlled state uses Ark `acceptedFiles`; uncontrolled state uses `defaultAcceptedFiles`.
- `onFileChange(details)`, `onFileAccept(details)`, and `onFileReject(details)` keep Ark detail objects unchanged.
- Validation uses Ark props such as `accept`, `maxFiles`, `minFileSize`, `maxFileSize`, `validate`, and
  `transformFiles`.
- Compose `FileUploadHiddenInput` explicitly inside `FileUpload` or `FileUploadRootProvider` when native file selection
  or form participation is needed. Set `name` and `required` on the root, and `form` on `FileUploadHiddenInput` for an external form.
- `FileUploadDropzone.disableClick` should be used when a nested `FileUploadTrigger` opens the file picker.

## Anatomy and exported parts

```text
FileUpload | FileUploadRootProvider
├─ FileUploadLabel
├─ FileUploadDropzone (optional)
│  ├─ FileUploadDropzoneIcon
│  └─ FileUploadTrigger
├─ FileUploadTrigger (when no dropzone is used)
├─ FileUploadItemGroup[type]
│  ├─ FileUploadItems (compact accepted-file sugar)
│  └─ FileUploadContext
│     └─ FileUploadItem[file]
│        ├─ FileUploadItemPreview[type]
│        │  ├─ FileUploadItemPreviewImage
│        │  └─ FileUploadItemPreviewIcon
│        ├─ FileUploadItemName
│        ├─ FileUploadItemMetadata[file]
│        ├─ FileUploadItemSizeText
│        └─ FileUploadItemDeleteTrigger
├─ FileUploadClearTrigger
└─ FileUploadHiddenInput (explicit)
```

- `FileUpload` -> `data-slot="file-upload-root"`
- `FileUploadRootProvider` -> `data-slot="file-upload-root-provider"`
- `FileUploadContext` -> Ark context render-prop export
- `FileUploadLabel` -> `data-slot="file-upload-label"`
- `FileUploadDropzone` -> `data-slot="file-upload-dropzone"`
- `FileUploadDropzoneIcon` -> `data-slot="file-upload-dropzone-icon"`
- `FileUploadTrigger` -> `data-slot="file-upload-trigger"`
- `FileUploadItemGroup` -> `data-slot="file-upload-item-group"`
- `FileUploadItem` -> `data-slot="file-upload-item"`
- `FileUploadItems` -> renders image cards and file rows with a preview, name, metadata, and delete control
- `FileUploadItemPreview` -> `data-slot="file-upload-item-preview"`
- `FileUploadItemPreviewImage` -> `data-slot="file-upload-item-preview-image"`
- `FileUploadItemPreviewIcon` -> `data-slot="file-upload-item-preview-icon"`
- `FileUploadItemName` -> `data-slot="file-upload-item-name"`
- `FileUploadItemMetadata` -> `data-slot="file-upload-item-metadata"`; renders file type and `FileUploadItemSizeText`
- `FileUploadItemSizeText` -> `data-slot="file-upload-item-size-text"`
- `FileUploadItemDeleteTrigger` -> `data-slot="file-upload-item-delete-trigger"`
- `FileUploadClearTrigger` -> `data-slot="file-upload-clear-trigger"`

## Composition

Canonical composition:

```tsx
import {
  FileUpload,
  FileUploadClearTrigger,
  FileUploadContext,
  FileUploadDropzone,
  FileUploadDropzoneIcon,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemMetadata,
  FileUploadItemName,
  FileUploadItems,
  FileUploadItemPreview,
  FileUploadItemPreviewIcon,
  FileUploadItemPreviewImage,
  FileUploadItemSizeText,
  FileUploadLabel,
  FileUploadRootProvider,
  FileUploadTrigger,
} from '@moduix/react/file-upload';

export function FileUploadDemo() {
  return (
    <FileUpload maxFiles={3}>
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadTrigger>Choose files</FileUploadTrigger>
      <FileUploadItemGroup>
        <FileUploadItems />
      </FileUploadItemGroup>
      <FileUploadHiddenInput />
    </FileUpload>
  );
}
```

## Upstream feature coverage

- Basic upload: supported with `FileUpload`, `FileUploadLabel`, `FileUploadTrigger`, `FileUploadItemGroup`, and `FileUploadItem`.
- File previews: `FileUploadItems` shows image thumbnails only when `file.type` starts with `image/`; otherwise it uses the
  generic file icon. This prevents Ark `FileUploadItemPreviewImage` from receiving a filename-only image without a MIME type.
  `FileUploadItemPreview.type` is a regular expression predicate, so custom composition must render one matching preview per
  file rather than a matching part plus the `type=".*"` fallback.
- Clear trigger: supported with `FileUploadClearTrigger`; its default path composes Ark behavior with
  `CloseButton` and uses the standard close icon.
- Dropzone: supported with `FileUploadDropzone`; use `disableClick` when a nested `FileUploadTrigger` is rendered.
- Accepted file types: supported through `accept`.
- Rejected files and errors: supported through `FileUploadContext.rejectedFiles`,
  `FileUploadItemGroup type="rejected"`, and validation props.
- Error handling: supported through `onFileReject(details)`, `validate`, `maxFiles`, `maxFileSize`, `minFileSize`,
  and `accept`.
- Initial files: supported through `defaultAcceptedFiles`.
- Controlled files: supported through `acceptedFiles` and `onFileChange(details)`.
- Forms and fields: supported through `FileUpload` props such as `name`, `required`, `invalid`, `disabled`, and `readOnly`
  props plus Ark `Field` / `Fieldset` context.
- Directory upload: supported through `directory`; consumers can read `file.webkitRelativePath`.
- Media capture: supported through `capture`.
- Pasting files: supported through `useFileUpload()` with `FileUploadRootProvider` and `setClipboardFiles()`.
- File transforms: supported through `transformFiles(files)`.
- Root provider is preserved through `FileUploadRootProvider`. `FileUploadContext`, `useFileUpload()`, and
  `useFileUploadContext()` are re-exported from moduix without changing Ark contracts.

## Accessibility and state

- Ark owns keyboard, pointer, focus, drag/drop, file input, and form behavior.
- `FileUploadLabel` labels the hidden file input and trigger through Ark-generated IDs.
- Refs forward to the underlying public Ark DOM part, including `FileUploadHiddenInput`.
- `Field` and `Fieldset` can provide disabled, invalid, required, and read-only context.
- Ark applies `data-scope="file-upload"`, part-specific `data-part`, and state attributes including
  `data-disabled`, `data-readonly`, `data-invalid`, `data-required`, `data-dragging`, and `data-type`.
- Use the `ids` root prop when external labels or descriptions need stable accessibility IDs.

## Defaults and styling

The upload trigger and standard file rows follow the shared `--moduix-size-md` baseline; preview rows can
grow with their content.

- `className` is supported on every visual part. `FileUploadItems` intentionally has no configuration surface: image files are
  compact vertical cards with a thumbnail, name, and metadata; other files are horizontal rows with an icon, name,
  type, and localized size. Custom rows use the explicit context composition.
- `FileUploadDropzoneIcon` defaults to the moduix `UploadIcon` when children are omitted.
- `FileUploadItemPreview` defaults to `var(--moduix-spacing-10)` (2.5rem) square for a file row; item names clamp to one line so
  long names do not increase row height.
- `--moduix-file-upload-item-preview-icon-size` controls fallback preview glyphs, while
  `--moduix-file-upload-image-item-max-width` caps compact image cards without hard-wiring consumer layout.
- `FileUploadItemDeleteTrigger` defaults to the moduix `TrashIcon` when children are omitted.
- `FileUploadClearTrigger` composes the shared `CloseButton` by default. It uses the moduix `CloseIcon` and the accessible
  name `Clear files` when children are omitted; text children retain the expanded action layout.
- Public styling hooks are Ark `data-scope` / `data-part`, Ark state attributes, and moduix `data-slot`.
- Public component tokens live under `--moduix-file-upload-*` in `packages/foundation/src/styles/variables-moduix.css`.
- Item layout selectors use the public `data-slot` hooks for previews and size text.
- The item metadata separator uses logical inline spacing, so its rhythm follows RTL text flow.
- Empty `FileUploadItemGroup` parts are hidden so they do not add root spacing before accepted or rejected files exist.
- No Ark runtime CSS variables are required by this primitive.

## Intentional sugar and differences from upstream

- moduix adds styling defaults and stable `data-slot` attributes.
- moduix adds a decorative `FileUploadDropzoneIcon` helper for upload surfaces.
- moduix adds `FileUploadItemPreviewIcon` and includes image and fallback previews in `FileUploadItems`; explicit `FileUploadItemPreview` matching
  remains available for MIME-specific previews such as videos and PDFs.
- moduix adds default icons for dropzone and delete triggers, and composes the shared `CloseButton`
  for the clear trigger.
- The wrapper exposes the native form input explicitly. `FileUploadItemGroup` and `FileUploadItem` remain explicit so
  consumers choose how to show accepted and rejected files.
- Callback details and validation errors are not renamed.
- moduix re-exports Ark context and state hooks through its package barrel, and exports `FileUploadContext` as a named value.
- `FileUploadItems` is an accepted-file list for common attachment flows; it renders an image card or file row using
  `FileUploadItemPreview`, `FileUploadItemName`, `FileUploadItemMetadata`, and the default icon-only `FileUploadItemDeleteTrigger`. Use the explicit
  `FileUploadContext` composition for MIME-specific previews, rejected files, or custom rows; select exactly one preview per
  file so a fallback does not overlap a matching image preview.

## Agent notes

- Document form behavior through root props and an explicit `FileUploadHiddenInput`.
- Keep `FileUploadDropzone.disableClick` in examples that nest `FileUploadTrigger` inside `FileUploadDropzone`.
- Do not add local file-state adapters; Ark already supports controlled and uncontrolled modes.
- Keep docs, stories, registry, local markdown, and `--moduix-file-upload-*` variables synchronized when the part tree or
  styling contract changes.

## Local changelog

- 2026-09-21: Replaced the compound `FileUpload.*` value surface with the shared flat API. `FileUpload` is now the only root value, and every other part uses a `FileUpload`-prefixed named export.

- 2026-07-27: Added a visible keyboard focus ring for clickable dropzones, corrected the default clear-action name,
  and prevented disabled descendants from receiving compounded opacity.
- 2026-08-10: Use the generic preview for filename-only images without an `image/*` MIME type, matching Ark
  `FileUploadItemPreviewImage` requirements.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Aligned the default upload trigger with the Button `md` baseline.

- 2026-07-19: Switched item-metadata separator spacing to a logical inline property for RTL.
- 2026-07-19: Increased the default file-row preview box to `var(--moduix-spacing-10)` (2.5rem) and clamped item names to
  one line.

- 2026-07-19: Fixed default and documentation preview composition to render one image or fallback preview per file.

- 2026-07-19: Added `FileUploadItemMetadata` and redesigned default accepted files as image cards or metadata-rich file rows.

- 2026-07-19: Added default image and generic-file previews to `FileUploadItems`, plus `FileUploadItemPreviewIcon` for explicit
  MIME-matched preview composition.

- 2026-07-17: Composed the default clear trigger with `CloseButton`, preserving Ark state,
  translations, and `asChild` composition while mapping clear-action tokens to the shared styles.

- 2026-09-04: Exposed Ark `FileUploadHiddenInput` explicitly and removed root child mutation.
- 2026-07-13: Native form controls were rendered automatically at this point in the wrapper history.

- 2026-07-10: Added moduix-owned context and state-hook exports plus `FileUploadItems` for compact accepted-file lists. The
  recommended composition now uses `FileUploadItems`; explicit context composition remains available for custom file rows.
- 2026-07-02: Removed duplicate Ark context, hook, and type exports from the moduix surface. Kept `FileUploadRootProvider`,
  explicit visual parts, and the existing icon sugar.
- 2026-06-25: Added public docs coverage for `FileUploadClearTrigger`, completed the CSS variables reference, switched item
  layout selectors to `data-slot`, and normalized fractional fallback sizes to the component spacing scale.
- 2026-06-22: Hid empty `FileUploadItemGroup` parts to remove extra root gap before files are selected.
- 2026-06-22: Added the Ark UI `FileUpload` component family, CSS Modules styling, provider/context exports, local
  docs, stories, public package export, and registry integration.
