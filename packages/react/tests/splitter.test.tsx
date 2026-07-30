import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Splitter } from '../src';

const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];

test('preserves Ark keyboard affordances and moduix trigger defaults', async () => {
  const { container } = render(
    <Splitter panels={panels} defaultSize={[40, 60]}>
      <Splitter.Panel id="a">A</Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
      <Splitter.Panel id="b">B</Splitter.Panel>
    </Splitter>,
  );

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
  const { container } = render(
    <Splitter panels={panels} defaultSize={[40, 60]}>
      <Splitter.Panel id="a">A</Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Disabled resize" disabled>
        <span>Grip</span>
      </Splitter.ResizeTrigger>
      <Splitter.Panel id="b">B</Splitter.Panel>
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