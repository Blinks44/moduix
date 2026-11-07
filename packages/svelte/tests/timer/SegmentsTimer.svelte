<script lang="ts">
  import {
    Timer,
    TimerSegments,
    type TimerRootProps,
    type TimerSegmentsProps,
  } from '@/components/timer';

  let { segments = {}, ...props }: TimerRootProps & { segments?: TimerSegmentsProps } = $props();

  let rootRef = $state<HTMLElement | null>(null);
  let segmentsRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ rootRef, segmentsRef });
</script>

<Timer bind:ref={rootRef} {...props}>
  <TimerSegments bind:ref={segmentsRef} {...segments} />
</Timer>