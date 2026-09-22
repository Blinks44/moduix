import { Button } from '@moduix/react/button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/react/dialog';
import {
  Menu,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
  MenuSeparator,
} from '@moduix/react/menu';
import styles from '@/components/examples/menu/menu-menu-in-dialog.module.css';

export default function MenuInDialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Project settings</DialogTitle>
            <DialogCloseIcon />
            <DialogDescription>Choose an action without leaving the dialog.</DialogDescription>
          </DialogHeader>
          <div className={styles.stack}>
            <Menu portalled={false} positioning={{ strategy: 'fixed', hideWhenDetached: true }}>
              <MenuTrigger asChild>
                <Button variant="outline">
                  Actions
                  <MenuIndicator />
                </Button>
              </MenuTrigger>
              <MenuPositioner>
                <MenuContent>
                  <MenuViewport>
                    <MenuItem value="rename">Rename project</MenuItem>
                    <MenuItem value="duplicate">Duplicate project</MenuItem>
                    <MenuItem value="move">Move to folder</MenuItem>
                    <MenuSeparator />
                    <MenuItem value="archive" tone="destructive">
                      Archive project
                    </MenuItem>
                  </MenuViewport>
                </MenuContent>
              </MenuPositioner>
            </Menu>
          </div>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}