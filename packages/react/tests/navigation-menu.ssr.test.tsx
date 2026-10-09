import { expect, test } from '@rstest/core';
import { renderToString } from 'react-dom/server';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '../src';

test('renders closed content safely on the server', () => {
  const html = renderToString(
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="#analytics">Analytics</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>,
  );
  expect(html).toContain('data-slot="navigation-menu-content"');
  expect(html).toContain('data-state="closed"');
});