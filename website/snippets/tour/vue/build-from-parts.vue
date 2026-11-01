<script setup lang="ts">
import type { TourStepDetails } from '@ark-ui/vue/tour';
import { X as XIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import { CloseButton } from '@moduix/vue/close-button';
import { Stack } from '@moduix/vue/stack';
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
} from '@moduix/vue/tour';
import { ref } from 'vue';
import styles from '@/components/examples/tour/tour-build-from-parts.module.css';

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

const status = ref('idle');
const tour = useTour({
  steps,
  onStatusChange: (details) => {
    status.value = details.status;
  },
});
</script>

<template>
  <Stack align="center" gap="3">
    <Button id="tour-parts-upload" variant="outline">Upload files</Button>

    <Tour :tour="tour">
      <TourBackdrop />
      <TourSpotlight />
      <TourPositioner>
        <TourContent>
          <TourCloseTrigger as-child>
            <CloseButton aria-label="Close tour" :class="styles.closeButton"
              ><XIcon :stroke-width="3"
            /></CloseButton>
          </TourCloseTrigger>
          <div :class="styles.body">
            <TourTitle />
            <TourDescription />
            <TourProgressText />
          </div>
          <TourControl>
            <TourActions v-slot="actions">
              <TourActionTrigger v-for="action in actions" :key="action.label" :action="action">
                {{ action.label }}
              </TourActionTrigger>
            </TourActions>
          </TourControl>
        </TourContent>
      </TourPositioner>
    </Tour>

    <output>Tour: {{ status }}</output>
    <Button @click="tour.start()">Start tour</Button>
  </Stack>
</template>