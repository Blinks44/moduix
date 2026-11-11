<script lang="ts">
  import {
    Steps,
    StepsCompletedContent,
    StepsContent,
    StepsNextTrigger,
    StepsPrevTrigger,
    StepsProgress,
  } from '@/components/steps';

  let { change, complete }: { change: () => void; complete: () => void } = $props();
</script>

<Steps
  count={3}
  linear
  isStepValid={(index) => index !== 1}
  isStepSkippable={(index) => index === 1}
  onStepComplete={complete}
  onStepChange={change}
>
  <StepsProgress />
  <StepsContent index={0}>First panel</StepsContent>
  <StepsContent index={2}>Last panel</StepsContent>
  <StepsCompletedContent>Finished</StepsCompletedContent>
  <StepsPrevTrigger>Back</StepsPrevTrigger>
  <StepsNextTrigger>Next</StepsNextTrigger>
</Steps>