import { Button } from '@moduix/react/button';
import {
  useMenu,
  MenuRootProvider,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
} from '@moduix/react/menu';
import { Stack } from '@moduix/react/stack';
import { PreviewMeta } from '@/components/mdx/Components';

export default function RootProviderMenuDemo() {
  const menu = useMenu();
  return (
    <div>
      <Stack direction="row" justify="center">
        <MenuRootProvider value={menu}>
          <MenuTrigger asChild>
            <Button>
              Edit
              <MenuIndicator />
            </Button>
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
      <PreviewMeta>
        <Button size="sm" onClick={() => menu.api.setHighlightedValue('copy')}>
          Highlight Copy
        </Button>
      </PreviewMeta>
    </div>
  );
}