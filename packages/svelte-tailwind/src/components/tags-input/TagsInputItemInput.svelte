<script lang="ts">
  import { TagsInputItemInput, type TagsInputItemInputProps } from '@ark-ui/svelte/tags-input';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TagsInputItemInputProps = $props();
</script>

<TagsInputItemInput
  {...props}
  bind:ref
  class={cn(
    'h-control-xs min-w-28 shrink grow-0 basis-28 border-0 bg-transparent px-1 text-sm leading-5 text-inherit outline-0 placeholder:text-muted-foreground',
    className,
  )}
  data-slot="tags-input-item-input"
/>