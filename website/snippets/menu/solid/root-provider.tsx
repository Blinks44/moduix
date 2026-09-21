import { Button } from '@moduix/solid/button';
import { useMenu, MenuRootProvider, MenuTrigger, MenuIndicator, MenuPositioner, MenuContent, MenuViewport, MenuItem } from '@moduix/solid/menu';
import styles from '@/components/examples/menu/menu-root-provider.module.css';

export default function RootProviderMenuDemo() {
  const menu = useMenu();

  return (
    <div>
      <div class={styles.triggerRow}>
        <MenuRootProvider value={menu}>
          <MenuTrigger asChild={(props) => <Button {...props()} />}>
            Edit
            <MenuIndicator />
          </MenuTrigger>
          <MenuPositioner>
            <MenuContent class={styles.content}>
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
      <Button size="sm" onClick={() => menu.api().setHighlightedValue('copy')}>
        Highlight Copy
      </Button>
    </div>
  );
}
