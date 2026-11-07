<script lang="ts">
  import { TagsInputLabel, type TagsInputLabelProps } from '@ark-ui/svelte/tags-input';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TagsInputLabelProps = $props();
</script>

<TagsInputLabel
  {...props}
  bind:ref
  class={cn('inline-flex items-center gap-1 text-sm leading-5 font-medium', className)}
  data-slot="tags-input-label"
/>