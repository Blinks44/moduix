<script lang="ts">
  import {
    Tour,
    TourActionList,
    TourBackdrop,
    TourBody,
    TourCloseIcon,
    TourContent,
    TourControl,
    TourDescription,
    TourPositioner,
    TourProgressText,
    TourTitle,
    useTour,
  } from '@/components/tour';
  import { steps } from './steps';

  const tour = useTour({ id: 'portal-tour', steps });
</script>

<div data-testid="tour-host">
  <button type="button" onclick={() => tour().start()}>Start tour</button>
  <Tour {tour} lazyMount unmountOnExit>
    <TourBackdrop />
    <TourPositioner>
      <TourContent>
        <TourCloseIcon />
        <TourBody>
          <TourTitle />
          <TourDescription />
          <TourProgressText />
        </TourBody>
        <TourControl><TourActionList class="consumer-action" /></TourControl>
      </TourContent>
    </TourPositioner>
  </Tour>
</div>