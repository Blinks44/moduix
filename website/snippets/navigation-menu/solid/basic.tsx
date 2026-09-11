import { NavigationMenu } from '@moduix/solid/navigation-menu';
import { ChevronDownIcon } from 'lucide-solid';
import styles from '@/components/examples/navigation-menu/navigation-menu-basic.module.css';

export default function NavigationMenuDemo() {
  return (
    <div class={styles.root}>
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