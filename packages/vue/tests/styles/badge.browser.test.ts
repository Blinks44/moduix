import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { Badge, BadgeDot, BadgeLabel } from '@/index';

const badgeComponents = { Badge, BadgeDot, BadgeLabel };

test('lets the color variables override every variant', async () => {
  render({
    components: badgeComponents,
    setup: () => ({
      colors: {
        '--moduix-badge-bg': 'rgb(1, 2, 3)',
        '--moduix-badge-border-color': 'rgb(4, 5, 6)',
        '--moduix-badge-color': 'rgb(7, 8, 9)',
      },
    }),
    template: `
      <div>
        <Badge data-testid="outline" :style="colors" variant="outline">Outline</Badge>
        <Badge data-testid="link" :style="colors" variant="link">Link</Badge>
      </div>
    `,
  });

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