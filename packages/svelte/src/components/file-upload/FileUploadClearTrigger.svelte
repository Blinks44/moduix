<script lang="ts">
  import {
    FileUploadClearTrigger,
    type FileUploadClearTriggerProps,
  } from '@ark-ui/svelte/file-upload';

  let { ref = $bindable(null), ...props }: FileUploadClearTriggerProps = $props();
</script>

<FileUploadClearTrigger {...props} bind:ref data-slot="file-upload-clear-trigger" />