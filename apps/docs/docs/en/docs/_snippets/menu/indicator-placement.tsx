import { Button, Menu } from '@moduix/react';
import { Map as MapIcon } from 'lucide-react';
import { useState } from 'react';

export default function IndicatorRightMenuDemo() {
  const [showSearch, setShowSearch] = useState(true);
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>
          View
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className="menu-content">
          <Menu.CheckboxItem
            checked={showSearch}
            value="search"
            onCheckedChange={setShowSearch}
            indicator="end"
          >
            <Menu.ItemText>
              <Menu.ItemTextContent>
                <Menu.ItemTextIcon>
                  <MapIcon />
                </Menu.ItemTextIcon>
                <Menu.ItemTextLabel>Search</Menu.ItemTextLabel>
              </Menu.ItemTextContent>
            </Menu.ItemText>
            <Menu.ItemIndicator />
          </Menu.CheckboxItem>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}