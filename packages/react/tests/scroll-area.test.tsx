import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { ScrollArea } from '../src';

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
      <ScrollArea.Viewport ref={viewportRef} data-slot="consumer-viewport">
        <ScrollArea.Content>Scrollable content</ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>,
  );

  const root = rootRef.current!;
  const viewport = viewportRef.current!;

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
          {(context) => <output>{String(context.isAtTop)}</output>}
        </ScrollArea.Context>
      </ScrollArea.RootProvider>
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