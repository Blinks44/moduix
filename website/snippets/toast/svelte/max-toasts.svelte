<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
  import { ToastToaster, createToaster } from '@moduix/svelte/toast';

  const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16, max: 3 });
  const descriptions = [
    'John liked your post',
    'Sarah commented on your photo',
    'New follower: @designpro',
    'Your post was shared 10 times',
    'Meeting reminder in 15 minutes',
  ];

  const addFiveNotifications = () => {
    descriptions.forEach((description) => toaster.info({ title: 'Notification', description }));
  };
</script>

<Stack align="center" gap="3">
  <ToastToaster {toaster} />
  <Button
    onclick={() =>
      toaster.info({
        title: 'New notification',
        description: 'You have a new message in your inbox.',
      })}
  >
    Add notification
  </Button>
  <Button onclick={addFiveNotifications}>Add 5 notifications</Button>
</Stack>