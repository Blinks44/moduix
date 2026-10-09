import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@moduix/react/navigation-menu';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/navigation-menu/navigation-menu-controlled-value.module.css';

export default function ControlledNavigationMenuDemo() {
  const [value, setValue] = useState<string | undefined>();

  return (
    <div className={styles.root}>
      <NavigationMenu
        value={value}
        onValueChange={(details) => setValue(details.value ?? undefined)}
      >
        <NavigationMenuList>
          <NavigationMenuItem value="home">
            <NavigationMenuLink href="#home">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>
              Products
              <ChevronDownIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#analytics">Analytics</NavigationMenuLink>
              <NavigationMenuLink href="#automation">Automation</NavigationMenuLink>
              <NavigationMenuLink href="#integrations">Integrations</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="docs">
            <NavigationMenuTrigger>
              Docs
              <ChevronDownIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#guides">Guides</NavigationMenuLink>
              <NavigationMenuLink href="#api">API reference</NavigationMenuLink>
              <NavigationMenuLink href="#examples">Examples</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <PreviewMeta>
        <output>Open: {value ?? 'none'}</output>
      </PreviewMeta>
    </div>
  );
}