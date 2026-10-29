import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { Container } from '@/index';

test('lets consumer Tailwind utilities override conflicting defaults', () => {
  const { getByTestId } = render(
    <Container data-testid="container" className="w-1/2 max-w-sm px-2" />,
  );
  const container = getByTestId('container');

  expect([...container.classList]).toEqual(expect.arrayContaining(['w-1/2', 'max-w-sm', 'px-2']));
  const style = getComputedStyle(container);
  expect(style.maxWidth).toBe('384px');
  expect(style.paddingInlineStart).toBe('8px');
  expect(style.paddingInlineEnd).toBe('8px');
  expect(container.getBoundingClientRect().width).toBeCloseTo(
    Math.min(384, container.parentElement!.clientWidth / 2),
  );
});