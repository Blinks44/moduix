import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { Slider, useSlider } from '../src';

function ProviderSlider() {
  const slider = useSlider({ defaultValue: [45], name: 'provider-volume' });

  return (
    <Slider.RootProvider value={slider}>
      <Slider.Label>Provider volume</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.RootProvider>
  );
}

test('submits through explicit Ark hidden inputs', () => {
  const { container } = render(
    <form>
      <Slider defaultValue={[40]} name="volume">
        <Slider.Label>Volume</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider>
      <Slider defaultValue={[20, 80]} name="range">
        <Slider.Label>Range</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput />
          </Slider.Thumb>
          <Slider.Thumb index={1}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
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
        <Slider.Label>Volume</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider>
      <Slider
        defaultValue={[40]}
        readOnly
        thumbAlignment="center"
        onValueChange={(details) => changes.push(details.value)}
      >
        <Slider.Label>Read-only volume</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider>
      <Slider
        defaultValue={[40]}
        disabled
        thumbAlignment="center"
        onValueChange={(details) => changes.push(details.value)}
      >
        <Slider.Label>Disabled volume</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
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
      <Slider.Control>
        <Slider.Thumbs />
      </Slider.Control>
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
        <Slider.Label>Volume</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb asChild index={0} aria-label="Volume">
            <span data-testid="slider-thumb">
              <Slider.HiddenInput />
            </span>
          </Slider.Thumb>
        </Slider.Control>
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
      <Slider.Label>Volume</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
      <Slider.MarkerGroup>
        <Slider.Marker value={0}>0</Slider.Marker>
        <Slider.Marker value={100}>100</Slider.Marker>
      </Slider.MarkerGroup>
    </Slider>,
  );

  const activeMarker = screen.getByText('0');

  expect(container.querySelector('[data-slot="slider-root"]')).toHaveAttribute('data-invalid');
  expect(activeMarker).toHaveAttribute('data-slot', 'slider-marker');
  expect(activeMarker).toHaveAttribute('data-state', 'under-value');
});

test('uses Tailwind-owned visual defaults and lets consumer utilities win', () => {
  const { container } = render(
    <Slider defaultValue={[40]} className="w-full">
      <Slider.Label>Volume</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Volume">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
      <Slider.MarkerGroup>
        <Slider.Marker value={0}>0</Slider.Marker>
      </Slider.MarkerGroup>
    </Slider>,
  );

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