import { LocaleProvider } from '@ark-ui/react/locale';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
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
  expect(overview.closest('[data-slot="tabs-root"]')!.getAttribute('data-variant')).toBe('line');

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
  expect(provider!.getAttribute('data-variant')).toBe('line');
});

test('merges consumer utilities after Tailwind defaults', async () => {
  render(
    <Tabs defaultValue="overview" className="flex-row">
      <TabsList className="w-full bg-card">
        <TabsTrigger value="overview" className="h-10">
          Overview
        </TabsTrigger>
        <TabsIndicator />
      </TabsList>
      <TabsContent value="overview" className="p-6">
        Overview content
      </TabsContent>
    </Tabs>,
  );

  const root = screen.getByRole('tablist').parentElement;
  const list = screen.getByRole('tablist');
  const trigger = screen.getByRole('tab', { name: 'Overview' });
  const content = screen.getByText('Overview content');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['flex-row']));
  expect(root!.classList.contains('flex-col')).toBe(false);
  expect([...list!.classList]).toEqual(expect.arrayContaining(['w-full', 'bg-card']));
  expect(list!.classList.contains('w-fit')).toBe(false);
  expect([...trigger!.classList]).toEqual(expect.arrayContaining(['h-10']));
  expect([...trigger!.classList].some((name) => name.startsWith('h-[calc'))).toBe(false);
  expect([...content!.classList]).toEqual(expect.arrayContaining(['p-6']));
  expect(content!.classList.contains('p-4')).toBe(false);
  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveCSS('height', '40px');
  await expect
    .element(page.getByText('Overview content', { exact: true }))
    .toHaveCSS('padding', '24px');
});

function expectSameBox(actual: Element, expected: Element) {
  const a = actual.getBoundingClientRect();
  const e = expected.getBoundingClientRect();
  expect(Math.abs(a.left - e.left)).toBeLessThanOrEqual(1);
  expect(Math.abs(a.top - e.top)).toBeLessThanOrEqual(1);
  expect(Math.abs(a.width - e.width)).toBeLessThanOrEqual(1);
  expect(Math.abs(a.height - e.height)).toBeLessThanOrEqual(1);
}

function IndicatorTabs(props: ComponentProps<typeof Tabs>) {
  return (
    <Tabs defaultValue="projects" {...props}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="projects" style={{ height: '48px' }}>
          Projects
        </TabsTrigger>
        <TabsIndicator />
      </TabsList>
    </Tabs>
  );
}

function getIndicatorParts(root: Element) {
  return {
    indicator: root.querySelector('[data-slot="tabs-indicator"]')!,
    list: root.querySelector('[data-slot="tabs-list"]')!,
    trigger: root.querySelector('[data-slot="tabs-trigger"][data-selected]')!,
  };
}

test('covers the selected trigger box with the indicator in both orientations', async () => {
  const { container } = render(
    <>
      <IndicatorTabs />
      <IndicatorTabs orientation="vertical" />
    </>,
  );

  for (const root of container.querySelectorAll('[data-slot="tabs-root"]')) {
    const { indicator, trigger } = getIndicatorParts(root);
    await expect.poll(() => indicator.getBoundingClientRect().height).toBe(48);
    expectSameBox(indicator, trigger);
  }
});

test('draws the line indicator on the list edge in both orientations and RTL', async () => {
  const { container } = render(
    <>
      <IndicatorTabs variant="line" />
      <IndicatorTabs orientation="vertical" variant="line" />
      <LocaleProvider locale="ar">
        <IndicatorTabs orientation="vertical" variant="line" />
      </LocaleProvider>
    </>,
  );

  const [horizontal, vertical, rtl] = [
    ...container.querySelectorAll('[data-slot="tabs-root"]'),
  ].map(getIndicatorParts);

  await expect.poll(() => horizontal!.indicator.getBoundingClientRect().width).toBeGreaterThan(0);
  const h = horizontal!.indicator.getBoundingClientRect();
  expect(h.height).toBe(2);
  expect(h.left).toBeCloseTo(horizontal!.trigger.getBoundingClientRect().left, 0);
  expect(h.bottom).toBeCloseTo(horizontal!.list.getBoundingClientRect().bottom - 1, 0);

  for (const [parts, edge] of [
    [vertical!, 'right'],
    [rtl!, 'left'],
  ] as const) {
    await expect.poll(() => parts.indicator.getBoundingClientRect().height).toBe(48);
    const rect = parts.indicator.getBoundingClientRect();
    const list = parts.list.getBoundingClientRect();
    expect(rect.width).toBe(2);
    expect(rect.top).toBeCloseTo(parts.trigger.getBoundingClientRect().top, 0);
    expect(rect[edge]).toBeCloseTo(edge === 'right' ? list.right - 1 : list.left + 1, 0);
  }
});

test('keeps the content radius while the panel shows its focus ring', async () => {
  render(
    <Tabs defaultValue="overview">
      <TabParts />
    </Tabs>,
  );

  const content = document.querySelector('[data-slot="tabs-content"]:not([hidden])')!;
  const radius = getComputedStyle(content).borderTopLeftRadius;
  const trigger = page.getByRole('tab', { name: 'Overview', exact: true });
  await trigger.click();
  await trigger.press('Tab');

  await expect.element(page.getByText('Overview content')).toBeFocused();
  expect(getComputedStyle(content).outlineStyle).toBe('solid');
  expect(getComputedStyle(content).borderTopLeftRadius).toBe(radius);
  expect(radius).not.toBe('0px');
});

test('sizes the tab list to the matching control height', () => {
  const { container } = render(
    <>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Tabs key={size} defaultValue="overview" size={size}>
          <TabParts />
        </Tabs>
      ))}
    </>,
  );

  const heights = [...container.querySelectorAll<HTMLElement>('[data-slot="tabs-list"]')].map(
    (list) => list.offsetHeight,
  );
  expect(heights).toEqual([32, 36, 40]);
});

test('stretches horizontal triggers across the root when fitted', () => {
  const { container } = render(
    <>
      <Tabs defaultValue="overview" fitted style={{ width: '480px' }}>
        <TabParts />
      </Tabs>
      <Tabs defaultValue="overview" fitted orientation="vertical" style={{ width: '480px' }}>
        <TabParts />
      </Tabs>
    </>,
  );

  const [horizontal, vertical] = container.querySelectorAll<HTMLElement>('[data-slot="tabs-root"]');
  const list = horizontal!.querySelector<HTMLElement>('[data-slot="tabs-list"]')!;
  const widths = [...list.querySelectorAll<HTMLElement>('[data-slot="tabs-trigger"]')].map(
    (trigger) => trigger.offsetWidth,
  );

  expect(horizontal!.hasAttribute('data-fitted')).toBe(true);
  expect(list.offsetWidth).toBe(480);
  expect(Math.max(...widths) - Math.min(...widths)).toBeLessThanOrEqual(1);
  for (const trigger of vertical!.querySelectorAll<HTMLElement>('[data-slot="tabs-trigger"]')) {
    expect(trigger.offsetHeight).toBe(26);
  }
});