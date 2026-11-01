import { Button } from '@moduix/react/button';
import {
  Menu,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
} from '@moduix/react/menu';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function SelectEventMenuDemo() {
  const [selected, setSelected] = useState('Nothing selected');
  return (
    <div>
      <Stack direction="row" justify="center">
        <Menu onSelect={(details) => setSelected(details.value)}>
          <MenuTrigger asChild>
            <Button>
              Actions
              <MenuIndicator />
            </Button>
          </MenuTrigger>
          <MenuPositioner>
            <MenuContent>
              <MenuViewport>
                <MenuItem value="edit">Edit</MenuItem>
                <MenuItem value="duplicate">Duplicate</MenuItem>
                <MenuItem value="archive">Archive</MenuItem>
                <MenuItem value="delete" tone="destructive">
                  Delete
                </MenuItem>
              </MenuViewport>
            </MenuContent>
          </MenuPositioner>
        </Menu>
      </Stack>
      <PreviewMeta>
        <output>Selected: {selected}</output>
      </PreviewMeta>
    </div>
  );
}