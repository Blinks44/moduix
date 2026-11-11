<script lang="ts">
  import {
    Tour,
    TourBackdrop,
    TourContent,
    TourDescription,
    TourPositioner,
    TourTitle,
    useTour,
  } from '@/components/tour';
  import { steps } from '../tour/steps';

  const inlineTour = useTour({ id: 'ssr-inline-tour', steps });
  const portalledTour = useTour({ id: 'ssr-portalled-tour', steps });
</script>

<button type="button" onclick={() => inlineTour().start()}>Start hydrated tour</button>
<Tour tour={inlineTour} portalled={false} lazyMount={false} unmountOnExit={false}>
  <TourPositioner>
    <TourContent>
      <TourTitle />
      <TourDescription />
    </TourContent>
  </TourPositioner>
</Tour>
<Tour tour={portalledTour} lazyMount={false} unmountOnExit={false}>
  <TourBackdrop />
  <TourPositioner>
    <TourContent>
      <TourTitle />
      <TourDescription />
    </TourContent>
  </TourPositioner>
</Tour>