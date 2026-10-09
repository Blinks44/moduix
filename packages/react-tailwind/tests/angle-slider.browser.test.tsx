import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
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

test('submits through explicit hidden inputs for root and RootProvider composition', () => {
  const { container } = render(
    <>
      <form id="angle-form" />
      <AngleSlider defaultValue={135} name="rotation" aria-label="Rotation">
        <AngleSliderDial />
        <AngleSliderHiddenInput form="angle-form" />
      </AngleSlider>
      <ProviderAngleSlider />
    </>,
  );

  const inputs = container.querySelectorAll<HTMLInputElement>('input[type="hidden"]');

  expect(inputs).toHaveLength(2);
  expect(inputs[0].getAttribute('form')).toBe('angle-form');
  expect(inputs[1].getAttribute('form')).toBe('angle-form');
  expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([
    ['rotation', '135'],
    ['provider-rotation', '45'],
  ]);
});

test('preserves asChild composition, slots, refs, and explicit input placement', async () => {
  const rootRef = createRef<HTMLDivElement>();
  const controlRef = createRef<HTMLDivElement>();
  const thumbRef = createRef<HTMLDivElement>();

  const { container } = render(
    <AngleSlider asChild ref={rootRef} defaultValue={90} aria-label="Direction">
      <section>
        <AngleSliderControl ref={controlRef}>
          <AngleSliderMarks values={[0, 90, 90, 180]} />
          <AngleSliderThumb ref={thumbRef} />
        </AngleSliderControl>
        <AngleSliderHiddenInput />
      </section>
    </AngleSlider>,
  );

  expect(rootRef.current).toBe(container.querySelector('section'));
  expect(rootRef.current?.getAttribute('data-slot')).toBe('angle-slider-root');
  expect(controlRef.current?.getAttribute('data-slot')).toBe('angle-slider-control');
  expect(thumbRef.current).toBe(container.querySelector('[role="slider"]'));
  expect(rootRef.current?.querySelector('input[type="hidden"]')).toBeTruthy();
  expect(container.querySelectorAll('[data-slot="angle-slider-marker"]')).toHaveLength(4);
  await expect.element(page.getByRole('slider', { name: 'Direction' })).toHaveCount(1);
});

test('preserves Ark callback details, keyboard behavior, and non-interactive states', async () => {
  const changes: unknown[] = [];

  render(
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
    </>,
  );

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

test('preserves Tailwind overrides, masked fill, and pressed thumb styling', async () => {
  const { container } = render(
    <AngleSlider className="gap-0" defaultValue={135} invalid aria-label="Rotation">
      <AngleSliderDial />
    </AngleSlider>,
  );
  const root = container.querySelector('[data-slot="angle-slider-root"]')!;
  const control = container.querySelector('[data-slot="angle-slider-control"]')!;
  const thumb = container.querySelector('[role="slider"]')!;
  await expect.element(page.locator('[data-slot="angle-slider-root"]')).toHaveCSS('gap', '0px');
  expect(root.classList.contains('gap-0')).toBe(true);
  expect(root.classList.contains('gap-3')).toBe(false);
  const track = getComputedStyle(control, '::before');
  expect(track.backgroundImage).toContain('conic-gradient');
  expect(track.backgroundImage).toContain('135deg');
  expect(track.maskImage).toContain('radial-gradient');
  expect(track.maskImage).toContain('calc(100% - 9px)');
  expect(track.maskImage).toContain('calc(100% - 8px)');
  const controlStyle = getComputedStyle(control);
  expect(controlStyle.getPropertyValue('--angle-slider-fill').trim()).toBe(
    controlStyle.getPropertyValue('--color-destructive').trim(),
  );
  expect(getComputedStyle(thumb, '::before').translate).toBe('-50% -50%');
  for (const token of [
    '[[data-slot=angle-slider-control]:active:not([data-disabled]):not([data-readonly])_&]:before:border-ring',
    '[[data-slot=angle-slider-control]:active:not([data-disabled]):not([data-readonly])_&]:before:shadow-md',
  ])
    expect(thumb.classList.contains(token)).toBe(true);
});

test('focuses synchronously unless pointerdown is prevented, disabled, or read-only', async () => {
  const states = ['default', 'prevented', 'disabled', 'read-only'];
  const { container } = render(
    <>
      {states.map((state) => (
        <AngleSlider
          key={state}
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
    </>,
  );
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