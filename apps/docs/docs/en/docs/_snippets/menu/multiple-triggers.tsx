import { Menu } from '@moduix/react';
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
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {messages.map((message) => (
          <Menu.Trigger
            key={message.id}
            value={message.id}
            aria-label={`Open actions for ${message.sender}`}
          >
            <MapIcon />
          </Menu.Trigger>
        ))}
      </div>
      <Menu.Positioner>
        <Menu.Content className="menu-content">
          <Menu.Item value="reply">Reply</Menu.Item>
          <Menu.Item value="archive">Archive</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}