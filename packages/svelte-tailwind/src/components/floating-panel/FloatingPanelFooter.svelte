<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { useFloatingPanelContext } from '@ark-ui/svelte/floating-panel';
  import { cn } from '@/lib/moduix/cn';

  type Props = HTMLProps<'div'> & PolymorphicProps<'div'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();

  const floatingPanel = useFloatingPanelContext();
  const dataMinimized = $derived(
    (floatingPanel().getContentProps() as { 'data-minimized'?: string })['data-minimized'],
  );
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={cn(
    'flex flex-none items-center justify-end gap-2 border-t border-border px-3 py-1 text-xs text-muted-foreground data-minimized:hidden',
    className,
  )}
  data-minimized={dataMinimized}
  data-slot="floating-panel-footer"
/>