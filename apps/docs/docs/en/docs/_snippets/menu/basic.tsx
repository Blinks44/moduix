import { Button, Menu } from '@moduix/react';

const fileItems = [
  {
    value: 'new-file',
    label: 'New File',
  },
  {
    value: 'open',
    label: 'Open...',
  },
  {
    value: 'save',
    label: 'Save',
  },
  {
    value: 'save-as',
    label: 'Save As...',
  },
];

export default function MenuDemo() {
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>
          File
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className="menu-content">
          {fileItems.map((item) => (
            <Menu.Item key={item.value} value={item.value}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}