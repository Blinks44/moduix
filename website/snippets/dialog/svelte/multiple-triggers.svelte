<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Dialog,
    DialogBackdrop,
    DialogCloseIcon,
    DialogContent,
    DialogDescription,
    DialogPositioner,
    DialogTitle,
    DialogTrigger,
  } from '@moduix/svelte/dialog';

  const users = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
    { id: '3', name: 'Carol Davis', email: 'carol@example.com' },
  ];
  let activeUser = $state<(typeof users)[number]>();

  const handleTriggerValueChange = (details: { value: string | null }) => {
    activeUser = users.find((user) => user.id === details.value);
  };
</script>

<Dialog onTriggerValueChange={handleTriggerValueChange}>
  {#each users as user (user.id)}
    <DialogTrigger value={user.id}>
      {#snippet asChild(props)}
        <Button {...props()} variant="outline">Edit {user.name}</Button>
      {/snippet}
    </DialogTrigger>
  {/each}
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <DialogTitle>Edit user</DialogTitle>
      <DialogDescription>{activeUser?.email}</DialogDescription>
      <DialogCloseIcon />
    </DialogContent>
  </DialogPositioner>
</Dialog>