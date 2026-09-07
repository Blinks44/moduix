import { Button } from '@moduix/solid/button';
import { Menu } from '@moduix/solid/menu';
import styles from '@/components/examples/menu/menu-grouping.module.css';

export default function GroupingMenuDemo() {
  return (
    <Menu>
      <Menu.Trigger asChild={(props) => <Button {...props()} />}>
        Edit
        <Menu.Indicator />
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content class={styles.content}>
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
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}