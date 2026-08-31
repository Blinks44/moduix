import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { AngleSlider, useAngleSlider } from '../src';

function ProviderAngleSlider() {
  const angleSlider = useAngleSlider({
    defaultValue: 45,
    name: 'provider-rotation',
    'aria-label': 'Provider rotation',
  });

  return (
    <AngleSlider.RootProvider value={angleSlider} form="angle-form">
      <AngleSlider.Dial />
    </AngleSlider.RootProvider>
  );
}

test('renders its hidden input for root and RootProvider form participation', () => {
  const { container } = render(() => (
    <>
      <form id="angle-form" />
      <AngleSlider defaultValue={135} name="rotation" form="angle-form" aria-label="Rotation">
        <AngleSlider.Dial />
      </AngleSlider>
      <ProviderAngleSlider />
    </>
  ));

  const inputs = container.querySelectorAll<HTMLInputElement>(
    '[data-slot="angle-slider-hidden-input"]',
  );

  expect(inputs).toHaveLength(2);
  expect(inputs[0]).toHaveValue('135');
  expect(inputs[1]).toHaveValue('45');
  expect(inputs[0]).toHaveAttribute('form', 'angle-form');
  expect(inputs[1]).toHaveAttribute('form', 'angle-form');
  expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([
    ['rotation', '135'],
    ['provider-rotation', '45'],
  ]);
});

test('preserves asChild composition, slots, and automatic form input placement', () => {
  let controlRef!: HTMLDivElement;
  let thumbRef!: HTMLDivElement;

  const { container } = render(() => (
    <AngleSlider
      asChild={(props) => <section {...props()} />}
      defaultValue={90}
      aria-label="Direction"
    >
      <AngleSlider.Control ref={(element) => (controlRef = element)}>
        <AngleSlider.Marks values={[0, 90, 90, 180]} />
        <AngleSlider.Thumb ref={(element) => (thumbRef = element)} />
      </AngleSlider.Control>
    </AngleSlider>
  ));

  const root = container.querySelector('section');

  expect(root).toHaveAttribute('data-slot', 'angle-slider-root');
  expect(controlRef).toHaveAttribute('data-slot', 'angle-slider-control');
  expect(thumbRef).toBe(screen.getByRole('slider', { name: 'Direction' }));
  expect(root?.querySelector('[data-slot="angle-slider-hidden-input"]')).toBeTruthy();
  expect(container.querySelectorAll('[data-slot="angle-slider-marker"]')).toHaveLength(4);
});

test('forwards refs through ordinary Ark Solid part paths', () => {
  let rootRef!: HTMLDivElement;
  let controlRef!: HTMLDivElement;
  let thumbRef!: HTMLDivElement;

  render(() => (
    <AngleSlider ref={(element) => (rootRef = element)} defaultValue={90} aria-label="Direction">
      <AngleSlider.Control ref={(element) => (controlRef = element)}>
        <AngleSlider.Thumb ref={(element) => (thumbRef = element)} />
      </AngleSlider.Control>
    </AngleSlider>
  ));

  expect(rootRef).toHaveAttribute('data-slot', 'angle-slider-root');
  expect(controlRef).toHaveAttribute('data-slot', 'angle-slider-control');
  expect(thumbRef).toBe(screen.getByRole('slider', { name: 'Direction' }));
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLDivElement | undefined;

  render(() => (
    <AngleSlider
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} />}
      aria-label="Direction"
    >
      <AngleSlider.Dial />
    </AngleSlider>
  ));

  expect(rootRef).toBeUndefined();
});

test('synchronizes uncontrolled state with native form reset', async () => {
  const { container } = render(() => (
    <form id="angle-form">
      <AngleSlider defaultValue={135} name="rotation" aria-label="Rotation">
        <AngleSlider.Dial />
      </AngleSlider>
      <ProviderAngleSlider />
    </form>
  ));

  const form = container.querySelector('form')!;
  const slider = screen.getByRole('slider', { name: 'Rotation' });
  const providerSlider = screen.getByRole('slider', { name: 'Provider rotation' });

  slider.focus();
  fireEvent.focusIn(slider);
  fireEvent.keyDown(slider, { key: 'ArrowRight' });
  providerSlider.focus();
  fireEvent.focusIn(providerSlider);
  fireEvent.keyDown(providerSlider, { key: 'ArrowRight' });
  await waitFor(() => expect(slider).toHaveAttribute('aria-valuenow', '136'));
  expect(providerSlider).toHaveAttribute('aria-valuenow', '46');

  fireEvent.reset(form);
  await waitFor(() => expect(slider).toHaveAttribute('aria-valuenow', '135'));
  expect(providerSlider).toHaveAttribute('aria-valuenow', '45');
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['rotation', '135'],
    ['provider-rotation', '45'],
  ]);
});

test('preserves Ark callback details, keyboard behavior, and non-interactive states', async () => {
  const changes: unknown[] = [];

  render(() => (
    <>
      <AngleSlider aria-label="Rotation" onValueChange={(details) => changes.push(details)}>
        <AngleSlider.Dial />
      </AngleSlider>
      <AngleSlider
        readOnly
        aria-label="Read-only rotation"
        onValueChange={(details) => changes.push(details)}
      >
        <AngleSlider.Dial />
      </AngleSlider>
      <AngleSlider
        disabled
        aria-label="Disabled rotation"
        onValueChange={(details) => changes.push(details)}
      >
        <AngleSlider.Dial />
      </AngleSlider>
    </>
  ));

  const slider = screen.getByRole('slider', { name: 'Rotation' });
  const readOnlySlider = screen.getByRole('slider', { name: 'Read-only rotation' });
  const disabledSlider = screen.getByRole('slider', { name: 'Disabled rotation' });

  slider.focus();
  fireEvent.focusIn(slider);
  fireEvent.keyDown(slider, { key: 'ArrowRight' });
  readOnlySlider.focus();
  fireEvent.focusIn(readOnlySlider);
  fireEvent.keyDown(readOnlySlider, { key: 'ArrowRight' });
  fireEvent.keyDown(disabledSlider, { key: 'ArrowRight' });

  await waitFor(() =>
    expect(changes).toEqual([expect.objectContaining({ value: 1, valueAsDegree: '1deg' })]),
  );
  expect(readOnlySlider).toHaveAttribute('tabindex', '0');
  expect(readOnlySlider).toHaveAttribute('data-readonly');
  expect(disabledSlider).not.toHaveAttribute('tabindex');
});