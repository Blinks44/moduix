# FileUpload (Solid)

`FileUpload` preserves the React component's Ark-backed file selection, drag-and-drop, validation,
preview, removal, native form, provider, and context contracts.

## Composition

```tsx
import {
  FileUpload,
  FileUploadContext,
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
      <FileUploadTrigger>Choose files</FileUploadTrigger>
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
  <FileUploadTrigger>Choose files</FileUploadTrigger>
  <FileUploadHiddenInput />
</FileUpload>
```

Ordinary refs are forwarded to rendered Ark parts. Ark Solid does not forward refs through
`asChild`, so custom-host composition and ordinary refs are supported as separate native paths.
`FileUploadDropzone.disableClick` remains required when a nested `FileUploadTrigger` opens the file picker.

The `FileUploadItems` convenience part renders image previews for `image/*` files and a generic file icon
for other files, including files whose filename looks like an image but has no image MIME type.
Use explicit `FileUploadContext` composition for rejected files or MIME-specific previews.

## Local changelog

- 2026-09-21: Replaced the compound `FileUpload.*` value surface with the shared flat API. `FileUpload` is now the only root value, and every other part uses a `FileUpload`-prefixed named export.