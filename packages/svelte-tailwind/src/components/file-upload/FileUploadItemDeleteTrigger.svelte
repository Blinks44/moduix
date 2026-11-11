<script lang="ts">
  import {
    FileUploadItemDeleteTrigger,
    type FileUploadItemDeleteTriggerProps,
  } from '@ark-ui/svelte/file-upload';
  import { cn } from '@/lib/moduix/cn';
  import { TrashIcon } from '@/lib/moduix/icons/ui';
  const deleteClass =
    'inline-flex size-control-xs cursor-pointer appearance-none items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color] duration-normal ease-in-out [grid-area:delete] focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring disabled:cursor-default data-readonly:opacity-disabled [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):hover]:text-foreground';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: FileUploadItemDeleteTriggerProps = $props();
</script>

<FileUploadItemDeleteTrigger
  {...props}
  bind:ref
  class={cn(deleteClass, className)}
  data-slot="file-upload-item-delete-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <TrashIcon />
  {/if}
</FileUploadItemDeleteTrigger>