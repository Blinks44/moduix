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
    type UseTourReturn,
  } from '@/components/tour';

  let { tour, withArrow = false }: { tour: UseTourReturn; withArrow?: boolean } = $props();
</script>

<Tour {tour} lazyMount unmountOnExit>
  <TourBackdrop />
  <TourSpotlight />
  <TourPositioner>
    <TourContent>
      {#if withArrow}<TourArrow />{/if}
      <TourCloseIcon />
      <TourBody>
        <TourTitle />
        <TourDescription />
        <TourProgressText />
      </TourBody>
      <TourControl>
        <TourActionList />
      </TourControl>
    </TourContent>
  </TourPositioner>
</Tour>