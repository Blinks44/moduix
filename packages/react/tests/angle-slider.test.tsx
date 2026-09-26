import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
        <AngleSliderControl ref={controlRef}>
          <AngleSliderMarks values={[0, 90, 90, 180]} />
          <AngleSliderThumb ref={thumbRef} />
        </AngleSliderControl>
        <AngleSliderHiddenInput />
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

test('focuses the thumb synchronously on left pointer down and respects prevented and non-interactive states', () => {
  const preventPointerDown = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const { container, rerender } = render(
    <AngleSlider defaultValue={45} aria-label="Rotation">
      <AngleSliderDial />
    </AngleSlider>,
  );
  const thumb = screen.getByRole('slider', { name: 'Rotation' });

  fireEvent.pointerDown(container.querySelector('[data-slot="angle-slider-control"]')!, {
    button: 0,
  });
  expect(thumb).toHaveFocus();

  thumb.blur();
  rerender(
    <AngleSlider defaultValue={45} aria-label="Rotation">
      <AngleSliderDial onPointerDown={preventPointerDown} />
    </AngleSlider>,
  );
  fireEvent.pointerDown(container.querySelector('[data-slot="angle-slider-control"]')!, {
    button: 0,
  });
  expect(thumb).not.toHaveFocus();

  const { container: disabledContainer } = render(
    <AngleSlider defaultValue={45} aria-label="Disabled rotation" disabled>
      <AngleSliderDial />
    </AngleSlider>,
  );
  fireEvent.pointerDown(disabledContainer.querySelector('[data-slot="angle-slider-control"]')!, {
    button: 0,
  });
  expect(screen.getByRole('slider', { name: 'Disabled rotation' })).not.toHaveFocus();
});