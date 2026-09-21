import { Button } from '@moduix/react/button';
import { Menu, MenuTrigger, MenuIndicator, MenuPositioner, MenuContent, MenuViewport, MenuCheckboxItem, MenuItemIndicator, MenuItemText, MenuItemTextContent, MenuItemTextIcon, MenuItemTextLabel } from '@moduix/react/menu';
import {
  Grid3X3 as Grid3X3Icon,
  Map as MapIcon,
  MapPin as MapPinIcon,
  TrafficCone as TrafficConeIcon,
} from 'lucide-react';
import { useState } from 'react';
import styles from '@/components/examples/menu/menu-indicator-placement.module.css';

export default function IndicatorRightMenuDemo() {
  const [showSearch, setShowSearch] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [showTraffic, setShowTraffic] = useState(false);
  return (
    <Menu closeOnSelect={false}>
      <MenuTrigger asChild>
        <Button>
          View
          <MenuIndicator />
        </Button>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent className={styles.content}>
          <MenuViewport>
            <MenuCheckboxItem
              checked={showSearch}
              value="search"
              onCheckedChange={setShowSearch}
              indicator="end"
            >
              <MenuItemText>
                <MenuItemTextContent>
                  <MenuItemTextIcon>
                    <MapIcon />
                  </MenuItemTextIcon>
                  <MenuItemTextLabel>Search</MenuItemTextLabel>
                </MenuItemTextContent>
              </MenuItemText>
              <MenuItemIndicator />
            </MenuCheckboxItem>
            <MenuCheckboxItem
              checked={showGrid}
              value="grid"
              onCheckedChange={setShowGrid}
              indicator="end"
            >
              <MenuItemText>
                <MenuItemTextContent>
                  <MenuItemTextIcon>
                    <Grid3X3Icon />
                  </MenuItemTextIcon>
                  <MenuItemTextLabel>Grid</MenuItemTextLabel>
                </MenuItemTextContent>
              </MenuItemText>
              <MenuItemIndicator />
            </MenuCheckboxItem>
            <MenuCheckboxItem
              checked={showLabels}
              value="labels"
              onCheckedChange={setShowLabels}
              indicator="end"
            >
              <MenuItemText>
                <MenuItemTextContent>
                  <MenuItemTextIcon>
                    <MapPinIcon />
                  </MenuItemTextIcon>
                  <MenuItemTextLabel>Place Labels</MenuItemTextLabel>
                </MenuItemTextContent>
              </MenuItemText>
              <MenuItemIndicator />
            </MenuCheckboxItem>
            <MenuCheckboxItem
              checked={showTraffic}
              value="traffic"
              onCheckedChange={setShowTraffic}
              indicator="end"
            >
              <MenuItemText>
                <MenuItemTextContent>
                  <MenuItemTextIcon>
                    <TrafficConeIcon />
                  </MenuItemTextIcon>
                  <MenuItemTextLabel>Traffic</MenuItemTextLabel>
                </MenuItemTextContent>
              </MenuItemText>
              <MenuItemIndicator />
            </MenuCheckboxItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}
