import { type DrawerTriggerValueChangeDetails } from '@ark-ui/solid/drawer';
import { Button } from '@moduix/solid/button';
import { Card, CardBody } from '@moduix/solid/card';
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
} from '@moduix/solid/drawer';
import { For, Show, createSignal } from 'solid-js';
import styles from '@/components/examples/drawer/drawer-multiple-triggers.module.css';

const users = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
  },
];

export default function MultipleTriggersDrawerDemo() {
  const [activeUser, setActiveUser] = createSignal<(typeof users)[number] | null>(null);
  const handleTriggerValueChange = (details: DrawerTriggerValueChangeDetails) => {
    setActiveUser(users.find((user) => user.id === details.value) ?? null);
  };

  return (
    <Drawer swipeDirection="end" onTriggerValueChange={handleTriggerValueChange}>
      <div class={styles.triggers}>
        <For each={users}>
          {(user) => (
            <DrawerTrigger
              value={user.id}
              asChild={(props) => (
                <Button {...props()} variant="outline">
                  Edit {user.name}
                </Button>
              )}
            />
          )}
        </For>
      </div>
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit user</DrawerTitle>
            <DrawerCloseIcon />
            <DrawerDescription>{activeUser()?.email}</DrawerDescription>
          </DrawerHeader>
          <Show when={activeUser()}>
            {(user) => (
              <DrawerBody class={styles.body}>
                <Card size="sm" class={styles.card}>
                  <CardBody>Selected: {user().name}</CardBody>
                </Card>
              </DrawerBody>
            )}
          </Show>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  );
}