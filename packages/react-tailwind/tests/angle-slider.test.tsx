import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
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
  const { container } = render(
    <>
      <form id="angle-form" />
      <AngleSlider defaultValue={135} name="rotation" aria-label="Rotation">
        <AngleSlider.Dial />
        <AngleSlider.HiddenInput form="angle-form" />
      </AngleSlider>
      <ProviderAngleSlider />
    </>,
  );

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

test('preserves asChild composition, slots, refs, and explicit input placement', () => {
  const rootRef = createRef<HTMLDivElement>();
  const controlRef = createRef<HTMLDivElement>();
  const thumbRef = createRef<HTMLDivElement>();

  const { container } = render(
    <AngleSlider asChild ref={rootRef} defaultValue={90} aria-label="Direction">
      <section>
        <AngleSlider.Control ref={controlRef}>
          <AngleSlider.Marks values={[0, 90, 90, 180]} />
          <AngleSlider.Thumb ref={thumbRef} />
        </AngleSlider.Control>
        <AngleSlider.HiddenInput />
      </section>
    </AngleSlider>,
  );

  expect(rootRef.current).toBe(container.querySelector('section'));
  expect(rootRef.current).toHaveAttribute('data-slot', 'angle-slider-root');
  expect(controlRef.current).toHaveAttribute('data-slot', 'angle-slider-control');
  expect(thumbRef.current).toBe(screen.getByRole('slider', { name: 'Direction' }));
  expect(rootRef.current?.querySelector('input[type="hidden"]')).toBeTruthy();
  expect(container.querySelectorAll('[data-slot="angle-slider-marker"]')).toHaveLength(4);
});

test('preserves Ark callback details, keyboard behavior, and non-interactive states', async () => {
  const changes: unknown[] = [];

  render(
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
    </>,
  );

  const slider = screen.getByRole('slider', { name: 'Rotation' });
  const readOnlySlider = screen.getByRole('slider', { name: 'Read-only rotation' });
  const disabledSlider = screen.getByRole('slider', { name: 'Disabled rotation' });

  fireEvent.focus(slider);
  fireEvent.keyDown(slider, { key: 'ArrowRight' });
  fireEvent.focus(readOnlySlider);
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
  render(
    <AngleSlider className="gap-0" aria-label="Rotation">
      <AngleSlider.Dial />
    </AngleSlider>,
  );

  const root = screen
    .getByRole('slider', { name: 'Rotation' })
    .closest('[data-slot="angle-slider-root"]');
  expect(root).toHaveClass('gap-0');
  expect(root?.className).not.toContain('gap-[var(--moduix-angle-slider-gap');
});

test('keeps the thumb centered when the active state scales it', () => {
  render(
    <AngleSlider defaultValue={135} aria-label="Rotation">
      <AngleSlider.Dial />
    </AngleSlider>,
  );

  const thumb = screen.getByRole('slider', { name: 'Rotation' });

  expect(thumb).toHaveClass('before:[transform:translateX(-50%)]');
  expect(thumb).not.toHaveClass('before:-translate-x-1/2');
});