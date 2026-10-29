import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import {
  NavigationMenu,
  useNavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuRootProvider,
  NavigationMenuContext,
} from '@/index';

test('supports a controlled root provider and context', async () => {
  const ProviderState = () => {
    const navigationMenu = useNavigationMenu({ defaultValue: 'products' });

    return (
      <NavigationMenuRootProvider value={navigationMenu}>
        <NavigationMenuContext>
          {(context) => <div data-testid="context-value">{context().value || 'none'}</div>}
        </NavigationMenuContext>
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>Product links</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenuRootProvider>
    );
  };

  render(() => <ProviderState />);

  await expect.element(page.getByTestId('context-value')).toContainText('products');
  await expect
    .element(page.getByRole('button', { name: 'Products', exact: true }))
    .toHaveAttribute('data-state', 'open');
  await expect
    .element(page.getByRole('navigation'))
    .toHaveAttribute('data-slot', 'navigation-menu-root-provider');
});

test('supports refs on regular parts and asChild composition', async () => {
  let root: HTMLElement | undefined;
  let trigger: HTMLElement | undefined;

  render(() => (
    <NavigationMenu ref={(element) => (root = element)}>
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger ref={(element) => (trigger = element)}>
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>Product links</NavigationMenuContent>
          <NavigationMenuLink asChild={(props) => <a {...props()} href="/docs" />} current>
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ));

  expect(root).toBeInstanceOf(HTMLElement);
  expect(root!.getAttribute('data-slot')).toBe('navigation-menu-root');
  expect(trigger).toBeInstanceOf(HTMLElement);
  expect(trigger!.getAttribute('data-slot')).toBe('navigation-menu-trigger');

  const documentationLocator = page.getByRole('link', { name: 'Documentation', exact: true });
  await expect.element(documentationLocator).toHaveAttribute('href', '/docs');
  await expect.element(documentationLocator).toHaveAttribute('data-slot', 'navigation-menu-link');
  await expect.element(documentationLocator).toHaveAttribute('data-current');
});