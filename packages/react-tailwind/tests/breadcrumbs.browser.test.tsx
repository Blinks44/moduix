import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, type ComponentProps } from 'react';
import {
  Breadcrumbs,
  BreadcrumbsEllipsis,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsPath,
  BreadcrumbsSeparator,
} from '../src';

type BreadcrumbsPathProps = ComponentProps<typeof BreadcrumbsPath>;

const pathDoesNotExposeOwnedCompositionProps: Extract<
  keyof BreadcrumbsPathProps,
  'asChild' | 'children'
> extends never
  ? true
  : false = true;

test('forwards Path list props and ref without exposing owned composition props', () => {
  const ref = createRef<HTMLOListElement>();

  render(
    <Breadcrumbs>
      <BreadcrumbsPath
        ref={ref}
        aria-label="Current path"
        links={[{ href: '/', label: 'Home' }]}
        page="Breadcrumbs"
      />
    </Breadcrumbs>,
  );

  expect(pathDoesNotExposeOwnedCompositionProps).toBe(true);
  expect(ref.current).toBe(screen.getByRole('list', { name: 'Current path' }));
  expect(ref.current?.getAttribute('data-slot')).toBe('breadcrumbs-list');
});

test('renders semantic path navigation with one current page', async () => {
  const { container } = render(
    <Breadcrumbs>
      <BreadcrumbsPath
        links={[
          { href: '/', label: 'Home' },
          { href: '/docs', label: 'Docs' },
        ]}
        page="Breadcrumbs"
      />
    </Breadcrumbs>,
  );

  expect(screen.getByRole('navigation', { name: 'Breadcrumb' }).getAttribute('data-slot')).toBe(
    'breadcrumbs-root',
  );
  expect(screen.getByRole('list').getAttribute('data-slot')).toBe('breadcrumbs-list');
  await expect.element(page.getByText('Breadcrumbs')).toHaveAttribute('aria-current', 'page');
  expect(container.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
  expect(
    container.querySelector('[data-slot="breadcrumbs-separator"]')?.getAttribute('aria-hidden'),
  ).toBe('true');
  expect([
    ...container.querySelector('[data-slot="breadcrumbs-separator"] svg')!.classList,
  ]).toEqual(expect.arrayContaining(['size-[1em]', 'flex-none', '[&:dir(rtl)]:rotate-180']));
  await expect.element(page.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  await expect.element(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
});

test('keeps owned accessibility attributes and exposes only data-slot hooks by default', async () => {
  render(
    <Breadcrumbs>
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsPage aria-current={undefined}>Breadcrumbs</BreadcrumbsPage>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator aria-hidden={false} />
      </BreadcrumbsList>
      <BreadcrumbsEllipsis aria-hidden={false} />
    </Breadcrumbs>,
  );

  expect(screen.getByRole('navigation').hasAttribute('data-scope')).not.toBe(true);
  expect(screen.getByRole('navigation').hasAttribute('data-part')).not.toBe(true);
  await expect.element(page.getByText('Breadcrumbs')).toHaveAttribute('aria-current', 'page');
  expect(
    document.querySelector('[data-slot="breadcrumbs-separator"]')?.getAttribute('aria-hidden'),
  ).toBe('true');
  expect(
    document.querySelector('[data-slot="breadcrumbs-ellipsis"]')?.getAttribute('aria-hidden'),
  ).toBe('true');
});

test('forwards a link ref and preserves the semantic child with asChild', async () => {
  const ref = createRef<HTMLAnchorElement>();

  render(
    <BreadcrumbsLink ref={ref} asChild>
      <a href="/docs">Docs</a>
    </BreadcrumbsLink>,
  );

  const link = screen.getByRole('link', { name: 'Docs' });

  expect(ref.current).toBe(link);
  await expect.element(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
  expect(link.getAttribute('data-slot')).toBe('breadcrumbs-link');
});

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
  expect(root.classList.contains('max-w-full')).toBe(false);
  expect(list.classList.contains('gap-0')).toBe(true);
  expect(list.classList.contains('gap-1')).toBe(false);
  expect(link.classList.contains('px-0')).toBe(true);
  expect(link.classList.contains('px-1')).toBe(false);
  expect([...link.classList]).toEqual(
    expect.arrayContaining(['overflow-visible', 'text-clip', 'whitespace-normal']),
  );
  expect(link.classList.contains('truncate')).toBe(false);
});