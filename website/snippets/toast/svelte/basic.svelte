<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
  import { ToastToaster, toast } from '@moduix/svelte/toast';
</script>

<Stack align="center" gap="3">
  <ToastToaster />
  <Button
    onclick={() =>
      toast('Scheduled for tomorrow', {
        description: 'Your meeting has been scheduled for tomorrow at 10am.',
      })}
  >
    Schedule meeting
  </Button>
</Stack>