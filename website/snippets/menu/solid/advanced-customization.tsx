import { Button } from '@moduix/solid/button';
import { Menu } from '@moduix/solid/menu';

export default function AdvancedCustomizationMenuDemo() {
  return (
    <Menu positioning={{ placement: 'bottom-end', gutter: 12 }}>
      <Menu.Trigger asChild={(props) => <Button {...props()} variant="outline" />}>
        Project
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Viewport>
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Project</Menu.ItemGroupLabel>
              <Menu.Item asChild={(props) => <a {...props()} href="#overview" />} value="overview">
                Open overview
              </Menu.Item>
              <Menu.Item value="duplicate">
                <span>Duplicate project</span>
                <Menu.ItemShortcut>⌘D</Menu.ItemShortcut>
              </Menu.Item>
              <Menu.Item value="settings">Project settings</Menu.Item>
            </Menu.ItemGroup>
            <Menu.Separator />
            <Menu.Item value="archive" tone="destructive">
              Archive project
            </Menu.Item>
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}