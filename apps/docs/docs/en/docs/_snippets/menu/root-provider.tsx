import { Button } from '@moduix/react/button';
import { Menu, useMenu } from '@moduix/react/menu';
import { PreviewMeta } from '@/components/mdx/Components';

export default function RootProviderMenuDemo() {
  const menu = useMenu();
  return (
    <div>
      <div className="menu-trigger-row">
        <Menu.RootProvider value={menu}>
          <Menu.Trigger asChild>
            <Button>
              Edit
              <Menu.Indicator />
            </Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content className="menu-content">
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
      <PreviewMeta>
        <Button size="sm" onClick={() => menu.api.setHighlightedValue('copy')}>
          Highlight Copy
        </Button>
      </PreviewMeta>
    </div>
  );
}