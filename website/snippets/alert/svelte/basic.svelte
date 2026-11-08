<script lang="ts">
  import { Alert, AlertContent, AlertDescription, AlertTitle } from '@moduix/svelte/alert';

  const alert = {
    title: 'Update available',
    description: 'Install the latest version when your workflow allows it.',
  };
</script>

<Alert>
  <AlertContent>
    <AlertTitle>{alert.title}</AlertTitle>
    <AlertDescription>{alert.description}</AlertDescription>
  </AlertContent>
</Alert>