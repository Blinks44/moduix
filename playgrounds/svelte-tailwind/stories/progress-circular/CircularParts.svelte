<script lang="ts">
  import { ProgressCircularRing, ProgressCircularValueText } from '@/components/progress-circular';

  let { 'aria-label': ariaLabel }: { 'aria-label': string } = $props();
</script>

<div class="relative inline-grid place-items-center">
  <ProgressCircularRing class="[grid-area:1/1]" aria-label={ariaLabel} />
  <ProgressCircularValueText class="[grid-area:1/1]" />
</div>