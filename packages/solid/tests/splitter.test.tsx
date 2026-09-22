import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
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

test('preserves Ark keyboard affordances and moduix trigger defaults', async () => {
  const { container } = render(() => (
    <Splitter panels={panels} defaultSize={[40, 60]}>
      <SplitterPanel id="a">A</SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b">B</SplitterPanel>
    </Splitter>
  ));

  const trigger = screen.getByRole('separator', { name: 'Resize panels' });

  expect(container.querySelector('[data-slot="splitter-resize-trigger-indicator"]')).toBeVisible();
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
      <SplitterPanel id="a">A</SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Disabled resize" disabled>
        <span>Grip</span>
      </SplitterResizeTrigger>
      <SplitterPanel id="b">B</SplitterPanel>
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
      <SplitterPanel ref={(element) => (panelRef = element)} id="a">
        A
      </SplitterPanel>
      <SplitterResizeTrigger
        ref={(element) => (triggerRef = element)}
        id="a:b"
        aria-label="Resize panels"
      >
        <SplitterResizeTriggerIndicator ref={(element) => (indicatorRef = element)} />
      </SplitterResizeTrigger>
      <SplitterPanel id="b">B</SplitterPanel>
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
      <SplitterPanel id="a">A</SplitterPanel>
      <SplitterResizeTrigger
        ref={(element) => (triggerRef = element)}
        asChild={(props) => (
          <button {...props()} type="button">
            Resize panels
          </button>
        )}
        id="a:b"
        aria-label="Resize panels"
      />
      <SplitterPanel id="b">B</SplitterPanel>
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
