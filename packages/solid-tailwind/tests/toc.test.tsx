import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { Toc, useToc, useTocContext } from '../src';

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
      <Toc.RootProvider value={toc}>
        <Toc.Content>
          <h2 id="introduction">Introduction</h2>
          <h3 id="configuration">Configuration</h3>
        </Toc.Content>
        <Toc.Nav>
          <Toc.Title>On this page</Toc.Title>
          <Toc.List>
            <Toc.Indicator />
            {items.map((item) => (
              <Toc.Item item={item}>
                <Toc.Link href={`#${item.value}`}>{item.value}</Toc.Link>
              </Toc.Item>
            ))}
          </Toc.List>
        </Toc.Nav>
        <ActiveSection />
      </Toc.RootProvider>
    </>
  );
}

function ScrollableToc() {
  let scrollRef: HTMLDivElement | undefined;

  return (
    <Toc items={items} scrollEl={() => scrollRef ?? null}>
      <Toc.Content>
        <div ref={(element) => (scrollRef = element)} aria-label="Reader">
          <h2 id="introduction">Introduction</h2>
          <h3 id="configuration">Configuration</h3>
        </div>
      </Toc.Content>
      <Toc.Nav>
        <Toc.Title>On this page</Toc.Title>
        <Toc.List>
          {items.map((item) => (
            <Toc.Item item={item}>
              <Toc.Link href={`#${item.value}`}>{item.value}</Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc>
  );
}

test('preserves Ark navigation semantics, active item state, and visible Tailwind parts', () => {
  const { container } = render(() => (
    <Toc items={items} defaultActiveIds={['introduction']}>
      <Toc.Content>
        <h2 id="introduction">Introduction</h2>
        <h3 id="configuration">Configuration</h3>
      </Toc.Content>
      <Toc.Nav>
        <Toc.Title>On this page</Toc.Title>
        <Toc.List>
          <Toc.Indicator />
          {items.map((item) => (
            <Toc.Item item={item}>
              <Toc.Link href={`#${item.value}`}>
                {item.value === 'configuration' && (
                  <Toc.Rail depth={item.depth} previousDepth={2} nextDepth={2} />
                )}
                {item.value}
              </Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc>
  ));

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
  render(() => <RootProviderExample />);

  fireEvent.click(screen.getByRole('button', { name: 'Set active section' }));

  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('configuration'));

  const rootProvider = screen.getByText('On this page').closest('[data-slot="toc-root-provider"]');

  await waitFor(() => expect(rootProvider).toHaveStyle('--top: 0px'));

  expect(rootProvider).toHaveAttribute('data-scope', 'toc');
  expect(rootProvider).toHaveAttribute('data-part', 'root');
});

test('supports Ark navigation placement and scrolls the supplied reading pane', () => {
  render(() => <ScrollableToc />);

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

  render(() => (
    <Toc items={items}>
      <Toc.Nav placement="left">
        <Toc.Title>Left navigation</Toc.Title>
      </Toc.Nav>
    </Toc>
  ));

  expect(screen.getByRole('navigation', { name: 'Left navigation' })).toHaveAttribute(
    'data-placement',
    'left',
  );
});

test('forwards refs through ordinary parts and preserves semantic asChild composition', () => {
  let rootRef!: HTMLDivElement;
  let contentRef!: HTMLElement;

  render(() => (
    <Toc
      ref={(element) => (rootRef = element)}
      items={items}
      asChild={(props) => <section {...props()} aria-label="Table of contents" />}
    >
      <Toc.Content ref={(element) => (contentRef = element)}>
        <h2 id="introduction">Introduction</h2>
      </Toc.Content>
    </Toc>
  ));

  expect(rootRef).toBeUndefined();
  expect(contentRef).toHaveAttribute('data-slot', 'toc-content');
  expect(screen.getByRole('region', { name: 'Table of contents' })).toHaveAttribute(
    'data-slot',
    'toc-root',
  );
});

test('forwards refs on the ordinary root path', () => {
  let rootRef!: HTMLDivElement;

  render(() => (
    <Toc ref={(element) => (rootRef = element)} items={items}>
      <Toc.Content>
        <h2 id="introduction">Introduction</h2>
      </Toc.Content>
    </Toc>
  ));

  expect(rootRef).toHaveAttribute('data-slot', 'toc-root');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <Toc class="w-auto" items={items}>
      <Toc.Nav class="p-0">
        <Toc.Title>On this page</Toc.Title>
      </Toc.Nav>
    </Toc>
  ));

  const root = screen
    .getByRole('navigation', { name: 'On this page' })
    .closest('[data-slot="toc-root"]');
  const nav = screen.getByRole('navigation', { name: 'On this page' });

  expect(root).toHaveClass('w-auto');
  expect(root).not.toHaveClass('w-full');
  expect(nav).toHaveClass('p-0');
  expect(nav).not.toHaveClass('p-4');
});