<script lang="ts">
  import {
    Tour,
    TourActionTrigger,
    TourActions,
    TourContent,
    TourControl,
    TourDescription,
    TourPositioner,
    TourTitle,
    useTour,
  } from '@/components/tour';
  import { steps } from './steps';

  const tour = useTour({ id: 'custom-action-tour', steps });
</script>

<button type="button" onclick={() => tour().start()}>Start custom action tour</button>
<Tour {tour} portalled={false}>
  <TourPositioner>
    <TourContent>
      <TourTitle />
      <TourDescription />
      <TourControl>
        <TourActions>
          {#snippet children(actions)}
            {#each actions() as action, index (action.label + index)}
              <TourActionTrigger {action}>
                {#snippet asChild(props)}
                  <button {...props()} type="button">{action.label}</button>
                {/snippet}
              </TourActionTrigger>
            {/each}
          {/snippet}
        </TourActions>
      </TourControl>
    </TourContent>
  </TourPositioner>
</Tour>