<script lang="ts">
  import { ComboboxContent, type ComboboxContentProps } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';
  import ScrollArea from '../scroll-area/ScrollArea.svelte';
  import ScrollAreaContent from '../scroll-area/ScrollAreaContent.svelte';
  import ScrollAreaViewport from '../scroll-area/ScrollAreaViewport.svelte';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: ComboboxContentProps = $props();
</script>

<ComboboxContent
  {...props}
  bind:ref
  class={cn('flex min-h-0 flex-1 overflow-hidden outline-0', className)}
  data-slot="command-palette-list"
>
  <ScrollArea class="h-auto min-h-0 flex-1">
    <ScrollAreaViewport class="scroll-py-2">
      <ScrollAreaContent class="min-h-full p-3">
        {@render children?.()}
      </ScrollAreaContent>
    </ScrollAreaViewport>
  </ScrollArea>
</ComboboxContent>