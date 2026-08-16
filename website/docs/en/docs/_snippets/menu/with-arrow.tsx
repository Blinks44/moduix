import { Button } from '@moduix/react/button';
import { Menu } from '@moduix/react/menu';

export default function MenuWithArrowDemo() {
  return (
    <Menu positioning={{ placement: 'bottom-start', gutter: 12 }}>
      <Menu.Trigger asChild>
        <Button>
          File
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Arrow>
            <Menu.ArrowTip />
          </Menu.Arrow>
          <Menu.Item value="new-file">New File</Menu.Item>
          <Menu.Item value="open">Open...</Menu.Item>
          <Menu.Item value="save">Save</Menu.Item>
          <Menu.Item value="save-as">Save As...</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}