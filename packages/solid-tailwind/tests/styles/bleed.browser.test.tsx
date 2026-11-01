import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Bleed } from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => <Bleed data-testid="bleed" inline="md" block="lg" class="mx-8 my-10" />);
  const bleed = screen.getByTestId('bleed');

  expect([...bleed.classList]).toEqual(expect.arrayContaining(['mx-8', 'my-10']));
  const style = getComputedStyle(bleed);
  expect(style.marginInlineStart).toBe('32px');
  expect(style.marginInlineEnd).toBe('32px');
  expect(style.marginBlockStart).toBe('40px');
  expect(style.marginBlockEnd).toBe('40px');
});