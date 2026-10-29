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
import { ChevronDown as ChevronDownIcon } from 'lucide-solid';

const fileItems = [
  { value: 'new-file', label: 'New File' },
  { value: 'open', label: 'Open...' },
  { value: 'save', label: 'Save' },
  { value: 'save-as', label: 'Save As...' },
];

export default function BuildFromPartsMenuDemo() {
  return (
    <Menu>
      <MenuTrigger asChild={(props) => <Button {...props()} />}>
        File
        <MenuIndicator>
          <ChevronDownIcon strokeWidth={3} />
        </MenuIndicator>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            {fileItems.map((item) => (
              <MenuItem value={item.value}>{item.label}</MenuItem>
            ))}
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}