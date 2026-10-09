import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuArrow,
  NavigationMenuViewportPositioner,
  NavigationMenuViewport,
} from '@moduix/solid/navigation-menu';
import { ChevronDownIcon } from 'lucide-solid';
import styles from '@/components/examples/navigation-menu/navigation-menu-viewport.module.css';

export default function ViewportNavigationMenuDemo() {
  return (
    <div class={styles.root}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>
              Products
              <ChevronDownIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent class={styles.productsContent}>
              <div class={styles.productsLinks}>
                <NavigationMenuLink href="#analytics">Analytics</NavigationMenuLink>
                <NavigationMenuLink href="#automation">Automation</NavigationMenuLink>
                <NavigationMenuLink href="#integrations">Integrations</NavigationMenuLink>
                <NavigationMenuLink href="#reports">Reports</NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="company">
            <NavigationMenuTrigger>
              Company
              <ChevronDownIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent class={styles.companyContent}>
              <NavigationMenuLink href="#about">About</NavigationMenuLink>
              <NavigationMenuLink href="#careers">Careers</NavigationMenuLink>
              <NavigationMenuLink href="#contact">Contact</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="resources">
            <NavigationMenuTrigger>
              Resources
              <ChevronDownIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent class={styles.resourcesContent}>
              <NavigationMenuLink href="#blog">Blog</NavigationMenuLink>
              <NavigationMenuLink href="#customers">Customer stories</NavigationMenuLink>
              <NavigationMenuLink href="#support">Support</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuIndicator>
            <NavigationMenuArrow />
          </NavigationMenuIndicator>
        </NavigationMenuList>
        <NavigationMenuViewportPositioner>
          <NavigationMenuViewport />
        </NavigationMenuViewportPositioner>
      </NavigationMenu>
    </div>
  );
}