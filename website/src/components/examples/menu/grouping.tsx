import { Button } from '@moduix/react/button';
import { Menu } from '@moduix/react/menu';
import styles from '@/components/examples/menu/menu-grouping.module.css';

export default function GroupingMenuDemo() {
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>
          Edit
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className={styles.content}>
          <Menu.Viewport>
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Clipboard</Menu.ItemGroupLabel>
              <Menu.Item value="cut">Cut</Menu.Item>
              <Menu.Item value="copy">Copy</Menu.Item>
              <Menu.Item value="paste">Paste</Menu.Item>
            </Menu.ItemGroup>
            <Menu.Separator />
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Selection</Menu.ItemGroupLabel>
              <Menu.Item value="select-all">Select All</Menu.Item>
            </Menu.ItemGroup>
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}