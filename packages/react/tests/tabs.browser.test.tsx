import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRootProvider,
  TabsTrigger,
  useTabs,
  useTabsContext,
} from '../src';

const items = [
  { value: 'overview', label: 'Overview', content: 'Overview content' },
  { value: 'projects', label: 'Projects', content: 'Projects content' },
  { value: 'account', label: 'Account', content: 'Account content' },
];

function TabParts({ disabled = false }: { disabled?: boolean }) {
  return (
    <>
      <TabsList>
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            disabled={disabled && item.value === 'projects'}
            value={item.value}
          >
            {item.label}
          </TabsTrigger>
        ))}
        <TabsIndicator />
      </TabsList>
      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </>
  );
}

function ProviderTabs({
  orientation = 'horizontal',
  variant = 'default',
}: {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'line';
}) {
  const tabs = useTabs({ defaultValue: 'overview', orientation });

  return (
    <TabsRootProvider value={tabs} variant={variant}>
      <TabParts />
      <ContextOutput />
    </TabsRootProvider>
  );
}

function ContextOutput() {
  const context = useTabsContext();
  return <output data-testid="tabs-context-value">{context.value ?? 'none'}</output>;
}

test('preserves keyboard navigation, disabled triggers, and Ark callback details', async () => {
  const changes: string[] = [];
  render(
    <Tabs defaultValue="overview" onValueChange={(details) => changes.push(details.value ?? '')}>
      <TabParts disabled />
    </Tabs>,
  );

  await expect.element(page.getByRole('tab', { name: 'Projects', exact: true })).toBeDisabled();
  await page.getByRole('tab', { name: 'Overview', exact: true }).click();
  await page.getByRole('tab', { name: 'Overview', exact: true }).press('ArrowRight');
  await expect.element(page.getByRole('tab', { name: 'Account', exact: true })).toBeFocused();
  await expect.poll(() => changes).toEqual(['account']);
});

test('uses vertical keyboard navigation and mounts inactive content lazily', async () => {
  render(
    <Tabs defaultValue="overview" lazyMount orientation="vertical" unmountOnExit variant="line">
      <TabParts />
    </Tabs>,
  );

  const overview = screen.getByRole('tab', { name: 'Overview' });

  await expect.element(page.getByText('Projects content')).toHaveCount(0);
  expect(overview.closest('[data-slot="tabs-root"]')!.getAttribute('data-variant')).toBe('default');

  await page.getByRole('tab', { name: 'Overview', exact: true }).click();
  await page.getByRole('tab', { name: 'Overview', exact: true }).press('ArrowDown');
  await expect.element(page.getByRole('tab', { name: 'Projects', exact: true })).toBeFocused();
  await expect.element(page.getByText('Projects content')).toBeVisible();
});

test('keeps manual activation focused until Enter selects the tab', async () => {
  const changes: string[] = [];
  render(
    <Tabs
      defaultValue="overview"
      activationMode="manual"
      onValueChange={(details) => changes.push(details.value ?? '')}
    >
      <TabParts />
    </Tabs>,
  );

  const overviewLocator = page.getByRole('tab', { name: 'Overview', exact: true });
  await overviewLocator.click();
  await overviewLocator.press('ArrowRight');
  const projectsLocator = page.getByRole('tab', { name: 'Projects', exact: true });
  await expect.element(projectsLocator).toBeFocused();
  await expect.element(overviewLocator).toHaveAttribute('aria-selected', 'true');
  expect(changes).toEqual([]);

  await projectsLocator.press('Enter');
  await expect.element(projectsLocator).toHaveAttribute('aria-selected', 'true');
  expect(changes).toEqual(['projects']);
});

test('preserves asChild and provider context composition', async () => {
  const { rerender } = render(
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger asChild value="overview">
          <a data-testid="overview-link" href="#overview">
            Overview
          </a>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content</TabsContent>
    </Tabs>,
  );

  expect(screen.getByTestId('overview-link').tagName).toBe('A');
  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveAttribute('aria-selected', 'true');

  rerender(<ProviderTabs />);
  await page.getByRole('tab', { name: 'Projects', exact: true }).click();
  await expect.element(page.getByTestId('tabs-context-value')).toContainText('projects');

  rerender(<ProviderTabs orientation="vertical" variant="line" />);
  const provider = screen
    .getByRole('tab', { name: 'Overview' })
    .closest('[data-slot="tabs-root-provider"]');

  expect(provider!.getAttribute('data-slot')).toBe('tabs-root-provider');
  expect(provider!.getAttribute('data-orientation')).toBe('vertical');
  expect(provider!.getAttribute('data-variant')).toBe('default');
});

test('keeps owned data-variant above consumer overrides on vertical roots', () => {
  function VerticalOverrideTabs() {
    const tabs = useTabs({ defaultValue: 'overview', orientation: 'vertical' });

    return (
      <>
        <Tabs data-variant="line" defaultValue="overview" orientation="vertical">
          <TabParts />
        </Tabs>
        <TabsRootProvider data-variant="line" value={tabs}>
          <TabParts />
        </TabsRootProvider>
      </>
    );
  }

  render(<VerticalOverrideTabs />);

  const [root, provider] = screen.getAllByRole('tablist').map((tablist) => tablist.parentElement);

  expect(root!.getAttribute('data-orientation')).toBe('vertical');
  expect(root!.getAttribute('data-variant')).toBe('default');
  expect(provider!.getAttribute('data-orientation')).toBe('vertical');
  expect(provider!.getAttribute('data-variant')).toBe('default');
});