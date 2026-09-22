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

test('renders Ark anatomy with stable styling hooks, Tailwind defaults, and forwarded refs', () => {
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
  const content = screen.getByText('Scrollable content');
  const scrollbar = document.querySelector('[data-slot="scroll-area-scrollbar"]')!;
  const thumb = document.querySelector('[data-slot="scroll-area-thumb"]')!;
  const corner = document.querySelector('[data-slot="scroll-area-corner"]')!;

  expect('Root' in ScrollArea).toBe(false);
  expect(root).toHaveAttribute('data-scope', 'scroll-area');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'scroll-area-root');
  expect(root).toHaveAttribute('data-fade');
  expect(root).toHaveAttribute('data-variant', 'always');
  expect(root).toHaveClass('relative', 'h-full', 'w-full', 'text-foreground');
  expect(viewport).toHaveAttribute('data-part', 'viewport');
  expect(viewport).toHaveAttribute('data-slot', 'scroll-area-viewport');
  expect(viewport).toHaveClass('rounded-md', '[scrollbar-width:none]');
  expect(content).toHaveAttribute('data-slot', 'scroll-area-content');
  expect(content).toHaveClass('block');
  expect(scrollbar).toBeInTheDocument();
  expect(scrollbar).toHaveClass('rounded-md', 'opacity-0', 'pointer-events-none');
  expect(thumb).toBeInTheDocument();
  expect(thumb).toHaveClass('rounded-full', 'bg-border');
  expect(corner).toBeInTheDocument();
  expect(corner).toHaveClass('bg-transparent');
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
  expect(rootRef.current).toHaveClass('group/scroll-area', 'relative', 'h-full', 'w-full');
  expect(viewportRef.current).toHaveAttribute('data-slot', 'scroll-area-viewport');
  expect(contentRef.current).toHaveAttribute('data-slot', 'scroll-area-content');
  expect(scrollbarRef.current).toHaveAttribute('data-slot', 'scroll-area-scrollbar');
  expect(thumbRef.current).toHaveAttribute('data-slot', 'scroll-area-thumb');
  expect(cornerRef.current).toHaveAttribute('data-slot', 'scroll-area-corner');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(
    <ScrollArea className="h-20">
      <ScrollAreaViewport className="rounded-none">
        <ScrollAreaContent>Scrollable content</ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar className="opacity-100">
        <ScrollAreaThumb className="bg-primary" />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>,
  );

  const root = document.querySelector('[data-slot="scroll-area-root"]')!;
  const viewport = document.querySelector('[data-slot="scroll-area-viewport"]')!;
  const scrollbar = document.querySelector('[data-slot="scroll-area-scrollbar"]')!;
  const thumb = document.querySelector('[data-slot="scroll-area-thumb"]')!;

  expect(root).toHaveClass('h-20');
  expect(root).not.toHaveClass('h-full');
  expect(viewport).toHaveClass('rounded-none');
  expect(viewport).not.toHaveClass('rounded-md');
  expect(scrollbar).toHaveClass('opacity-100');
  expect(scrollbar).not.toHaveClass('opacity-0');
  expect(thumb).toHaveClass('bg-primary');
  expect(thumb).not.toHaveClass('bg-border');
});
