import { type DrawerTriggerValueChangeDetails } from '@ark-ui/react/drawer';
import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Drawer } from '@moduix/react/drawer';
import { useState } from 'react';

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
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--moduix-spacing-2)' }}>
        {users.map((user) => (
          <Drawer.Trigger key={user.id} value={user.id} asChild>
            <Button variant="outline">Edit {user.name}</Button>
          </Drawer.Trigger>
        ))}
      </div>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Edit user</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>{activeUser?.email}</Drawer.Description>
          </Drawer.Header>
          {activeUser ? (
            <Drawer.Body style={{ display: 'flex', flex: 1 }}>
              <Card size="sm" style={{ flex: 1, backgroundColor: 'var(--moduix-color-muted)' }}>
                <Card.Body>Selected: {activeUser.name}</Card.Body>
              </Card>
            </Drawer.Body>
          ) : null}
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}