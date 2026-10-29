import { type DrawerTriggerValueChangeDetails } from '@ark-ui/react/drawer';
import { Button } from '@moduix/react/button';
import { Card, CardBody } from '@moduix/react/card';
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
} from '@moduix/react/drawer';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';
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
  const [activeUser, setActiveUser] = useState(null as (typeof users)[number] | null);
  const handleTriggerValueChange = (details: DrawerTriggerValueChangeDetails) => {
    setActiveUser(users.find((user) => user.id === details.value) ?? null);
  };
  return (
    <Drawer swipeDirection="end" onTriggerValueChange={handleTriggerValueChange}>
      <Stack align="center" gap="2">
        {users.map((user) => (
          <DrawerTrigger key={user.id} value={user.id} asChild>
            <Button variant="outline">Edit {user.name}</Button>
          </DrawerTrigger>
        ))}
      </Stack>
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit user</DrawerTitle>
            <DrawerCloseIcon />
            <DrawerDescription>{activeUser?.email}</DrawerDescription>
          </DrawerHeader>
          {activeUser ? (
            <DrawerBody className={styles.body}>
              <Card size="sm" className={styles.card}>
                <CardBody>Selected: {activeUser.name}</CardBody>
              </Card>
            </DrawerBody>
          ) : null}
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  );
}