import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { h } from 'vue';
import { Breadcrumbs, BreadcrumbsList } from '@/index';

test('merges consumer Tailwind classes after component defaults', () => {
  render({
    setup() {
      return () =>
        h(
          Breadcrumbs,
          { class: 'text-red-500' },
          {
            default: () => h(BreadcrumbsList, { class: 'gap-4' }),
          },
        );
    },
  });

  const navigation = screen.getByRole('navigation');
  const list = screen.getByRole('list');
  expect(navigation.classList.contains('text-red-500')).toBe(true);
  expect(list.classList.contains('gap-4')).toBe(true);
});