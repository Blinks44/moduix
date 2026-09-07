import { Button } from '@moduix/react/button';
import { Menu, useMenu } from '@moduix/react/menu';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/menu/menu-root-provider.module.css';

export default function RootProviderMenuDemo() {
  const menu = useMenu();
  return (
    <div>
      <div className={styles.triggerRow}>
        <Menu.RootProvider value={menu}>
          <Menu.Trigger asChild>
            <Button>
              Edit
              <Menu.Indicator />
            </Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content className={styles.content}>
              <Menu.Viewport>
                <Menu.Item value="cut">Cut</Menu.Item>
                <Menu.Item value="copy">Copy</Menu.Item>
                <Menu.Item value="paste">Paste</Menu.Item>
                <Menu.Item value="delete" tone="destructive">
                  Delete
                </Menu.Item>
              </Menu.Viewport>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.RootProvider>
      </div>
      <PreviewMeta>
        <Button size="sm" onClick={() => menu.api.setHighlightedValue('copy')}>
          Highlight Copy
        </Button>
      </PreviewMeta>
    </div>
  );
}