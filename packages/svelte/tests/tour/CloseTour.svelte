<script lang="ts">
  import {
    Tour,
    TourCloseIcon,
    TourContent,
    TourDescription,
    TourPositioner,
    TourTitle,
    useTour,
  } from '@/components/tour';
  import { steps } from './steps';

  let {
    label,
    labelledby,
    customIcon = false,
    onExitComplete,
    onclick,
  }: {
    label?: string;
    labelledby?: string;
    customIcon?: boolean;
    onExitComplete?: () => void;
    onclick?: () => void;
  } = $props();
  let closeRef: Element | null = $state(null);
  const tour = useTour({ id: 'close-tour', steps });

  export const getCloseRef = () => closeRef;
</script>

{#snippet customClose()}<span>Custom close</span>{/snippet}

<button type="button" onclick={() => tour().start()}>Start dismiss tour</button>
<Tour {tour} portalled={false} {onExitComplete}>
  <TourPositioner>
    <TourContent>
      <TourTitle />
      <TourDescription />
      <span id="dismiss-label">Dismiss with label</span>
      <TourCloseIcon
        bind:ref={closeRef}
        aria-label={label}
        aria-labelledby={labelledby}
        class="consumer-close"
        style="color: red"
        title="Dismiss walkthrough"
        {onclick}
        children={customIcon ? customClose : undefined}
      />
    </TourContent>
  </TourPositioner>
</Tour>