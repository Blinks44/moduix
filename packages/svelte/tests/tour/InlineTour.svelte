<script lang="ts">
  import type { ClassValue } from 'svelte/elements';
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

  let { actionClass = 'consumer-action' }: { actionClass?: ClassValue } = $props();
  let positionerRef: Element | null = $state(null);
  let contentRef: Element | null = $state(null);
  const tour = useTour({ id: 'inline-tour', steps });

  export const getRefs = () => ({ positionerRef, contentRef });
</script>

<button type="button" onclick={() => tour().start()}>Start tour</button>
<Tour {tour} portalled={false}>
  <TourBackdrop />
  <TourPositioner bind:ref={positionerRef}>
    <TourContent bind:ref={contentRef} class="consumer-content">
      <TourCloseIcon />
      <TourBody>
        <TourTitle />
        <TourDescription />
        <TourProgressText />
      </TourBody>
      <TourControl><TourActionList class={actionClass} /></TourControl>
    </TourContent>
  </TourPositioner>
</Tour>