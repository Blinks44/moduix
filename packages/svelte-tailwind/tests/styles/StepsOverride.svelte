<script lang="ts">
  import {
    Steps,
    StepsIndicator,
    StepsItem,
    StepsList,
    StepsProgress,
    StepsSeparator,
    StepsTrigger,
  } from '@/components/steps';
</script>

<Steps count={2}>
  <StepsProgress />
  <StepsList>
    <StepsItem index={0}>
      <StepsTrigger><StepsIndicator />Account</StepsTrigger><StepsSeparator />
    </StepsItem>
    <StepsItem index={1}>
      <StepsTrigger><StepsIndicator class="size-6" />Profile</StepsTrigger>
    </StepsItem>
  </StepsList>
</Steps>