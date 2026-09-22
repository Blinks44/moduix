import {
  Menu,
  MenuContextTrigger,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
} from '@moduix/react/menu';
import styles from '@/components/examples/menu/menu-lazy-mounted-context-menu.module.css';

export default function ContextLazyMountMenuDemo() {
  return (
    <Menu lazyMount unmountOnExit>
      <MenuContextTrigger className={styles.contextTrigger}>
        Right click lazy mounted content
      </MenuContextTrigger>
      <MenuPositioner>
        <MenuContent className={styles.content}>
          <MenuViewport>
            <MenuItem value="cut">Cut</MenuItem>
            <MenuItem value="copy">Copy</MenuItem>
            <MenuItem value="paste">Paste</MenuItem>
            <MenuItem value="delete" tone="destructive">
              Delete
            </MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}