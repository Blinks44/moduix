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
  } from '@moduix/svelte/steps';
  import styles from '@/components/examples/steps/steps-link-triggers.module.css';

  const items = [
    {
      title: 'Account',
      description: 'Create the workspace owner account.',
    },
    {
      title: 'Profile',
      description: 'Set team details and locale.',
    },
    {
      title: 'Billing',
      description: 'Choose the plan and payment method.',
    },
  ];
</script>

<Steps class={styles.root} count={items.length} defaultStep={1} linear={false}>
  <StepsList>
    {#each items as item, index (item.title)}
      <StepsItem {index}>
        <StepsTrigger>
          {#snippet asChild(props)}
            <a {...props()} href={`#step-${index + 1}`}>
              <StepsIndicator />
              <span><strong>{item.title}</strong></span>
            </a>
          {/snippet}
        </StepsTrigger>
        <StepsSeparator />
      </StepsItem>
    {/each}
  </StepsList>

  {#each items as item, index (item.title)}
    <StepsContent {index}>{item.title} - {item.description}</StepsContent>
  {/each}

  <StepsCompletedContent>Steps complete. The workspace is ready.</StepsCompletedContent>

  <div class={styles.actions}>
    <StepsPrevTrigger>Back</StepsPrevTrigger>
    <StepsNextTrigger>Next</StepsNextTrigger>
  </div>
</Steps>