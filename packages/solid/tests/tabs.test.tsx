import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
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

test('preserves anatomy, styling hooks, and refs', () => {
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
  expect(rootRef).toHaveAttribute('data-slot', 'tabs-root');
  expect(rootRef).toHaveAttribute('data-scope', 'tabs');
  expect(listRef).toBe(screen.getByRole('tablist'));
  expect(listRef).toHaveAttribute('data-slot', 'tabs-list');
  expect(triggerRef).toBe(trigger);
  expect(trigger).toHaveAttribute('data-slot', 'tabs-trigger');
  expect(trigger).toHaveAttribute('aria-selected', 'true');
  expect(indicatorRef).toBe(indicator);
  expect(indicatorRef).toHaveAttribute('data-slot', 'tabs-indicator');
  expect(contentRef).toBe(content);
  expect(contentRef).toHaveAttribute('data-slot', 'tabs-content');
});

test('preserves keyboard navigation, disabled triggers, and Ark callback details', async () => {
  const changes: string[] = [];
  render(() => (
    <Tabs defaultValue="overview" onValueChange={(details) => changes.push(details.value ?? '')}>
      <TabParts disabled />
    </Tabs>
  ));

  const overview = screen.getByRole('tab', { name: 'Overview' });
  const projects = screen.getByRole('tab', { name: 'Projects' });
  const account = screen.getByRole('tab', { name: 'Account' });

  expect(projects).toBeDisabled();
  overview.focus();
  fireEvent.keyDown(overview, { key: 'ArrowRight' });
  await waitFor(() => expect(account).toHaveFocus());
  await waitFor(() => expect(changes).toEqual(['account']));
});

test('uses vertical keyboard navigation and mounts inactive content lazily', async () => {
  render(() => (
    <Tabs defaultValue="overview" lazyMount orientation="vertical" unmountOnExit variant="line">
      <TabParts />
    </Tabs>
  ));

  const overview = screen.getByRole('tab', { name: 'Overview' });
  const projects = screen.getByRole('tab', { name: 'Projects' });
  expect(screen.queryByText('Projects content')).not.toBeInTheDocument();
  expect(overview.closest('[data-slot="tabs-root"]')).toHaveAttribute('data-variant', 'default');

  overview.focus();
  fireEvent.keyDown(overview, { key: 'ArrowDown' });
  await waitFor(() => expect(projects).toHaveFocus());
  await waitFor(() => expect(screen.getByText('Projects content')).toBeVisible());
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

  const overview = screen.getByRole('tab', { name: 'Overview' });
  const projects = screen.getByRole('tab', { name: 'Projects' });

  overview.focus();
  fireEvent.keyDown(overview, { key: 'ArrowRight' });
  await waitFor(() => expect(projects).toHaveFocus());
  expect(overview).toHaveAttribute('aria-selected', 'true');
  expect(changes).toEqual([]);

  fireEvent.keyDown(projects, { key: 'Enter' });
  fireEvent.click(projects);
  await waitFor(() => expect(projects).toHaveAttribute('aria-selected', 'true'));
  expect(changes).toEqual(['projects']);
});

test('preserves asChild composition', () => {
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
  expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
});

test('preserves provider and context composition', async () => {
  render(() => <ProviderTabs />);

  const firstTab = screen.getByRole('tab', { name: 'Overview' });
  const projects = screen.getByRole('tab', { name: 'Projects' });

  expect(firstTab).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByTestId('tabs-context-value')).toHaveTextContent('overview');
  expect(screen.getByTestId('tabs-context-render-prop')).toHaveTextContent('overview');

  fireEvent.click(projects);
  await waitFor(() =>
    expect(screen.getByTestId('tabs-context-value')).toHaveTextContent('projects'),
  );
  expect(screen.getByTestId('tabs-context-render-prop')).toHaveTextContent('projects');
});

test('keeps line variant off vertical provider roots', () => {
  render(() => <ProviderTabs orientation="vertical" variant="line" />);

  const provider = screen
    .getByRole('tab', { name: 'Overview' })
    .closest('[data-slot="tabs-root-provider"]');

  expect(provider).toHaveAttribute('data-slot', 'tabs-root-provider');
  expect(provider).toHaveAttribute('data-orientation', 'vertical');
  expect(provider).toHaveAttribute('data-variant', 'default');
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

  expect(root).toHaveAttribute('data-orientation', 'vertical');
  expect(root).toHaveAttribute('data-variant', 'default');
  expect(provider).toHaveAttribute('data-orientation', 'vertical');
  expect(provider).toHaveAttribute('data-variant', 'default');
});
