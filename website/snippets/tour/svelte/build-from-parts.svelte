<script lang="ts">
  import type { TourStepDetails } from '@ark-ui/svelte/tour';
  import { X as XIcon } from '@lucide/svelte';
  import { Button } from '@moduix/svelte/button';
  import { CloseButton } from '@moduix/svelte/close-button';
  import { Stack } from '@moduix/svelte/stack';
  import {
    Tour,
    TourActions,
    TourActionTrigger,
    TourBackdrop,
    TourCloseTrigger,
    TourContent,
    TourControl,
    TourDescription,
    TourPositioner,
    TourProgressText,
    TourSpotlight,
    TourTitle,
    useTour,
  } from '@moduix/svelte/tour';
  import styles from '@/components/examples/tour/tour-build-from-parts.module.css';

  const id = $props.id();

  const steps = [
    {
      id: 'welcome',
      type: 'dialog',
      title: 'Welcome to the workspace',
      description: 'Start with a dialog step, then move to a highlighted page control.',
      actions: [{ label: 'Start', action: 'next' }],
      backdrop: true,
    },
    {
      id: 'upload',
      type: 'tooltip',
      title: 'Upload files',
      description: 'Tooltip steps are anchored to target elements.',
      target: () => document.querySelector<HTMLElement>('#tour-parts-upload'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Next', action: 'next' },
      ],
      backdrop: true,
    },
    {
      id: 'complete',
      type: 'floating',
      placement: 'bottom-end',
      title: 'You are ready',
      description: 'Floating steps stay in the viewport without a target.',
      actions: [{ label: 'Finish', action: 'dismiss' }],
    },
  ] satisfies TourStepDetails[];

  let status = $state('idle');
  const tour = useTour({
    id,
    steps,
    onStatusChange: (details) => {
      status = details.status;
    },
  });
</script>

<Stack align="center" gap="3">
  <Button id="tour-parts-upload" variant="outline">Upload files</Button>

  <Tour {tour}>
    <TourBackdrop />
    <TourSpotlight />
    <TourPositioner>
      <TourContent>
        <TourCloseTrigger>
          {#snippet asChild(props)}
            <CloseButton {...props()} aria-label="Close tour" class={styles.closeButton}>
              <XIcon strokeWidth={3} />
            </CloseButton>
          {/snippet}
        </TourCloseTrigger>
        <div class={styles.body}>
          <TourTitle />
          <TourDescription />
          <TourProgressText />
        </div>
        <TourControl>
          <TourActions>
            {#snippet children(actions)}
              {#each actions() as action (action.label)}
                <TourActionTrigger {action}>
                  {action.label}
                </TourActionTrigger>
              {/each}
            {/snippet}
          </TourActions>
        </TourControl>
      </TourContent>
    </TourPositioner>
  </Tour>

  <div data-preview-meta>
    <output>Tour: {status}</output>
    <Button onclick={() => tour().start()}>Start tour</Button>
  </div>
</Stack>