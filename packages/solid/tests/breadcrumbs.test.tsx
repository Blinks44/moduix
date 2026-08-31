import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import type { ComponentProps } from 'solid-js';
import { Breadcrumbs } from '../src';

type BreadcrumbsPathProps = ComponentProps<typeof Breadcrumbs.Path>;

const pathDoesNotExposeOwnedCompositionProps: Extract<
  keyof BreadcrumbsPathProps,
  'asChild' | 'children'
> extends never
  ? true
  : false = true;

test('forwards Path list props and ref without exposing owned composition props', () => {
  let ref!: HTMLOListElement;

  render(() => (
    <Breadcrumbs>
      <Breadcrumbs.Path
        ref={(element) => (ref = element)}
        aria-label="Current path"
        items={[{ href: '/', label: 'Home' }, { label: 'Breadcrumbs' }]}
      />
    </Breadcrumbs>
  ));

  expect(pathDoesNotExposeOwnedCompositionProps).toBe(true);
  expect(ref).toBe(screen.getByRole('list', { name: 'Current path' }));
  expect(ref).toHaveAttribute('data-slot', 'breadcrumbs-list');
});

test('renders semantic path navigation with one current page', () => {
  const { container } = render(() => (
    <Breadcrumbs>
      <Breadcrumbs.Path
        items={[
          { href: '/', label: 'Home' },
          { href: '/docs', label: 'Docs' },
          { label: 'Breadcrumbs' },
        ]}
      />
    </Breadcrumbs>
  ));

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
});

test('keeps non-final path items out of the current-page state without an href', () => {
  const { container } = render(() => (
    <Breadcrumbs>
      <Breadcrumbs.Path items={[{ label: 'Catalog' }, { label: 'Products' }]} />
    </Breadcrumbs>
  ));

  expect(screen.getByText('Catalog')).not.toHaveAttribute('aria-current');
  expect(screen.getByText('Products')).toHaveAttribute('aria-current', 'page');
  expect(container.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
});

test('keeps owned accessibility attributes and exposes only data-slot hooks by default', () => {
  render(() => (
    <Breadcrumbs>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Page aria-current={undefined}>Breadcrumbs</Breadcrumbs.Page>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator aria-hidden={false} />
      </Breadcrumbs.List>
      <Breadcrumbs.Ellipsis aria-hidden={false} />
    </Breadcrumbs>
  ));

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
  let childRef!: HTMLAnchorElement;

  render(() => (
    <Breadcrumbs.Link
      asChild={(props) => (
        <a {...props()} ref={(element) => (childRef = element)} href="/docs">
          Docs
        </a>
      )}
    />
  ));

  const link = screen.getByRole('link', { name: 'Docs' });

  expect(childRef).toBe(link);
  expect(link).toHaveAttribute('href', '/docs');
  expect(link).toHaveAttribute('data-slot', 'breadcrumbs-link');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let ref: HTMLAnchorElement | undefined;

  render(() => (
    <Breadcrumbs.Link
      ref={(element) => (ref = element)}
      asChild={(props) => (
        <a {...props()} href="/docs">
          Docs
        </a>
      )}
    />
  ));

  expect(ref).toBeUndefined();
});