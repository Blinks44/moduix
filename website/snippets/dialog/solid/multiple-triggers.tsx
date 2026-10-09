import { Button } from '@moduix/solid/button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/solid/dialog';
import { createSignal } from 'solid-js';

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
  const [activeUser, setActiveUser] = createSignal<(typeof users)[number] | null>(null);

  return (
    <Dialog
      onTriggerValueChange={(details) => {
        setActiveUser(users.find((user) => user.id === details.value) ?? null);
      }}
    >
      {users.map((user) => (
        <DialogTrigger
          value={user.id}
          asChild={(props) => (
            <Button {...props()} variant="outline">
              Edit {user.name}
            </Button>
          )}
        />
      ))}
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Edit user</DialogTitle>
          <DialogDescription>{activeUser()?.email}</DialogDescription>
          <DialogCloseIcon />
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}