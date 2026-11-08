<script lang="ts">
  import type { ProgressCircleProps } from '@ark-ui/svelte/progress';
  import ProgressCircularCircle from './ProgressCircularCircle.svelte';
  import ProgressCircularCircleRange from './ProgressCircularCircleRange.svelte';
  import ProgressCircularCircleTrack from './ProgressCircularCircleTrack.svelte';

  type Props = Omit<ProgressCircleProps, 'asChild' | 'children'>;

  let { ref = $bindable(null), ...props }: Props = $props();
</script>

<ProgressCircularCircle {...props} bind:ref>
  <ProgressCircularCircleTrack />
  <ProgressCircularCircleRange />
</ProgressCircularCircle>