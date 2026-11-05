<script module lang="ts">
  import type { RadioGroupItemProps } from '@ark-ui/svelte/radio-group';

  export interface RadioGroupOptionProps extends Omit<RadioGroupItemProps, 'asChild'> {}
</script>

<script lang="ts">
  import { RadioGroupItemHiddenInput } from '@ark-ui/svelte/radio-group';
  import RadioGroupItem from './RadioGroupItem.svelte';
  import RadioGroupItemControl from './RadioGroupItemControl.svelte';
  import RadioGroupItemText from './RadioGroupItemText.svelte';

  let { children, ref = $bindable(null), ...props }: RadioGroupOptionProps = $props();
</script>

<RadioGroupItem {...props} bind:ref>
  <RadioGroupItemHiddenInput />
  <RadioGroupItemControl />
  <RadioGroupItemText>{@render children?.()}</RadioGroupItemText>
</RadioGroupItem>