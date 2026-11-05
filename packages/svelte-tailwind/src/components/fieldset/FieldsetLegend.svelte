<script lang="ts">
  import { FieldsetLegend, type FieldsetLegendProps } from '@ark-ui/svelte/fieldset';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: FieldsetLegendProps = $props();
</script>

<FieldsetLegend
  {...props}
  bind:ref
  class={cn('max-w-full pb-3 text-lg font-semibold wrap-anywhere text-foreground', className)}
  data-slot="fieldset-legend"
/>