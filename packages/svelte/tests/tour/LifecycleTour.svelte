<script lang="ts">
  import {
    Tour,
    TourActions,
    TourContent,
    TourPositioner,
    TourTitle,
    useTour,
  } from '@/components/tour';
  import { steps } from './steps';

  let { statuses, changes }: { statuses: string[]; changes: Array<{ stepId: string | null }> } =
    $props();

  const tour = useTour({
    id: 'lifecycle-tour',
    steps,
    onStatusChange: (details) => statuses.push(details.status),
    onStepChange: (details) => changes.push(details),
  });
</script>

<output>{statuses.join(',')}</output>
<Tour {tour} portalled={false}>
  <TourPositioner>
    <TourContent>
      <TourTitle />
      <TourActions>
        {#snippet children(actions)}
          <output data-testid="action-count">{actions().length}</output>
        {/snippet}
      </TourActions>
    </TourContent>
  </TourPositioner>
</Tour>
<button type="button" onclick={() => tour().start()}>Start events tour</button>