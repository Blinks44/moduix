<script lang="ts">
  import { RadioGroupLabel, type RadioGroupLabelProps } from '@ark-ui/svelte/radio-group';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: RadioGroupLabelProps = $props();
</script>

<RadioGroupLabel
  {...props}
  bind:ref
  class={cn('text-sm leading-5 font-semibold', className)}
  data-slot="radio-group-label"
/>