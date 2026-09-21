import { Button } from '@moduix/solid/button';
import { Menu, MenuTrigger, MenuIndicator, MenuPositioner, MenuContent, MenuViewport, MenuItem, MenuSeparator, MenuItemGroup, MenuItemGroupLabel } from '@moduix/solid/menu';
import styles from '@/components/examples/menu/menu-grouping.module.css';

export default function GroupingMenuDemo() {
  return (
    <Menu>
      <MenuTrigger asChild={(props) => <Button {...props()} />}>
        Edit
        <MenuIndicator />
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent class={styles.content}>
          <MenuViewport>
            <MenuItemGroup>
              <MenuItemGroupLabel>Clipboard</MenuItemGroupLabel>
              <MenuItem value="cut">Cut</MenuItem>
              <MenuItem value="copy">Copy</MenuItem>
              <MenuItem value="paste">Paste</MenuItem>
            </MenuItemGroup>
            <MenuSeparator />
            <MenuItemGroup>
              <MenuItemGroupLabel>Selection</MenuItemGroupLabel>
              <MenuItem value="select-all">Select All</MenuItem>
            </MenuItemGroup>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}
