import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  ColorPicker,
  parseColor,
  useColorPicker,
  ColorPickerRootProvider,
  ColorPickerHiddenInput,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerTrigger,
  ColorPickerPositioner,
  ColorPickerContent,
  ColorPickerArea,
  ColorPickerChannelSlider,
  ColorPickerChannelInput,
  ColorPickerSwatchTrigger,
} from '../src';

function ProviderColorPicker() {
  const colorPicker = useColorPicker({
    defaultValue: parseColor('#2563eb'),
    name: 'provider-accent',
  });

  return (
    <ColorPickerRootProvider value={colorPicker}>
      <ColorPickerChannelInput channel="hex" />
      <ColorPickerHiddenInput />
    </ColorPickerRootProvider>
  );
}

test('submits through explicit Ark hidden inputs', async () => {
  const { container } = render(
    <form>
      <ColorPicker defaultValue={parseColor('#eb5e41')} name="accent">
        <ColorPickerChannelInput channel="hex" />
        <ColorPickerHiddenInput />
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
  const channel = page.getByRole('textbox').nth(0);
  await channel.fill('#16a34a');
  await channel.press('Enter');
  expect(new FormData(container.querySelector('form')!).get('accent')).toBe('rgba(22, 163, 74, 1)');
});

test('keeps an asChild host, ref, and explicit hidden input intact', async () => {
  const ref = createRef<HTMLDivElement>();

  render(
    <form>
      <ColorPicker asChild ref={ref} defaultValue={parseColor('#eb5e41')} name="accent">
        <div data-testid="color-picker-root">
          <ColorPickerChannelInput channel="hex" />
          <ColorPickerHiddenInput />
        </div>
      </ColorPicker>
    </form>,
  );

  const root = screen.getByTestId('color-picker-root');

  expect(ref.current).toBe(root);
  await expect
    .element(page.getByTestId('color-picker-root'))
    .toHaveAttribute('data-slot', 'color-picker-root');
  expect(root.querySelector('input[name="accent"]')).not.toBeNull();
  expect(new FormData(root.closest('form')!).get('accent')).toBe('rgba(235, 94, 65, 1)');
});

test('forwards refs through ordinary Ark React part paths', async () => {
  const rootRef = createRef<HTMLDivElement>();
  const controlRef = createRef<HTMLDivElement>();
  const triggerRef = createRef<HTMLButtonElement>();

  render(
    <ColorPicker ref={rootRef} defaultValue={parseColor('#eb5e41')}>
      <ColorPickerControl ref={controlRef}>
        <ColorPickerTrigger ref={triggerRef} aria-label="Open" />
      </ColorPickerControl>
    </ColorPicker>,
  );

  expect(rootRef.current!.getAttribute('data-slot')).toBe('color-picker-root');
  expect(controlRef.current!.getAttribute('data-slot')).toBe('color-picker-control');
  expect(triggerRef.current).toBe(screen.getByRole('button', { name: 'Open' }));
});

test('preserves Ark open-change details and default trigger composition', async () => {
  const openStates: boolean[] = [];

  render(
    <ColorPicker
      defaultValue={parseColor('#eb5e41')}
      onOpenChange={(details) => openStates.push(details.open)}
    >
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerTrigger aria-label="Open color picker" />
      </ColorPickerControl>
      <ColorPickerPositioner>
        <ColorPickerContent>Content</ColorPickerContent>
      </ColorPickerPositioner>
    </ColorPicker>,
  );

  expect(
    document.querySelector(
      '[data-slot="color-picker-trigger"] [data-slot="color-picker-value-swatch"]',
    ),
  ).not.toBeNull();

  await page.getByRole('button', { name: 'Color', exact: true }).click();
  await expect.poll(() => openStates).toEqual([true]);

  await expect.element(page.getByText('Content')).toBeFocused();
  await page.getByText('Content').press('Escape');
  await expect.poll(() => openStates).toEqual([true, false]);
});

test('lets consumer utilities replace component defaults', async () => {
  const { container } = render(
    <ColorPicker className="w-80" defaultValue={parseColor('#eb5e41')}>
      <ColorPickerControl>
        <ColorPickerTrigger aria-label="Open color picker" />
      </ColorPickerControl>
    </ColorPicker>,
  );

  const root = container.querySelector('[data-slot="color-picker-root"]')!;

  expect(root!.classList.contains('w-80')).toBe(true);
  expect(root!.classList.contains('w-64')).toBe(false);
});

test('keeps empty visual parts sized and visible with utilities', async () => {
  render(
    <ColorPicker inline defaultValue={parseColor('#eb5e41')}>
      <ColorPickerArea />
      <ColorPickerChannelSlider channel="hue" />
      <ColorPickerSwatchTrigger value="#eb5e41" />
    </ColorPicker>,
  );
  await expect
    .element(page.locator('[data-slot="color-picker-area"]').nth(0))
    .toHaveCSS('height', '160px');
  await expect
    .element(page.locator('[data-slot="color-picker-area-background"]').nth(0))
    .toHaveCSS('height', '160px');
  await expect
    .element(page.locator('[data-slot="color-picker-channel-slider-track"]').nth(0))
    .toHaveCSS('height', '12px');
  await expect
    .element(page.locator('[data-slot="color-picker-swatch"]').nth(0))
    .toHaveCSS('width', '32px');
  await expect
    .element(page.locator('[data-slot="color-picker-swatch"]').nth(0))
    .toHaveCSS('height', '32px');
});