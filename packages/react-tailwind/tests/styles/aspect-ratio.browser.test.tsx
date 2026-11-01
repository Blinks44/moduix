import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { AspectRatio } from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const { getByTestId } = render(
    <AspectRatio ratio={16 / 9} data-testid="frame" className="static w-1/2" />,
  );
  const frame = getByTestId('frame');

  expect([...frame.classList]).toEqual(expect.arrayContaining(['static', 'w-1/2']));
  expect(getComputedStyle(frame).position).toBe('static');
  expect(frame.getBoundingClientRect().width).toBeCloseTo(frame.parentElement!.clientWidth / 2);
  expect(frame.getBoundingClientRect().height).toBeCloseTo(
    (frame.getBoundingClientRect().width * 9) / 16,
    1,
  );
});