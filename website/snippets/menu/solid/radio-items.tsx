import { Button } from '@moduix/solid/button';
import { Menu, MenuTrigger, MenuIndicator, MenuPositioner, MenuContent, MenuViewport, MenuItemGroup, MenuItemGroupLabel, MenuRadioItemGroup, MenuRadioItem, MenuItemIndicator, MenuItemText } from '@moduix/solid/menu';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/menu/menu-radio-items.module.css';

export default function RadioItemsMenuDemo() {
  const [sortBy, setSortBy] = createSignal('date');

  return (
    <Menu closeOnSelect={false}>
      <MenuTrigger asChild={(props) => <Button {...props()} />}>
        Sort
        <MenuIndicator />
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent class={styles.content}>
          <MenuViewport>
            <MenuItemGroup>
              <MenuItemGroupLabel>Sort By</MenuItemGroupLabel>
              <MenuRadioItemGroup
                value={sortBy()}
                onValueChange={(details) => setSortBy(details.value)}
              >
                <MenuRadioItem value="name">
                  <MenuItemIndicator />
                  <MenuItemText>Name</MenuItemText>
                </MenuRadioItem>
                <MenuRadioItem value="date">
                  <MenuItemIndicator />
                  <MenuItemText>Date Modified</MenuItemText>
                </MenuRadioItem>
                <MenuRadioItem value="size">
                  <MenuItemIndicator />
                  <MenuItemText>File Size</MenuItemText>
                </MenuRadioItem>
                <MenuRadioItem value="type">
                  <MenuItemIndicator />
                  <MenuItemText>File Type</MenuItemText>
                </MenuRadioItem>
              </MenuRadioItemGroup>
            </MenuItemGroup>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}
