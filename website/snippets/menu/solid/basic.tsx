import { Button } from '@moduix/solid/button';
import { Menu } from '@moduix/solid/menu';
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
      <Menu.Trigger asChild={(props) => <Button {...props()} />}>
        File
        <Menu.Indicator />
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content class={styles.content}>
          {fileItems.map((item) => (
            <Menu.Item value={item.value}>{item.label}</Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}