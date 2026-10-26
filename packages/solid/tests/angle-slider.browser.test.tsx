import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import {
  AngleSlider,
  AngleSliderControl,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderMarks,
  AngleSliderRootProvider,
  AngleSliderThumb,
  useAngleSlider,
} from '../src';

function ProviderAngleSlider() {
  const angleSlider = useAngleSlider({
    defaultValue: 45,
    name: 'provider-rotation',
    'aria-label': 'Provider rotation',
  });

  return (
    <AngleSliderRootProvider value={angleSlider}>
      <AngleSliderDial />
      <AngleSliderHiddenInput form="angle-form" />
    </AngleSliderRootProvider>
  );
}

test.each([false, true])('supports bound pointer handlers (prevented=%s)', async (prevented) => {
  const payload = { action: 'rotate' };
  const calls: unknown[] = [];
  const { container } = render(() => (
    <AngleSlider aria-label="Rotation">
      <AngleSliderDial
        onPointerDown={[
          (data, event) => {
            calls.push(data, event.currentTarget);
            if (prevented) event.preventDefault();
          },
          payload,
        ]}
      />
    </AngleSlider>
  ));
  const control = container.querySelector('[data-slot="angle-slider-control"]')!;
  await expect.element(page.locator('[data-slot="angle-slider-control"]')).toBeVisible();
  control.dispatchEvent(
    new PointerEvent('pointerdown', { bubbles: true, cancelable: true, button: 0 }),
  );
  expect(calls).toEqual([payload, control]);
  expect(container.querySelector('[role="slider"]') === document.activeElement).toBe(!prevented);
});

test('submits through explicit hidden inputs for root and RootProvider composition', () => {
  const { container } = render(() => (
    <>
      <form id="angle-form" />
      <AngleSlider defaultValue={135} name="rotation" aria-label="Rotation">
        <AngleSliderDial />
        <AngleSliderHiddenInput form="angle-form" />
      </AngleSlider>
      <ProviderAngleSlider />
    </>
  ));

  const inputs = container.querySelectorAll<HTMLInputElement>('input[type="hidden"]');

  expect(inputs).toHaveLength(2);
  expect(inputs[0].getAttribute('form')).toBe('angle-form');
  expect(inputs[1].getAttribute('form')).toBe('angle-form');
  expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([
    ['rotation', '135'],
    ['provider-rotation', '45'],
  ]);
});

test('preserves asChild composition, slots, and explicit input placement', async () => {
  let rootRef: HTMLDivElement | undefined;
  let controlRef!: HTMLDivElement;
  let thumbRef!: HTMLDivElement;

  const { container } = render(() => (
    <AngleSlider
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} />}
      defaultValue={90}
      aria-label="Direction"
    >
      <AngleSliderControl ref={(element) => (controlRef = element)}>
        <AngleSliderMarks values={[0, 90, 90, 180]} />
        <AngleSliderThumb ref={(element) => (thumbRef = element)} />
      </AngleSliderControl>
      <AngleSliderHiddenInput />
    </AngleSlider>
  ));

  const root = container.querySelector('section')!;

  expect(root?.getAttribute('data-slot')).toBe('angle-slider-root');
  expect(controlRef?.getAttribute('data-slot')).toBe('angle-slider-control');
  expect(thumbRef).toBe(container.querySelector('[role="slider"]'));
  expect(root?.querySelector('input[type="hidden"]')).toBeTruthy();
  expect(container.querySelectorAll('[data-slot="angle-slider-marker"]')).toHaveLength(4);
  expect(rootRef).toBeUndefined();
  await expect.element(page.getByRole('slider', { name: 'Direction' })).toHaveCount(1);
});

test('forwards refs through ordinary Ark Solid part paths', async () => {
  let rootRef!: HTMLDivElement;
  let controlRef!: HTMLDivElement;
  let thumbRef!: HTMLDivElement;

  const { container } = render(() => (
    <AngleSlider ref={(element) => (rootRef = element)} defaultValue={90} aria-label="Direction">
      <AngleSliderControl ref={(element) => (controlRef = element)}>
        <AngleSliderThumb ref={(element) => (thumbRef = element)} />
      </AngleSliderControl>
    </AngleSlider>
  ));

  expect(rootRef).toBe(container.querySelector('[data-slot="angle-slider-root"]'));
  expect(controlRef).toBe(container.querySelector('[data-slot="angle-slider-control"]'));
  expect(thumbRef).toBe(container.querySelector('[role="slider"]'));
  await expect.element(page.getByRole('slider', { name: 'Direction' })).toHaveCount(1);
});

test('preserves Ark callback details, keyboard behavior, and non-interactive states', async () => {
  const changes: unknown[] = [];

  render(() => (
    <>
      <AngleSlider aria-label="Rotation" onValueChange={(details) => changes.push(details)}>
        <AngleSliderDial />
      </AngleSlider>
      <AngleSlider
        readOnly
        aria-label="Read-only rotation"
        onValueChange={(details) => changes.push(details)}
      >
        <AngleSliderDial />
      </AngleSlider>
      <AngleSlider
        disabled
        aria-label="Disabled rotation"
        onValueChange={(details) => changes.push(details)}
      >
        <AngleSliderDial />
      </AngleSlider>
    </>
  ));

  const slider = page.getByRole('slider', { name: 'Rotation', exact: true });
  const readOnlySlider = page.getByRole('slider', { name: 'Read-only rotation' });
  const disabledSlider = page.getByRole('slider', { name: 'Disabled rotation' });
  await slider.focus();
  await slider.press('ArrowRight');
  await readOnlySlider.focus();
  await readOnlySlider.press('ArrowRight');
  await disabledSlider.press('ArrowRight');
  await expect
    .poll(() => changes)
    .toEqual([expect.objectContaining({ value: 1, valueAsDegree: '1deg' })]);
  await expect.element(readOnlySlider).toHaveAttribute('tabindex', '0');
  await expect.element(readOnlySlider).toHaveAttribute('data-readonly');
  await expect.element(readOnlySlider).toBeFocused();
  await expect.element(disabledSlider).not.toHaveAttribute('tabindex');
});

test('focuses synchronously unless pointerdown is prevented, disabled, or read-only', async () => {
  const states = ['default', 'prevented', 'disabled', 'read-only'];
  const { container } = render(() => (
    <>
      {states.map((state) => (
        <AngleSlider
          defaultValue={45}
          aria-label={state}
          disabled={state === 'disabled'}
          readOnly={state === 'read-only'}
        >
          <AngleSliderDial
            onPointerDown={(event) => {
              if (state === 'prevented') event.preventDefault();
            }}
          />
        </AngleSlider>
      ))}
    </>
  ));
  await expect
    .element(page.locator('[data-slot="angle-slider-control"]'))
    .toHaveCount(states.length);
  for (const [index, control] of [
    ...container.querySelectorAll('[data-slot="angle-slider-control"]'),
  ].entries()) {
    control.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, cancelable: true, button: 0 }),
    );
    expect(document.activeElement === control.querySelector('[role="slider"]')).toBe(
      states[index] === 'default',
    );
  }
});