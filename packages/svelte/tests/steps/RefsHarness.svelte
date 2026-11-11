<script lang="ts">
  import {
    Steps,
    StepsContent,
    StepsIndicator,
    StepsItem,
    StepsList,
    StepsNextTrigger,
    StepsPrevTrigger,
    StepsSeparator,
    StepsTrigger,
    type StepChangeDetails,
  } from '@/components/steps';

  let { changes, classes = '' }: { changes: number[]; classes?: string } = $props();
  let rootRef: Element | null = $state(null);
  let triggerRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, triggerRef });
</script>

<Steps
  bind:ref={rootRef}
  count={2}
  class="consumer-root"
  data-probe="root"
  onStepChange={(details: StepChangeDetails) => changes.push(details.step)}
>
  <StepsList>
    <StepsItem index={0}>
      <StepsTrigger bind:ref={triggerRef} class={classes}>
        <StepsIndicator />
        Account
      </StepsTrigger>
      <StepsSeparator />
    </StepsItem>
    <StepsItem index={1}>
      <StepsTrigger><StepsIndicator />Profile</StepsTrigger>
      <StepsSeparator />
    </StepsItem>
  </StepsList>
  <StepsContent index={0}>Account content</StepsContent>
  <StepsContent index={1}>Profile content</StepsContent>
  <StepsPrevTrigger>Back</StepsPrevTrigger>
  <StepsNextTrigger>Next</StepsNextTrigger>
</Steps>