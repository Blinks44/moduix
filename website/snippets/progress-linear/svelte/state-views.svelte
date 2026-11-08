<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    ProgressLinear,
    ProgressLinearLabel,
    ProgressLinearRange,
    ProgressLinearTrack,
    ProgressLinearValueText,
    ProgressLinearView,
  } from '@moduix/svelte/progress-linear';

  let value = $state<number | null>(null);
  const progressState = $derived(
    value === null ? 'Indeterminate' : value === 100 ? 'Complete' : 'Loading',
  );
</script>

<ProgressLinear bind:value>
  <ProgressLinearLabel>Preparing report</ProgressLinearLabel>
  <ProgressLinearValueText />
  <ProgressLinearTrack aria-label="Preparing report">
    <ProgressLinearRange />
  </ProgressLinearTrack>
  <ProgressLinearView state="indeterminate">Waiting for source data</ProgressLinearView>
  <ProgressLinearView state="loading">Transfer in progress</ProgressLinearView>
  <ProgressLinearView state="complete">Export complete</ProgressLinearView>
</ProgressLinear>
<output>State: {progressState}</output>
<Button type="button" size="sm" variant="outline" onclick={() => (value = null)}>
  Indeterminate
</Button>
<Button type="button" size="sm" variant="outline" onclick={() => (value = 45)}>Loading</Button>
<Button type="button" size="sm" variant="outline" onclick={() => (value = 100)}>Complete</Button>