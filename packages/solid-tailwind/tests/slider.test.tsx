import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
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
  const { container } = render(() => (
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
    </form>
  ));

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

  render(() => (
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
    </>
  ));

  const slider = screen.getByRole('slider', { name: 'Volume' });
  const readOnlySlider = screen.getByRole('slider', { name: 'Read-only volume' });
  const disabledSlider = screen.getByRole('slider', { name: 'Disabled volume' });

  slider.focus();
  fireEvent.focusIn(slider);
  fireEvent.keyDown(slider, { key: 'ArrowRight' });
  readOnlySlider.focus();
  fireEvent.focusIn(readOnlySlider);
  fireEvent.keyDown(readOnlySlider, { key: 'ArrowRight' });
  disabledSlider.focus();
  fireEvent.focusIn(disabledSlider);
  fireEvent.keyDown(disabledSlider, { key: 'ArrowRight' });

  await waitFor(() => expect(changes).toEqual([[41]]));
  expect(readOnlySlider).toHaveAttribute('tabindex', '0');
  expect(readOnlySlider.closest('[data-slot="slider-root"]')).toHaveAttribute('data-readonly');
  expect(disabledSlider).not.toHaveAttribute('tabindex');
});

test('keeps generated thumbs mounted while their values change', async () => {
  render(() => (
    <Slider defaultValue={[40]}>
      <SliderControl>
        <SliderThumbs />
      </SliderControl>
    </Slider>
  ));

  const thumb = screen.getByRole('slider');

  thumb.focus();
  fireEvent.focusIn(thumb);
  fireEvent.keyDown(thumb, { key: 'ArrowRight' });

  await waitFor(() => expect(thumb).toHaveAttribute('aria-valuenow', '41'));
  expect(screen.getByRole('slider')).toBe(thumb);
});

test('preserves asChild composition, slots, refs, and explicit form input placement', () => {
  const { container } = render(() => (
    <Slider asChild={(props) => <div {...props()} data-testid="slider-root" />} defaultValue={[40]}>
      <SliderLabel>Volume</SliderLabel>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb
          asChild={(props) => <span {...props()} data-testid="slider-thumb" />}
          index={0}
          aria-label="Volume"
        >
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  ));

  expect(screen.getByTestId('slider-root')).toHaveAttribute('data-slot', 'slider-root');
  expect(screen.getByTestId('slider-thumb')).toHaveAttribute('data-slot', 'slider-thumb');
  expect(container.querySelector('[data-testid="slider-root"] input[hidden]')).toBeTruthy();
});

test('forwards refs through ordinary Ark Solid part paths', () => {
  let rootRef!: HTMLDivElement;
  let controlRef!: HTMLDivElement;
  let thumbRef!: HTMLDivElement;

  render(() => (
    <Slider ref={(element) => (rootRef = element)} defaultValue={[40]} aria-label={['Volume']}>
      <SliderControl ref={(element) => (controlRef = element)}>
        <SliderThumb ref={(element) => (thumbRef = element)} index={0} />
      </SliderControl>
    </Slider>
  ));

  expect(rootRef).toHaveAttribute('data-slot', 'slider-root');
  expect(controlRef).toHaveAttribute('data-slot', 'slider-control');
  expect(thumbRef).toBe(screen.getByRole('slider', { name: 'Volume' }));
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLDivElement | undefined;

  render(() => (
    <Slider
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} />}
      defaultValue={[40]}
      aria-label={['Volume']}
    >
      <SliderThumb index={0} />
    </Slider>
  ));

  expect(rootRef).toBeUndefined();
});

test('preserves active marker state for invalid sliders', () => {
  const { container } = render(() => (
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
    </Slider>
  ));

  const activeMarker = screen.getByText('0');

  expect(container.querySelector('[data-slot="slider-root"]')).toHaveAttribute('data-invalid');
  expect(activeMarker).toHaveAttribute('data-slot', 'slider-marker');
  expect(activeMarker).toHaveAttribute('data-state', 'under-value');
});

test('uses Tailwind-owned visual defaults and lets consumer utilities win', () => {
  const { container } = render(() => (
    <Slider defaultValue={[40]} class="w-full">
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
    </Slider>
  ));

  const root = container.querySelector('[data-slot="slider-root"]')!;
  const track = container.querySelector('[data-slot="slider-track"]')!;
  const range = container.querySelector('[data-slot="slider-range"]')!;
  const thumb = container.querySelector('[data-slot="slider-thumb"]')!;
  const marker = container.querySelector('[data-slot="slider-marker"]')!;

  expect(root).toHaveClass('group', 'w-full');
  expect(root).not.toHaveClass('w-48');
  expect(track).toHaveClass('h-1.5', 'bg-muted', 'ring-1');
  expect(range).toHaveClass('h-full', 'bg-primary');
  expect(thumb).toHaveClass('size-4', 'border-border', 'bg-background');
  expect(marker).toHaveClass('before:size-1', 'before:bg-border');
});