<script lang="ts">
  import {
    ProgressCircular,
    ProgressCircularLabel,
    ProgressCircularRing,
    ProgressCircularValueText,
  } from '@/components/progress-circular';
</script>

<ProgressCircular class="w-80" data-testid="progress-root" defaultValue={42}>
  <ProgressCircularLabel class="text-lg">Export data</ProgressCircularLabel>
  <ProgressCircularValueText class="text-xl" />
  <ProgressCircularRing class="[--size:10rem]" aria-label="Export data" />
</ProgressCircular>