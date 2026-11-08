<script lang="ts">
  import {
    Steps,
    StepsCompletedContent,
    StepsContent,
    StepsIndicator,
    StepsItem,
    StepsList,
    StepsTrigger,
  } from '@/components/steps';
</script>

<Steps count={2} defaultStep={1}>
  <StepsList>
    <StepsItem index={0}><StepsTrigger><StepsIndicator />Account</StepsTrigger></StepsItem>
    <StepsItem index={1}><StepsTrigger><StepsIndicator />Profile</StepsTrigger></StepsItem>
  </StepsList>
  <StepsContent index={0}>Account content</StepsContent>
  <StepsContent index={1}>Profile content</StepsContent>
  <StepsCompletedContent>Complete</StepsCompletedContent>
</Steps>