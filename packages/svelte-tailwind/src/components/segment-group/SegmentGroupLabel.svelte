<script lang="ts">
  import { SegmentGroupLabel, type SegmentGroupLabelProps } from '@ark-ui/svelte/segment-group';
  import { cn } from '@/lib/moduix/cn';

  const labelClass = 'text-sm leading-5 font-semibold';

  let { class: className, ref = $bindable(null), ...props }: SegmentGroupLabelProps = $props();
</script>

<SegmentGroupLabel
  {...props}
  bind:ref
  class={cn(labelClass, className)}
  data-slot="segment-group-label"
/>