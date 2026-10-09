<script setup lang="ts">
import type { TourStepDetails } from '@ark-ui/vue/tour';
import {
  Tour,
  TourBackdrop,
  TourPositioner,
  TourContent,
  TourTitle,
  TourDescription,
  useTour,
} from '../../src/components/tour';
const steps = [
  {
    id: 'welcome',
    type: 'dialog',
    title: 'Welcome',
    description: 'Start the tour.',
    actions: [
      { label: 'Continue', action: 'next' },
      { label: 'Continue', action: 'dismiss' },
    ],
    arrow: true,
    backdrop: true,
  },
] satisfies TourStepDetails[];
const inlineTour = useTour({ steps });
const portalledTour = useTour({ steps });
</script>
<template>
  <button type="button" @click="inlineTour.start()">Start hydrated tour</button>
  <Tour :tour="inlineTour" :portalled="false" :lazy-mount="false" :unmount-on-exit="false">
    <TourPositioner>
      <TourContent>
        <TourTitle />
        <TourDescription />
      </TourContent>
    </TourPositioner>
  </Tour>
  <Tour :tour="portalledTour" :lazy-mount="false" :unmount-on-exit="false">
    <TourBackdrop />
    <TourPositioner>
      <TourContent>
        <TourTitle />
        <TourDescription />
      </TourContent>
    </TourPositioner>
  </Tour>
</template>