<script lang="ts">
  import { ProgressView, type ProgressViewProps } from '@ark-ui/svelte/progress';

  let { ref = $bindable(null), ...props }: ProgressViewProps = $props();
</script>

<ProgressView {...props} bind:ref data-slot="progress-circular-view" />