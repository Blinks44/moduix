import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import type { CSSProperties } from 'react';
import { useRef } from 'react';
import {
  Toc,
  TocContent,
  TocIndicator,
  TocItem,
  TocLink,
  TocList,
  TocNav,
  TocRail,
  TocRootProvider,
  TocTitle,
  useToc,
  useTocContext,
} from '../src';

const items = [
  { value: 'introduction', depth: 2 },
  { value: 'configuration', depth: 3 },
];

function ActiveSection() {
  const toc = useTocContext();

  return <output>{toc.activeIds.join(', ')}</output>;
}

function RootProviderExample() {
  const toc = useToc({ items });

  return (
    <>
      <button type="button" onClick={() => toc.setActiveIds(['configuration'])}>
        Set active section
      </button>
      <TocRootProvider value={toc}>
        <TocContent>
          <h2 id="introduction">Introduction</h2>
          <h3 id="configuration">Configuration</h3>
        </TocContent>
        <TocNav>
          <TocTitle>On this page</TocTitle>
          <TocList>
            <TocIndicator />
            {items.map((item) => (
              <TocItem key={item.value} item={item}>
                <TocLink href={`#${item.value}`}>{item.value}</TocLink>
              </TocItem>
            ))}
          </TocList>
        </TocNav>
        <ActiveSection />
      </TocRootProvider>
    </>
  );
}

function ScrollableToc() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Toc items={items} scrollEl={() => scrollRef.current}>
      <TocContent>
        <div ref={scrollRef} aria-label="Reader" style={{ height: '200px', overflow: 'auto' }}>
          <h2 id="introduction" style={{ height: '600px', margin: 0 }}>
            Introduction
          </h2>
          <h3 id="configuration" style={{ height: '400px', margin: 0 }}>
            Configuration
          </h3>
        </div>
      </TocContent>
      <TocNav>
        <TocTitle>On this page</TocTitle>
        <TocList>
          {items.map((item) => (
            <TocItem key={item.value} item={item}>
              <TocLink href={`#${item.value}`}>{item.value}</TocLink>
            </TocItem>
          ))}
        </TocList>
      </TocNav>
    </Toc>
  );
}

test('preserves Ark navigation semantics and active item state', async () => {
  const { container } = render(
    <Toc items={items} defaultActiveIds={['introduction']}>
      <TocContent>
        <h2 id="introduction">Introduction</h2>
        <h3 id="configuration">Configuration</h3>
      </TocContent>
      <TocNav>
        <TocTitle>On this page</TocTitle>
        <TocList>
          <TocIndicator />
          {items.map((item) => (
            <TocItem key={item.value} item={item}>
              <TocLink href={`#${item.value}`}>
                {item.value === 'configuration' && (
                  <TocRail depth={item.depth} previousDepth={2} nextDepth={2} />
                )}
                {item.value}
              </TocLink>
            </TocItem>
          ))}
        </TocList>
      </TocNav>
    </Toc>,
  );

  const nav = page.getByRole('navigation', { name: 'On this page' });
  const activeLink = page.getByRole('link', { name: 'introduction' });
  const nestedItem = page
    .locator('[data-slot="toc-item"]')
    .filter({ has: page.getByRole('link', { name: 'configuration' }) });

  await expect.element(nav).toBeAttached();
  await expect.element(activeLink).toHaveAttribute('aria-current', 'location');
  await expect.element(activeLink).toHaveAttribute('data-active');
  await expect.element(nestedItem).toHaveAttribute('data-depth', '3');
  expect(container.querySelector('[data-slot="toc-indicator"]')?.isConnected).toBe(true);
  expect(container.querySelector('[data-slot="toc-rail"]')?.getAttribute('aria-hidden')).toBe(
    'true',
  );
});

test('keeps the RootProvider store and context available to surrounding composition', async () => {
  render(<RootProviderExample />);

  await page.getByRole('button', { name: 'Set active section' }).click();

  await expect.element(page.getByRole('status')).toContainText('configuration');

  const rootProvider = page.locator('[data-slot="toc-root-provider"]');

  const rootElement = document.querySelector<HTMLElement>('[data-slot="toc-root-provider"]')!;
  const activeItem = rootElement.querySelector<HTMLElement>('[data-slot="toc-item"][data-active]')!;
  const list = rootElement.querySelector<HTMLElement>('[data-slot="toc-list"]')!;
  await expect
    .poll(() => parseFloat(rootElement.style.getPropertyValue('--top')))
    .toBeCloseTo(
      activeItem.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop,
      0,
    );

  await expect.element(rootProvider).toHaveAttribute('data-scope', 'toc');
  await expect.element(rootProvider).toHaveAttribute('data-part', 'root');
});

test('supports Ark navigation placement and scrolls the supplied reading pane', async () => {
  render(<ScrollableToc />);

  const reader = document.querySelector<HTMLElement>('[aria-label="Reader"]')!;
  const heading = document.getElementById('configuration')!;
  const windowScroll = window.scrollY;

  await page.getByRole('link', { name: 'configuration' }).click();

  await expect.poll(() => reader.scrollTop).toBeGreaterThan(0);
  await expect
    .poll(() => heading.getBoundingClientRect().top - reader.getBoundingClientRect().top)
    .toBeCloseTo(0, 0);
  expect(window.scrollY).toBe(windowScroll);

  render(
    <Toc items={items}>
      <TocNav placement="left">
        <TocTitle>Left navigation</TocTitle>
      </TocNav>
    </Toc>,
  );

  await expect
    .element(page.getByRole('navigation', { name: 'Left navigation' }))
    .toHaveAttribute('data-placement', 'left');
});
test('keeps the indicator on Ark measurements inside a parent that sets --top and --height', async () => {
  const { container } = render(
    <Toc items={items} defaultActiveIds={['introduction']}>
      <TocContent>
        <h2 id="introduction">Introduction</h2>
        <h3 id="configuration">Configuration</h3>
      </TocContent>
      <div style={{ '--top': '300px', '--height': '500px' } as CSSProperties}>
        <TocList>
          <TocIndicator />
          {items.map((item) => (
            <TocItem key={item.value} item={item}>
              <TocLink href={`#${item.value}`}>{item.value}</TocLink>
            </TocItem>
          ))}
        </TocList>
      </div>
    </Toc>,
  );

  const indicator = container.querySelector<HTMLElement>('[data-slot="toc-indicator"]')!;
  // Distance between the indicator box and the active items inset by 2px on each end.
  const getIndicatorOffset = () => {
    const activeItems = [
      ...container.querySelectorAll<HTMLElement>('[data-slot="toc-item"][data-active]'),
    ];
    const first = activeItems[0]!.getBoundingClientRect();
    const last = activeItems.at(-1)!.getBoundingClientRect();
    const box = indicator.getBoundingClientRect();

    return Math.max(Math.abs(box.top - first.top - 2), Math.abs(box.bottom - last.bottom + 2));
  };

  await expect.poll(getIndicatorOffset).toBeLessThanOrEqual(1);
});

test('sizes the rail and truncates long rail labels inside the navigation', async () => {
  const { container } = render(
    <Toc items={items}>
      <TocNav>
        <TocList>
          <TocItem item={items[1]!}>
            <TocLink href="#configuration">
              <TocRail depth={3} previousDepth={2} nextDepth={2} />
              {'A very long configuration heading '.repeat(8)}
            </TocLink>
          </TocItem>
        </TocList>
      </TocNav>
    </Toc>,
  );

  const nav = container.querySelector<HTMLElement>('[data-slot="toc-nav"]')!;
  const rail = container.querySelector<SVGSVGElement>('[data-slot="toc-rail"]')!;

  expect(rail.style.width).toBe('14px');
  expect(rail.querySelector('path')?.getAttribute('d')).toBe('M 0.5 0 C 0.5 8 12.5 4 12.5 12');
  expect(nav.scrollWidth).toBe(nav.clientWidth);
});

test('places the left navigation before the content without moving the content explicitly', async () => {
  const { container } = render(
    <Toc items={items}>
      <TocContent>
        <h2 id="introduction">Introduction</h2>
      </TocContent>
      <TocNav placement="left">
        <TocTitle>Left navigation</TocTitle>
      </TocNav>
    </Toc>,
  );

  const content = container.querySelector('[data-slot="toc-content"]')!.getBoundingClientRect();
  const nav = container.querySelector('[data-slot="toc-nav"]')!.getBoundingClientRect();

  expect(window.innerWidth).toBeGreaterThanOrEqual(768);
  expect(nav.right).toBeLessThanOrEqual(content.left);
  expect(nav.top).toBe(content.top);
});
test('connects rails without a gap when the depth changes', async () => {
  const { container } = render(
    <Toc items={items} activeIds={[]}>
      <TocNav>
        <TocList>
          {items.map((item, index) => (
            <TocItem key={item.value} item={item}>
              <TocLink href={`#${item.value}`}>
                <TocRail
                  depth={item.depth}
                  previousDepth={items[index - 1]?.depth}
                  nextDepth={items[index + 1]?.depth}
                />
                {item.value}
              </TocLink>
            </TocItem>
          ))}
        </TocList>
      </TocNav>
    </Toc>,
  );

  const [first, second] = [...container.querySelectorAll('[data-slot="toc-rail"]')].map((rail) =>
    rail.getBoundingClientRect(),
  );

  expect(Math.abs(first!.bottom - second!.top)).toBeLessThanOrEqual(1);
});