import { Menu } from '@moduix/solid/menu';
import { Map as MapIcon } from 'lucide-solid';
import styles from '@/components/examples/menu/menu-multiple-triggers.module.css';

const messages = [
  { id: '1', sender: 'Alice Johnson', preview: 'Hey, can you review the latest PR?' },
  { id: '2', sender: 'Bob Smith', preview: 'Meeting notes from today are attached.' },
  { id: '3', sender: 'Carol Davis', preview: 'The deploy finished successfully!' },
];

export default function MultipleTriggersMenuDemo() {
  return (
    <Menu>
      <div class={styles.triggers}>
        {messages.map((message) => (
          <Menu.Trigger value={message.id} aria-label={`Open actions for ${message.sender}`}>
            <MapIcon />
          </Menu.Trigger>
        ))}
      </div>
      <Menu.Positioner>
        <Menu.Content class={styles.content}>
          <Menu.Viewport>
            <Menu.Item value="reply">Reply</Menu.Item>
            <Menu.Item value="forward">Forward</Menu.Item>
            <Menu.Item value="archive">Archive</Menu.Item>
            <Menu.Item value="delete" tone="destructive">
              Delete
            </Menu.Item>
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}