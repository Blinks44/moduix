import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
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
  const { container } = render(() => (
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
    </form>
  ));

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

  render(() => (
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
      <Slider.Control>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider>
  ));

  const thumb = screen.getByRole('slider');

  thumb.focus();
  fireEvent.focusIn(thumb);
  fireEvent.keyDown(thumb, { key: 'ArrowRight' });

  await waitFor(() => expect(thumb).toHaveAttribute('aria-valuenow', '41'));
  expect(screen.getByRole('slider')).toBe(thumb);
});

test('synchronizes uncontrolled values with form reset', async () => {
  const changes: number[][] = [];
  const { container } = render(() => (
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
    </form>
  ));

  const form = container.querySelector('form')!;
  const slider = screen.getByRole('slider', { name: 'Volume' });

  slider.focus();
  fireEvent.focusIn(slider);
  fireEvent.keyDown(slider, { key: 'ArrowRight' });

  await waitFor(() => expect(changes).toEqual([[41]]));
  await waitFor(() => expect(Array.from(new FormData(form).entries())).toEqual([['volume', '41']]));

  fireEvent.reset(form);

  await waitFor(() => expect(changes).toEqual([[41], [40]]));
  await waitFor(() => expect(Array.from(new FormData(form).entries())).toEqual([['volume', '40']]));
});

test('synchronizes range values with form reset once', async () => {
  const changes: number[][] = [];
  const { container } = render(() => (
    <form>
      <Slider
        defaultValue={[40, 60]}
        name="range"
        onValueChange={(details) => changes.push(details.value)}
      >
        <Slider.Label>Range</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider>
    </form>
  ));

  const form = container.querySelector('form')!;
  const firstThumb = screen.getAllByRole('slider')[0];

  firstThumb.focus();
  fireEvent.focusIn(firstThumb);
  fireEvent.keyDown(firstThumb, { key: 'ArrowRight' });

  await waitFor(() => expect(changes).toEqual([[41, 60]]));

  fireEvent.reset(form);

  await waitFor(() =>
    expect(changes).toEqual([
      [41, 60],
      [40, 60],
    ]),
  );
  await waitFor(() =>
    expect(Array.from(new FormData(form).entries())).toEqual([
      ['range[]', '40'],
      ['range[]', '60'],
    ]),
  );
});

test('preserves asChild composition, slots, and automatic form input placement', () => {
  const { container } = render(() => (
    <Slider asChild={(props) => <div {...props()} data-testid="slider-root" />} defaultValue={[40]}>
      <Slider.Label>Volume</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb
          asChild={(props) => <span {...props()} data-testid="slider-thumb" />}
          index={0}
          aria-label="Volume"
        />
      </Slider.Control>
    </Slider>
  ));

  expect(screen.getByTestId('slider-root')).toHaveAttribute('data-slot', 'slider-root');
  expect(screen.getByTestId('slider-thumb')).toHaveAttribute('data-slot', 'slider-thumb');
  expect(
    container.querySelector('[data-testid="slider-thumb"] [data-slot="slider-hidden-input"]'),
  ).toBeTruthy();
});

test('forwards refs through ordinary Ark Solid part paths', () => {
  let rootRef!: HTMLDivElement;
  let controlRef!: HTMLDivElement;
  let thumbRef!: HTMLDivElement;

  render(() => (
    <Slider ref={(element) => (rootRef = element)} defaultValue={[40]} aria-label={['Volume']}>
      <Slider.Control ref={(element) => (controlRef = element)}>
        <Slider.Thumb ref={(element) => (thumbRef = element)} index={0} />
      </Slider.Control>
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
      <Slider.Thumb index={0} />
    </Slider>
  ));

  expect(rootRef).toBeUndefined();
});

test('preserves active marker state for invalid sliders', () => {
  const { container } = render(() => (
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
    </Slider>
  ));

  const activeMarker = screen.getByText('0');

  expect(container.querySelector('[data-slot="slider-root"]')).toHaveAttribute('data-invalid');
  expect(activeMarker).toHaveAttribute('data-slot', 'slider-marker');
  expect(activeMarker).toHaveAttribute('data-state', 'under-value');
});