<script module lang="ts">
  import type { ComboboxItemProps } from '@ark-ui/svelte/combobox';
  import type { Snippet } from 'svelte';

  export interface ComboboxOptionProps extends Omit<ComboboxItemProps, 'asChild'> {
    /** Replaces the default check indicator; `false` renders no indicator. */
    indicator?: Snippet | false;
  }
</script>

<script lang="ts">
  import ComboboxItem from './ComboboxItem.svelte';
  import ComboboxItemIndicator from './ComboboxItemIndicator.svelte';
  import ComboboxItemText from './ComboboxItemText.svelte';

  let { children, indicator, ref = $bindable(null), ...props }: ComboboxOptionProps = $props();
</script>

<ComboboxItem {...props} bind:ref>
  <ComboboxItemText>{@render children?.()}</ComboboxItemText>
  {#if indicator !== false}<ComboboxItemIndicator children={indicator} />{/if}
</ComboboxItem>