import { Button } from '@moduix/solid/button';
import { Menu } from '@moduix/solid/menu';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/menu/menu-radio-items.module.css';

export default function RadioItemsMenuDemo() {
  const [sortBy, setSortBy] = createSignal('date');

  return (
    <Menu closeOnSelect={false}>
      <Menu.Trigger asChild={(props) => <Button {...props()} />}>
        Sort
        <Menu.Indicator />
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content class={styles.content}>
          <Menu.Viewport>
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Sort By</Menu.ItemGroupLabel>
              <Menu.RadioItemGroup
                value={sortBy()}
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