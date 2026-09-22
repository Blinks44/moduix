import { Button } from '@moduix/react/button';
import {
  Menu,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
  MenuTriggerItem,
  MenuTriggerItemIcon,
} from '@moduix/react/menu';
import styles from '@/components/examples/menu/menu-nested.module.css';

export default function NestedMenuDemo() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button>
          File
          <MenuIndicator />
        </Button>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent className={styles.content}>
          <MenuViewport>
            <MenuItem value="open">Open...</MenuItem>
            <MenuItem value="save">Save</MenuItem>
            <Menu>
              <MenuTriggerItem>
                Share
                <MenuTriggerItemIcon />
              </MenuTriggerItem>
              <MenuPositioner>
                <MenuContent className={styles.content}>
                  <MenuViewport>
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="message">Message</MenuItem>
                    <MenuItem value="copy-link">Copy Link</MenuItem>
                    <MenuItem value="invite">Invite people</MenuItem>
                  </MenuViewport>
                </MenuContent>
              </MenuPositioner>
            </Menu>
            <MenuItem value="print">Print</MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}