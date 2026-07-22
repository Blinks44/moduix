import { Button, Menu } from '@moduix/react';
import { useState } from 'react';

export default function RadioItemsMenuDemo() {
  const [sortBy, setSortBy] = useState('date');
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>
          Sort
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className="menu-content">
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Sort By</Menu.ItemGroupLabel>
            <Menu.RadioItemGroup
              value={sortBy}
              onValueChange={(details) => setSortBy(details.value)}
            >
              <Menu.RadioItem value="name">
                <Menu.ItemIndicator />
                <Menu.ItemText>Name</Menu.ItemText>
              </Menu.RadioItem>
              <Menu.RadioItem value="date">
                <Menu.ItemIndicator />
                <Menu.ItemText>Date Modified</Menu.ItemText>
              </Menu.RadioItem>
            </Menu.RadioItemGroup>
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}