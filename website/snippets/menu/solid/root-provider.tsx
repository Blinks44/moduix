import { Button } from '@moduix/solid/button';
import { Menu, useMenu } from '@moduix/solid/menu';
import styles from '@/components/examples/menu/menu-root-provider.module.css';

export default function RootProviderMenuDemo() {
  const menu = useMenu();

  return (
    <div>
      <div class={styles.triggerRow}>
        <Menu.RootProvider value={menu}>
          <Menu.Trigger asChild={(props) => <Button {...props()} />}>
            Edit
            <Menu.Indicator />
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content class={styles.content}>
              <Menu.Item value="cut">Cut</Menu.Item>
              <Menu.Item value="copy">Copy</Menu.Item>
              <Menu.Item value="paste">Paste</Menu.Item>
              <Menu.Item value="delete" tone="destructive">
                Delete
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.RootProvider>
      </div>
      <Button size="sm" onClick={() => menu.api().setHighlightedValue('copy')}>
        Highlight Copy
      </Button>
    </div>
  );
}