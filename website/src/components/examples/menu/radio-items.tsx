import { Button } from '@moduix/react/button';
import { Menu } from '@moduix/react/menu';
import { useState } from 'react';
import styles from '@/components/examples/menu/menu-radio-items.module.css';

export default function RadioItemsMenuDemo() {
  const [sortBy, setSortBy] = useState('date');
  return (
    <Menu closeOnSelect={false}>
      <Menu.Trigger asChild>
        <Button>
          Sort
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className={styles.content}>
          <Menu.Viewport>
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
                <Menu.RadioItem value="size">
                  <Menu.ItemIndicator />
                  <Menu.ItemText>File Size</Menu.ItemText>
                </Menu.RadioItem>
                <Menu.RadioItem value="type">
                  <Menu.ItemIndicator />
                  <Menu.ItemText>File Type</Menu.ItemText>
                </Menu.RadioItem>
              </Menu.RadioItemGroup>
            </Menu.ItemGroup>
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}