<script lang="ts">
  import type { TourStepDetails } from '@ark-ui/svelte/tour';
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
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
    TourSpotlight,
    TourTitle,
    useTour,
  } from '@moduix/svelte/tour';

  const id = $props.id();

  const steps = [
    {
      id: 'upload',
      type: 'tooltip',
      title: 'Upload files',
      description: 'This anchored step uses an arrow to point back to its target.',
      target: () => document.querySelector<HTMLElement>('#tour-with-arrow-upload'),
      actions: [{ label: 'Done', action: 'dismiss' }],
      arrow: true,
    },
  ] satisfies TourStepDetails[];

  const tour = useTour({ id, steps });
</script>

<Stack align="center" gap="3">
  <Button id="tour-with-arrow-upload" variant="outline">Upload files</Button>
  <Tour {tour}>
    <TourBackdrop />
    <TourSpotlight />
    <TourPositioner>
      <TourContent>
        <TourArrow />
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
  <Button onclick={() => tour().start()}>Start tour</Button>
</Stack>