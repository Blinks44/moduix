<script lang="ts">
  import {
    StepsContext,
    StepsItem,
    StepsList,
    StepsRootProvider,
    StepsTrigger,
    useSteps,
  } from '@/components/steps';
  import ItemContextState from './ItemContextState.svelte';
  import RootContextState from './RootContextState.svelte';

  const steps = useSteps({ id: 'provider-steps', count: 2 });
</script>

<button type="button" onclick={() => steps().goToNextStep()}>Advance externally</button>
<StepsRootProvider value={steps}>
  <RootContextState />
  <StepsContext>
    {#snippet render(context)}
      <output>Context step: {context().value + 1}</output>
    {/snippet}
  </StepsContext>
  <StepsList>
    <StepsItem index={0}>
      <StepsTrigger>Account <ItemContextState /></StepsTrigger>
    </StepsItem>
    <StepsItem index={1}><StepsTrigger>Profile</StepsTrigger></StepsItem>
  </StepsList>
</StepsRootProvider>