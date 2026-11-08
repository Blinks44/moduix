<script lang="ts">
  import { Info as InfoIcon } from '@lucide/svelte';
  import {
    Alert,
    AlertActions,
    AlertContent,
    AlertDescription,
    AlertIndicator,
    AlertTitle,
  } from '@moduix/svelte/alert';
  import { Button } from '@moduix/svelte/button';
  import styles from '@/components/examples/alert/alert-with-actions.module.css';

  const alert = {
    title: 'Storage is almost full',
    description:
      'You are using 92% of the available storage. Archive old uploads or upgrade the plan.',
    primaryAction: 'Review uploads',
    secondaryAction: 'Dismiss',
  };

  let visible = $state(true);
  const dismiss = () => (visible = false);
</script>

{#if visible}
  <Alert status="warning" class={styles.custom}>
    <AlertIndicator>
      <InfoIcon />
    </AlertIndicator>
    <AlertContent>
      <AlertTitle>{alert.title}</AlertTitle>
      <AlertDescription>{alert.description}</AlertDescription>
      <AlertActions>
        <Button size="sm">{alert.primaryAction}</Button>
        <Button size="sm" variant="outline" onclick={dismiss}>
          {alert.secondaryAction}
        </Button>
      </AlertActions>
    </AlertContent>
  </Alert>
{/if}