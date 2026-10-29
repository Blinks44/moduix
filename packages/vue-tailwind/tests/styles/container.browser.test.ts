import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { Container } from '@/index';

test('lets consumer Tailwind utilities override conflicting defaults', () => {
  render({
    components: { Container },
    template: '<Container data-testid="container" class="w-1/2 max-w-sm px-2" />',
  });
  const container = screen.getByTestId('container');

  expect([...container.classList]).toEqual(expect.arrayContaining(['w-1/2', 'max-w-sm', 'px-2']));
  const style = getComputedStyle(container);
  expect(style.maxWidth).toBe('384px');
  expect(style.paddingInlineStart).toBe('8px');
  expect(style.paddingInlineEnd).toBe('8px');
  expect(container.getBoundingClientRect().width).toBeCloseTo(
    Math.min(384, container.parentElement!.clientWidth / 2),
  );
});