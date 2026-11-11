<script lang="ts">
  import { Input } from '@moduix/svelte/input';
  import { Stack } from '@moduix/svelte/stack';
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
  } from '@moduix/svelte/steps';
  import styles from '@/components/examples/steps/steps-validation.module.css';

  let name = $state('');
  let message = $state('Enter a name to continue.');
  const isStepValid = (index: number) => index !== 0 || name.trim().length > 0;
  const handleStepInvalid = () => {
    message = 'Enter a name before moving to the next step.';
  };
  const handleStepChange = () => {
    message = 'Step changed.';
  };
</script>

<div class={styles.container}>
  <Steps
    count={2}
    linear
    {isStepValid}
    onStepInvalid={handleStepInvalid}
    onStepChange={handleStepChange}
  >
    <StepsList>
      <StepsItem index={0}>
        <StepsTrigger>
          <StepsIndicator />
          Account
        </StepsTrigger>
        <StepsSeparator />
      </StepsItem>
      <StepsItem index={1}>
        <StepsTrigger>
          <StepsIndicator />
          Profile
        </StepsTrigger>
      </StepsItem>
    </StepsList>

    <StepsContent index={0}>
      <label>
        Name
        <Input bind:value={name} />
      </label>
    </StepsContent>
    <StepsContent index={1}>Your profile can now be completed.</StepsContent>
    <StepsCompletedContent>Steps complete.</StepsCompletedContent>

    <Stack direction="row" justify="flex-end" gap="2">
      <StepsPrevTrigger>Back</StepsPrevTrigger>
      <StepsNextTrigger>Next</StepsNextTrigger>
    </Stack>
  </Steps>
  <output>{message}</output>
</div>