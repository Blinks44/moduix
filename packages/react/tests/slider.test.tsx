import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

test('submits through explicit Ark hidden inputs', () => {
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
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumbs />
        </SliderControl>
      </Slider>
      <Slider
        defaultValue={[40]}
        readOnly
        thumbAlignment="center"
        onValueChange={(details) => changes.push(details.value)}
      >
        <SliderLabel>Read-only volume</SliderLabel>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumbs />
        </SliderControl>
      </Slider>
      <Slider
        defaultValue={[40]}
        disabled
        thumbAlignment="center"
        onValueChange={(details) => changes.push(details.value)}
      >
        <SliderLabel>Disabled volume</SliderLabel>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumbs />
        </SliderControl>
      </Slider>
    </>,
  );

  const slider = screen.getByRole('slider', { name: 'Volume' });
  const readOnlySlider = screen.getByRole('slider', { name: 'Read-only volume' });
  const disabledSlider = screen.getByRole('slider', { name: 'Disabled volume' });

  fireEvent.focus(slider);
  fireEvent.keyDown(slider, { key: 'ArrowRight' });
  fireEvent.focus(readOnlySlider);
  fireEvent.keyDown(readOnlySlider, { key: 'ArrowRight' });
  fireEvent.focus(disabledSlider);
  fireEvent.keyDown(disabledSlider, { key: 'ArrowRight' });

  await waitFor(() => expect(changes).toEqual([[41]]));
  expect(readOnlySlider).toHaveAttribute('tabindex', '0');
  expect(readOnlySlider.closest('[data-slot="slider-root"]')).toHaveAttribute('data-readonly');
  expect(disabledSlider).not.toHaveAttribute('tabindex');
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

  thumb.focus();
  fireEvent.keyDown(thumb, { key: 'ArrowRight' });

  await waitFor(() => expect(thumb).toHaveAttribute('aria-valuenow', '41'));
  expect(container.querySelector('[data-slot="slider-thumb"]')).toBe(thumb);
});

test('preserves refs and explicit form inputs with asChild composition', () => {
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

  expect(ref.current).toBe(screen.getByTestId('slider-root'));
  expect(screen.getByTestId('slider-root')).toHaveAttribute('data-slot', 'slider-root');
  expect(screen.getByTestId('slider-thumb')).toHaveAttribute('data-slot', 'slider-thumb');
  expect(screen.getByTestId('slider-root').querySelector('input[hidden]')).toBeTruthy();
});

test('preserves active marker state for invalid sliders', () => {
  const { container } = render(
    <Slider defaultValue={[40]} invalid>
      <SliderLabel>Volume</SliderLabel>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
      <SliderMarkerGroup>
        <SliderMarker value={0}>0</SliderMarker>
        <SliderMarker value={100}>100</SliderMarker>
      </SliderMarkerGroup>
    </Slider>,
  );

  const activeMarker = screen.getByText('0');

  expect(container.querySelector('[data-slot="slider-root"]')).toHaveAttribute('data-invalid');
  expect(activeMarker).toHaveAttribute('data-slot', 'slider-marker');
  expect(activeMarker).toHaveAttribute('data-state', 'under-value');
});