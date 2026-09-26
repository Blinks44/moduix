import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
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
      <ScrollAreaViewport ref={(element) => (viewportRef = element)} data-slot="consumer-viewport">
        <ScrollAreaContent>Scrollable content</ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  ));

  const root = rootRef;
  const viewport = viewportRef;
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
          {(context) => <output>{String(context().isAtTop)}</output>}
        </ScrollAreaContext>
      </ScrollAreaRootProvider>
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
      <ScrollAreaViewport ref={(element) => (viewportRef = element)}>
        <ScrollAreaContent ref={(element) => (contentRef = element)}>
          Article list
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar ref={(element) => (scrollbarRef = element)}>
        <ScrollAreaThumb ref={(element) => (thumbRef = element)} />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner ref={(element) => (cornerRef = element)} />
    </ScrollArea>
  ));

  expect(rootRef).toBeUndefined();
  const root = screen.getByRole('region', { name: 'Related articles' });
  expect(root.tagName).toBe('DIV');
  expect(root).toHaveAttribute('data-slot', 'scroll-area-root');
  expect(root).not.toHaveAttribute('data-fade');
  expect(root).toHaveAttribute('data-variant', 'hover');
  expect(root).toHaveClass('group/scroll-area', 'relative', 'h-full', 'w-full');
  expect(viewportRef).toHaveAttribute('data-slot', 'scroll-area-viewport');
  expect(contentRef).toHaveAttribute('data-slot', 'scroll-area-content');
  expect(scrollbarRef).toHaveAttribute('data-slot', 'scroll-area-scrollbar');
  expect(thumbRef).toHaveAttribute('data-slot', 'scroll-area-thumb');
  expect(cornerRef).toHaveAttribute('data-slot', 'scroll-area-corner');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <ScrollArea class="h-20">
      <ScrollAreaViewport class="rounded-none">
        <ScrollAreaContent>Scrollable content</ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar class="opacity-100">
        <ScrollAreaThumb class="bg-primary" />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  ));

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