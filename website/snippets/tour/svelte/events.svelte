<script lang="ts">
  import type { TourStepDetails } from '@ark-ui/svelte/tour';
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
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
    TourTitle,
    useTour,
  } from '@moduix/svelte/tour';

  const id = $props.id();

  const steps = [
    {
      id: 'overview',
      type: 'dialog',
      title: 'Project overview',
      description: 'Use Next to emit a step-change event.',
      actions: [{ label: 'Next', action: 'next' }],
      backdrop: true,
    },
    {
      id: 'complete',
      type: 'dialog',
      title: 'Events captured',
      description: 'Done emits the final status-change event.',
      actions: [{ label: 'Done', action: 'dismiss' }],
      backdrop: true,
    },
  ] satisfies TourStepDetails[];

  let result = $state('Status: idle');
  const tour = useTour({
    id,
    steps,
    onStepChange: (details) => {
      result = `Step changed: ${details.stepId}`;
    },
    onStatusChange: (details) => {
      result = `Status: ${details.status}`;
    },
  });
</script>

<Stack align="center" gap="3">
  <Tour {tour}>
    <TourBackdrop />
    <TourPositioner>
      <TourContent>
        <TourCloseIcon />
        <TourBody>
          <TourTitle />
          <TourDescription />
        </TourBody>
        <TourControl>
          <TourActionList />
        </TourControl>
      </TourContent>
    </TourPositioner>
  </Tour>

  <div data-preview-meta>
    <output>{result}</output>
    <Button onclick={() => tour().start()}>Start event tour</Button>
  </div>
</Stack>