import { describe, expect, it } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { ChevronDownIcon } from '@/internal/icons/ui/Icons';
import { NavigationMenu, useNavigationMenu } from '../src';

describe('NavigationMenu', () => {
  it('renders all parts and preserves children', () => {
    render(() => (
      <NavigationMenu.Root defaultValue="products">
        <NavigationMenu.List>
          <NavigationMenu.Item value="products">
            <NavigationMenu.Trigger>
              Products
              <ChevronDownIcon data-testid="trigger-icon" />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <NavigationMenu.Link href="/docs">Documentation</NavigationMenu.Link>
            </NavigationMenu.Content>
            <NavigationMenu.ItemIndicator data-testid="item-indicator" />
          </NavigationMenu.Item>
        </NavigationMenu.List>
        <NavigationMenu.Indicator data-testid="indicator" />
        <NavigationMenu.Arrow data-testid="arrow" />
        <NavigationMenu.ViewportPositioner>
          <NavigationMenu.Viewport data-testid="viewport" />
        </NavigationMenu.ViewportPositioner>
      </NavigationMenu.Root>
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
      <NavigationMenu.Root onValueChange={(details) => values.push(details.value)}>
        <NavigationMenu.List>
          <NavigationMenu.Item value="products">
            <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
            <NavigationMenu.Content>Product links</NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item value="company">
            <NavigationMenu.Trigger>Company</NavigationMenu.Trigger>
            <NavigationMenu.Content>Company links</NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
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
        <NavigationMenu.RootProvider value={navigationMenu}>
          <NavigationMenu.Context>
            {(context) => <div data-testid="context-value">{context().value || 'none'}</div>}
          </NavigationMenu.Context>
          <NavigationMenu.List>
            <NavigationMenu.Item value="products">
              <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
              <NavigationMenu.Content>Product links</NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.RootProvider>
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
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item value="products">
            <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
            <NavigationMenu.Content>Product links</NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    ));

    const content = container.querySelector<HTMLElement>('[data-slot="navigation-menu-content"]');
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-state', 'closed');
    expect(content).toHaveTextContent('Product links');
    expect(content).not.toBeVisible();
  });

  it('preserves Content children without an internal wrapper', () => {
    const { container } = render(() => (
      <NavigationMenu.Root defaultValue="products">
        <NavigationMenu.List>
          <NavigationMenu.Item value="products">
            <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <div data-testid="content-heading">Products</div>
              <NavigationMenu.Link href="/docs">Documentation</NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
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
      <NavigationMenu.Root ref={(element) => (root = element)}>
        <NavigationMenu.List>
          <NavigationMenu.Item value="products">
            <NavigationMenu.Trigger ref={(element) => (trigger = element)}>
              Products
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>Product links</NavigationMenu.Content>
            <NavigationMenu.Link asChild={(props) => <a {...props()} href="/docs" />} current>
              Documentation
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
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
      <NavigationMenu.Root defaultValue="products">
        <NavigationMenu.List>
          <NavigationMenu.Item value="products">
            <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <NavigationMenu.Link
                ref={(element) => (linkRef = element)}
                asChild={(props) => <a {...props()} href="/docs" />}
              >
                Documentation
              </NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    ));

    expect(linkRef).toBeUndefined();
    expect(screen.getByRole('link', { name: 'Documentation' })).toHaveAttribute('href', '/docs');
  });

  it('supports viewport motion after opening content', async () => {
    const { container } = render(() => (
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item value="products">
            <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
            <NavigationMenu.Content>Product links</NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item value="docs">
            <NavigationMenu.Trigger>Docs</NavigationMenu.Trigger>
            <NavigationMenu.Content>Documentation</NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
        <NavigationMenu.ViewportPositioner>
          <NavigationMenu.Viewport />
        </NavigationMenu.ViewportPositioner>
      </NavigationMenu.Root>
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