import { Button } from '@moduix/solid/button';
import {
  Menu,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
} from '@moduix/solid/menu';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';

export default function SelectEventMenuDemo() {
  const [selected, setSelected] = createSignal('Nothing selected');

  return (
    <div>
      <Stack direction="row" justify="center">
        <Menu onSelect={(details) => setSelected(details.value)}>
          <MenuTrigger asChild={(props) => <Button {...props()} />}>
            Actions
            <MenuIndicator />
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
      <div data-preview-meta>
        <output>Selected: {selected()}</output>
      </div>
    </div>
  );
}