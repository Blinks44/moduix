<script lang="ts">
  import { ProgressCircular, ProgressCircularRing } from '@/components/progress-circular';
  import ContextActions from './ContextActions.svelte';
</script>

<ProgressCircular defaultValue={45}>
  <ProgressCircularRing aria-label="Upload status" />
  <ContextActions />
</ProgressCircular>