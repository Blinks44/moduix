import { Button, Menu } from '@moduix/react';

export default function GroupingMenuDemo() {
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>
          Edit
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className="menu-content">
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Clipboard</Menu.ItemGroupLabel>
            <Menu.Item value="cut">Cut</Menu.Item>
            <Menu.Item value="copy">Copy</Menu.Item>
          </Menu.ItemGroup>
          <Menu.Separator />
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Selection</Menu.ItemGroupLabel>
            <Menu.Item value="select-all">Select All</Menu.Item>
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}