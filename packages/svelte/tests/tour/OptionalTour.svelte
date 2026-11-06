<script lang="ts">
  import {
    Tour,
    TourArrow,
    TourCloseIcon,
    TourContent,
    TourDescription,
    TourPositioner,
    TourProgressText,
    TourTitle,
    useTour,
  } from '@/components/tour';
  import { steps } from './steps';

  let { custom = false, emptyArrow = false }: { custom?: boolean; emptyArrow?: boolean } = $props();
  let titleRef: Element | null = $state(null);
  const tour = useTour({ id: 'optional-tour', steps });

  export const getTitleRef = () => titleRef;
</script>

{#snippet customTitle()}Custom title{/snippet}
{#snippet customDescription()}Custom description{/snippet}
{#snippet customProgress()}Custom progress{/snippet}
{#snippet customArrow()}{#if !emptyArrow}<span>Custom arrow</span>{/if}{/snippet}

<button type="button" onclick={() => tour().start()}>Start slot tour</button>
<Tour {tour} portalled={false}>
  <TourPositioner>
    <TourContent>
      <TourTitle
        bind:ref={titleRef}
        class="consumer-title"
        style="color: red"
        data-testid="title"
        children={custom ? customTitle : undefined}
      />
      <TourDescription
        data-testid="description"
        children={custom ? customDescription : undefined}
      />
      <TourProgressText data-testid="progress" children={custom ? customProgress : undefined} />
      <TourArrow data-testid="arrow" children={custom ? customArrow : undefined} />
      <TourCloseIcon />
    </TourContent>
  </TourPositioner>
</Tour>