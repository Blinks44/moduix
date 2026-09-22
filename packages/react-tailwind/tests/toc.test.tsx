import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
        <div ref={scrollRef} aria-label="Reader">
          <h2 id="introduction">Introduction</h2>
          <h3 id="configuration">Configuration</h3>
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

test('preserves Ark navigation semantics, active item state, and visible Tailwind parts', () => {
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
  const nav = screen.getByRole('navigation', { name: 'On this page' });
  const activeLink = screen.getByRole('link', { name: 'introduction' });
  const nestedItem = screen.getByRole('link', { name: 'configuration' }).closest('li');
  const indicator = container.querySelector('[data-slot="toc-indicator"]');
  const rail = container.querySelector('[data-slot="toc-rail"]');

  expect(root).toHaveClass('grid', 'gap-6');
  expect(nav).toBeInTheDocument();
  expect(nav).toHaveClass('rounded-lg', 'border', 'bg-card', 'p-4');
  expect(activeLink).toHaveAttribute('aria-current', 'location');
  expect(activeLink).toHaveAttribute('data-active');
  expect(activeLink).toHaveClass('focus-visible:ring-1');
  expect(activeLink).not.toHaveClass('ring-inset');
  expect(nestedItem).toHaveAttribute('data-depth', '3');
  expect(indicator).toBeInTheDocument();
  expect(indicator).toHaveClass('w-0.5', 'rounded-full', 'bg-muted-foreground');
  expect(rail).toHaveAttribute('aria-hidden', 'true');
  expect(rail).toHaveClass('pointer-events-none', 'text-border');
  expect(rail?.querySelector('line')).toHaveClass('stroke-1');
});

test('keeps the RootProvider store and context available to surrounding composition', async () => {
  render(<RootProviderExample />);

  fireEvent.click(screen.getByRole('button', { name: 'Set active section' }));

  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('configuration'));

  const rootProvider = screen.getByText('On this page').closest('[data-slot="toc-root-provider"]');

  await waitFor(() => expect(rootProvider).toHaveStyle('--top: 0px'));

  expect(rootProvider).toHaveAttribute('data-scope', 'toc');
  expect(rootProvider).toHaveAttribute('data-part', 'root');
});

test('supports Ark navigation placement and scrolls the supplied reading pane', () => {
  render(<ScrollableToc />);

  const reader = screen.getByLabelText('Reader');
  const heading = screen.getByRole('heading', { name: 'Configuration' });
  const scrollTo = rs.fn();

  Object.assign(reader, { scrollTo });
  rs.spyOn(reader, 'getBoundingClientRect').mockReturnValue({
    bottom: 200,
    height: 200,
    left: 0,
    right: 200,
    top: 10,
    width: 200,
    x: 0,
    y: 10,
    toJSON: () => ({}),
  });
  rs.spyOn(heading, 'getBoundingClientRect').mockReturnValue({
    bottom: 90,
    height: 20,
    left: 0,
    right: 200,
    top: 70,
    width: 200,
    x: 0,
    y: 70,
    toJSON: () => ({}),
  });

  fireEvent.click(screen.getByRole('link', { name: 'configuration' }));

  expect(scrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 60 });

  render(
    <Toc items={items}>
      <TocNav placement="left">
        <TocTitle>Left navigation</TocTitle>
      </TocNav>
    </Toc>,
  );

  expect(screen.getByRole('navigation', { name: 'Left navigation' })).toHaveAttribute(
    'data-placement',
    'left',
  );
});

test('forwards refs through ordinary parts and preserves semantic asChild composition', () => {
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

  expect(rootRef.current).toHaveAttribute('data-slot', 'toc-root');
  expect(contentRef.current).toHaveAttribute('data-slot', 'toc-content');
  expect(screen.getByRole('region', { name: 'Table of contents' })).toHaveAttribute(
    'data-slot',
    'toc-root',
  );
});

test('forwards refs on the ordinary root path', () => {
  const rootRef = createRef<HTMLDivElement>();

  render(
    <Toc ref={rootRef} items={items}>
      <TocContent>
        <h2 id="introduction">Introduction</h2>
      </TocContent>
    </Toc>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'toc-root');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(
    <Toc className="w-auto" items={items}>
      <TocNav className="p-0">
        <TocTitle>On this page</TocTitle>
      </TocNav>
    </Toc>,
  );

  const root = screen
    .getByRole('navigation', { name: 'On this page' })
    .closest('[data-slot="toc-root"]');
  const nav = screen.getByRole('navigation', { name: 'On this page' });

  expect(root).toHaveClass('w-auto');
  expect(root).not.toHaveClass('w-full');
  expect(nav).toHaveClass('p-0');
  expect(nav).not.toHaveClass('p-4');
});