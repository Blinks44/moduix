<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
  import { ToastToaster, createToaster } from '@moduix/svelte/toast';

  const uploadFile = () =>
    new Promise<void>((resolve, reject) => {
      window.setTimeout(() => {
        if (Math.random() > 0.5) resolve();
        else reject(new Error('Upload failed'));
      }, 2000);
    });
  const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });

  const upload = () =>
    toaster.promise(uploadFile, {
      loading: {
        title: 'Uploading file...',
        description: 'Please wait while we upload your document.',
      },
      success: {
        title: 'Upload complete',
        description: 'Your file has been uploaded successfully.',
      },
      error: {
        title: 'Upload failed',
        description: 'Could not upload the file. Please try again.',
      },
    });
</script>

<Stack align="center" gap="3">
  <ToastToaster {toaster} />
  <Button onclick={upload}>Upload file</Button>
</Stack>