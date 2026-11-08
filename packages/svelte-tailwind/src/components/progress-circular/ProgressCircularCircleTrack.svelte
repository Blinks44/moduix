<script lang="ts">
  import { ProgressCircleTrack, type ProgressCircleTrackProps } from '@ark-ui/svelte/progress';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ProgressCircleTrackProps = $props();
</script>

<ProgressCircleTrack
  {...props}
  bind:ref
  class={cn('stroke-muted', className)}
  data-slot="progress-circular-circle-track"
/>