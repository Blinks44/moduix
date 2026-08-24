import { NavigationMenu } from '@moduix/react/navigation-menu';
import { ChevronDownIcon } from 'lucide-react';

export default function ViewportNavigationMenuDemo() {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        inlineSize: '100%',
        justifyContent: 'center',
        minBlockSize: '21rem',
      }}
    >
      <NavigationMenu>
        <NavigationMenu.List>
          <NavigationMenu.Item value="products">
            <NavigationMenu.Trigger>
              Products
              <ChevronDownIcon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content style={{ width: '20rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                <NavigationMenu.Link href="#analytics">Analytics</NavigationMenu.Link>
                <NavigationMenu.Link href="#automation">Automation</NavigationMenu.Link>
                <NavigationMenu.Link href="#integrations">Integrations</NavigationMenu.Link>
                <NavigationMenu.Link href="#reports">Reports</NavigationMenu.Link>
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item value="company">
            <NavigationMenu.Trigger>
              Company
              <ChevronDownIcon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content style={{ width: '14rem' }}>
              <NavigationMenu.Link href="#about">About</NavigationMenu.Link>
              <NavigationMenu.Link href="#careers">Careers</NavigationMenu.Link>
              <NavigationMenu.Link href="#contact">Contact</NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item value="resources">
            <NavigationMenu.Trigger>
              Resources
              <ChevronDownIcon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content style={{ width: '7rem' }}>
              <NavigationMenu.Link href="#blog">Blog</NavigationMenu.Link>
              <NavigationMenu.Link href="#customers">Customer stories</NavigationMenu.Link>
              <NavigationMenu.Link href="#support">Support</NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
        <NavigationMenu.ViewportPositioner>
          <NavigationMenu.Indicator>
            <NavigationMenu.Arrow />
          </NavigationMenu.Indicator>
          <NavigationMenu.Viewport />
        </NavigationMenu.ViewportPositioner>
      </NavigationMenu>
    </div>
  );
}