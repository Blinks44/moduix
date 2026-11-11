<script lang="ts">
  import { EditablePreview, type EditablePreviewProps } from '@ark-ui/svelte/editable';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: EditablePreviewProps = $props();
</script>

<EditablePreview
  {...props}
  bind:ref
  class={cn(
    'w-full min-w-0 cursor-text bg-transparent wrap-anywhere whitespace-pre-wrap text-inherit outline-0 aria-readonly:cursor-default data-disabled:cursor-default data-placeholder-shown:text-muted-foreground',
    className,
  )}
  data-slot="editable-preview"
/>