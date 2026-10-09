<script setup lang="ts">
import {
  Steps,
  StepsCompletedContent,
  StepsContent,
  StepsIndicator,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsSeparator,
  StepsTrigger,
} from '@moduix/vue/steps';
import { ref } from 'vue';
import styles from '@/components/examples/steps/steps-controlled.module.css';

const step = ref(1);
const items = [
  {
    title: 'Account',
    description: 'Create the workspace owner account.',
  },
  {
    title: 'Profile',
    description: 'Set team details and locale.',
  },
  {
    title: 'Billing',
    description: 'Choose the plan and payment method.',
  },
];
</script>

<template>
  <div :class="styles.container">
    <Steps v-model:step="step" :class="styles.root" :count="items.length">
      <StepsList>
        <StepsItem v-for="(item, index) in items" :key="item.title" :index="index">
          <StepsTrigger>
            <StepsIndicator />
            <span :class="styles.label">
              <strong>{{ item.title }}</strong>
              <small :class="styles.description">{{ item.description }}</small>
            </span>
          </StepsTrigger>
          <StepsSeparator />
        </StepsItem>
      </StepsList>

      <StepsContent v-for="(item, index) in items" :key="item.title" :index="index">
        {{ item.title }} - {{ item.description }}
      </StepsContent>

      <StepsCompletedContent>Steps complete. The workspace is ready.</StepsCompletedContent>

      <div :class="styles.actions">
        <StepsPrevTrigger>Back</StepsPrevTrigger>
        <StepsNextTrigger>Next</StepsNextTrigger>
      </div>
    </Steps>
    <output>Current step: {{ step + 1 }}</output>
  </div>
</template>