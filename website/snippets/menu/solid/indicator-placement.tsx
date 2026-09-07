import { Button } from '@moduix/solid/button';
import { Menu } from '@moduix/solid/menu';
import {
  Grid3X3 as Grid3X3Icon,
  Map as MapIcon,
  MapPin as MapPinIcon,
  TrafficCone as TrafficConeIcon,
} from 'lucide-solid';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/menu/menu-indicator-placement.module.css';

export default function IndicatorRightMenuDemo() {
  const [showSearch, setShowSearch] = createSignal(true);
  const [showGrid, setShowGrid] = createSignal(false);
  const [showLabels, setShowLabels] = createSignal(true);
  const [showTraffic, setShowTraffic] = createSignal(false);

  return (
    <Menu closeOnSelect={false}>
      <Menu.Trigger asChild={(props) => <Button {...props()} />}>
        View
        <Menu.Indicator />
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content class={styles.content}>
          <Menu.CheckboxItem
            checked={showSearch()}
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
            checked={showGrid()}
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
            checked={showLabels()}
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
            checked={showTraffic()}
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