import { Button } from '@moduix/solid/button';
import { Dialog } from '@moduix/solid/dialog';
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
        <Dialog.Trigger
          value={user.id}
          asChild={(props) => (
            <Button {...props()} variant="outline">
              Edit {user.name}
            </Button>
          )}
        />
      ))}
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Edit user</Dialog.Title>
          <Dialog.Description>{activeUser()?.email}</Dialog.Description>
          <Dialog.CloseIcon />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}