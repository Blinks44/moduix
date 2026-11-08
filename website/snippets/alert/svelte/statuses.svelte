<script lang="ts">
  import { Check as CheckIcon, Info as InfoIcon } from '@lucide/svelte';
  import {
    Alert,
    AlertContent,
    AlertDescription,
    AlertIndicator,
    AlertTitle,
  } from '@moduix/svelte/alert';
  import styles from '@/components/examples/alert/alert-statuses.module.css';

  const statuses = ['info', 'success', 'warning', 'error'] as const;
</script>

<div class={styles.stack}>
  {#each statuses as status (status)}
    <Alert {status}>
      <AlertIndicator>
        {#if status === 'success'}
          <CheckIcon />
        {:else}
          <InfoIcon />
        {/if}
      </AlertIndicator>
      <AlertContent>
        <AlertTitle>{status}</AlertTitle>
        <AlertDescription>Use this alert for {status} feedback.</AlertDescription>
      </AlertContent>
    </Alert>
  {/each}
</div>