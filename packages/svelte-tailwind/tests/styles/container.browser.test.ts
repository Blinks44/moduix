import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
// The shared harness resolves `@/` to this package's source.
import TestContainer from '../../../svelte/tests/container/TestContainer.svelte';

test('lets consumer Tailwind utilities override conflicting defaults', () => {
  render(TestContainer, { props: { 'data-testid': 'container', class: 'w-1/2 max-w-sm px-2' } });
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