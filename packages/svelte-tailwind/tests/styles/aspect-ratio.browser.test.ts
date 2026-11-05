import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
// The shared harness resolves `@/` to this package's source.
import TestAspectRatio from '../../../svelte/tests/aspect-ratio/TestAspectRatio.svelte';

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(TestAspectRatio, {
    props: { ratio: 16 / 9, 'data-testid': 'frame', class: 'static w-1/2' },
  });
  const frame = screen.getByTestId('frame');

  expect([...frame.classList]).toEqual(expect.arrayContaining(['static', 'w-1/2']));
  expect(getComputedStyle(frame).position).toBe('static');
  expect(frame.getBoundingClientRect().width).toBeCloseTo(frame.parentElement!.clientWidth / 2);
  expect(frame.getBoundingClientRect().height).toBeCloseTo(
    (frame.getBoundingClientRect().width * 9) / 16,
    1,
  );
});