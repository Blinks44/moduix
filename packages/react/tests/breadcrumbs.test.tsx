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
        items={[{ href: '/', label: 'Home' }, { label: 'Breadcrumbs' }]}
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
        items={[
          { href: '/', label: 'Home' },
          { href: '/docs', label: 'Docs' },
          { label: 'Breadcrumbs' },
        ]}
      />
    </Breadcrumbs>,
  );

  expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toHaveAttribute(
    'data-slot',
    'breadcrumbs-root',
  );
  expect(screen.getByRole('list')).toHaveAttribute('data-part', 'list');
  expect(screen.getByText('Breadcrumbs')).toHaveAttribute('aria-current', 'page');
  expect(container.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
  expect(container.querySelector('[data-part="separator"]')).toHaveAttribute('aria-hidden', 'true');
});

test('keeps non-final path items out of the current-page state without an href', () => {
  const { container } = render(
    <Breadcrumbs>
      <Breadcrumbs.Path items={[{ label: 'Catalog' }, { label: 'Products' }]} />
    </Breadcrumbs>,
  );

  expect(screen.getByText('Catalog')).not.toHaveAttribute('aria-current');
  expect(screen.getByText('Products')).toHaveAttribute('aria-current', 'page');
  expect(container.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
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