<script lang="ts">
  import { TagsInputItemPreview, type TagsInputItemPreviewProps } from '@ark-ui/svelte/tags-input';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TagsInputItemPreviewProps = $props();

  const itemPreviewClass =
    'inline-flex min-h-control-xs max-w-full min-w-0 items-center gap-1 rounded-full border border-transparent bg-secondary px-2 py-0.5 text-xs leading-4 font-medium text-secondary-foreground transition-shadow duration-normal ease-in-out data-highlighted:ring-1 data-highlighted:ring-ring';
</script>

<TagsInputItemPreview
  {...props}
  bind:ref
  class={cn(itemPreviewClass, className)}
  data-slot="tags-input-item-preview"
/>