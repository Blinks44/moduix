import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { Splitter } from '../src';

const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];

test('preserves Ark keyboard affordances and Tailwind trigger defaults', async () => {
  const { container } = render(() => (
    <Splitter panels={panels} defaultSize={[40, 60]}>
      <Splitter.Panel id="a">A</Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
      <Splitter.Panel id="b">B</Splitter.Panel>
    </Splitter>
  ));

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
  );
  expect(indicator).toHaveClass(
    'h-control-xs',
    'w-1.5',
    'rounded-full',
    'bg-background',
    'group-hover/trigger:border-muted-foreground/40',
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
  const { container } = render(() => (
    <Splitter panels={panels} defaultSize={[40, 60]}>
      <Splitter.Panel id="a">A</Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Disabled resize" disabled>
        <span>Grip</span>
      </Splitter.ResizeTrigger>
      <Splitter.Panel id="b">B</Splitter.Panel>
    </Splitter>
  ));

  const trigger = screen.getByRole('separator', { name: 'Disabled resize' });

  expect(screen.getByText('Grip')).toBeVisible();
  expect(
    container.querySelector('[data-slot="splitter-resize-trigger-indicator"]'),
  ).not.toBeInTheDocument();
  expect(trigger).toHaveAttribute('data-disabled');
  expect(trigger).not.toHaveAttribute('tabindex');
});

test('forwards refs to every styled part through ordinary Ark Solid paths', () => {
  let rootRef!: HTMLDivElement;
  let panelRef!: HTMLDivElement;
  let triggerRef!: HTMLButtonElement;
  let indicatorRef!: HTMLDivElement;

  render(() => (
    <Splitter ref={(element) => (rootRef = element)} panels={panels} defaultSize={[40, 60]}>
      <Splitter.Panel ref={(element) => (panelRef = element)} id="a">
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger
        ref={(element) => (triggerRef = element)}
        id="a:b"
        aria-label="Resize panels"
      >
        <Splitter.ResizeTriggerIndicator ref={(element) => (indicatorRef = element)} />
      </Splitter.ResizeTrigger>
      <Splitter.Panel id="b">B</Splitter.Panel>
    </Splitter>
  ));

  expect(rootRef).toHaveAttribute('data-slot', 'splitter-root');
  expect(panelRef).toHaveAttribute('data-slot', 'splitter-panel');
  expect(triggerRef).toHaveAttribute('data-slot', 'splitter-resize-trigger');
  expect(indicatorRef).toHaveAttribute('data-slot', 'splitter-resize-trigger-indicator');
});

test('keeps an asChild resize trigger as the interactive host', () => {
  let triggerRef: HTMLButtonElement | undefined;
  const { container } = render(() => (
    <Splitter panels={panels} defaultSize={[40, 60]}>
      <Splitter.Panel id="a">A</Splitter.Panel>
      <Splitter.ResizeTrigger
        ref={(element) => (triggerRef = element)}
        asChild={(props) => (
          <button {...props()} type="button">
            Resize panels
          </button>
        )}
        id="a:b"
        aria-label="Resize panels"
      />
      <Splitter.Panel id="b">B</Splitter.Panel>
    </Splitter>
  ));

  const trigger = screen.getByRole('separator', { name: 'Resize panels' });

  expect(trigger.tagName).toBe('BUTTON');
  expect(trigger).toHaveAttribute('data-slot', 'splitter-resize-trigger');
  expect(triggerRef).toBeUndefined();
  expect(
    container.querySelector('[data-slot="splitter-resize-trigger-indicator"]'),
  ).not.toBeInTheDocument();
});

test('lets consumer utilities replace fixed defaults', () => {
  const { container } = render(() => (
    <Splitter panels={panels} defaultSize={[40, 60]} class="h-64 w-96 border-2 bg-muted">
      <Splitter.Panel id="a" class="min-h-0 p-6">
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" class="w-2 min-w-2" />
      <Splitter.Panel id="b">B</Splitter.Panel>
    </Splitter>
  ));

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