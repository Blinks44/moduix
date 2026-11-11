<script lang="ts">
  import {
    Tour,
    TourActionTrigger,
    TourActions,
    TourContent,
    TourContext,
    TourDescription,
    TourPositioner,
    TourProgressText,
    TourTitle,
    useTour,
    type TourStepDetails,
  } from '@/components/tour';
  import { steps } from './steps';

  let {
    changes,
    onStepId,
  }: {
    changes: (details: { stepId: string | null }) => void;
    onStepId: (stepId: string | undefined) => void;
  } = $props();

  let stepId = $state<string>();
  let actionRef: Element | null = $state(null);
  const controlledSteps: TourStepDetails[] = [
    { ...steps[0], actions: [{ label: 'Next', action: 'next' }] },
    {
      id: 'finish',
      type: 'dialog',
      title: 'Complete',
      description: 'Finished the walkthrough.',
      actions: [{ label: 'Done', action: 'dismiss' }],
    },
  ];
  const tour = useTour(() => ({
    id: 'controlled-tour',
    steps: controlledSteps,
    stepId,
    onStepChange: (details) => {
      stepId = details.stepId ?? undefined;
      onStepId(stepId);
      changes(details);
    },
  }));

  export const getActionRef = () => actionRef;
</script>

<button type="button" onclick={() => tour().start()}>Start controlled tour</button>
<Tour {tour} portalled={false}>
  <TourPositioner>
    <TourContent>
      <TourTitle />
      <TourDescription />
      <TourProgressText><span>Custom progress</span></TourProgressText>
      <TourContext>
        {#snippet render(context)}
          <output data-testid="current-step">{context().step?.id}</output>
        {/snippet}
      </TourContext>
      <TourActions>
        {#snippet children(actions)}
          {#each actions() as action (action.label)}
            <TourActionTrigger {action} bind:ref={actionRef}>
              {#snippet asChild(props)}
                <button {...props()} type="button" data-testid="custom-action"
                  >{action.label}</button
                >
              {/snippet}
            </TourActionTrigger>
          {/each}
        {/snippet}
      </TourActions>
    </TourContent>
  </TourPositioner>
</Tour>