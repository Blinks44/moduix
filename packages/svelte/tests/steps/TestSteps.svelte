<script lang="ts">
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
    type StepsRootProps,
  } from '@/components/steps';

  let { step = $bindable(), ...props }: Omit<StepsRootProps, 'count'> = $props();

  const items = [
    { title: 'Account', content: 'Account content' },
    { title: 'Profile', content: 'Profile content' },
  ];
</script>

<Steps {...props} bind:step count={items.length}>
  <StepsList>
    {#each items as item, index (item.title)}
      <StepsItem {index}>
        <StepsTrigger>
          <StepsIndicator />
          {item.title}
        </StepsTrigger>
        <StepsSeparator />
      </StepsItem>
    {/each}
  </StepsList>
  {#each items as item, index (item.title)}
    <StepsContent {index}>{item.content}</StepsContent>
  {/each}
  <StepsCompletedContent>Complete</StepsCompletedContent>
  <StepsPrevTrigger>Back</StepsPrevTrigger>
  <StepsNextTrigger>Next</StepsNextTrigger>
</Steps>