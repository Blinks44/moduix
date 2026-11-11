<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Alert,
    AlertActions,
    AlertContent,
    AlertDescription,
    AlertIndicator,
    AlertTitle,
  } from '@/components/alert';
  import { Button } from '@/components/button';
  import { CheckIcon } from '@/lib/moduix/icons/ui';
  import styles from './Alert.stories.module.css';
  import InfoIcon from './InfoIcon.svelte';

  const statuses = ['info', 'success', 'warning', 'error'] as const;

  const { Story } = defineMeta({
    title: 'Components/Alert',
    component: Alert,
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let visible = $state(true);
</script>

<Story name="Basic" asChild>
  <Alert>
    <AlertContent>
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>Install the latest version when your workflow allows it.</AlertDescription>
    </AlertContent>
  </Alert>
</Story>

<Story name="Custom Heading" asChild>
  <Alert status="info">
    <AlertContent>
      <AlertTitle>{#snippet asChild(props)}<h2 {...props()}>Billing issue</h2>{/snippet}</AlertTitle
      >
      <AlertDescription>
        Use asChild when the surrounding page needs a different heading level.
      </AlertDescription>
    </AlertContent>
  </Alert>
</Story>

<Story name="Error" asChild>
  <Alert status="error">
    <AlertIndicator>
      <InfoIcon />
    </AlertIndicator>
    <AlertContent>
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        Your payment could not be processed. Check the payment method and try again.
      </AlertDescription>
    </AlertContent>
  </Alert>
</Story>

<Story name="Statuses" asChild>
  <div class={styles.stack}>
    {#each statuses as status (status)}<Alert {status}>
        <AlertIndicator>
          {#if status === 'success'}<CheckIcon />{:else}<InfoIcon />{/if}
        </AlertIndicator>
        <AlertContent>
          <AlertTitle>{status}</AlertTitle>
          <AlertDescription>Use this alert for {status} feedback.</AlertDescription>
        </AlertContent>
      </Alert>{/each}
  </div>
</Story>

<Story name="With Icon" asChild>
  <Alert status="info">
    <AlertIndicator>
      <InfoIcon />
    </AlertIndicator>
    <AlertContent>
      <AlertTitle>Workspace sync is active</AlertTitle>
      <AlertDescription>Changes are being synced across all connected devices.</AlertDescription>
    </AlertContent>
  </Alert>
</Story>

<Story name="Advanced Customization" asChild>
  <div class={styles.stack}>
    {#if visible}
      <Alert status="warning" class={styles.customAlert}>
        <AlertIndicator><InfoIcon /></AlertIndicator>
        <AlertContent>
          <AlertTitle>Storage is almost full</AlertTitle>
          <AlertDescription>
            You are using 92% of the available storage. Archive old uploads or upgrade the plan.
          </AlertDescription>
          <AlertActions>
            <Button size="sm">Review uploads</Button>
            <Button size="sm" variant="outline" onclick={() => (visible = false)}>Dismiss</Button>
          </AlertActions>
        </AlertContent>
      </Alert>
    {/if}
  </div>
</Story>