<script lang="ts">
  import { RadioGroupItemText, type RadioGroupItemTextProps } from '@ark-ui/svelte/radio-group';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: RadioGroupItemTextProps = $props();
</script>

<RadioGroupItemText
  {...props}
  bind:ref
  class={cn('text-sm leading-5 font-medium', className)}
  data-slot="radio-group-item-text"
/>