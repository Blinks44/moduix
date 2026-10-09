import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import {
  Slider,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderRootProvider,
  SliderThumb,
  SliderThumbs,
  SliderTrack,
  useSlider,
} from '../src';

function SliderParts() {
  return (
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumbs />
    </SliderControl>
  );
}

function ProviderSlider() {
  const slider = useSlider({ defaultValue: [45], name: 'provider-volume' });

  return (
    <SliderRootProvider value={slider}>
      <SliderLabel>Provider volume</SliderLabel>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0}>
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </SliderRootProvider>
  );
}

test('submits through explicit Ark hidden inputs', async () => {
  const { container } = render(
    <form>
      <Slider defaultValue={[40]} name="volume">
        <SliderLabel>Volume</SliderLabel>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0}>
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </Slider>
      <Slider defaultValue={[20, 80]} name="range">
        <SliderLabel>Range</SliderLabel>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0}>
            <SliderHiddenInput />
          </SliderThumb>
          <SliderThumb index={1}>
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </Slider>
      <ProviderSlider />
    </form>,
  );

  const form = container.querySelector('form')!;
  const inputs = container.querySelectorAll('input[hidden]');

  expect(inputs).toHaveLength(4);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['volume', '40'],
    ['range[]', '20'],
    ['range[]', '80'],
    ['provider-volume', '45'],
  ]);
});

test('preserves keyboard behavior and makes read-only state visible without changing focusability', async () => {
  const changes: number[][] = [];

  render(
    <>
      <Slider
        defaultValue={[40]}
        thumbAlignment="center"
        onValueChange={(details) => changes.push(details.value)}
      >
        <SliderLabel>Volume</SliderLabel>
        <SliderParts />
      </Slider>
      <Slider
        defaultValue={[40]}
        readOnly
        thumbAlignment="center"
        onValueChange={(details) => changes.push(details.value)}
      >
        <SliderLabel>Read-only volume</SliderLabel>
        <SliderParts />
      </Slider>
      <Slider
        defaultValue={[40]}
        disabled
        thumbAlignment="center"
        onValueChange={(details) => changes.push(details.value)}
      >
        <SliderLabel>Disabled volume</SliderLabel>
        <SliderParts />
      </Slider>
    </>,
  );

  const slider = page.getByRole('slider', { name: 'Volume', exact: true });
  const readOnlySlider = page.getByRole('slider', { name: 'Read-only volume' });
  const disabledSlider = page.getByRole('slider', { name: 'Disabled volume' });

  await slider.press('ArrowRight');
  await readOnlySlider.press('ArrowRight');
  await disabledSlider.press('ArrowRight');

  await expect.poll(() => changes).toEqual([[41]]);
  await expect.element(readOnlySlider).toHaveAttribute('tabindex', '0');
  await expect
    .element(page.locator('[data-slot="slider-root"]').filter({ has: readOnlySlider }))
    .toHaveAttribute('data-readonly');
  await expect.element(disabledSlider).not.toHaveAttribute('tabindex');
});

test('keeps generated thumbs mounted while their values change', async () => {
  const { container } = render(
    <Slider defaultValue={[40]}>
      <SliderControl>
        <SliderThumbs />
      </SliderControl>
    </Slider>,
  );

  const thumb = container.querySelector<HTMLElement>('[data-slot="slider-thumb"]')!;

  await page.getByRole('slider').press('ArrowRight');

  await expect.element(page.getByRole('slider')).toHaveAttribute('aria-valuenow', '41');
  expect(container.querySelector('[data-slot="slider-thumb"]')).toBe(thumb);
});

test('reads controlled prop updates without remounting generated thumbs', async () => {
  const changes: number[][] = [];
  const { container, rerender } = render(
    <Slider value={[40]} onValueChange={(details) => changes.push(details.value)}>
      <SliderControl>
        <SliderThumbs />
      </SliderControl>
    </Slider>,
  );
  const thumb = container.querySelector('[data-slot="slider-thumb"]');

  rerender(
    <Slider value={[65]} onValueChange={(details) => changes.push(details.value)}>
      <SliderControl>
        <SliderThumbs />
      </SliderControl>
    </Slider>,
  );
  await expect.element(page.getByRole('slider')).toHaveAttribute('aria-valuenow', '65');
  await page.getByRole('slider').press('ArrowRight');

  await expect.poll(() => changes).toEqual([[66]]);
  await expect.element(page.getByRole('slider')).toHaveAttribute('aria-valuenow', '65');
  expect(container.querySelector('[data-slot="slider-thumb"]')).toBe(thumb);
});

test('preserves refs and explicit form inputs with asChild composition', async () => {
  const ref = createRef<HTMLDivElement>();

  render(
    <Slider asChild ref={ref} defaultValue={[40]}>
      <div data-testid="slider-root">
        <SliderLabel>Volume</SliderLabel>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb asChild index={0} aria-label="Volume">
            <span data-testid="slider-thumb">
              <SliderHiddenInput />
            </span>
          </SliderThumb>
        </SliderControl>
      </div>
    </Slider>,
  );

  const root = document.querySelector('[data-testid="slider-root"]')!;
  expect(ref.current).toBe(root);
  expect(root.getAttribute('data-slot')).toBe('slider-root');
  await expect
    .element(page.getByTestId('slider-thumb'))
    .toHaveAttribute('data-slot', 'slider-thumb');
  expect(root.querySelector('input[hidden]')).not.toBeNull();
});

test('preserves active marker state for invalid sliders', async () => {
  render(
    <Slider defaultValue={[40]} invalid>
      <SliderLabel>Volume</SliderLabel>
      <SliderParts />
      <SliderMarkerGroup>
        <SliderMarker value={0}>0</SliderMarker>
        <SliderMarker value={100}>100</SliderMarker>
      </SliderMarkerGroup>
    </Slider>,
  );

  const activeMarker = page.getByText('0', { exact: true });

  await expect.element(page.locator('[data-slot="slider-root"]')).toHaveAttribute('data-invalid');
  await expect.element(activeMarker).toHaveAttribute('data-slot', 'slider-marker');
  await expect.element(activeMarker).toHaveAttribute('data-state', 'under-value');
});

test('uses Tailwind-owned visual defaults and lets consumer utilities win', async () => {
  const { container } = render(
    <Slider defaultValue={[40]} className="w-full">
      <SliderLabel>Volume</SliderLabel>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0} aria-label="Volume">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
      <SliderMarkerGroup>
        <SliderMarker value={0}>0</SliderMarker>
      </SliderMarkerGroup>
    </Slider>,
  );

  const root = container.querySelector('[data-slot="slider-root"]')!;
  const track = container.querySelector('[data-slot="slider-track"]')!;
  const range = container.querySelector('[data-slot="slider-range"]')!;
  const thumb = container.querySelector('[data-slot="slider-thumb"]')!;
  const marker = container.querySelector('[data-slot="slider-marker"]')!;

  expect([...root.classList]).toEqual(expect.arrayContaining(['group', 'w-full']));
  expect([...root.classList]).not.toContain('w-48');
  expect([...track.classList]).toEqual(expect.arrayContaining(['h-1.5', 'bg-muted', 'ring-1']));
  expect([...range.classList]).toEqual(expect.arrayContaining(['h-full', 'bg-primary']));
  expect([...thumb.classList]).toEqual(
    expect.arrayContaining(['size-4', 'border-border', 'bg-background']),
  );
  expect([...marker.classList]).toEqual(
    expect.arrayContaining(['before:size-1', 'before:bg-border']),
  );
  await expect.element(page.locator('[data-slot="slider-track"]')).toHaveCSS('height', '6px');
  await expect.element(page.getByRole('slider', { name: 'Volume' })).toHaveCSS('width', '16px');
  expect(getComputedStyle(marker, '::before').width).toBe('4px');
});