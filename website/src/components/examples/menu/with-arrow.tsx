import { Button } from '@moduix/react/button';
import { Menu, MenuTrigger, MenuIndicator, MenuPositioner, MenuContent, MenuViewport, MenuArrow, MenuArrowTip, MenuItem } from '@moduix/react/menu';

export default function MenuWithArrowDemo() {
  return (
    <Menu positioning={{ placement: 'bottom-start', gutter: 12 }}>
      <MenuTrigger asChild>
        <Button>
          File
          <MenuIndicator />
        </Button>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuArrow>
            <MenuArrowTip />
          </MenuArrow>
          <MenuViewport>
            <MenuItem value="new-file">New File</MenuItem>
            <MenuItem value="open">Open...</MenuItem>
            <MenuItem value="save">Save</MenuItem>
            <MenuItem value="save-as">Save As...</MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}
