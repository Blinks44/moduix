<script lang="ts">
  import { TagsInputItemText, type TagsInputItemTextProps } from '@ark-ui/svelte/tags-input';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TagsInputItemTextProps = $props();
</script>

<TagsInputItemText
  {...props}
  bind:ref
  class={cn('min-w-0 truncate', className)}
  data-slot="tags-input-item-text"
/>