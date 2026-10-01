<script setup lang="ts">
import { Input } from '@moduix/vue/input';
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
import styles from '@/components/examples/steps/steps-validation.module.css';

const name = ref('');
const message = ref('Enter a name to continue.');
const isStepValid = (index: number) => index !== 0 || name.value.trim().length > 0;
const handleStepInvalid = () => {
  message.value = 'Enter a name before moving to the next step.';
};
const handleStepChange = () => {
  message.value = 'Step changed.';
};
</script>

<template>
  <div :class="styles.container">
    <Steps
      :count="2"
      linear
      :is-step-valid="isStepValid"
      @step-invalid="handleStepInvalid"
      @step-change="handleStepChange"
    >
      <StepsList>
        <StepsItem :index="0">
          <StepsTrigger>
            <StepsIndicator />
            Account
          </StepsTrigger>
          <StepsSeparator />
        </StepsItem>
        <StepsItem :index="1">
          <StepsTrigger>
            <StepsIndicator />
            Profile
          </StepsTrigger>
        </StepsItem>
      </StepsList>

      <StepsContent :index="0">
        <label>
          Name
          <Input v-model="name" />
        </label>
      </StepsContent>
      <StepsContent :index="1">Your profile can now be completed.</StepsContent>
      <StepsCompletedContent>Steps complete.</StepsCompletedContent>

      <div :class="styles.actions">
        <StepsPrevTrigger>Back</StepsPrevTrigger>
        <StepsNextTrigger>Next</StepsNextTrigger>
      </div>
    </Steps>
    <output>{{ message }}</output>
  </div>
</template>