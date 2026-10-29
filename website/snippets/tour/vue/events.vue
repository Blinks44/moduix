<script setup lang="ts">
import type { TourStepDetails } from '@ark-ui/vue/tour';
import { Button } from '@moduix/vue/button';
import { Stack } from '@moduix/vue/stack';
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
} from '@moduix/vue/tour';
import { ref } from 'vue';

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

const result = ref('Status: idle');
const tour = useTour({
  steps,
  onStepChange: (details) => {
    result.value = `Step changed: ${details.stepId}`;
  },
  onStatusChange: (details) => {
    result.value = `Status: ${details.status}`;
  },
});
</script>

<template>
  <Stack align="center" gap="3">
    <Tour :tour="tour">
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

    <output>{{ result }}</output>
    <Button @click="tour.start()">Start event tour</Button>
  </Stack>
</template>