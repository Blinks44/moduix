import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, type ComponentProps } from 'react';
import { Breadcrumbs } from '../src';

type BreadcrumbsPathProps = ComponentProps<typeof Breadcrumbs.Path>;

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
      <Breadcrumbs.Path
        ref={ref}
        aria-label="Current path"
        links={[{ href: '/', label: 'Home' }]}
        page="Breadcrumbs"
      />
    </Breadcrumbs>,
  );

  expect(pathDoesNotExposeOwnedCompositionProps).toBe(true);
  expect(ref.current).toBe(screen.getByRole('list', { name: 'Current path' }));
  expect(ref.current).toHaveAttribute('data-slot', 'breadcrumbs-list');
});

test('renders semantic path navigation with one current page', () => {
  const { container } = render(
    <Breadcrumbs>
      <Breadcrumbs.Path
        links={[
          { href: '/', label: 'Home' },
          { href: '/docs', label: 'Docs' },
        ]}
        page="Breadcrumbs"
      />
    </Breadcrumbs>,
  );

  expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toHaveAttribute(
    'data-slot',
    'breadcrumbs-root',
  );
  expect(screen.getByRole('list')).toHaveAttribute('data-slot', 'breadcrumbs-list');
  expect(screen.getByText('Breadcrumbs')).toHaveAttribute('aria-current', 'page');
  expect(container.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
  expect(container.querySelector('[data-slot="breadcrumbs-separator"]')).toHaveAttribute(
    'aria-hidden',
    'true',
  );
  expect(container.querySelector('[data-slot="breadcrumbs-separator"] svg')).toHaveClass(
    'size-[1em]',
    'flex-none',
    'rtl:rotate-180',
  );
});

test('renders every path link as an anchor and the page as its own item', () => {
  const { container } = render(
    <Breadcrumbs>
      <Breadcrumbs.Path
        links={[
          { href: '/catalog', label: 'Catalog' },
          { href: '/catalog/products', label: 'Products' },
        ]}
        page="Overview"
      />
    </Breadcrumbs>,
  );

  expect(screen.getByRole('link', { name: 'Catalog' })).toHaveAttribute('href', '/catalog');
  expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute(
    'href',
    '/catalog/products',
  );
  expect(screen.getByText('Overview')).toHaveAttribute('aria-current', 'page');
  expect(container.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
});

test('keeps owned accessibility attributes and exposes only data-slot hooks by default', () => {
  render(
    <Breadcrumbs>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Page aria-current={undefined}>Breadcrumbs</Breadcrumbs.Page>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator aria-hidden={false} />
      </Breadcrumbs.List>
      <Breadcrumbs.Ellipsis aria-hidden={false} />
    </Breadcrumbs>,
  );

  expect(screen.getByRole('navigation')).not.toHaveAttribute('data-scope');
  expect(screen.getByRole('navigation')).not.toHaveAttribute('data-part');
  expect(screen.getByText('Breadcrumbs')).toHaveAttribute('aria-current', 'page');
  expect(document.querySelector('[data-slot="breadcrumbs-separator"]')).toHaveAttribute(
    'aria-hidden',
    'true',
  );
  expect(document.querySelector('[data-slot="breadcrumbs-ellipsis"]')).toHaveAttribute(
    'aria-hidden',
    'true',
  );
});

test('forwards a link ref and preserves the semantic child with asChild', () => {
  const ref = createRef<HTMLAnchorElement>();

  render(
    <Breadcrumbs.Link ref={ref} asChild>
      <a href="/docs">Docs</a>
    </Breadcrumbs.Link>,
  );

  const link = screen.getByRole('link', { name: 'Docs' });

  expect(ref.current).toBe(link);
  expect(link).toHaveAttribute('href', '/docs');
  expect(link).toHaveAttribute('data-slot', 'breadcrumbs-link');
});

test('preserves native Ark asChild ref behavior', () => {
  const ref = createRef<HTMLAnchorElement>();

  render(
    <Breadcrumbs.Link ref={ref} asChild>
      <a href="/docs">Docs</a>
    </Breadcrumbs.Link>,
  );

  expect(ref.current).toBe(screen.getByRole('link', { name: 'Docs' }));
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(
    <Breadcrumbs className="max-w-none">
      <Breadcrumbs.List className="gap-0">
        <Breadcrumbs.Item>
          <Breadcrumbs.Link
            className="overflow-visible px-0 text-clip whitespace-normal"
            href="/docs"
          >
            Docs
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Page>Breadcrumbs</Breadcrumbs.Page>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>,
  );

  const root = screen.getByRole('navigation');
  const list = screen.getByRole('list');
  const link = screen.getByRole('link', { name: 'Docs' });

  expect(root).toHaveClass('max-w-none');
  expect(root).not.toHaveClass('max-w-full');
  expect(list).toHaveClass('gap-0');
  expect(list).not.toHaveClass('gap-1');
  expect(link).toHaveClass('px-0');
  expect(link).not.toHaveClass('px-1');
  expect(link).toHaveClass('overflow-visible', 'text-clip', 'whitespace-normal');
  expect(link).not.toHaveClass('truncate');
});