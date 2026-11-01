import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { Badge, BadgeDot, BadgeLabel } from '@/index';

const badgeComponents = { Badge, BadgeDot, BadgeLabel };

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render({
    components: badgeComponents,
    template:
      '<Badge class="bg-secondary px-0 [a&]:hover:opacity-75" data-testid="badge">Ready</Badge>',
  });

  await expect.element(page.getByTestId('badge')).toHaveCount(1);

  await expect.element(page.getByTestId('badge')).toHaveCSS('padding', '0px');
});

test('lets a size utility on an icon override the default icon size', () => {
  render({
    components: badgeComponents,
    template: `
      <Badge>
        <svg aria-hidden="true" class="size-4" data-testid="icon" />
        New
      </Badge>
    `,
  });

  expect(screen.getByTestId('icon').getBoundingClientRect().width).toBe(16);
});