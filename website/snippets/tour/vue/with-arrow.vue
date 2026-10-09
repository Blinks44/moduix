<script setup lang="ts">
import type { TourStepDetails } from '@ark-ui/vue/tour';
import { Button } from '@moduix/vue/button';
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
} from '@moduix/vue/tour';
import styles from '@/components/examples/tour/tour-with-arrow.module.css';

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

const tour = useTour({ steps });
</script>

<template>
  <div :class="styles.root">
    <Button id="tour-with-arrow-upload" variant="outline">Upload files</Button>
    <Tour :tour="tour" lazy-mount unmount-on-exit>
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
    <Button @click="tour.start()">Start tour</Button>
  </div>
</template>