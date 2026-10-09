<script setup lang="ts">
import type { TourStepDetails } from '@ark-ui/vue/tour';
import { Button } from '@moduix/vue/button';
import { Input } from '@moduix/vue/input';
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
} from '@moduix/vue/tour';
import { ref } from 'vue';
import styles from '@/components/examples/tour/tour-wait-for-input.module.css';

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

const value = ref('');
const status = ref('idle');
const tour = useTour({
  steps,
  onStatusChange: (details) => {
    status.value = details.status;
  },
});

const handleInput = (nextValue: string) => {
  if (nextValue.trim().length >= 2) {
    tour.value.next();
  }
};
</script>

<template>
  <div :class="styles.root">
    <Input
      id="tour-wait-name"
      v-model="value"
      aria-label="Workspace name"
      placeholder="Workspace name"
      @update:model-value="handleInput"
    />

    <Tour :tour="tour" lazy-mount unmount-on-exit>
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

    <output>Tour: {{ status }}</output>
    <Button @click="tour.start()">Start input tour</Button>
  </div>
</template>