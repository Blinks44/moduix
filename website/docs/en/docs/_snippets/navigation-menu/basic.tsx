import { NavigationMenu } from '@moduix/react/navigation-menu';
import { ChevronDownIcon } from 'lucide-react';

export default function NavigationMenuDemo() {
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
          <NavigationMenu.Item value="home">
            <NavigationMenu.Link href="#home">Home</NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item value="products">
            <NavigationMenu.Trigger>
              Products
              <ChevronDownIcon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <NavigationMenu.Link href="#analytics">Analytics</NavigationMenu.Link>
              <NavigationMenu.Link href="#automation">Automation</NavigationMenu.Link>
              <NavigationMenu.Link href="#integrations">Integrations</NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item value="docs">
            <NavigationMenu.Trigger>
              Docs
              <ChevronDownIcon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <NavigationMenu.Link href="#guides">Guides</NavigationMenu.Link>
              <NavigationMenu.Link href="#api">API reference</NavigationMenu.Link>
              <NavigationMenu.Link href="#examples">Examples</NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu>
    </div>
  );
}