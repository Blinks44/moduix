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
  import { clsx } from 'clsx';
  import toggleStyles from '../toggle/Toggle.module.css';
  import { useToggleGroupStyleContext } from './context';
  import styles from './ToggleGroup.module.css';

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
</script>

<ToggleGroupItem
  {...props}
  bind:ref
  class={clsx(toggleStyles.root, styles.item, className)}
  data-size={resolvedSize}
  data-variant={resolvedVariant}
  data-slot="toggle-group-item"
/>