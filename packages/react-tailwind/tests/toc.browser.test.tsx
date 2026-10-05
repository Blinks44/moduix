import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef, useRef } from 'react';
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

test('preserves Ark navigation semantics, active item state, and visible Tailwind parts', async () => {
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

  const root = container.querySelector('[data-slot="toc-root"]');
  const nav = page.getByRole('navigation', { name: 'On this page' });
  const activeLink = page.getByRole('link', { name: 'introduction' });
  const nestedItem = page
    .locator('[data-slot="toc-item"]')
    .filter({ has: page.getByRole('link', { name: 'configuration' }) });
  const indicator = container.querySelector('[data-slot="toc-indicator"]');
  const rail = container.querySelector('[data-slot="toc-rail"]');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['grid', 'gap-6']));
  await expect.element(nav).toBeAttached();
  expect([...document.querySelector('[data-slot="toc-nav"]')!.classList]).toEqual(
    expect.arrayContaining(['rounded-lg', 'border', 'bg-card', 'p-4']),
  );
  await expect.element(activeLink).toHaveAttribute('aria-current', 'location');
  await expect.element(activeLink).toHaveAttribute('data-active');
  expect([
    ...document.querySelector('[data-slot="toc-link"][href="#introduction"]')!.classList,
  ]).toEqual(expect.arrayContaining(['focus-visible:ring-1']));
  expect([
    ...document.querySelector('[data-slot="toc-link"][href="#introduction"]')!.classList,
  ]).not.toContain('ring-inset');
  await expect.element(nestedItem).toHaveAttribute('data-depth', '3');
  expect(indicator?.isConnected).toBe(true);
  expect([...indicator!.classList]).toEqual(
    expect.arrayContaining(['w-0.5', 'rounded-full', 'bg-muted-foreground']),
  );
  expect(rail?.getAttribute('aria-hidden')).toBe('true');
  expect([...rail!.classList]).toEqual(
    expect.arrayContaining(['pointer-events-none', 'text-border']),
  );
  expect([...rail!.querySelector('line')!.classList]).toEqual(expect.arrayContaining(['stroke-1']));
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

test('forwards refs through ordinary parts and preserves semantic asChild composition', async () => {
  const rootRef = createRef<HTMLDivElement>();
  const contentRef = createRef<HTMLElement>();

  render(
    <Toc ref={rootRef} items={items} asChild>
      <section aria-label="Table of contents">
        <TocContent ref={contentRef}>
          <h2 id="introduction">Introduction</h2>
        </TocContent>
      </section>
    </Toc>,
  );

  expect(rootRef.current?.getAttribute('data-slot')).toBe('toc-root');
  expect(contentRef.current?.getAttribute('data-slot')).toBe('toc-content');
  await expect
    .element(page.getByRole('region', { name: 'Table of contents' }))
    .toHaveAttribute('data-slot', 'toc-root');
});

test('forwards refs on the ordinary root path', async () => {
  const rootRef = createRef<HTMLDivElement>();

  render(
    <Toc ref={rootRef} items={items}>
      <TocContent>
        <h2 id="introduction">Introduction</h2>
      </TocContent>
    </Toc>,
  );

  expect(rootRef.current?.getAttribute('data-slot')).toBe('toc-root');
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(
    <Toc className="w-auto" items={items}>
      <TocNav className="p-0">
        <TocTitle>On this page</TocTitle>
      </TocNav>
    </Toc>,
  );

  const root = document.querySelector('[data-slot="toc-root"]')!;

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-auto']));
  expect([...root!.classList]).not.toContain('w-full');
  expect([...document.querySelector('[data-slot="toc-nav"]')!.classList]).toEqual(
    expect.arrayContaining(['p-0']),
  );
  expect([...document.querySelector('[data-slot="toc-nav"]')!.classList]).not.toContain('p-4');
});