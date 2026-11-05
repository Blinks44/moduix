<script lang="ts">
  import { FieldRequiredIndicator, type FieldRequiredIndicatorProps } from '@ark-ui/svelte/field';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: FieldRequiredIndicatorProps = $props();
</script>

<FieldRequiredIndicator
  {...props}
  bind:ref
  class={cn('text-destructive', className)}
  data-slot="field-required-indicator"
/>