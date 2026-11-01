import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { Bleed } from '@/index';

test('keeps wrapper-owned hooks and merges consumer classes', () => {
  render({
    components: { Bleed },
    template: `
      <Bleed
        data-testid="bleed"
        data-scope="custom"
        data-part="custom"
        data-slot="custom"
        inline="xs"
        block="lg"
        class="consumer-class"
      />
    `,
  });
  const bleed = screen.getByTestId('bleed');

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

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render({
    components: { Bleed },
    template: '<Bleed data-testid="bleed" inline="md" block="lg" class="mx-8 my-10" />',
  });
  const bleed = screen.getByTestId('bleed');

  expect([...bleed.classList]).toEqual(expect.arrayContaining(['mx-8', 'my-10']));
  const style = getComputedStyle(bleed);
  expect(style.marginInlineStart).toBe('32px');
  expect(style.marginInlineEnd).toBe('32px');
  expect(style.marginBlockStart).toBe('40px');
  expect(style.marginBlockEnd).toBe('40px');
});