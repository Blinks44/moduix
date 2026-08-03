import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ColorPicker, parseColor, useColorPicker } from '../src';

function ProviderColorPicker() {
  const colorPicker = useColorPicker({
    defaultValue: parseColor('#2563eb'),
    name: 'provider-accent',
  });

  return (
    <ColorPicker.RootProvider value={colorPicker}>
      <ColorPicker.ChannelInput channel="hex" />
    </ColorPicker.RootProvider>
  );
}

test('renders automatic hidden inputs for root and RootProvider form participation', () => {
  const { container } = render(
    <form>
      <ColorPicker defaultValue={parseColor('#eb5e41')} name="accent">
        <ColorPicker.ChannelInput channel="hex" />
      </ColorPicker>
      <ProviderColorPicker />
    </form>,
  );

  const inputs = container.querySelectorAll<HTMLInputElement>(
    '[data-slot="color-picker-hidden-input"]',
  );

  expect(inputs).toHaveLength(2);
  expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([
    ['accent', 'rgba(235, 94, 65, 1)'],
    ['provider-accent', 'rgba(37, 99, 235, 1)'],
  ]);
});

test('preserves Ark open-change details and default trigger composition', async () => {
  const openStates: boolean[] = [];

  render(
    <ColorPicker
      defaultValue={parseColor('#eb5e41')}
      onOpenChange={(details) => openStates.push(details.open)}
    >
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Trigger aria-label="Open color picker" />
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>Content</ColorPicker.Content>
      </ColorPicker.Positioner>
    </ColorPicker>,
  );

  expect(
    document.querySelector(
      '[data-slot="color-picker-trigger"] [data-slot="color-picker-value-swatch"]',
    ),
  ).not.toBeNull();

  fireEvent.click(screen.getByRole('button', { name: 'Color' }));
  await waitFor(() => expect(openStates).toEqual([true]));

  fireEvent.keyDown(document, { key: 'Escape' });
  await waitFor(() => expect(openStates).toEqual([true, false]));
});