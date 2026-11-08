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
    title: 'Payment failed',
    description: 'Your payment could not be processed. Check the payment method and try again.',
  };
</script>

<Alert status="error">
  <AlertIndicator>
    <InfoIcon />
  </AlertIndicator>
  <AlertContent>
    <AlertTitle>{alert.title}</AlertTitle>
    <AlertDescription>{alert.description}</AlertDescription>
  </AlertContent>
</Alert>