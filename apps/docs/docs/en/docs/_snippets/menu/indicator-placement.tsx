import { Button, Menu } from '@moduix/react';
import {
  Grid3X3 as Grid3X3Icon,
  Map as MapIcon,
  MapPin as MapPinIcon,
  TrafficCone as TrafficConeIcon,
} from 'lucide-react';
import { useState } from 'react';

export default function IndicatorRightMenuDemo() {
  const [showSearch, setShowSearch] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [showTraffic, setShowTraffic] = useState(false);
  return (
    <Menu closeOnSelect={false}>
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
          <Menu.CheckboxItem
            checked={showGrid}
            value="grid"
            onCheckedChange={setShowGrid}
            indicator="end"
          >
            <Menu.ItemText>
              <Menu.ItemTextContent>
                <Menu.ItemTextIcon>
                  <Grid3X3Icon />
                </Menu.ItemTextIcon>
                <Menu.ItemTextLabel>Grid</Menu.ItemTextLabel>
              </Menu.ItemTextContent>
            </Menu.ItemText>
            <Menu.ItemIndicator />
          </Menu.CheckboxItem>
          <Menu.CheckboxItem
            checked={showLabels}
            value="labels"
            onCheckedChange={setShowLabels}
            indicator="end"
          >
            <Menu.ItemText>
              <Menu.ItemTextContent>
                <Menu.ItemTextIcon>
                  <MapPinIcon />
                </Menu.ItemTextIcon>
                <Menu.ItemTextLabel>Place Labels</Menu.ItemTextLabel>
              </Menu.ItemTextContent>
            </Menu.ItemText>
            <Menu.ItemIndicator />
          </Menu.CheckboxItem>
          <Menu.CheckboxItem
            checked={showTraffic}
            value="traffic"
            onCheckedChange={setShowTraffic}
            indicator="end"
          >
            <Menu.ItemText>
              <Menu.ItemTextContent>
                <Menu.ItemTextIcon>
                  <TrafficConeIcon />
                </Menu.ItemTextIcon>
                <Menu.ItemTextLabel>Traffic</Menu.ItemTextLabel>
              </Menu.ItemTextContent>
            </Menu.ItemText>
            <Menu.ItemIndicator />
          </Menu.CheckboxItem>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}