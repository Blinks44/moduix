import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
// The shared harness resolves `@/` to this package's source.
import HooksEmpty from '../../../svelte/tests/empty/HooksEmpty.svelte';

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(HooksEmpty, { props: { class: 'w-auto bg-background p-2' } });

  const root = screen.getByTestId('root');
  expect([...root.classList]).toEqual(expect.arrayContaining(['w-auto', 'bg-background', 'p-2']));
  expect(getComputedStyle(root)).toMatchObject({
    paddingTop: '8px',
    paddingRight: '8px',
    paddingBottom: '8px',
    paddingLeft: '8px',
  });
});