import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import {
  Splitter,
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterResizeTriggerIndicator,
} from '../src';

const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];

test('preserves Ark keyboard affordances and Tailwind trigger defaults', async () => {
  const { container } = render(
    <Splitter panels={panels} defaultSize={[40, 60]}>
      <SplitterPanel id="a">A</SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b">B</SplitterPanel>
    </Splitter>,
  );

  const root = container.querySelector('[data-slot="splitter-root"]');
  const trigger = screen.getByRole('separator', { name: 'Resize panels' });
  const indicator = container.querySelector('[data-slot="splitter-resize-trigger-indicator"]');

  expect(root).toHaveClass('h-112', 'w-full', 'rounded-md', 'bg-card');
  expect(trigger).toHaveClass(
    'w-px',
    'min-w-px',
    'before:w-[0.5px]',
    'before:h-full',
    'data-dragging:before:bg-muted-foreground/40',
    '[@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:before:bg-muted-foreground/40',
    'motion-reduce:transition-none',
    'motion-reduce:before:transition-none',
  );
  expect(indicator).toHaveClass(
    'h-control-xs',
    'w-1.5',
    'rounded-full',
    'bg-background',
    'group-hover/trigger:border-muted-foreground/40',
    'motion-reduce:transition-none',
  );
  expect(indicator).not.toHaveClass('data-dragging:border-border');
  expect(indicator).toBeVisible();
  expect(trigger).toHaveAttribute('aria-valuenow', '40');
  expect(trigger).toHaveAttribute('aria-valuemin', '20');
  expect(trigger).toHaveAttribute('aria-valuemax', '80');
  expect(trigger).toHaveAttribute('tabindex', '0');

  trigger.focus();
  fireEvent.focusIn(trigger);
  await waitFor(() => expect(trigger).toHaveAttribute('data-focus'));
});

test('keeps custom trigger content and disabled behavior intact', () => {
  const { container } = render(
    <Splitter panels={panels} defaultSize={[40, 60]}>
      <SplitterPanel id="a">A</SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Disabled resize" disabled>
        <span>Grip</span>
      </SplitterResizeTrigger>
      <SplitterPanel id="b">B</SplitterPanel>
    </Splitter>,
  );

  const trigger = screen.getByRole('separator', { name: 'Disabled resize' });

  expect(screen.getByText('Grip')).toBeVisible();
  expect(
    container.querySelector('[data-slot="splitter-resize-trigger-indicator"]'),
  ).not.toBeInTheDocument();
  expect(trigger).toHaveAttribute('data-disabled');
  expect(trigger).not.toHaveAttribute('tabindex');
});

test('forwards refs to every styled part', () => {
  const rootRef = createRef<HTMLDivElement>();
  const panelRef = createRef<HTMLDivElement>();
  const triggerRef = createRef<HTMLButtonElement>();
  const indicatorRef = createRef<HTMLDivElement>();

  render(
    <Splitter ref={rootRef} panels={panels} defaultSize={[40, 60]}>
      <SplitterPanel ref={panelRef} id="a">
        A
      </SplitterPanel>
      <SplitterResizeTrigger ref={triggerRef} id="a:b" aria-label="Resize panels">
        <SplitterResizeTriggerIndicator ref={indicatorRef} />
      </SplitterResizeTrigger>
      <SplitterPanel id="b">B</SplitterPanel>
    </Splitter>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'splitter-root');
  expect(panelRef.current).toHaveAttribute('data-slot', 'splitter-panel');
  expect(triggerRef.current).toHaveAttribute('data-slot', 'splitter-resize-trigger');
  expect(indicatorRef.current).toHaveAttribute('data-slot', 'splitter-resize-trigger-indicator');
});

test('keeps an asChild resize trigger as the interactive host', () => {
  const { container } = render(
    <Splitter panels={panels} defaultSize={[40, 60]}>
      <SplitterPanel id="a">A</SplitterPanel>
      <SplitterResizeTrigger asChild id="a:b" aria-label="Resize panels">
        <button type="button">Resize panels</button>
      </SplitterResizeTrigger>
      <SplitterPanel id="b">B</SplitterPanel>
    </Splitter>,
  );

  const trigger = screen.getByRole('separator', { name: 'Resize panels' });

  expect(trigger.tagName).toBe('BUTTON');
  expect(trigger).toHaveAttribute('data-slot', 'splitter-resize-trigger');
  expect(
    container.querySelector('[data-slot="splitter-resize-trigger-indicator"]'),
  ).not.toBeInTheDocument();
});

test('lets consumer utilities replace fixed defaults', () => {
  const { container } = render(
    <Splitter panels={panels} defaultSize={[40, 60]} className="h-64 w-96 border-2 bg-muted">
      <SplitterPanel id="a" className="min-h-0 p-6">
        A
      </SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" className="w-2 min-w-2" />
      <SplitterPanel id="b">B</SplitterPanel>
    </Splitter>,
  );

  const root = container.querySelector('[data-slot="splitter-root"]');
  const panel = container.querySelector('[data-slot="splitter-panel"]');
  const trigger = screen.getByRole('separator', { name: 'Resize panels' });

  expect(root).toHaveClass('h-64', 'w-96', 'border-2', 'bg-muted');
  expect(root).not.toHaveClass('h-112', 'w-full', 'border-0', 'bg-card');
  expect(panel).toHaveClass('min-h-0', 'p-6');
  expect(panel).not.toHaveClass('min-h-50', 'p-4');
  expect(trigger).toHaveClass('w-2', 'min-w-2');
  expect(trigger).not.toHaveClass('w-px', 'min-w-px');
});