<script lang="ts">
  import { RadioGroupItem, type RadioGroupItemProps } from '@ark-ui/svelte/radio-group';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: RadioGroupItemProps = $props();
</script>

<RadioGroupItem
  {...props}
  bind:ref
  class={cn(
    'inline-flex w-fit cursor-pointer items-center gap-2 align-middle data-disabled:cursor-default data-disabled:opacity-disabled data-readonly:cursor-default',
    className,
  )}
  data-slot="radio-group-item"
/>