# FileUpload (Solid)

`FileUpload` preserves the React component's Ark-backed file selection, drag-and-drop, validation,
preview, removal, native form, provider, and context contracts.

## Composition

```tsx
import { Button } from '@moduix/solid/button';
import {
  FileUpload,
  FileUploadHiddenInput,
  FileUploadItemGroup,
  FileUploadItems,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/solid/file-upload';

export function FileUploadDemo() {
  return (
    <FileUpload maxFiles={3}>
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadTrigger asChild={(props) => <Button {...props()}>Choose files</Button>} />
      <FileUploadItemGroup>
        <FileUploadItems />
      </FileUploadItemGroup>
      <FileUploadHiddenInput />
    </FileUpload>
  );
}
```

Compose `FileUploadHiddenInput` explicitly inside `FileUpload` or `FileUploadRootProvider`. Use
`name`, `required`, `disabled`, `readOnly`, and the other Ark file-upload root props for native
form behavior and validation. `FileUploadContext`, `useFileUpload`, and
`useFileUploadContext` expose the unchanged Ark state and callback details.
Set `form` directly on `FileUploadHiddenInput` for an external form.

## Solid composition

Ark Solid uses a render-function `asChild` prop:

```tsx
<FileUpload asChild={(props) => <section {...props()} aria-label="Attachments" />}>
  <FileUploadLabel>Attachments</FileUploadLabel>
  <FileUploadTrigger asChild={(props) => <Button {...props()}>Choose files</Button>} />
  <FileUploadHiddenInput />
</FileUpload>
```

Ordinary refs are forwarded to rendered Ark parts. Ark Solid does not forward refs through
`asChild`, so custom-host composition and ordinary refs are supported as separate native paths.
`FileUploadDropzone.disableClick` remains required when a nested `FileUploadTrigger` opens the file picker.

`FileUploadTrigger` and `FileUploadClearTrigger` are unstyled; compose them with a `Button` through
`asChild`. The default delete trigger takes its accessible name from Ark `translations.deleteFile`.

The `FileUploadItems` convenience part renders image cards for `image/*` files and file rows with a
generic icon for other files, including files whose filename looks like an image but has no image MIME type.
Use explicit `FileUploadContext` composition for rejected files or MIME-specific previews.
Metadata shows the uppercase filename extension, or the MIME type / `FILE` when there is no extension.

The styling and disabled-state contract matches the React package; see the React `file-upload.md`.