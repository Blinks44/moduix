import { NavigationMenu } from '@moduix/solid/navigation-menu';
import { ChevronDownIcon } from 'lucide-solid';
import styles from '@/components/examples/navigation-menu/navigation-menu-viewport.module.css';

export default function ViewportNavigationMenuDemo() {
  return (
    <div class={styles.root}>
      <NavigationMenu>
        <NavigationMenu.List>
          <NavigationMenu.Item value="products">
            <NavigationMenu.Trigger>
              Products
              <ChevronDownIcon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content class={styles.productsContent}>
              <div class={styles.productsLinks}>
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
            <NavigationMenu.Content class={styles.companyContent}>
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
            <NavigationMenu.Content class={styles.resourcesContent}>
              <NavigationMenu.Link href="#blog">Blog</NavigationMenu.Link>
              <NavigationMenu.Link href="#customers">Customer stories</NavigationMenu.Link>
              <NavigationMenu.Link href="#support">Support</NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Indicator>
            <NavigationMenu.Arrow />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>
        <NavigationMenu.ViewportPositioner>
          <NavigationMenu.Viewport />
        </NavigationMenu.ViewportPositioner>
      </NavigationMenu>
    </div>
  );
}