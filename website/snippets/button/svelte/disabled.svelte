<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';

  const labels = {
    button: 'Disabled',
    link: 'Disabled Link',
  };
</script>

<Stack direction="row" align="center" wrap="wrap" gap="3">
  <Button disabled>{labels.button}</Button>
  <Button disabled variant="outline">
    {#snippet asChild(props)}
      <a {...props()} href="#button">{labels.link}</a>
    {/snippet}
  </Button>
</Stack>