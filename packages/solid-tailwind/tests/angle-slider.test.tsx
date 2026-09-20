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
    <AngleSlider.RootProvider value={angleSlider}>
      <AngleSlider.Dial />
      <AngleSlider.HiddenInput form="angle-form" />
    </AngleSlider.RootProvider>
  );
}

test('submits through explicit hidden inputs for root and RootProvider composition', () => {
  const { container } = render(() => (
    <>
      <form id="angle-form" />
      <AngleSlider defaultValue={135} name="rotation" aria-label="Rotation">
        <AngleSlider.Dial />
        <AngleSlider.HiddenInput form="angle-form" />
      </AngleSlider>
      <ProviderAngleSlider />
    </>
  ));

  const inputs = container.querySelectorAll<HTMLInputElement>('input[type="hidden"]');

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

test('preserves asChild composition, slots, and explicit input placement', () => {
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
      <AngleSlider.HiddenInput />
    </AngleSlider>
  ));

  const root = container.querySelector('section');

  expect(root).toHaveAttribute('data-slot', 'angle-slider-root');
  expect(controlRef).toHaveAttribute('data-slot', 'angle-slider-control');
  expect(thumbRef).toBe(screen.getByRole('slider', { name: 'Direction' }));
  expect(root?.querySelector('input[type="hidden"]')).toBeTruthy();
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

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <AngleSlider class="gap-0" aria-label="Rotation">
      <AngleSlider.Dial />
    </AngleSlider>
  ));

  const root = screen
    .getByRole('slider', { name: 'Rotation' })
    .closest('[data-slot="angle-slider-root"]');
  expect(root).toHaveClass('gap-0');
  expect(root).not.toHaveClass('gap-3');
});

test('draws the circular track with a masked conic fill', () => {
  render(() => (
    <AngleSlider aria-label="Rotation">
      <AngleSlider.Dial />
    </AngleSlider>
  ));

  const control = screen.getByRole('slider', { name: 'Rotation' }).parentElement;

  expect(control).toHaveClass(
    'before:bg-[conic-gradient(from_0deg,var(--angle-slider-fill)_var(--angle,0deg),var(--color-muted)_var(--angle,0deg))]',
  );
  expect(control).toHaveClass(
    'before:[mask-image:radial-gradient(closest-side,transparent_calc(100%-0.5rem-1px),#000_calc(100%-0.5rem))]',
  );
  expect(control).toHaveClass('data-invalid:[--angle-slider-fill:var(--color-destructive)]');
});

test('mirrors the slider dragging ring through the pressed control state', () => {
  render(() => (
    <AngleSlider defaultValue={135} aria-label="Rotation">
      <AngleSlider.Dial />
    </AngleSlider>
  ));

  const thumb = screen.getByRole('slider', { name: 'Rotation' });

  expect(thumb).toHaveClass('before:-translate-x-1/2');
  expect(thumb).toHaveClass('before:-translate-y-1/2');
  expect(thumb).toHaveClass(
    '[[data-slot=angle-slider-control]:active:not([data-disabled]):not([data-readonly])_&]:before:border-ring',
  );
  expect(thumb).toHaveClass(
    '[[data-slot=angle-slider-control]:active:not([data-disabled]):not([data-readonly])_&]:before:shadow-md',
  );
});

test('focuses the thumb synchronously on left pointer down and respects prevented and non-interactive states', () => {
  const preventPointerDown = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const { container } = render(() => (
    <AngleSlider defaultValue={45} aria-label="Rotation">
      <AngleSlider.Dial />
    </AngleSlider>
  ));
  const thumb = screen.getByRole('slider', { name: 'Rotation' });

  fireEvent.pointerDown(container.querySelector('[data-slot="angle-slider-control"]')!, {
    button: 0,
  });
  expect(thumb).toHaveFocus();

  const prevented = render(() => (
    <AngleSlider defaultValue={45} aria-label="Prevented rotation">
      <AngleSlider.Dial onPointerDown={preventPointerDown} />
    </AngleSlider>
  ));
  fireEvent.pointerDown(prevented.container.querySelector('[data-slot="angle-slider-control"]')!, {
    button: 0,
  });
  expect(screen.getByRole('slider', { name: 'Prevented rotation' })).not.toHaveFocus();

  const disabled = render(() => (
    <AngleSlider defaultValue={45} aria-label="Disabled rotation" disabled>
      <AngleSlider.Dial />
    </AngleSlider>
  ));
  fireEvent.pointerDown(disabled.container.querySelector('[data-slot="angle-slider-control"]')!, {
    button: 0,
  });
  expect(screen.getByRole('slider', { name: 'Disabled rotation' })).not.toHaveFocus();
});