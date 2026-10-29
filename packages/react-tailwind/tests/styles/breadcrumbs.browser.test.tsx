import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
} from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(
    <Breadcrumbs className="max-w-none">
      <BreadcrumbsList className="gap-0">
        <BreadcrumbsItem>
          <BreadcrumbsLink
            className="overflow-visible px-0 text-clip whitespace-normal"
            href="/docs"
          >
            Docs
          </BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsPage>Breadcrumbs</BreadcrumbsPage>
        </BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>,
  );

  const root = screen.getByRole('navigation');
  const list = screen.getByRole('list');
  const link = screen.getByRole('link', { name: 'Docs' });
  expect(root.classList.contains('max-w-none')).toBe(true);
  expect(list.classList.contains('gap-0')).toBe(true);
  expect(link.classList.contains('px-0')).toBe(true);
  expect([...link.classList]).toEqual(
    expect.arrayContaining(['overflow-visible', 'text-clip', 'whitespace-normal']),
  );
});