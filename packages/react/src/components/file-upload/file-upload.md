# FileUpload

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/file-upload
- Chakra UI: https://chakra-ui.com/docs/components/file-upload

## Purpose

`FileUpload` lets users select, drag, preview, validate, and remove files while preserving native form integration.

## Upstream model to preserve

The wrapper follows Ark UI React `@ark-ui/react/file-upload`. Keep the Ark part tree, accepted/rejected file state,
callback detail objects, translations, the explicit native form input, `FileUploadRootProvider`, context, and state hooks
intact.

## Current behavior contract

- Every part is a thin wrapper over the Ark part: class merge, `data-slot`, and default icons. Ark owns file state,
  validation, drag-and-drop, keyboard, form, and `Field` / `Fieldset` context.
- Controlled state uses `acceptedFiles` with `onFileChange(details)`; uncontrolled state uses `defaultAcceptedFiles`.
  `onFileChange`, `onFileAccept`, and `onFileReject` keep Ark detail objects.
- Validation uses Ark props such as `accept`, `maxFiles`, `minFileSize`, `maxFileSize`, `validate`, and `transformFiles`.
- Compose `FileUploadHiddenInput` explicitly; the trigger opens the native picker through it. Set `name` and `required`
  on the root, and `form` on `FileUploadHiddenInput` for an external form.
- Pass `disableClick` to `FileUploadDropzone` when it contains a `FileUploadTrigger`.
- `FileUploadTrigger` and `FileUploadClearTrigger` are unstyled, like the Dialog triggers. Compose them with `asChild`
  and a `Button`. Ark hides the clear trigger while no files are accepted.
- `FileUploadItemDeleteTrigger` renders `TrashIcon` when children are omitted; its accessible name comes from Ark
  `translations.deleteFile` (`delete file <name>` by default).
- The root fills its container width. Set `max-width` with a class to limit it.
- A disabled upload dims the label, dropzone, and items once; the delete button inside an item does not dim again, and
  nothing dims again inside a disabled `Field` / `Fieldset`. Read-only dims the dropzone and delete buttons.

## Anatomy and exported parts

```text
FileUpload | FileUploadRootProvider
├─ FileUploadLabel
├─ FileUploadDropzone (optional)
│  ├─ FileUploadDropzoneIcon
│  └─ FileUploadTrigger
├─ FileUploadTrigger (when no dropzone is used)
├─ FileUploadItemGroup[type]
│  ├─ FileUploadItems (accepted-file sugar)
│  └─ FileUploadContext
│     └─ FileUploadItem[file]
│        ├─ FileUploadItemPreview[type]
│        │  ├─ FileUploadItemPreviewImage
│        │  └─ FileUploadItemPreviewIcon
│        ├─ FileUploadItemName
│        ├─ FileUploadItemMetadata[file] or FileUploadItemSizeText
│        └─ FileUploadItemDeleteTrigger
├─ FileUploadClearTrigger
└─ FileUploadHiddenInput (explicit)
```

| Part                          | `data-slot`                       | Notes                                                      |
| ----------------------------- | --------------------------------- | ---------------------------------------------------------- |
| `FileUpload`                  | `file-upload-root`                | Root state, validation, and form props.                    |
| `FileUploadRootProvider`      | `file-upload-root-provider`       | Connects to `useFileUpload()` state.                       |
| `FileUploadLabel`             | `file-upload-label`               | Labels the hidden input.                                   |
| `FileUploadDropzone`          | `file-upload-dropzone`            | Drag-and-drop target.                                      |
| `FileUploadDropzoneIcon`      | `file-upload-dropzone-icon`       | Decorative circle; `UploadIcon` when children are omitted. |
| `FileUploadTrigger`           | `file-upload-trigger`             | Unstyled; compose with `asChild` and a `Button`.           |
| `FileUploadItemGroup`         | `file-upload-item-group`          | Accepted or rejected list; hidden while empty.             |
| `FileUploadItems`             | -                                 | Image cards or file rows for every accepted file.          |
| `FileUploadItem`              | `file-upload-item`                | One file.                                                  |
| `FileUploadItemPreview`       | `file-upload-item-preview`        | Matches a file by MIME type.                               |
| `FileUploadItemPreviewImage`  | `file-upload-item-preview-image`  | Thumbnail; only for `image/*` files.                       |
| `FileUploadItemPreviewIcon`   | `file-upload-item-preview-icon`   | Generic file icon.                                         |
| `FileUploadItemName`          | `file-upload-item-name`           | File name, truncated to one line.                          |
| `FileUploadItemMetadata`      | `file-upload-item-metadata`       | File type and `FileUploadItemSizeText`.                    |
| `FileUploadItemSizeText`      | `file-upload-item-size-text`      | Localized file size.                                       |
| `FileUploadItemDeleteTrigger` | `file-upload-item-delete-trigger` | Removes one file; `TrashIcon` when children are omitted.   |
| `FileUploadClearTrigger`      | `file-upload-clear-trigger`       | Unstyled; clears accepted files.                           |

`FileUploadContext`, `FileUploadHiddenInput`, `useFileUpload`, and `useFileUploadContext` are Ark values re-exported
unchanged. React and Solid also re-export the Ark part props, callback details, and hook types.

The metadata type label is the uppercase filename extension, or the MIME type / `FILE` when there is no extension.

## Composition

```tsx
import { Button } from '@moduix/react/button';
import {
  FileUpload,
  FileUploadHiddenInput,
  FileUploadItemGroup,
  FileUploadItems,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/react/file-upload';

export function FileUploadDemo() {
  return (
    <FileUpload maxFiles={3}>
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadTrigger asChild>
        <Button>Choose files</Button>
      </FileUploadTrigger>
      <FileUploadItemGroup>
        <FileUploadItems />
      </FileUploadItemGroup>
      <FileUploadHiddenInput />
    </FileUpload>
  );
}
```

For custom rows, rejected files, or MIME-specific previews, render `FileUploadContext` and select exactly one
`FileUploadItemPreview` per file: `type` is a regular expression, so a matching part plus a `type=".*"` fallback would
render two previews.

## Defaults and styling

- `FileUploadItems` renders image files (`image/*` MIME type) as compact cards up to 10rem wide with a square thumbnail,
  and other files as full-width rows with an icon, name, type, and size. A filename-only image without a MIME type uses
  the generic icon, because Ark `FileUploadItemPreviewImage` throws for non-image files.
- An item is a grid with the named areas `preview`, `name`, `meta`, and `delete`. Parts place themselves into these
  areas, so custom children without an area fill the `meta` cell.
- Styles come from foundation tokens; there are no component variables. Override with a class on the part, which wins
  over the `moduix.components` layer.
- Styling hooks: `data-slot`, Ark `data-scope="file-upload"` with `data-part`, and state attributes `data-disabled`,
  `data-readonly`, `data-invalid`, `data-required`, `data-dragging`, and `data-type`.

## Agent notes

- Do not add local file-state adapters; Ark already supports controlled and uncontrolled modes.
- Do not style `FileUploadTrigger` or `FileUploadClearTrigger`; examples compose `Button` through `asChild`.
- Do not pass a hard-coded `aria-label` to the default delete trigger; it would override Ark `translations`.
- Keep `disableClick` in examples that nest `FileUploadTrigger` inside `FileUploadDropzone`.