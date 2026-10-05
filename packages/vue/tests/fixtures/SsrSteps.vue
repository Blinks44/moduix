<script setup lang="ts">
import {
  Steps,
  StepsList,
  StepsItem,
  StepsTrigger,
  StepsIndicator,
  StepsContent,
  StepsCompletedContent,
} from '../../src/components/steps';
</script>

<template>
  <Steps :count="2" :default-step="1"
    ><StepsList
      ><StepsItem :index="0"
        ><StepsTrigger><StepsIndicator />Account</StepsTrigger></StepsItem
      ><StepsItem :index="1"
        ><StepsTrigger><StepsIndicator />Profile</StepsTrigger></StepsItem
      ></StepsList
    ><StepsContent :index="0">Account content</StepsContent
    ><StepsContent :index="1">Profile content</StepsContent
    ><StepsCompletedContent>Complete</StepsCompletedContent></Steps
  >
</template>