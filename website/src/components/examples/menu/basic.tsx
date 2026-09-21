import { Button } from '@moduix/react/button';
import { Menu, MenuTrigger, MenuIndicator, MenuPositioner, MenuContent, MenuViewport, MenuItem } from '@moduix/react/menu';
import styles from '@/components/examples/menu/menu-basic.module.css';

const fileItems = [
  {
    value: 'new-file',
    label: 'New File',
  },
  {
    value: 'open',
    label: 'Open...',
  },
  {
    value: 'save',
    label: 'Save',
  },
  {
    value: 'save-as',
    label: 'Save As...',
  },
];

export default function MenuDemo() {
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
            {fileItems.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}
