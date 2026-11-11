<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
  import { ToastToaster, createToaster } from '@moduix/svelte/toast';

  const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });
  let toastId = $state<string>();

  const sendMessage = () => {
    toastId = toaster.create({
      title: 'Sending message...',
      description: 'Please wait while we deliver your message.',
      type: 'info',
    });
  };

  const markAsSent = () => {
    const id = toastId;
    if (!id) return;

    toaster.update(id, {
      title: 'Message sent',
      description: 'Your message has been delivered successfully.',
      type: 'success',
    });
  };
</script>

<Stack align="center" gap="3">
  <ToastToaster {toaster} />
  <Button onclick={sendMessage}>Send message</Button>
  <Button onclick={markAsSent}>Mark as sent</Button>
</Stack>