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
        <Slider.Thumbs />
      </Slider.Control>
    </Slider.RootProvider>
  );
}

test('renders automatic form inputs for explicit thumbs, Thumbs, and RootProvider', () => {
  const { container } = render(
    <form>
      <Slider defaultValue={[40]} name="volume">
        <Slider.Label>Volume</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} />
        </Slider.Control>
      </Slider>
      <Slider defaultValue={[20, 80]} name="range">
        <Slider.Label>Range</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider>
      <ProviderSlider />
    </form>,
  );

  const form = container.querySelector('form')!;
  const inputs = container.querySelectorAll('[data-slot="slider-hidden-input"]');

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

test('synchronizes uncontrolled values with form reset', async () => {
  const changes: number[][] = [];
  const { container } = render(
    <form>
      <Slider
        defaultValue={[40]}
        name="volume"
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
    </form>,
  );

  const form = container.querySelector('form')!;
  const slider = screen.getByRole('slider', { name: 'Volume' });

  fireEvent.focus(slider);
  fireEvent.keyDown(slider, { key: 'ArrowRight' });

  await waitFor(() => expect(changes).toEqual([[41]]));
  await waitFor(() => expect(Array.from(new FormData(form).entries())).toEqual([['volume', '41']]));

  form.reset();

  await waitFor(() => expect(changes).toEqual([[41], [40]]));
  await waitFor(() => expect(Array.from(new FormData(form).entries())).toEqual([['volume', '40']]));
});

test('preserves refs and automatic form inputs with asChild composition', () => {
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
            <span data-testid="slider-thumb" />
          </Slider.Thumb>
        </Slider.Control>
      </div>
    </Slider>,
  );

  expect(ref.current).toBe(screen.getByTestId('slider-root'));
  expect(screen.getByTestId('slider-root')).toHaveAttribute('data-slot', 'slider-root');
  expect(screen.getByTestId('slider-thumb')).toHaveAttribute('data-slot', 'slider-thumb');
  expect(
    screen.getByTestId('slider-thumb').querySelector('[data-slot="slider-hidden-input"]'),
  ).toBeTruthy();
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