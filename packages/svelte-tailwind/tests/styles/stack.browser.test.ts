import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
// The shared harnesses resolve `@/` to this package's source.
import TestStack from '../../../svelte/tests/stack/TestStack.svelte';

test('lets consumer Tailwind utilities override fixed defaults', () => {
  render(TestStack, {
    props: { direction: 'row', fill: true, class: 'flex-none flex-col', 'data-testid': 'stack' },
  });
  const stack = screen.getByTestId('stack');

  expect([...stack.classList]).toEqual(expect.arrayContaining(['flex-none', 'flex-col']));
  expect(getComputedStyle(stack).flex).toBe('0 0 auto');
  expect(getComputedStyle(stack).flexDirection).toBe('column');
});