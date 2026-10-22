import { LocaleProvider } from '@ark-ui/solid/locale';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal, For } from 'solid-js';
import {
  Slider,
  SliderControl,
  SliderValueText,
  SliderDraggingIndicator,
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

test('preserves keyboard behavior, thumb identity, and read-only/disabled focusability', async () => {
  const changes: number[][] = [];
  const { container } = render(() => (
    <>
      <Slider defaultValue={[40]} onValueChange={(details) => changes.push(details.value)}>
        <SliderLabel>Volume</SliderLabel>
        <SliderParts />
      </Slider>
      <Slider defaultValue={[40]} readOnly onValueChange={(details) => changes.push(details.value)}>
        <SliderLabel>Read-only volume</SliderLabel>
        <SliderParts />
      </Slider>
      <Slider defaultValue={[40]} disabled onValueChange={(details) => changes.push(details.value)}>
        <SliderLabel>Disabled volume</SliderLabel>
        <SliderParts />
      </Slider>
    </>
  ));
  const thumb = container.querySelector('[data-slot="slider-thumb"]')!;
  const slider = page.getByRole('slider', { name: 'Volume', exact: true });
  const readOnlySlider = page.getByRole('slider', { name: 'Read-only volume' });
  const disabledSlider = page.getByRole('slider', { name: 'Disabled volume' });

  await slider.press('ArrowRight');
  await expect.element(slider).toHaveAttribute('aria-valuenow', '41');
  expect(container.querySelector('[data-slot="slider-thumb"]')).toBe(thumb);
  await readOnlySlider.press('ArrowRight');
  await disabledSlider.press('ArrowRight');

  await expect.poll(() => changes).toEqual([[41]]);
  await expect.element(readOnlySlider).toHaveAttribute('tabindex', '0');
  await expect
    .element(page.locator('[data-slot="slider-root"]').filter({ has: readOnlySlider }))
    .toHaveAttribute('data-readonly');
  await expect.element(disabledSlider).not.toHaveAttribute('tabindex');
});

test('reads controlled prop updates without remounting generated thumbs', async () => {
  const changes: number[][] = [];
  const [value, setValue] = createSignal([40]);
  const { container } = render(() => (
    <>
      <Slider
        value={value()}
        aria-label={['Volume']}
        onValueChange={(details) => changes.push(details.value)}
      >
        <SliderParts />
      </Slider>
      <button type="button" onClick={() => setValue([65])}>
        Set to 65
      </button>
    </>
  ));
  const thumb = container.querySelector('[data-slot="slider-thumb"]')!;
  const slider = page.getByRole('slider', { name: 'Volume' });

  await expect.element(slider).toHaveAttribute('aria-valuenow', '40');
  await page.getByRole('button', { name: 'Set to 65' }).click();
  await expect.element(slider).toHaveAttribute('aria-valuenow', '65');
  await slider.press('ArrowRight');

  await expect.poll(() => changes).toEqual([[66]]);
  await expect.element(slider).toHaveAttribute('aria-valuenow', '65');
  expect(container.querySelector('[data-slot="slider-thumb"]')).toBe(thumb);
});

test('preserves native asChild hosts, ref limitations, and explicit input placement', () => {
  let rootRef: HTMLDivElement | undefined;
  const { container } = render(() => (
    <Slider
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} data-testid="slider-root" />}
      defaultValue={[40]}
    >
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

  const root = container.querySelector('[data-testid="slider-root"]')!;
  const thumb = container.querySelector('[data-testid="slider-thumb"]')!;
  expect(root.getAttribute('data-slot')).toBe('slider-root');
  expect(root.tagName).toBe('SECTION');
  expect(thumb.getAttribute('data-slot')).toBe('slider-thumb');
  expect(thumb.tagName).toBe('SPAN');
  expect(root.querySelector('input[hidden]')).not.toBeNull();
  expect(rootRef).toBeUndefined();
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

  expect(rootRef.getAttribute('data-slot')).toBe('slider-root');
  expect(controlRef.getAttribute('data-slot')).toBe('slider-control');
  expect(thumbRef).toBe(document.querySelector('[role="slider"]'));
});

test('preserves active marker state for invalid sliders', async () => {
  render(() => (
    <Slider defaultValue={[40]} invalid>
      <SliderLabel>Volume</SliderLabel>
      <SliderParts />
      <SliderMarkerGroup>
        <SliderMarker value={0}>0</SliderMarker>
        <SliderMarker value={100}>100</SliderMarker>
      </SliderMarkerGroup>
    </Slider>
  ));

  const activeMarker = page.getByText('0', { exact: true });
  await expect.element(page.locator('[data-slot="slider-root"]')).toHaveAttribute('data-invalid');
  await expect.element(activeMarker).toHaveAttribute('data-slot', 'slider-marker');
  await expect.element(activeMarker).toHaveAttribute('data-state', 'under-value');
});

test('uses Tailwind-owned visual defaults and lets consumer utilities win', async () => {
  const { container } = render(() => (
    <Slider defaultValue={[40]} class="w-64">
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

  expect([...root.classList]).toEqual(expect.arrayContaining(['group', 'w-64']));
  expect([...root.classList]).not.toContain('w-full');
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

test('fills the container width by default', () => {
  render(() => (
    <div style={{ width: '20rem' }}>
      <Slider defaultValue={[40]} data-testid="slider-root">
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0} aria-label="Volume">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </Slider>
    </div>
  ));

  expect(screen.getByTestId('slider-root').offsetWidth).toBe(320);
});

function rect(selector: string, root: ParentNode = document) {
  return root.querySelector(selector)!.getBoundingClientRect();
}

function markerDotCenter(marker: Element) {
  const dot = getComputedStyle(marker, '::before');
  const translateX = new DOMMatrix(dot.transform === 'none' ? undefined : dot.transform).m41;

  return parseFloat(dot.left) + parseFloat(dot.marginLeft) + parseFloat(dot.width) / 2 + translateX;
}

function pressThumb(thumb: Element) {
  const box = thumb.getBoundingClientRect();
  thumb.dispatchEvent(
    new PointerEvent('pointerdown', {
      bubbles: true,
      button: 0,
      clientX: box.left + box.width / 2,
      clientY: box.top + box.height / 2,
      isPrimary: true,
      pointerId: 1,
    }),
  );
}

test('places label and value text on one row above the control', () => {
  render(() => (
    <div style={{ width: '20rem' }}>
      <Slider defaultValue={[40]}>
        <SliderLabel>Volume</SliderLabel>
        <SliderValueText />
        <SliderParts />
      </Slider>
    </div>
  ));

  const root = rect('[data-slot="slider-root"]');
  const label = rect('[data-slot="slider-label"]');
  const valueText = rect('[data-slot="slider-value-text"]');
  const control = rect('[data-slot="slider-control"]');

  expect(valueText.top).toBe(label.top);
  expect(Math.abs(valueText.right - root.right)).toBeLessThanOrEqual(1);
  expect(control.top).toBeGreaterThanOrEqual(label.bottom);
  expect(control.width).toBe(root.width);
});

test('reserves room for marker labels and centers marker dots in RTL', () => {
  const { container } = render(() => (
    <LocaleProvider locale="ar">
      <div style={{ width: '20rem' }}>
        <Slider defaultValue={[40]}>
          <SliderParts />
          <SliderMarkerGroup>
            <SliderMarker value={50}>50</SliderMarker>
          </SliderMarkerGroup>
        </Slider>
        <p>After</p>
      </div>
    </LocaleProvider>
  ));

  const marker = container.querySelector('[data-slot="slider-marker"]')!;

  expect(marker.getAttribute('dir')).toBe('rtl');
  expect(rect('p', container).top).toBeGreaterThanOrEqual(marker.getBoundingClientRect().bottom);
  expect(Math.abs(markerDotCenter(marker) - marker.clientWidth / 2)).toBeLessThanOrEqual(0.5);
});

test('keeps the dragging indicator next to the thumb in both orientations', async () => {
  const { container } = render(() => (
    <For each={['horizontal', 'vertical'] as const}>
      {(orientation) => (
        <Slider defaultValue={[40]} orientation={orientation}>
          <SliderControl>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb index={0} aria-label={orientation}>
              <SliderDraggingIndicator>40</SliderDraggingIndicator>
            </SliderThumb>
          </SliderControl>
        </Slider>
      )}
    </For>
  ));
  const [horizontal, vertical] = container.querySelectorAll('[data-slot="slider-root"]');

  pressThumb(horizontal!.querySelector('[data-slot="slider-thumb"]')!);
  pressThumb(vertical!.querySelector('[data-slot="slider-thumb"]')!);
  await expect
    .poll(() => container.querySelectorAll('[data-slot="slider-dragging-indicator"]:not([hidden])'))
    .toHaveLength(2);

  const horizontalThumb = rect('[data-slot="slider-thumb"]', horizontal!);
  const horizontalIndicator = rect('[data-slot="slider-dragging-indicator"]', horizontal!);
  const verticalThumb = rect('[data-slot="slider-thumb"]', vertical!);
  const verticalIndicator = rect('[data-slot="slider-dragging-indicator"]', vertical!);

  expect(horizontalIndicator.bottom).toBeLessThanOrEqual(horizontalThumb.top);
  expect(verticalIndicator.left).toBeGreaterThanOrEqual(verticalThumb.right);
  expect(verticalIndicator.height).toBe(horizontalIndicator.height);
  expect(
    Math.abs(
      verticalIndicator.top +
        verticalIndicator.height / 2 -
        (verticalThumb.top + verticalThumb.height / 2),
    ),
  ).toBeLessThanOrEqual(1);
});