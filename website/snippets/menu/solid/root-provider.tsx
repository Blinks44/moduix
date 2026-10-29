import { Button } from '@moduix/solid/button';
import {
  useMenu,
  MenuRootProvider,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
} from '@moduix/solid/menu';
import { Stack } from '@moduix/solid/stack';

export default function RootProviderMenuDemo() {
  const menu = useMenu();

  return (
    <div>
      <Stack direction="row" justify="center">
        <MenuRootProvider value={menu}>
          <MenuTrigger asChild={(props) => <Button {...props()} />}>
            Edit
            <MenuIndicator />
          </MenuTrigger>
          <MenuPositioner>
            <MenuContent>
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
      </Stack>
      <Button size="sm" onClick={() => menu.api().setHighlightedValue('copy')}>
        Highlight Copy
      </Button>
    </div>
  );
}