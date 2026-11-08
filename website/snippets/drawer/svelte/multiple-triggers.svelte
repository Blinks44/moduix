<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Card, CardBody } from '@moduix/svelte/card';
  import {
    Drawer,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseIcon,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerPositioner,
    DrawerTitle,
    DrawerTrigger,
  } from '@moduix/svelte/drawer';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/drawer/drawer-multiple-triggers.module.css';

  const users = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
    { id: '3', name: 'Carol Davis', email: 'carol@example.com' },
  ];
  let activeUser = $state<(typeof users)[number] | null>(null);
</script>

<Drawer
  swipeDirection="end"
  onTriggerValueChange={(details) => {
    activeUser = users.find((user) => user.id === details.value) ?? null;
  }}
>
  <Stack align="center" gap="2">
    {#each users as user (user.id)}
      <DrawerTrigger value={user.id}>
        {#snippet asChild(props)}
          <Button {...props()} variant="outline">Edit {user.name}</Button>
        {/snippet}
      </DrawerTrigger>
    {/each}
  </Stack>
  <DrawerBackdrop />
  <DrawerPositioner>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Edit user</DrawerTitle>
        <DrawerCloseIcon />
        <DrawerDescription>{activeUser?.email}</DrawerDescription>
      </DrawerHeader>
      {#if activeUser}
        <DrawerBody class={styles.body}>
          <Card size="sm" class={styles.card}>
            <CardBody>Selected: {activeUser.name}</CardBody>
          </Card>
        </DrawerBody>
      {/if}
    </DrawerContent>
  </DrawerPositioner>
</Drawer>