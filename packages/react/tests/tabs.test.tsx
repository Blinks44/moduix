import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Tabs, useTabs, useTabsContext } from '../src';

const items = [
  { value: 'overview', label: 'Overview', content: 'Overview content' },
  { value: 'projects', label: 'Projects', content: 'Projects content' },
  { value: 'account', label: 'Account', content: 'Account content' },
];

function TabParts({ disabled = false }: { disabled?: boolean }) {
  return (
    <>
      <Tabs.List>
        {items.map((item) => (
          <Tabs.Trigger
            key={item.value}
            disabled={disabled && item.value === 'projects'}
            value={item.value}
          >
            {item.label}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>
      {items.map((item) => (
        <Tabs.Content key={item.value} value={item.value}>
          {item.content}
        </Tabs.Content>
      ))}
    </>
  );
}

function ProviderTabs() {
  const tabs = useTabs({ defaultValue: 'overview' });

  return (
    <Tabs.RootProvider value={tabs}>
      <TabParts />
      <ContextOutput />
    </Tabs.RootProvider>
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
  render(
    <Tabs defaultValue="overview" lazyMount orientation="vertical" unmountOnExit variant="line">
      <TabParts />
    </Tabs>,
  );

  const overview = screen.getByRole('tab', { name: 'Overview' });
  const projects = screen.getByRole('tab', { name: 'Projects' });
  expect(screen.queryByText('Projects content')).not.toBeInTheDocument();
  expect(overview.closest('[data-slot="tabs-root"]')).toHaveAttribute('data-variant', 'default');

  overview.focus();
  fireEvent.keyDown(overview, { key: 'ArrowDown' });
  await waitFor(() => expect(projects).toHaveFocus());
  await waitFor(() => expect(screen.getByText('Projects content')).toBeVisible());
});

test('preserves asChild and provider context composition', async () => {
  const { rerender } = render(
    <Tabs defaultValue="overview">
      <Tabs.List>
        <Tabs.Trigger asChild value="overview">
          <a data-testid="overview-link" href="#overview">
            Overview
          </a>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">Overview content</Tabs.Content>
    </Tabs>,
  );

  expect(screen.getByTestId('overview-link').tagName).toBe('A');
  expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');

  rerender(<ProviderTabs />);
  fireEvent.click(screen.getByRole('tab', { name: 'Projects' }));
  await waitFor(() =>
    expect(screen.getByTestId('tabs-context-value')).toHaveTextContent('projects'),
  );
});