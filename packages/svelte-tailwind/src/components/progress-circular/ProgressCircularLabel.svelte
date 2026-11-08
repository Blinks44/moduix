<script lang="ts">
  import { ProgressLabel, type ProgressLabelProps } from '@ark-ui/svelte/progress';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ProgressLabelProps = $props();
</script>

<ProgressLabel
  {...props}
  bind:ref
  class={cn('text-center text-sm wrap-anywhere', className)}
  data-slot="progress-circular-label"
/>