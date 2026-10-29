import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Separator } from '@/index';

test('applies the public defaults and direct styling props', async () => {
  let rootRef: HTMLSpanElement | undefined;
  render(() => (
    <Separator
      ref={(element) => (rootRef = element)}
      data-testid="separator"
      class="custom-separator"
      style={{ color: 'red' }}
    />
  ));

  await expect.element(page.getByTestId('separator')).toHaveCount(1);
  const separator = screen.getByTestId('separator');
  expect(rootRef).toBe(separator);

  expect(separator.getAttribute('role')).toBe('separator');
  expect(separator.getAttribute('aria-orientation')).toBe('horizontal');
  expect(separator.dataset).toMatchObject({
    orientation: 'horizontal',
    size: 'sm',
    variant: 'solid',
  });
  expect(separator.classList.contains('custom-separator')).toBe(true);
  expect(separator.style).toMatchObject({ color: 'red' });
});