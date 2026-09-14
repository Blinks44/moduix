import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { ScrollArea } from '../src';

test('renders Ark anatomy with stable styling hooks and forwarded refs', () => {
  let rootRef!: HTMLDivElement;
  let viewportRef!: HTMLDivElement;

  render(() => (
    <ScrollArea
      ref={(element) => (rootRef = element)}
      data-slot="consumer-root"
      data-variant="consumer"
      fade
      variant="always"
    >
      <ScrollArea.Viewport ref={(element) => (viewportRef = element)} data-slot="consumer-viewport">
        <ScrollArea.Content>Scrollable content</ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  ));

  const root = rootRef;
  const viewport = viewportRef;

  expect(ScrollArea.Root).toBe(ScrollArea);
  expect(root).toHaveAttribute('data-scope', 'scroll-area');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'scroll-area-root');
  expect(root).toHaveAttribute('data-fade');
  expect(root).toHaveAttribute('data-variant', 'always');
  expect(viewport).toHaveAttribute('data-part', 'viewport');
  expect(viewport).toHaveAttribute('data-slot', 'scroll-area-viewport');
  expect(screen.getByText('Scrollable content')).toHaveAttribute(
    'data-slot',
    'scroll-area-content',
  );
  expect(document.querySelector('[data-slot="scroll-area-scrollbar"]')).toBeInTheDocument();
  expect(document.querySelector('[data-slot="scroll-area-thumb"]')).toBeInTheDocument();
  expect(document.querySelector('[data-slot="scroll-area-corner"]')).toBeInTheDocument();
});

test('keeps RootProvider composition on the moduix surface', () => {
  function ProviderScrollArea() {
    const scrollArea = ScrollArea.useScrollArea();

    return (
      <ScrollArea.RootProvider value={scrollArea} data-slot="consumer-provider">
        <ScrollArea.Viewport>
          <ScrollArea.Content>Provider content</ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
        <ScrollArea.Context>
          {(context) => <output>{String(context().isAtTop)}</output>}
        </ScrollArea.Context>
      </ScrollArea.RootProvider>
    );
  }

  render(() => <ProviderScrollArea />);

  expect(document.querySelector('[data-slot="scroll-area-root-provider"]')).toHaveAttribute(
    'data-scope',
    'scroll-area',
  );
  expect(screen.getByText('Provider content')).toBeInTheDocument();
  expect(screen.getByText('true')).toBeInTheDocument();
});

test('preserves Ark asChild composition and forwards refs for every visible part', () => {
  let rootRef: HTMLDivElement | undefined;
  let viewportRef!: HTMLDivElement;
  let contentRef!: HTMLDivElement;
  let scrollbarRef!: HTMLDivElement;
  let thumbRef!: HTMLDivElement;
  let cornerRef!: HTMLDivElement;

  render(() => (
    <ScrollArea
      asChild={(props) => <div {...props()} aria-label="Related articles" role="region" />}
      ref={(element) => (rootRef = element)}
    >
      <ScrollArea.Viewport ref={(element) => (viewportRef = element)}>
        <ScrollArea.Content ref={(element) => (contentRef = element)}>
          Article list
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar ref={(element) => (scrollbarRef = element)}>
        <ScrollArea.Thumb ref={(element) => (thumbRef = element)} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner ref={(element) => (cornerRef = element)} />
    </ScrollArea>
  ));

  expect(rootRef).toBeUndefined();
  const root = screen.getByRole('region', { name: 'Related articles' });
  expect(root).toHaveAttribute('data-slot', 'scroll-area-root');
  expect(root).not.toHaveAttribute('data-fade');
  expect(root).toHaveAttribute('data-variant', 'hover');
  expect(viewportRef).toHaveAttribute('data-slot', 'scroll-area-viewport');
  expect(contentRef).toHaveAttribute('data-slot', 'scroll-area-content');
  expect(scrollbarRef).toHaveAttribute('data-slot', 'scroll-area-scrollbar');
  expect(thumbRef).toHaveAttribute('data-slot', 'scroll-area-thumb');
  expect(cornerRef).toHaveAttribute('data-slot', 'scroll-area-corner');
});