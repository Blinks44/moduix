<script lang="ts">
  import {
    FileUploadHiddenInput,
    FileUploadItemGroup,
    FileUploadItems,
    FileUploadLabel,
    FileUploadRootProvider,
    useFileUpload,
  } from '@/components/file-upload';

  let rootRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ rootRef });

  const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });
  const imageWithoutMimeType = new File(['moduix'], 'moduix.png');
  const image = new File(
    [
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="24"><rect width="32" height="24" fill="red"/></svg>',
    ],
    'photo.svg',
    { type: 'image/svg+xml' },
  );

  const upload = useFileUpload({
    id: 'provider-upload',
    defaultAcceptedFiles: [image, file, imageWithoutMimeType],
    maxFiles: 3,
  });
</script>

<FileUploadRootProvider bind:ref={rootRef} value={upload} data-testid="provider">
  <FileUploadLabel>Attachments</FileUploadLabel>
  <FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup>
  <FileUploadHiddenInput />
</FileUploadRootProvider>