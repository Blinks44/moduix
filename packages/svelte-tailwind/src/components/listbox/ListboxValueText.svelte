<script lang="ts">
  import { ListboxValueText, type ListboxValueTextProps } from '@ark-ui/svelte/listbox';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ...props }: ListboxValueTextProps = $props();
</script>

<ListboxValueText
  {...props}
  class={cn('text-sm leading-5 text-muted-foreground', className)}
  data-slot="listbox-value-text"
/>