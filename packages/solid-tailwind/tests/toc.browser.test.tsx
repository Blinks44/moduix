import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
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

  return <output>{toc().activeIds.join(', ')}</output>;
}

function RootProviderExample() {
  const toc = useToc({ items });

  return (
    <>
      <button type="button" onClick={() => toc().setActiveIds(['configuration'])}>
        Set active section
      </button>
      <TocRootProvider value={toc} style={{ color: 'rgb(255, 0, 0)' }}>
        <TocContent>
          <h2 id="introduction">Introduction</h2>
          <h3 id="configuration">Configuration</h3>
        </TocContent>
        <TocNav>
          <TocTitle>On this page</TocTitle>
          <TocList>
            <TocIndicator />
            {items.map((item) => (
              <TocItem item={item}>
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
  let scrollRef: HTMLDivElement | undefined;

  return (
    <Toc items={items} scrollEl={() => scrollRef ?? null}>
      <TocContent>
        <div
          ref={(element) => (scrollRef = element)}
          aria-label="Reader"
          style={{ height: '200px', overflow: 'auto' }}
        >
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
            <TocItem item={item}>
              <TocLink href={`#${item.value}`}>{item.value}</TocLink>
            </TocItem>
          ))}
        </TocList>
      </TocNav>
    </Toc>
  );
}

test('preserves Ark navigation semantics, active item state, and visible Tailwind parts', async () => {
  const { container } = render(() => (
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
            <TocItem item={item}>
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
    </Toc>
  ));

  const nav = page.getByRole('navigation', { name: 'On this page' });
  const activeLink = page.getByRole('link', { name: 'introduction' });
  const nestedItem = page
    .locator('[data-slot="toc-item"]')
    .filter({ has: page.getByRole('link', { name: 'configuration' }) });
  const indicator = container.querySelector('[data-slot="toc-indicator"]');
  const rail = container.querySelector('[data-slot="toc-rail"]');

  await expect.element(nav).toBeAttached();
  await expect.element(activeLink).toHaveAttribute('aria-current', 'location');
  await expect.element(activeLink).toHaveAttribute('data-active');
  await expect.element(nestedItem).toHaveAttribute('data-depth', '3');
  expect(indicator?.isConnected).toBe(true);
  expect(rail?.getAttribute('aria-hidden')).toBe('true');
});

test('keeps the RootProvider store and context available to surrounding composition', async () => {
  render(() => <RootProviderExample />);

  await page.getByRole('button', { name: 'Set active section' }).click();

  await expect.element(page.getByRole('status')).toContainText('configuration');

  const rootProvider = page.locator('[data-slot="toc-root-provider"]');

  const rootElement = document.querySelector<HTMLElement>('[data-slot="toc-root-provider"]')!;
  expect(rootElement.style.color).toBe('rgb(255, 0, 0)');

  await expect.element(rootProvider).toHaveAttribute('data-scope', 'toc');
  await expect.element(rootProvider).toHaveAttribute('data-part', 'root');
});

test('supports Ark navigation placement and scrolls the supplied reading pane', async () => {
  render(() => <ScrollableToc />);

  const reader = document.querySelector<HTMLElement>('[aria-label="Reader"]')!;
  const heading = document.getElementById('configuration')!;
  const windowScroll = window.scrollY;

  await page.getByRole('link', { name: 'configuration' }).click();

  await expect.poll(() => reader.scrollTop).toBeGreaterThan(0);
  await expect
    .poll(() => heading.getBoundingClientRect().top - reader.getBoundingClientRect().top)
    .toBeCloseTo(0, 0);
  expect(window.scrollY).toBe(windowScroll);

  render(() => (
    <Toc items={items}>
      <TocNav placement="left">
        <TocTitle>Left navigation</TocTitle>
      </TocNav>
    </Toc>
  ));

  await expect
    .element(page.getByRole('navigation', { name: 'Left navigation' }))
    .toHaveAttribute('data-placement', 'left');
});

test('forwards refs through ordinary parts and preserves semantic asChild composition', async () => {
  let rootRef!: HTMLDivElement;
  let contentRef!: HTMLElement;

  render(() => (
    <Toc
      ref={(element) => (rootRef = element)}
      items={items}
      asChild={(props) => <section {...props()} aria-label="Table of contents" />}
    >
      <TocContent ref={(element) => (contentRef = element)}>
        <h2 id="introduction">Introduction</h2>
      </TocContent>
    </Toc>
  ));

  expect(rootRef).toBeUndefined();
  expect(contentRef?.getAttribute('data-slot')).toBe('toc-content');
  await expect
    .element(page.getByRole('region', { name: 'Table of contents' }))
    .toHaveAttribute('data-slot', 'toc-root');
});

test('forwards refs on the ordinary root path', async () => {
  let rootRef!: HTMLDivElement;

  render(() => (
    <Toc ref={(element) => (rootRef = element)} items={items}>
      <TocContent>
        <h2 id="introduction">Introduction</h2>
      </TocContent>
    </Toc>
  ));

  expect(rootRef?.getAttribute('data-slot')).toBe('toc-root');
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(() => (
    <Toc class="w-auto" items={items}>
      <TocNav class="p-0">
        <TocTitle>On this page</TocTitle>
      </TocNav>
    </Toc>
  ));

  const root = document.querySelector('[data-slot="toc-root"]')!;

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-auto']));
  expect([...document.querySelector('[data-slot="toc-nav"]')!.classList]).toEqual(
    expect.arrayContaining(['p-0']),
  );
});
test('keeps the indicator on Ark measurements inside a parent that sets --top and --height', async () => {
  const { container } = render(() => (
    <Toc items={items} defaultActiveIds={['introduction']}>
      <TocContent>
        <h2 id="introduction">Introduction</h2>
        <h3 id="configuration">Configuration</h3>
      </TocContent>
      <div style={{ '--top': '300px', '--height': '500px' }}>
        <TocList>
          <TocIndicator />
          {items.map((item) => (
            <TocItem item={item}>
              <TocLink href={`#${item.value}`}>{item.value}</TocLink>
            </TocItem>
          ))}
        </TocList>
      </div>
    </Toc>
  ));

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