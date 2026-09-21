import { Button } from '@moduix/react/button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/react/dialog';
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
        <DialogTrigger key={user.id} value={user.id} asChild>
          <Button variant="outline">Edit {user.name}</Button>
        </DialogTrigger>
      ))}
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Edit user</DialogTitle>
          <DialogDescription>{activeUser?.email}</DialogDescription>
          <DialogCloseIcon />
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}