<script lang="ts">
  import { TagsInputInput, type TagsInputInputProps } from '@ark-ui/svelte/tags-input';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TagsInputInputProps = $props();
</script>

<TagsInputInput
  {...props}
  bind:ref
  class={cn(
    'h-control-xs min-w-28 shrink grow basis-28 border-0 bg-transparent px-1 text-sm leading-5 text-inherit outline-0 placeholder:text-muted-foreground data-readonly:hidden',
    className,
  )}
  data-slot="tags-input-input"
/>