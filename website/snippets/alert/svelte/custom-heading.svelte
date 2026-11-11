<script lang="ts">
  import { Alert, AlertContent, AlertDescription, AlertTitle } from '@moduix/svelte/alert';

  const alert = {
    title: 'Billing issue',
    description: 'Use asChild when the surrounding page needs a different heading level.',
  };
</script>

<Alert status="info">
  <AlertContent>
    <AlertTitle>
      {#snippet asChild(props)}
        <h2 {...props()}>{alert.title}</h2>
      {/snippet}
    </AlertTitle>
    <AlertDescription>{alert.description}</AlertDescription>
  </AlertContent>
</Alert>