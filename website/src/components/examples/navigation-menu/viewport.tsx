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
} from '@moduix/react/navigation-menu';
import { ChevronDownIcon } from 'lucide-react';
import styles from '@/components/examples/navigation-menu/navigation-menu-viewport.module.css';

export default function ViewportNavigationMenuDemo() {
  return (
    <div className={styles.root}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>
              Products
              <ChevronDownIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent className={styles.productsContent}>
              <div className={styles.productsLinks}>
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
            <NavigationMenuContent className={styles.companyContent}>
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
            <NavigationMenuContent className={styles.resourcesContent}>
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