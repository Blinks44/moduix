<script lang="ts">
  import { ProgressCircular, ProgressCircularRing } from '@/components/progress-circular';

  let value: number | null = $state(45);
</script>

<ProgressCircular bind:value>
  <ProgressCircularRing aria-label="Upload status" />
</ProgressCircular>
<button type="button" onclick={() => (value = 75)}>Set progress</button>