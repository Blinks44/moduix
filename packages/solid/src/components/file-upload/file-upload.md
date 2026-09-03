# FileUpload (Solid)

`FileUpload` preserves the React component's Ark-backed file selection, drag-and-drop, validation,
preview, removal, native form, provider, and context contracts.

## Composition

```tsx
import { FileUpload } from '@moduix/solid/file-upload';

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

`FileUpload.Root` and `FileUpload.RootProvider` render the Ark hidden input automatically. Use
`name`, `form`, `required`, `disabled`, `readOnly`, and the other Ark file-upload props for native
form behavior and validation. `FileUpload.Context`, `useFileUpload`, and
`useFileUploadContext` expose the unchanged Ark state and callback details.

## Solid composition

Ark Solid uses a render-function `asChild` prop:

```tsx
<FileUpload asChild={(props) => <section {...props()} aria-label="Attachments" />}>
  <FileUpload.Label>Attachments</FileUpload.Label>
  <FileUpload.Trigger>Choose files</FileUpload.Trigger>
</FileUpload>
```

Ordinary refs are forwarded to rendered Ark parts. Ark Solid does not forward refs through
`asChild`, so custom-host composition and ordinary refs are supported as separate native paths.
`Dropzone.disableClick` remains required when a nested `Trigger` opens the file picker.

The `Items` convenience part renders image previews for `image/*` files and a generic file icon
for other files, including files whose filename looks like an image but has no image MIME type.
Use explicit `Context` composition for rejected files or MIME-specific previews.