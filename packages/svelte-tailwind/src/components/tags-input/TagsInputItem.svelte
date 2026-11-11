<script lang="ts">
  import { TagsInputItem, type TagsInputItemProps } from '@ark-ui/svelte/tags-input';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TagsInputItemProps = $props();
</script>

<TagsInputItem {...props} bind:ref class={cn('contents', className)} data-slot="tags-input-item" />