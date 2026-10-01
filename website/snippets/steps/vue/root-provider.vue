<script setup lang="ts">
import {
  StepsCompletedContent,
  StepsContent,
  StepsIndicator,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRootProvider,
  StepsSeparator,
  StepsTrigger,
  useSteps,
} from '@moduix/vue/steps';
import styles from '@/components/examples/steps/steps-root-provider.module.css';

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
const steps = useSteps({ count: items.length });
</script>

<template>
  <StepsRootProvider :class="styles.root" :value="steps">
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
  </StepsRootProvider>
  <output>Current step: {{ steps.value + 1 }}</output>
</template>