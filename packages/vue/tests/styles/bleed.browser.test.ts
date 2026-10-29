import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { Bleed } from '@/index';

test('keeps wrapper-owned hooks and merges consumer classes', () => {
  const { getByTestId } = render({
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

test('lets a plain consumer class override the layered bleed margins', () => {
  const style = document.createElement('style');
  style.textContent = '.custom-bleed { margin-inline: -20px; inline-size: auto; }';
  document.head.append(style);

  try {
    const { getByTestId } = render({
      components: { Bleed },
      template: '<Bleed data-testid="bleed" class="custom-bleed" />',
    });
    const bleed = getComputedStyle(getByTestId('bleed'));

    expect(bleed.marginInlineStart).toBe('-20px');
    expect(bleed.marginInlineEnd).toBe('-20px');
  } finally {
    style.remove();
  }
});