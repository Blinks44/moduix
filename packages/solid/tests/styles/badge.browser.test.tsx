import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Badge } from '@/index';

test('lets the color variables override every variant', async () => {
  const colors = {
    '--moduix-badge-bg': 'rgb(1, 2, 3)',
    '--moduix-badge-border-color': 'rgb(4, 5, 6)',
    '--moduix-badge-color': 'rgb(7, 8, 9)',
  };

  render(() => (
    <>
      <Badge data-testid="outline" style={colors} variant="outline">
        Outline
      </Badge>
      <Badge data-testid="link" style={colors} variant="link">
        Link
      </Badge>
    </>
  ));

  await expect.element(page.getByTestId('outline')).toHaveCount(1);
  for (const id of ['outline', 'link']) {
    const style = getComputedStyle(screen.getByTestId(id));
    expect([style.backgroundColor, style.borderTopColor, style.color]).toEqual([
      'rgb(1, 2, 3)',
      'rgb(4, 5, 6)',
      'rgb(7, 8, 9)',
    ]);
  }
});