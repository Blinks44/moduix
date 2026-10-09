import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  Tabs,
  TabsContext,
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

function TabParts(props: { disabled?: boolean } = {}) {
  return (
    <>
      <TabsList>
        {items.map((item) => (
          <TabsTrigger disabled={props.disabled && item.value === 'projects'} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
        <TabsIndicator />
      </TabsList>
      {items.map((item) => (
        <TabsContent value={item.value}>{item.content}</TabsContent>
      ))}
    </>
  );
}

function ContextOutput() {
  const context = useTabsContext();

  return <output data-testid="tabs-context-value">{context().value ?? 'none'}</output>;
}

function ProviderTabs(props: {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'line';
}) {
  const tabs = useTabs({ defaultValue: 'overview', orientation: props.orientation });

  return (
    <TabsRootProvider value={tabs} variant={props.variant}>
      <TabParts />
      <ContextOutput />
      <TabsContext>
        {(context) => <output data-testid="tabs-context-render-prop">{context().value}</output>}
      </TabsContext>
    </TabsRootProvider>
  );
}

test('preserves anatomy, styling hooks, and refs', async () => {
  let rootRef!: HTMLDivElement;
  let listRef!: HTMLDivElement;
  let triggerRef!: HTMLButtonElement;
  let indicatorRef!: HTMLDivElement;
  let contentRef!: HTMLDivElement;

  render(() => (
    <Tabs ref={(element) => (rootRef = element)} defaultValue="overview">
      <TabsList ref={(element) => (listRef = element)}>
        <TabsTrigger ref={(element) => (triggerRef = element)} value="overview">
          Overview
        </TabsTrigger>
        <TabsIndicator ref={(element) => (indicatorRef = element)} />
      </TabsList>
      <TabsContent ref={(element) => (contentRef = element)} value="overview">
        Overview content
      </TabsContent>
    </Tabs>
  ));

  const root = screen.getByRole('tablist').parentElement;
  const trigger = screen.getByRole('tab', { name: 'Overview' });
  const indicator = screen.getByRole('tablist').querySelector('[data-slot="tabs-indicator"]');
  const content = screen.getByText('Overview content');

  expect(rootRef).toBe(root);
  expect(rootRef!.getAttribute('data-slot')).toBe('tabs-root');
  expect(rootRef!.getAttribute('data-scope')).toBe('tabs');
  expect(listRef).toBe(screen.getByRole('tablist'));
  expect(listRef!.getAttribute('data-slot')).toBe('tabs-list');
  expect(triggerRef).toBe(trigger);
  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveAttribute('data-slot', 'tabs-trigger');
  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveAttribute('aria-selected', 'true');
  expect(indicatorRef).toBe(indicator);
  expect(indicatorRef!.getAttribute('data-slot')).toBe('tabs-indicator');
  expect(contentRef).toBe(content);
  expect(contentRef!.getAttribute('data-slot')).toBe('tabs-content');
});

test('preserves keyboard navigation, disabled triggers, and Ark callback details', async () => {
  const changes: string[] = [];
  render(() => (
    <Tabs defaultValue="overview" onValueChange={(details) => changes.push(details.value ?? '')}>
      <TabParts disabled />
    </Tabs>
  ));

  await expect.element(page.getByRole('tab', { name: 'Projects', exact: true })).toBeDisabled();
  await page.getByRole('tab', { name: 'Overview', exact: true }).click();
  await page.getByRole('tab', { name: 'Overview', exact: true }).press('ArrowRight');
  await expect.element(page.getByRole('tab', { name: 'Account', exact: true })).toBeFocused();
  await expect.poll(() => changes).toEqual(['account']);
});

test('uses vertical keyboard navigation and mounts inactive content lazily', async () => {
  render(() => (
    <Tabs defaultValue="overview" lazyMount orientation="vertical" unmountOnExit variant="line">
      <TabParts />
    </Tabs>
  ));

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
  render(() => (
    <Tabs
      defaultValue="overview"
      activationMode="manual"
      onValueChange={(details) => changes.push(details.value ?? '')}
    >
      <TabParts />
    </Tabs>
  ));

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

test('preserves asChild composition', async () => {
  render(() => (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger
          asChild={(props) => (
            <a {...props()} data-testid="overview-link" href="#overview">
              Overview
            </a>
          )}
          value="overview"
        />
      </TabsList>
      <TabsContent value="overview">Overview content</TabsContent>
    </Tabs>
  ));

  expect(screen.getByTestId('overview-link').tagName).toBe('A');
  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveAttribute('aria-selected', 'true');
});

test('preserves provider and context composition', async () => {
  render(() => <ProviderTabs />);

  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveAttribute('aria-selected', 'true');
  await expect.element(page.getByTestId('tabs-context-value')).toContainText('overview');
  await expect.element(page.getByTestId('tabs-context-render-prop')).toContainText('overview');

  await page.getByRole('tab', { name: 'Projects', exact: true }).click();
  await expect.element(page.getByTestId('tabs-context-value')).toContainText('projects');
  await expect.element(page.getByTestId('tabs-context-render-prop')).toContainText('projects');
});

test('keeps line variant off vertical provider roots', () => {
  render(() => <ProviderTabs orientation="vertical" variant="line" />);

  const provider = screen
    .getByRole('tab', { name: 'Overview' })
    .closest('[data-slot="tabs-root-provider"]');

  expect(provider!.getAttribute('data-slot')).toBe('tabs-root-provider');
  expect(provider!.getAttribute('data-orientation')).toBe('vertical');
  expect(provider!.getAttribute('data-variant')).toBe('default');
});

test('merges consumer utilities after Tailwind defaults', async () => {
  render(() => (
    <Tabs defaultValue="overview" class="flex-row">
      <TabsList class="w-full bg-card">
        <TabsTrigger value="overview" class="h-10">
          Overview
        </TabsTrigger>
        <TabsIndicator />
      </TabsList>
      <TabsContent value="overview" class="p-6">
        Overview content
      </TabsContent>
    </Tabs>
  ));

  const root = screen.getByRole('tablist').parentElement;
  const list = screen.getByRole('tablist');
  const trigger = screen.getByRole('tab', { name: 'Overview' });
  const content = screen.getByText('Overview content');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['flex-row']));
  expect(root!.classList.contains('flex-col')).toBe(false);
  expect([...list!.classList]).toEqual(expect.arrayContaining(['w-full', 'bg-card']));
  expect(list!.classList.contains('w-fit')).toBe(false);
  expect([...trigger!.classList]).toEqual(expect.arrayContaining(['h-10']));
  expect(trigger!.classList.contains('h-8')).toBe(false);
  expect([...content!.classList]).toEqual(expect.arrayContaining(['p-6']));
  expect(content!.classList.contains('p-4')).toBe(false);
  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveCSS('height', '40px');
  await expect
    .element(page.getByText('Overview content', { exact: true }))
    .toHaveCSS('padding', '24px');
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

  render(() => <VerticalOverrideTabs />);

  const [root, provider] = screen.getAllByRole('tablist').map((tablist) => tablist.parentElement);

  expect(root!.getAttribute('data-orientation')).toBe('vertical');
  expect(root!.getAttribute('data-variant')).toBe('default');
  expect(provider!.getAttribute('data-orientation')).toBe('vertical');
  expect(provider!.getAttribute('data-variant')).toBe('default');
});