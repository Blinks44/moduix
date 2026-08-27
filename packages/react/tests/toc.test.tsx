import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRef } from 'react';
import { Toc, useToc, useTocContext } from '../src';

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
              <Toc.Item key={item.value} item={item}>
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
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Toc items={items} scrollEl={() => scrollRef.current}>
      <Toc.Content>
        <div ref={scrollRef} aria-label="Reader">
          <h2 id="introduction">Introduction</h2>
          <h3 id="configuration">Configuration</h3>
        </div>
      </Toc.Content>
      <Toc.Nav>
        <Toc.Title>On this page</Toc.Title>
        <Toc.List>
          {items.map((item) => (
            <Toc.Item key={item.value} item={item}>
              <Toc.Link href={`#${item.value}`}>{item.value}</Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc>
  );
}

test('preserves Ark navigation semantics and active item state', () => {
  const { container } = render(
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
            <Toc.Item key={item.value} item={item}>
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
    </Toc>,
  );

  const nav = screen.getByRole('navigation', { name: 'On this page' });
  const activeLink = screen.getByRole('link', { name: 'introduction' });
  const nestedItem = screen.getByRole('link', { name: 'configuration' }).closest('li');

  expect(nav).toBeInTheDocument();
  expect(activeLink).toHaveAttribute('aria-current', 'location');
  expect(activeLink).toHaveAttribute('data-active');
  expect(nestedItem).toHaveAttribute('data-depth', '3');
  expect(container.querySelector('[data-slot="toc-indicator"]')).toBeInTheDocument();
  expect(container.querySelector('[data-slot="toc-rail"]')).toHaveAttribute('aria-hidden', 'true');
});

test('keeps the RootProvider store and context available to surrounding composition', async () => {
  render(<RootProviderExample />);

  fireEvent.click(screen.getByRole('button', { name: 'Set active section' }));

  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('configuration'));

  await waitFor(() =>
    expect(screen.getByText('On this page').closest('[data-slot="toc-root-provider"]')).toHaveStyle(
      '--top: 0px',
    ),
  );
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
      <Toc.Nav placement="left">
        <Toc.Title>Left navigation</Toc.Title>
      </Toc.Nav>
    </Toc>,
  );

  expect(screen.getByRole('navigation', { name: 'Left navigation' })).toHaveAttribute(
    'data-placement',
    'left',
  );
});