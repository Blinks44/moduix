import { describe, expect, it } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { ChevronDownIcon } from '@/internal/icons/ui/Icons';
import {
  NavigationMenu,
  useNavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuItemIndicator,
  NavigationMenuIndicator,
  NavigationMenuArrow,
  NavigationMenuViewportPositioner,
  NavigationMenuViewport,
  NavigationMenuRootProvider,
  NavigationMenuContext,
} from '../src';

describe('NavigationMenu', () => {
  it('renders all parts and preserves children', () => {
    render(() => (
      <NavigationMenu defaultValue="products">
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>
              Products
              <ChevronDownIcon data-testid="trigger-icon" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
            </NavigationMenuContent>
            <NavigationMenuItemIndicator data-testid="item-indicator" />
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuIndicator data-testid="indicator" />
        <NavigationMenuArrow data-testid="arrow" />
        <NavigationMenuViewportPositioner>
          <NavigationMenuViewport data-testid="viewport" />
        </NavigationMenuViewportPositioner>
      </NavigationMenu>
    ));

    expect(screen.getByRole('navigation')).toHaveAttribute('data-slot', 'navigation-menu-root');
    expect(screen.getByTestId('viewport')).toHaveAttribute('data-state', 'open');
    expect(screen.getByRole('button', { name: /products/i })).toHaveAttribute(
      'data-slot',
      'navigation-menu-trigger',
    );
    expect(screen.getByTestId('trigger-icon')).toBeInTheDocument();
    expect(screen.getByTestId('item-indicator')).toHaveAttribute(
      'data-slot',
      'navigation-menu-item-indicator',
    );
    expect(screen.getByTestId('indicator')).toHaveAttribute(
      'data-slot',
      'navigation-menu-indicator',
    );
    expect(screen.getByTestId('arrow')).toHaveAttribute('data-slot', 'navigation-menu-arrow');
    expect(screen.getByTestId('viewport')).toHaveAttribute('data-slot', 'navigation-menu-viewport');
    expect(screen.getByRole('link', { name: 'Documentation' })).toHaveAttribute('href', '/docs');
  });

  it('changes value and closes when the active trigger is clicked', async () => {
    const values: Array<string | null> = [];

    render(() => (
      <NavigationMenu onValueChange={(details) => values.push(details.value)}>
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>Product links</NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="company">
            <NavigationMenuTrigger>Company</NavigationMenuTrigger>
            <NavigationMenuContent>Company links</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ));

    const products = screen.getByRole('button', { name: 'Products' });
    const company = screen.getByRole('button', { name: 'Company' });

    products.click();
    await waitFor(() => {
      expect(products).toHaveAttribute('data-state', 'open');
      expect(screen.getByText('Product links')).toBeVisible();
    });

    company.click();
    await waitFor(() => {
      expect(company).toHaveAttribute('data-state', 'open');
      expect(products).toHaveAttribute('data-state', 'closed');
      expect(screen.getByText('Company links')).toBeVisible();
    });
    expect(values).toEqual(['products', 'company']);

    company.click();
    await waitFor(() => {
      expect(company).toHaveAttribute('data-state', 'closed');
      expect(screen.getByText('Company links')).not.toBeVisible();
    });
  });

  it('supports a controlled root provider and context', async () => {
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

    expect(screen.getByTestId('context-value')).toHaveTextContent('products');
    expect(screen.getByRole('button', { name: 'Products' })).toHaveAttribute('data-state', 'open');
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'data-slot',
      'navigation-menu-root-provider',
    );
  });

  it('renders closed content safely by default', () => {
    const { container } = render(() => (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>Product links</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ));

    const content = container.querySelector<HTMLElement>('[data-slot="navigation-menu-content"]');
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-state', 'closed');
    expect(content).toHaveTextContent('Product links');
    expect(content).not.toBeVisible();
  });

  it('preserves Content children without an internal wrapper', () => {
    const { container } = render(() => (
      <NavigationMenu defaultValue="products">
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div data-testid="content-heading">Products</div>
              <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ));

    const content = container.querySelector<HTMLElement>('[data-slot="navigation-menu-content"]');
    expect(content).toBeInTheDocument();
    expect(content?.children).toHaveLength(2);
    expect(content?.firstElementChild).toBe(screen.getByTestId('content-heading'));
    expect(content?.querySelector('[data-slot="navigation-menu-indicator"]')).toBeNull();
  });

  it('supports refs on regular parts and asChild composition', () => {
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
    expect(root).toHaveAttribute('data-slot', 'navigation-menu-root');
    expect(trigger).toBeInstanceOf(HTMLElement);
    expect(trigger).toHaveAttribute('data-slot', 'navigation-menu-trigger');

    const link = screen.getByRole('link', { name: 'Documentation' });
    expect(link).toHaveAttribute('href', '/docs');
    expect(link).toHaveAttribute('data-slot', 'navigation-menu-link');
    expect(link).toHaveAttribute('data-current');
    expect(link).toHaveClass(/link/);
  });

  it('does not forward refs through asChild composition', () => {
    let linkRef: HTMLElement | undefined;

    render(() => (
      <NavigationMenu defaultValue="products">
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink
                ref={(element) => (linkRef = element)}
                asChild={(props) => <a {...props()} href="/docs" />}
              >
                Documentation
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ));

    expect(linkRef).toBeUndefined();
    expect(screen.getByRole('link', { name: 'Documentation' })).toHaveAttribute('href', '/docs');
  });

  it('supports viewport motion after opening content', async () => {
    const { container } = render(() => (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>Product links</NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="docs">
            <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
            <NavigationMenuContent>Documentation</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewportPositioner>
          <NavigationMenuViewport />
        </NavigationMenuViewportPositioner>
      </NavigationMenu>
    ));

    const viewport = container.querySelector('[data-slot="navigation-menu-viewport"]');
    expect(viewport).toHaveAttribute('data-state', 'closed');

    fireEvent.click(screen.getByRole('button', { name: 'Products' }));

    await waitFor(() => {
      expect(viewport).toHaveAttribute('data-state', 'open');
    });

    fireEvent.click(screen.getByRole('button', { name: 'Docs' }));

    await waitFor(() => {
      expect(
        container.querySelector('[data-slot="navigation-menu-content"][data-motion]'),
      ).toBeInTheDocument();
    });
  });
});
