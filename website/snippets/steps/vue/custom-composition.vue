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
import styles from '@/components/examples/steps/steps-custom-composition.module.css';

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
  <Steps :class="styles.root" :count="items.length" :default-step="1" :linear="false">
    <StepsList>
      <StepsItem v-for="(item, index) in items" :key="item.title" :index="index">
        <StepsTrigger as-child>
          <a :href="`#step-${index + 1}`">
            <StepsIndicator />
            <span
              ><strong>{{ item.title }}</strong></span
            >
          </a>
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
</template>