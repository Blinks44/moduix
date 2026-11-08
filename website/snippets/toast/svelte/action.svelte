<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
  import { ToastToaster, createToaster } from '@moduix/svelte/toast';

  const toaster = createToaster({ placement: 'bottom-end', gap: 24 });

  const createEvent = () => {
    toaster.create({
      title: 'Event has been created',
      description: 'We have sent you an email with the event details.',
      type: 'info',
      action: {
        label: 'Undo',
        onClick: () => toaster.info({ description: 'Event restored to draft.' }),
      },
    });
  };
</script>

<Stack align="center" gap="3">
  <ToastToaster {toaster} />
  <Button onclick={createEvent}>Create event</Button>
</Stack>