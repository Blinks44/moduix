import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AngleSlider, useAngleSlider } from '../src';

function ProviderAngleSlider() {
  const angleSlider = useAngleSlider({ defaultValue: 45, name: 'provider-rotation' });

  return (
    <AngleSlider.RootProvider value={angleSlider}>
      <AngleSlider.Dial />
    </AngleSlider.RootProvider>
  );
}

test('renders its hidden input for root and RootProvider form participation', () => {
  const { container } = render(
    <form>
      <AngleSlider defaultValue={135} name="rotation" aria-label="Rotation">
        <AngleSlider.Dial />
      </AngleSlider>
      <ProviderAngleSlider />
    </form>,
  );

  const inputs = container.querySelectorAll<HTMLInputElement>(
    '[data-slot="angle-slider-hidden-input"]',
  );

  expect(inputs).toHaveLength(2);
  expect(inputs[0]).toHaveValue('135');
  expect(inputs[1]).toHaveValue('45');
  expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([
    ['rotation', '135'],
    ['provider-rotation', '45'],
  ]);
});

test('preserves Ark keyboard behavior and disabled state', async () => {
  const values: number[] = [];

  render(
    <>
      <AngleSlider aria-label="Rotation" onValueChange={(details) => values.push(details.value)}>
        <AngleSlider.Dial />
      </AngleSlider>
      <AngleSlider
        disabled
        aria-label="Disabled rotation"
        onValueChange={(details) => values.push(details.value)}
      >
        <AngleSlider.Dial />
      </AngleSlider>
    </>,
  );

  const slider = screen.getByRole('slider', { name: 'Rotation' });
  const disabledSlider = screen.getByRole('slider', { name: 'Disabled rotation' });

  fireEvent.focus(slider);
  fireEvent.keyDown(slider, { key: 'ArrowRight' });
  fireEvent.keyDown(disabledSlider, { key: 'ArrowRight' });

  await waitFor(() => expect(values).toEqual([1]));
});