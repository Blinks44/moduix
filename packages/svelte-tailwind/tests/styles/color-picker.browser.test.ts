import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import ColorPickerOverride from './ColorPickerOverride.svelte';

test('lets consumer utilities replace component defaults', async () => {
  const { container } = render(ColorPickerOverride);
  const root = container.querySelector('[data-slot="color-picker-root"]')!;

  expect(root.classList.contains('w-80')).toBe(true);
});