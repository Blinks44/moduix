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
import { ChevronDown as ChevronDownIcon } from 'lucide-react';

const fileItems = [
  {
    value: 'new-file',
    label: 'New File',
  },
  {
    value: 'open',
    label: 'Open...',
  },
  {
    value: 'save',
    label: 'Save',
  },
  {
    value: 'save-as',
    label: 'Save As...',
  },
];

export default function BuildFromPartsMenuDemo() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button>
          File
          <MenuIndicator>
            <ChevronDownIcon strokeWidth={3} />
          </MenuIndicator>
        </Button>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            {fileItems.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}