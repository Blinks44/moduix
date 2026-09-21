import { Button } from '@moduix/react/button';
import { useMenu, MenuRootProvider, MenuTrigger, MenuIndicator, MenuPositioner, MenuContent, MenuViewport, MenuItem } from '@moduix/react/menu';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/menu/menu-root-provider.module.css';

export default function RootProviderMenuDemo() {
  const menu = useMenu();
  return (
    <div>
      <div className={styles.triggerRow}>
        <MenuRootProvider value={menu}>
          <MenuTrigger asChild>
            <Button>
              Edit
              <MenuIndicator />
            </Button>
          </MenuTrigger>
          <MenuPositioner>
            <MenuContent className={styles.content}>
              <MenuViewport>
                <MenuItem value="cut">Cut</MenuItem>
                <MenuItem value="copy">Copy</MenuItem>
                <MenuItem value="paste">Paste</MenuItem>
                <MenuItem value="delete" tone="destructive">
                  Delete
                </MenuItem>
              </MenuViewport>
            </MenuContent>
          </MenuPositioner>
        </MenuRootProvider>
      </div>
      <PreviewMeta>
        <Button size="sm" onClick={() => menu.api.setHighlightedValue('copy')}>
          Highlight Copy
        </Button>
      </PreviewMeta>
    </div>
  );
}
