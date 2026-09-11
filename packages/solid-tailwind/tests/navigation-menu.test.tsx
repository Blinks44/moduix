import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { useNavigationMenu, useNavigationMenuContext, NavigationMenu } from '../src';

function NavigationMenuParts() {
  return (
    <NavigationMenu.List>
      <NavigationMenu.Item value="home">
        <NavigationMenu.Link current href="#home">
          Home
        </NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item value="products">
        <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <NavigationMenu.Link href="#analytics">Analytics</NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item value="docs">
        <NavigationMenu.Trigger>Docs</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <NavigationMenu.Link href="#guides">Guides</NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  );
}

function ProviderNavigationMenu() {
  const navigationMenu = useNavigationMenu({ defaultValue: 'products' });

  return (
    <NavigationMenu.RootProvider value={navigationMenu}>
      <NavigationMenuParts />
      <ContextValue />
    </NavigationMenu.RootProvider>
  );
}

function ContextValue() {
  const navigationMenu = useNavigationMenuContext();

  return <output data-testid="navigation-menu-value">{navigationMenu().value ?? 'none'}</output>;
}

test('preserves Ark value changes, navigation semantics, and Tailwind anatomy', async () => {
  const changes: Array<string | null> = [];

  render(() => (
    <NavigationMenu
      defaultValue="products"
      onValueChange={(details) => changes.push(details.value)}
    >
      <NavigationMenuParts />
    </NavigationMenu>
  ));

  const root = screen.getByRole('navigation');
  const list = root.querySelector('[data-slot="navigation-menu-list"]');
  const products = screen.getByRole('button', { name: 'Products' });
  const docs = screen.getByRole('button', { name: 'Docs' });
  const content = root.querySelector('[data-slot="navigation-menu-content"]');

  expect(root).toHaveClass('relative', 'flex', 'w-fit', 'text-foreground');
  expect(list).toHaveClass('relative', 'flex', 'items-center', 'gap-1', 'p-0');
  expect(products).toHaveClass('inline-flex', 'min-h-control-md', 'rounded-md', 'px-3', 'text-sm');
  expect(content).toHaveClass('absolute', 'w-max', 'rounded-md', 'bg-popover', 'py-1');
  expect(screen.getByRole('link', { name: 'Analytics' })).toHaveClass(
    'inline-flex',
    'min-h-control-md',
    'text-sm',
  );
  expect(products).toHaveAttribute('data-state', 'open');
  expect(screen.getByRole('link', { name: 'Analytics' })).toBeVisible();

  fireEvent.click(docs);

  await waitFor(() => expect(docs).toHaveAttribute('data-state', 'open'));
  expect(changes).toEqual(['docs']);
  await waitFor(() => expect(screen.getByRole('link', { name: 'Guides' })).toBeVisible());
});

test('starts closed by default', () => {
  render(() => (
    <NavigationMenu>
      <NavigationMenuParts />
    </NavigationMenu>
  ));

  expect(screen.getByRole('button', { name: 'Products' })).toHaveAttribute('data-state', 'closed');
  expect(screen.getByRole('button', { name: 'Docs' })).toHaveAttribute('data-state', 'closed');
});

test('renders all parts and preserves Tailwind-owned styles', () => {
  render(() => (
    <NavigationMenu.Root defaultValue="products">
      <NavigationMenu.List>
        <NavigationMenu.Item value="products">
          <NavigationMenu.Trigger>
            Products
            <svg aria-hidden="true" data-testid="trigger-icon" />
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

  expect(screen.getByTestId('trigger-icon')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Products' })).toHaveClass(
    '[&>svg]:transition-[rotate]',
    'data-[state=open]:[&>svg]:rotate-180',
  );
  expect(screen.getByTestId('item-indicator')).toHaveClass('absolute', 'h-0.5', 'bg-current');
  expect(screen.getByTestId('indicator')).toHaveClass('absolute', 'h-2.5');
  expect(screen.getByTestId('arrow')).toHaveClass('size-2.5', 'rotate-45', 'bg-popover');
  expect(screen.getByTestId('viewport')).toHaveClass('relative', 'overflow-hidden', 'bg-popover');
  expect(screen.getByRole('link', { name: 'Documentation' })).toHaveAttribute('href', '/docs');
});

test('renders closed content safely by default', () => {
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

test('preserves Content children without an internal wrapper', () => {
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

test('supports refs on regular parts and asChild composition', () => {
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
  expect(link).toHaveClass('inline-flex', 'min-h-control-md');
});

test('does not forward refs through asChild composition', () => {
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

test('lets consumer utilities replace conflicting defaults', () => {
  render(() => (
    <NavigationMenu class="w-1/2 text-primary">
      <NavigationMenu.List class="gap-4 p-2">
        <NavigationMenu.Item value="products">
          <NavigationMenu.Trigger class="min-h-0 rounded-lg px-6 text-lg">
            Products
          </NavigationMenu.Trigger>
          <NavigationMenu.Content class="max-w-md py-0">Product links</NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>
  ));

  const root = screen.getByRole('navigation');
  const list = root.querySelector('[data-slot="navigation-menu-list"]');
  const trigger = screen.getByRole('button', { name: 'Products' });
  const content = root.querySelector('[data-slot="navigation-menu-content"]');

  expect(root).toHaveClass('w-1/2', 'text-primary');
  expect(root).not.toHaveClass('w-fit', 'text-foreground');
  expect(list).toHaveClass('gap-4', 'p-2');
  expect(list).not.toHaveClass('gap-1', 'p-0');
  expect(trigger).toHaveClass('min-h-0', 'rounded-lg', 'px-6', 'text-lg');
  expect(trigger).not.toHaveClass('min-h-control-md', 'rounded-md', 'px-3', 'text-sm');
  expect(content).toHaveClass('max-w-md', 'py-0');
  expect(content).not.toHaveClass('max-w-[min(20rem,calc(100vw-1.5rem))]', 'py-1');
});

test('supports viewport motion after opening content', async () => {
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
  expect(viewport).toHaveClass(
    'relative',
    'h-[var(--viewport-height)]',
    'w-[var(--viewport-width)]',
    'overflow-hidden',
  );
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
  expect(viewport?.className).toContain(
    '[&_[data-slot=navigation-menu-content][data-motion=from-end][data-state=open]]:animate-moduix-navigation-menu-content-from-end',
  );
  expect(viewport?.className).toContain(
    '[&_[data-slot=navigation-menu-content][data-motion=to-start][data-state=closed]]:animate-moduix-navigation-menu-content-to-start',
  );
  expect(viewport?.className).not.toContain(
    '[&_[data-slot=navigation-menu-content][data-motion=from-end]]:opacity-0',
  );
});

test('supports a controlled root provider and context', () => {
  render(() => <ProviderNavigationMenu />);

  expect(screen.getByTestId('navigation-menu-value')).toHaveTextContent('products');
  expect(screen.getByRole('button', { name: 'Products' })).toHaveAttribute('data-state', 'open');
  expect(screen.getByRole('navigation')).toHaveAttribute(
    'data-slot',
    'navigation-menu-root-provider',
  );
});