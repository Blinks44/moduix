import { Button, Menu } from '@moduix/react';

export default function AdvancedCustomizationMenuDemo() {
  return (
    <Menu positioning={{ placement: 'bottom-end', gutter: 12 }}>
      <Menu.Trigger asChild>
        <Button variant="outline">Project</Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Arrow>
            <Menu.ArrowTip />
          </Menu.Arrow>
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Project</Menu.ItemGroupLabel>
            <Menu.Item asChild value="overview">
              <a href="#overview">Open overview</a>
            </Menu.Item>
            <Menu.Item value="duplicate">
              <span>Duplicate project</span>
              <span aria-hidden="true">⌘D</span>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.Separator />
          <Menu.Item value="archive" tone="destructive">
            Archive project
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}