import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Bleed } from '@/index';

test('lets a plain consumer class override the layered bleed margins', () => {
  const style = document.createElement('style');
  style.textContent = '.custom-bleed { margin-inline: -20px; inline-size: auto; }';
  document.head.append(style);

  try {
    render(() => <Bleed data-testid="bleed" class="custom-bleed" />);
    const bleed = getComputedStyle(screen.getByTestId('bleed'));

    expect(bleed.marginInlineStart).toBe('-20px');
    expect(bleed.marginInlineEnd).toBe('-20px');
  } finally {
    style.remove();
  }
});