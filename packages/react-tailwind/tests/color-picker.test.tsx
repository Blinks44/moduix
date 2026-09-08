import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { ColorPicker, parseColor, useColorPicker } from '../src';

function ProviderColorPicker() {
  const colorPicker = useColorPicker({
    defaultValue: parseColor('#2563eb'),
    name: 'provider-accent',
  });

  return (
    <ColorPicker.RootProvider value={colorPicker}>
      <ColorPicker.ChannelInput channel="hex" />
      <ColorPicker.HiddenInput />
    </ColorPicker.RootProvider>
  );
}

test('submits through explicit Ark hidden inputs', () => {
  const { container } = render(
    <form>
      <ColorPicker defaultValue={parseColor('#eb5e41')} name="accent">
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.HiddenInput />
      </ColorPicker>
      <ProviderColorPicker />
    </form>,
  );

  const inputs = container.querySelectorAll<HTMLInputElement>('input[tabindex="-1"]');

  expect(inputs).toHaveLength(2);
  expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([
    ['accent', 'rgba(235, 94, 65, 1)'],
    ['provider-accent', 'rgba(37, 99, 235, 1)'],
  ]);
});

test('keeps an asChild host, ref, and explicit hidden input intact', () => {
  const ref = createRef<HTMLDivElement>();

  render(
    <form>
      <ColorPicker asChild ref={ref} defaultValue={parseColor('#eb5e41')} name="accent">
        <div data-testid="color-picker-root">
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.HiddenInput />
        </div>
      </ColorPicker>
    </form>,
  );

  const root = screen.getByTestId('color-picker-root');

  expect(ref.current).toBe(root);
  expect(root).toHaveAttribute('data-slot', 'color-picker-root');
  expect(root.querySelector('input[name="accent"]')).not.toBeNull();
  expect(new FormData(root.closest('form')!).get('accent')).toBe('rgba(235, 94, 65, 1)');
});

test('forwards refs through ordinary Ark React part paths', () => {
  const rootRef = createRef<HTMLDivElement>();
  const controlRef = createRef<HTMLDivElement>();
  const triggerRef = createRef<HTMLButtonElement>();

  render(
    <ColorPicker ref={rootRef} defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Control ref={controlRef}>
        <ColorPicker.Trigger ref={triggerRef} aria-label="Open" />
      </ColorPicker.Control>
    </ColorPicker>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'color-picker-root');
  expect(controlRef.current).toHaveAttribute('data-slot', 'color-picker-control');
  expect(triggerRef.current).toBe(screen.getByRole('button', { name: 'Open' }));
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

test('lets consumer utilities replace component defaults', () => {
  const { container } = render(
    <ColorPicker className="w-80" defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Control>
        <ColorPicker.Trigger aria-label="Open color picker" />
      </ColorPicker.Control>
    </ColorPicker>,
  );

  const root = container.querySelector('[data-slot="color-picker-root"]')!;

  expect(root).toHaveClass('w-80');
  expect(root).not.toHaveClass('w-64');
});

test('keeps empty visual parts sized and visible with utilities', () => {
  const { container } = render(
    <ColorPicker inline defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Area />
      <ColorPicker.ChannelSlider channel="hue" />
      <ColorPicker.SwatchTrigger value="#eb5e41" />
    </ColorPicker>,
  );

  expect(container.querySelector('[data-slot="color-picker-area"]')).toHaveClass('h-40', 'w-full');
  expect(container.querySelector('[data-slot="color-picker-area-background"]')).toHaveClass(
    'size-full',
  );
  expect(container.querySelector('[data-slot="color-picker-channel-slider-track"]')).toHaveClass(
    'h-3',
    'w-full',
  );
  expect(container.querySelector('[data-slot="color-picker-swatch"]')).toHaveClass(
    'size-control-sm',
  );
});