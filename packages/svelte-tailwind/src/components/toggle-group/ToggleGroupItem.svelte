<script module lang="ts">
  import type { ToggleGroupItemProps as ArkToggleGroupItemProps } from '@ark-ui/svelte/toggle-group';
  import type { ToggleSize, ToggleVariant } from '../toggle/Toggle.svelte';

  export interface ToggleGroupItemProps extends ArkToggleGroupItemProps {
    size?: ToggleSize;
    variant?: ToggleVariant;
  }
</script>

<script lang="ts">
  import { ToggleGroupItem } from '@ark-ui/svelte/toggle-group';
  import { cn } from '@/lib/moduix/cn';
  import { toggleVariants } from '../toggle/Toggle.variants';
  import { useToggleGroupStyleContext } from './context';

  let {
    class: className,
    ref = $bindable(null),
    size,
    variant,
    ...props
  }: ToggleGroupItemProps = $props();

  const inherited = useToggleGroupStyleContext();
  const resolvedSize = $derived(size ?? inherited.size());
  const resolvedVariant = $derived(variant ?? inherited.variant());
  const itemClass = $derived(
    cn(
      toggleVariants({ size: resolvedSize, variant: resolvedVariant }),
      'flex-none text-foreground group-data-[orientation=vertical]/toggle-group:w-full group-data-[orientation=vertical]/toggle-group:justify-start',
      className,
    ),
  );
</script>

<ToggleGroupItem
  {...props}
  bind:ref
  class={itemClass}
  data-size={resolvedSize}
  data-variant={resolvedVariant}
  data-slot="toggle-group-item"
/>