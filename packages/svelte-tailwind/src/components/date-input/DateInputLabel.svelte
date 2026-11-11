<script lang="ts">
  import { DateInputLabel, type DateInputLabelProps } from '@ark-ui/svelte/date-input';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: DateInputLabelProps = $props();
</script>

<DateInputLabel
  {...props}
  bind:ref
  class={cn('text-sm leading-5 font-medium text-foreground', className)}
  data-slot="date-input-label"
/>