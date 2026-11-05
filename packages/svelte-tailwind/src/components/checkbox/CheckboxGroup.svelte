<script lang="ts">
  import { CheckboxGroup, type CheckboxGroupProps } from '@ark-ui/svelte/checkbox';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    value = $bindable(),
    ref = $bindable(null),
    ...props
  }: CheckboxGroupProps = $props();
</script>

<CheckboxGroup
  {...props}
  bind:ref
  bind:value
  class={cn('flex flex-col gap-2', className)}
  data-slot="checkbox-group"
/>