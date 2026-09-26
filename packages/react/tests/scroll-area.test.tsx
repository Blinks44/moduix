import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  ScrollArea,
  ScrollAreaContext,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRootProvider,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  useScrollArea,
} from '../src';

test('renders Ark anatomy with stable styling hooks and forwarded refs', () => {
  const rootRef = createRef<HTMLDivElement>();
  const viewportRef = createRef<HTMLDivElement>();

  render(
    <ScrollArea
      ref={rootRef}
      data-slot="consumer-root"
      data-variant="consumer"
      fade
      variant="always"
    >
      <ScrollAreaViewport ref={viewportRef} data-slot="consumer-viewport">
        <ScrollAreaContent>Scrollable content</ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>,
  );

  const root = rootRef.current!;
  const viewport = viewportRef.current!;

  expect('Root' in ScrollArea).toBe(false);
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
    const scrollArea = useScrollArea();

    return (
      <ScrollAreaRootProvider value={scrollArea} data-slot="consumer-provider">
        <ScrollAreaViewport>
          <ScrollAreaContent>Provider content</ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar>
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
        <ScrollAreaContext>
          {(context) => <output>{String(context.isAtTop)}</output>}
        </ScrollAreaContext>
      </ScrollAreaRootProvider>
    );
  }

  render(<ProviderScrollArea />);

  expect(document.querySelector('[data-slot="scroll-area-root-provider"]')).toHaveAttribute(
    'data-scope',
    'scroll-area',
  );
  expect(screen.getByText('Provider content')).toBeInTheDocument();
  expect(screen.getByText('true')).toBeInTheDocument();
});

test('preserves Ark asChild composition and forwards refs for every visible part', () => {
  const rootRef = createRef<HTMLDivElement>();
  const viewportRef = createRef<HTMLDivElement>();
  const contentRef = createRef<HTMLDivElement>();
  const scrollbarRef = createRef<HTMLDivElement>();
  const thumbRef = createRef<HTMLDivElement>();
  const cornerRef = createRef<HTMLDivElement>();

  render(
    <ScrollArea asChild ref={rootRef}>
      <div aria-label="Related articles" role="region">
        <ScrollAreaViewport ref={viewportRef}>
          <ScrollAreaContent ref={contentRef}>Article list</ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar ref={scrollbarRef}>
          <ScrollAreaThumb ref={thumbRef} />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner ref={cornerRef} />
      </div>
    </ScrollArea>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'scroll-area-root');
  expect(rootRef.current).not.toHaveAttribute('data-fade');
  expect(rootRef.current).toHaveAttribute('data-variant', 'hover');
  expect(viewportRef.current).toHaveAttribute('data-slot', 'scroll-area-viewport');
  expect(contentRef.current).toHaveAttribute('data-slot', 'scroll-area-content');
  expect(scrollbarRef.current).toHaveAttribute('data-slot', 'scroll-area-scrollbar');
  expect(thumbRef.current).toHaveAttribute('data-slot', 'scroll-area-thumb');
  expect(cornerRef.current).toHaveAttribute('data-slot', 'scroll-area-corner');
});