import { Button } from '@moduix/react/button';
import {
  Menu,
  MenuTrigger,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
} from '@moduix/react/menu';
import { Stack } from '@moduix/react/stack';
import { Map as MapIcon } from 'lucide-react';

const messages = [
  {
    id: '1',
    sender: 'Alice Johnson',
    preview: 'Hey, can you review the latest PR?',
  },
  {
    id: '2',
    sender: 'Bob Smith',
    preview: 'Meeting notes from today are attached.',
  },
  {
    id: '3',
    sender: 'Carol Davis',
    preview: 'The deploy finished successfully!',
  },
];

export default function MultipleTriggersMenuDemo() {
  return (
    <Menu>
      <Stack direction="row" gap="0.5rem">
        {messages.map((message) => (
          <MenuTrigger key={message.id} value={message.id} asChild>
            <Button
              variant="outline"
              size="icon-md"
              aria-label={`Open actions for ${message.sender}`}
            >
              <MapIcon />
            </Button>
          </MenuTrigger>
        ))}
      </Stack>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItem value="reply">Reply</MenuItem>
            <MenuItem value="forward">Forward</MenuItem>
            <MenuItem value="archive">Archive</MenuItem>
            <MenuItem value="delete" tone="destructive">
              Delete
            </MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}