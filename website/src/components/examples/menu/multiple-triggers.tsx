import {
  Menu,
  MenuTrigger,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
} from '@moduix/react/menu';
import { Map as MapIcon } from 'lucide-react';
import styles from '@/components/examples/menu/menu-multiple-triggers.module.css';

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
      <div className={styles.triggers}>
        {messages.map((message) => (
          <MenuTrigger
            key={message.id}
            value={message.id}
            aria-label={`Open actions for ${message.sender}`}
          >
            <MapIcon />
          </MenuTrigger>
        ))}
      </div>
      <MenuPositioner>
        <MenuContent className={styles.content}>
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