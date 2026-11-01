import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { Bleed } from '@/index';

test('keeps wrapper-owned hooks and merges className through consumer props', () => {
  const { getByTestId } = render(
    <Bleed
      data-testid="bleed"
      data-scope="custom"
      data-part="custom"
      data-slot="custom"
      inline="xs"
      block="lg"
      className="consumer-class"
    />,
  );
  const bleed = getByTestId('bleed');

  expect(bleed.getAttribute('data-scope')).toBe('bleed');
  expect(bleed.getAttribute('data-part')).toBe('root');
  expect(bleed.getAttribute('data-slot')).toBe('bleed-root');
  expect(bleed.getAttribute('data-inline')).toBe('xs');
  expect(bleed.getAttribute('data-block')).toBe('lg');
  expect([...bleed.classList]).toEqual(expect.arrayContaining(['consumer-class']));
  const style = getComputedStyle(bleed);
  expect(style.marginInlineStart).toBe('-4px');
  expect(style.marginBlockStart).toBe('-16px');
});