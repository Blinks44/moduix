<script lang="ts">
  import {
    ProgressCircular,
    ProgressCircularLabel,
    ProgressCircularRing,
    ProgressCircularValueText,
  } from '@/components/progress-circular';
</script>

<ProgressCircular defaultValue={42}>
  <ProgressCircularLabel>Export data</ProgressCircularLabel>
  <ProgressCircularValueText />
  <ProgressCircularRing aria-label="Export data" />
</ProgressCircular>