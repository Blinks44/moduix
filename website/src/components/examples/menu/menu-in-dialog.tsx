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
import { Menu } from '@moduix/react/menu';
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
              <Menu.Trigger asChild>
                <Button variant="outline">
                  Actions
                  <Menu.Indicator />
                </Button>
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Viewport>
                    <Menu.Item value="rename">Rename project</Menu.Item>
                    <Menu.Item value="duplicate">Duplicate project</Menu.Item>
                    <Menu.Item value="move">Move to folder</Menu.Item>
                    <Menu.Separator />
                    <Menu.Item value="archive" tone="destructive">
                      Archive project
                    </Menu.Item>
                  </Menu.Viewport>
                </Menu.Content>
              </Menu.Positioner>
            </Menu>
          </div>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}