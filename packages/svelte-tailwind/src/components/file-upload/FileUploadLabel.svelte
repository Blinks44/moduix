<script lang="ts">
  import { FileUploadLabel, type FileUploadLabelProps } from '@ark-ui/svelte/file-upload';
  import { cn } from '@/lib/moduix/cn';
  const disabledClass =
    'data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

  let { class: className, ref = $bindable(null), ...props }: FileUploadLabelProps = $props();
</script>

<FileUploadLabel
  {...props}
  bind:ref
  class={cn('text-sm leading-5 font-medium', disabledClass, className)}
  data-slot="file-upload-label"
/>