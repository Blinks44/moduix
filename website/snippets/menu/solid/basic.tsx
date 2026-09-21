import { Button } from '@moduix/solid/button';
import { Menu, MenuTrigger, MenuIndicator, MenuPositioner, MenuContent, MenuViewport, MenuItem } from '@moduix/solid/menu';
import styles from '@/components/examples/menu/menu-basic.module.css';

const fileItems = [
  { value: 'new-file', label: 'New File' },
  { value: 'open', label: 'Open...' },
  { value: 'save', label: 'Save' },
  { value: 'save-as', label: 'Save As...' },
];

export default function MenuDemo() {
  return (
    <Menu>
      <MenuTrigger asChild={(props) => <Button {...props()} />}>
        File
        <MenuIndicator />
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent class={styles.content}>
          <MenuViewport>
            {fileItems.map((item) => (
              <MenuItem value={item.value}>{item.label}</MenuItem>
            ))}
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}
