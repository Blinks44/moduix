<script lang="ts">
  import { FileUploadTrigger, type FileUploadTriggerProps } from '@ark-ui/svelte/file-upload';

  let { ref = $bindable(null), ...props }: FileUploadTriggerProps = $props();
</script>

<FileUploadTrigger {...props} bind:ref data-slot="file-upload-trigger" />