import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { ColorPicker, parseColor, ColorPickerControl, ColorPickerTrigger } from '@/index';

test('lets consumer utilities replace component defaults', async () => {
  const { container } = render(
    <ColorPicker className="w-80" defaultValue={parseColor('#eb5e41')}>
      <ColorPickerControl>
        <ColorPickerTrigger aria-label="Open color picker" />
      </ColorPickerControl>
    </ColorPicker>,
  );

  const root = container.querySelector('[data-slot="color-picker-root"]')!;

  expect(root!.classList.contains('w-80')).toBe(true);
});