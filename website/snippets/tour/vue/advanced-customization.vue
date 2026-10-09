<script setup lang="ts">
import type { TourStepDetails } from '@ark-ui/vue/tour';
import { Button } from '@moduix/vue/button';
import {
  Tour,
  TourActionTrigger,
  TourActions,
  TourBackdrop,
  TourBody,
  TourCloseIcon,
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
import styles from '@/components/examples/tour/tour-advanced-customization.module.css';

const steps = [
  {
    id: 'custom-actions',
    type: 'dialog',
    title: 'Custom action labels',
    description: 'These buttons keep Ark behavior while changing their markup and copy.',
    actions: [
      { label: 'Continue', action: 'next' },
      { label: 'Skip tour', action: 'dismiss' },
    ],
    backdrop: true,
  },
  {
    id: 'finish',
    type: 'dialog',
    title: 'Same actions, different UI',
    description: 'Back and Finish still use their original Ark action objects.',
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Finish', action: 'dismiss' },
    ],
    backdrop: true,
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
  <div :class="styles.root">
    <Tour :tour="tour" lazy-mount unmount-on-exit>
      <TourBackdrop />
      <TourSpotlight />
      <TourPositioner>
        <TourContent>
          <TourCloseIcon />
          <TourBody>
            <TourTitle />
            <TourDescription />
            <TourProgressText />
          </TourBody>
          <TourControl>
            <TourActions v-slot="actions">
              <TourActionTrigger
                v-for="action in actions"
                :key="action.label"
                :action="action"
                as-child
              >
                <Button :variant="action.action === 'dismiss' ? 'outline' : 'default'">
                  {{ action.label }}
                </Button>
              </TourActionTrigger>
            </TourActions>
          </TourControl>
        </TourContent>
      </TourPositioner>
    </Tour>

    <output>Tour: {{ status }}</output>
    <Button @click="tour.start()">Start custom tour</Button>
  </div>
</template>