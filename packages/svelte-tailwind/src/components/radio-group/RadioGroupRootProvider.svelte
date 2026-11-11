<script module lang="ts">
  import type { RadioGroupRootProviderProps as ArkRadioGroupRootProviderProps } from '@ark-ui/svelte/radio-group';
  import type { RadioGroupSize } from './RadioGroup.svelte';

  export interface RadioGroupRootProviderProps extends ArkRadioGroupRootProviderProps {
    size?: RadioGroupSize;
  }
</script>

<script lang="ts">
  import { RadioGroupRootProvider } from '@ark-ui/svelte/radio-group';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    ...props
  }: RadioGroupRootProviderProps = $props();
</script>

<RadioGroupRootProvider
  {...props}
  bind:ref
  class={cn('group/radio-group flex flex-col gap-2 text-foreground', className)}
  data-size={size}
  data-slot="radio-group-root-provider"
/>