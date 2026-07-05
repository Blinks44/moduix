/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

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

export function MultipleTriggersMenuDemo() {
  return (
    <Menu>
      {messages.map((message) => (
        <Menu.Trigger key={message.id} value={message.id} aria-label="Open menu">
          <MapIcon />
        </Menu.Trigger>
      ))}
      <Menu.Positioner>
        <Menu.Content className="menu-content">
          <Menu.Item value="reply">Reply</Menu.Item>
          <Menu.Item value="archive">Archive</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}

//#endregion