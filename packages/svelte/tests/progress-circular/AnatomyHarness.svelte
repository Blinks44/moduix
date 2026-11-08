<script lang="ts">
  import {
    ProgressCircular,
    ProgressCircularLabel,
    ProgressCircularRing,
    ProgressCircularValueText,
  } from '@/components/progress-circular';

  let rootRef: Element | null = $state(null);
  let circleRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, circleRef });
</script>

<ProgressCircular bind:ref={rootRef} defaultValue={42}>
  <ProgressCircularLabel>Export data</ProgressCircularLabel>
  <ProgressCircularRing bind:ref={circleRef} aria-label="Export data" />
  <ProgressCircularValueText />
</ProgressCircular>