<script lang="ts">
  import {
    ProgressCircular,
    ProgressCircularContext,
    ProgressCircularLabel,
    ProgressCircularRing,
    ProgressCircularValueText,
  } from '@moduix/svelte/progress-circular';

  const translations = {
    value: ({ value, max }: { value: number | null; max: number }) => {
      if (value === null) return 'Migration: loading';
      return `Migration: ${value} of ${max}`;
    },
  };
</script>

<ProgressCircular {translations}>
  <ProgressCircularLabel>Migration</ProgressCircularLabel>
  <ProgressCircularRing />
  <ProgressCircularContext>
    {#snippet render(progress)}
      <ProgressCircularValueText>{progress().valueAsString}</ProgressCircularValueText>
    {/snippet}
  </ProgressCircularContext>
</ProgressCircular>