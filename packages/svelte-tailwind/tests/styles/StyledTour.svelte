<script lang="ts">
  import {
    Tour,
    TourActionList,
    TourArrow,
    TourBackdrop,
    TourBody,
    TourCloseIcon,
    TourContent,
    TourControl,
    TourDescription,
    TourPositioner,
    TourProgressText,
    TourSpotlight,
    TourTitle,
    useTour,
  } from '@/components/tour';
  import { steps } from '../../../svelte/tests/tour/steps';

  const tour = useTour({ id: 'styled-tour', steps });
</script>

<button type="button" onclick={() => tour().start()}>Start styled tour</button>
<Tour {tour} portalled={false} lazyMount unmountOnExit>
  <TourBackdrop />
  <TourSpotlight />
  <TourPositioner>
    <TourContent class="w-96 bg-card p-4 data-[type=dialog]:w-96 data-[type=floating]:w-96">
      <TourArrow />
      <TourCloseIcon class="size-8 rounded-full bg-primary" />
      <TourBody>
        <TourTitle class="text-xl">Welcome</TourTitle>
        <TourDescription class="text-base">Start the tour.</TourDescription>
        <TourProgressText />
      </TourBody>
      <TourControl><TourActionList /></TourControl>
    </TourContent>
  </TourPositioner>
</Tour>