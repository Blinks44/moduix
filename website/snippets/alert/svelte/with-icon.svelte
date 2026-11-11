<script lang="ts">
  import { Info as InfoIcon } from '@lucide/svelte';
  import {
    Alert,
    AlertContent,
    AlertDescription,
    AlertIndicator,
    AlertTitle,
  } from '@moduix/svelte/alert';

  const alert = {
    title: 'Workspace sync is active',
    description: 'Changes are being synced across all connected devices.',
  };
</script>

<Alert status="info">
  <AlertIndicator>
    <InfoIcon />
  </AlertIndicator>
  <AlertContent>
    <AlertTitle>{alert.title}</AlertTitle>
    <AlertDescription>{alert.description}</AlertDescription>
  </AlertContent>
</Alert>