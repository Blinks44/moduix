<script lang="ts">
  import {
    Tour,
    TourBackdrop,
    TourContent,
    TourDescription,
    TourPositioner,
    TourSpotlight,
    TourTitle,
    useTour,
  } from '@/components/tour';

  const tour = useTour({
    id: 'tooltip-step-tour',
    steps: [
      {
        id: 'tooltip',
        type: 'tooltip',
        title: 'Tooltip',
        description: 'A tooltip step.',
        target: () => document.querySelector<HTMLElement>('#tour-tooltip-target'),
        backdrop: true,
      },
    ],
  });
</script>

<button id="tour-tooltip-target" type="button" onclick={() => tour().start()}>
  Start tooltip tour
</button>
<Tour {tour}>
  <TourBackdrop />
  <TourSpotlight />
  <TourPositioner>
    <TourContent>
      <TourTitle />
      <TourDescription />
    </TourContent>
  </TourPositioner>
</Tour>