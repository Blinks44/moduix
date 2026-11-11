<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Steps,
    StepsIndicator,
    StepsItem,
    StepsList,
    StepsProgress,
    StepsRootProvider,
    StepsSeparator,
    StepsTrigger,
    useSteps,
  } from '@/components/steps';
  import { items } from './items';
  import StepsActions from './StepsActions.svelte';
  import StepsNavigation from './StepsNavigation.svelte';
  import StepsPanels from './StepsPanels.svelte';

  const { Story } = defineMeta({
    title: 'Components/Steps',
    component: Steps,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let step = $state(1);
  let isAccountValid = $state(false);
  let message = $state('Verify the account before continuing.');
  const steps = useSteps({ id: 'steps-root-provider', count: items.length });

  const toggleAccount = () => {
    const wasValid = isAccountValid;
    isAccountValid = !wasValid;
    message = wasValid ? 'Account needs verification.' : 'Account is verified.';
  };
  const isStepValid = (index: number) => index !== 0 || isAccountValid;
  const handleStepInvalid = (details: { step: number; action: 'next' | 'set' }) => {
    message = `Step ${details.step + 1} must be valid before moving ${details.action}.`;
  };
</script>

<Story name="Default" asChild>
  <Steps count={items.length}>
    <StepsNavigation />
    <StepsPanels />
    <StepsActions />
  </Steps>
</Story>

<Story name="Controlled" asChild>
  <div class="grid gap-3">
    <output>Current step: {step + 1}</output>
    <Steps bind:step count={items.length}>
      <StepsNavigation />
      <StepsPanels />
      <StepsActions />
    </Steps>
  </div>
</Story>

<Story name="Root Provider" asChild>
  <div class="grid gap-3">
    <output>Current step: {steps().value + 1}</output>
    <StepsRootProvider value={steps}>
      <StepsNavigation />
      <StepsPanels />
      <StepsActions />
    </StepsRootProvider>
  </div>
</Story>

<Story name="Validation" asChild>
  <div class="grid gap-3">
    <button type="button" onclick={toggleAccount}>
      {isAccountValid ? 'Mark account unverified' : 'Verify account'}
    </button>
    <Steps count={items.length} linear {isStepValid} onStepInvalid={handleStepInvalid}>
      <StepsNavigation />
      <StepsPanels />
      <StepsActions />
    </Steps>
    <output>{message}</output>
  </div>
</Story>

<Story name="Vertical" asChild>
  <Steps count={items.length} defaultStep={1} orientation="vertical">
    <StepsNavigation />
    <StepsPanels />
    <StepsActions />
  </Steps>
</Story>

<Story name="Link Composition" asChild>
  <Steps count={items.length} defaultStep={1} linear={false}>
    <StepsList>
      {#each items as item, index (item.title)}
        <StepsItem {index}>
          <StepsTrigger>
            {#snippet asChild(props)}
              <a {...props()} href={`#step-${index + 1}`}>
                <StepsIndicator />
                <span>{item.title}</span>
              </a>
            {/snippet}
          </StepsTrigger>
          <StepsSeparator />
        </StepsItem>
      {/each}
    </StepsList>
    <StepsPanels />
    <StepsActions />
  </Steps>
</Story>

<Story name="Progress" asChild>
  <Steps count={items.length} defaultStep={1}>
    <StepsProgress aria-label="Workspace setup progress" />
    <StepsNavigation />
    <StepsPanels />
    <StepsActions />
  </Steps>
</Story>