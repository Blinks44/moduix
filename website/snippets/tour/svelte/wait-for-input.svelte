<script lang="ts">
  import type { TourStepDetails } from '@ark-ui/svelte/tour';
  import { Button } from '@moduix/svelte/button';
  import { Input } from '@moduix/svelte/input';
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
    TourSpotlight,
    TourTitle,
    useTour,
  } from '@moduix/svelte/tour';

  const id = $props.id();

  const steps = [
    {
      id: 'name',
      type: 'tooltip',
      title: 'Enter a name',
      description: 'The tour continues after at least two characters.',
      target: () => document.querySelector<HTMLInputElement>('#tour-wait-name'),
    },
    {
      id: 'complete',
      type: 'dialog',
      title: 'Name saved',
      description: 'Typing two characters moved the tour to this step.',
      actions: [{ label: 'Done', action: 'dismiss' }],
      backdrop: true,
    },
  ] satisfies TourStepDetails[];

  let value = $state('');
  let status = $state('idle');
  const tour = useTour({
    id,
    steps,
    onStatusChange: (details) => {
      status = details.status;
    },
  });

  const handleInput = (nextValue: string) => {
    if (nextValue.trim().length >= 2) {
      tour().next();
    }
  };
</script>

<Stack align="center" gap="3">
  <Input
    id="tour-wait-name"
    bind:value
    aria-label="Workspace name"
    placeholder="Workspace name"
    oninput={(event) => handleInput(event.currentTarget.value)}
  />

  <Tour {tour}>
    <TourBackdrop />
    <TourSpotlight />
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
    <output>Tour: {status}</output>
    <Button onclick={() => tour().start()}>Start input tour</Button>
  </div>
</Stack>