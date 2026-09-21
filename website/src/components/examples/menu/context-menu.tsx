import { Menu, MenuContextTrigger, MenuPositioner, MenuContent, MenuViewport, MenuItem } from '@moduix/react/menu';
import styles from '@/components/examples/menu/menu-context-menu.module.css';

export default function ContextMenuDemo() {
  return (
    <Menu>
      <MenuContextTrigger className={styles.contextTrigger}>Right click here</MenuContextTrigger>
      <MenuPositioner>
        <MenuContent className={styles.content}>
          <MenuViewport>
            <MenuItem value="cut">Cut</MenuItem>
            <MenuItem value="copy">Copy</MenuItem>
            <MenuItem value="paste">Paste</MenuItem>
            <MenuItem value="select-all">Select All</MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}
