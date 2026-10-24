import { Button } from '@moduix/solid/button';
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
} from '@moduix/solid/menu';

export default function NestedMenuDemo() {
  return (
    <Menu>
      <MenuTrigger asChild={(props) => <Button {...props()} />}>
        File
        <MenuIndicator />
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItem value="open">Open...</MenuItem>
            <MenuItem value="save">Save</MenuItem>
            <Menu>
              <MenuTriggerItem>
                Share
                <MenuTriggerItemIcon />
              </MenuTriggerItem>
              <MenuPositioner>
                <MenuContent>
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