<script lang="ts">
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
  import styles from '@/components/examples/steps/steps-vertical.module.css';

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
    {
      title: 'Launch',
      description: 'Review everything and go live.',
    },
  ];
</script>

<Steps count={items.length} defaultStep={1} orientation="vertical">
  <StepsList>
    {#each items as item, index (item.title)}
      <StepsItem {index}>
        <StepsTrigger>
          <StepsIndicator />
          <span class={styles.label}>
            <strong>{item.title}</strong>
            <small class={styles.description}>{item.description}</small>
          </span>
        </StepsTrigger>
        <StepsSeparator />
      </StepsItem>
    {/each}
  </StepsList>

  <div class={styles.contentColumn}>
    {#each items as item, index (item.title)}
      <StepsContent {index}>{item.title} - {item.description}</StepsContent>
    {/each}

    <StepsCompletedContent>Steps complete. The workspace is ready.</StepsCompletedContent>

    <Stack direction="row" justify="flex-end" gap="2">
      <StepsPrevTrigger>Back</StepsPrevTrigger>
      <StepsNextTrigger>Next</StepsNextTrigger>
    </Stack>
  </div>
</Steps>