import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import type { ComponentProps } from 'solid-js';
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
  let ref!: HTMLOListElement;

  render(() => (
    <Breadcrumbs>
      <BreadcrumbsPath
        ref={(element) => (ref = element)}
        aria-label="Current path"
        links={[{ href: '/', label: 'Home' }]}
        page="Breadcrumbs"
      />
    </Breadcrumbs>
  ));

  expect(pathDoesNotExposeOwnedCompositionProps).toBe(true);
  expect(ref).toBe(screen.getByRole('list', { name: 'Current path' }));
  expect(ref?.getAttribute('data-slot')).toBe('breadcrumbs-list');
});

test('renders semantic path navigation with one current page', async () => {
  const { container } = render(() => (
    <Breadcrumbs>
      <BreadcrumbsPath
        links={[
          { href: '/', label: 'Home' },
          { href: '/docs', label: 'Docs' },
        ]}
        page="Breadcrumbs"
      />
    </Breadcrumbs>
  ));

  expect(screen.getByRole('navigation', { name: 'Breadcrumb' }).getAttribute('data-slot')).toBe(
    'breadcrumbs-root',
  );
  expect(screen.getByRole('list').getAttribute('data-slot')).toBe('breadcrumbs-list');
  await expect.element(page.getByText('Breadcrumbs')).toHaveAttribute('aria-current', 'page');
  expect(container.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
  expect(
    container.querySelector('[data-slot="breadcrumbs-separator"]')?.getAttribute('aria-hidden'),
  ).toBe('true');
  await expect.element(page.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  await expect.element(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
});

test('keeps owned accessibility attributes and exposes only data-slot hooks by default', async () => {
  render(() => (
    <Breadcrumbs>
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsPage aria-current={undefined}>Breadcrumbs</BreadcrumbsPage>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator aria-hidden={false} />
      </BreadcrumbsList>
      <BreadcrumbsEllipsis aria-hidden={false} />
    </Breadcrumbs>
  ));

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
  let childRef!: HTMLAnchorElement;

  render(() => (
    <BreadcrumbsLink
      asChild={(props) => (
        <a {...props()} ref={(element) => (childRef = element)} href="/docs">
          Docs
        </a>
      )}
    />
  ));

  const link = screen.getByRole('link', { name: 'Docs' });

  expect(childRef).toBe(link);
  await expect.element(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
  expect(link.getAttribute('data-slot')).toBe('breadcrumbs-link');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let ref: HTMLAnchorElement | undefined;

  render(() => (
    <BreadcrumbsLink
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