import { Button } from '@moduix/solid/button';
import {
  Menu,
  MenuTrigger,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
} from '@moduix/solid/menu';
import { Stack } from '@moduix/solid/stack';
import { Map as MapIcon } from 'lucide-solid';

const messages = [
  { id: '1', sender: 'Alice Johnson', preview: 'Hey, can you review the latest PR?' },
  { id: '2', sender: 'Bob Smith', preview: 'Meeting notes from today are attached.' },
  { id: '3', sender: 'Carol Davis', preview: 'The deploy finished successfully!' },
];

export default function MultipleTriggersMenuDemo() {
  return (
    <Menu>
      <Stack direction="row" gap="0.5rem">
        {messages.map((message) => (
          <MenuTrigger
            value={message.id}
            asChild={(props) => (
              <Button
                {...props()}
                variant="outline"
                size="icon-md"
                aria-label={`Open actions for ${message.sender}`}
              />
            )}
          >
            <MapIcon />
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