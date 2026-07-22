import { Button, Dialog } from '@moduix/react';
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
export default function MultipleTriggersDialogDemo() {
  const [activeUser, setActiveUser] = useState(null as (typeof users)[number] | null);
  return (
    <Dialog
      onTriggerValueChange={(details) => {
        setActiveUser(users.find((user) => user.id === details.value) ?? null);
      }}
    >
      {users.map((user) => (
        <Dialog.Trigger key={user.id} value={user.id} asChild>
          <Button variant="outline">Edit {user.name}</Button>
        </Dialog.Trigger>
      ))}
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Edit user</Dialog.Title>
          <Dialog.Description>{activeUser?.email}</Dialog.Description>
          <Dialog.CloseIcon />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}