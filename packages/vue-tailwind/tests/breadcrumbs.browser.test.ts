import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { h, nextTick, ref, shallowRef } from 'vue';
import type { ComponentPublicInstance, VNodeChild } from 'vue';
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

type BreadcrumbsPathProps = InstanceType<typeof BreadcrumbsPath>['$props'];

const pathDoesNotExposeOwnedCompositionProps: Extract<
  keyof BreadcrumbsPathProps,
  'asChild' | 'children'
> extends never
  ? true
  : false = true;

test('forwards Path list props and Vue refs without exposing owned composition props', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const pathRef = ref<ComponentPublicInstance | null>(null);
  const links = [{ href: '/', label: 'Home' }];

  render({
    setup() {
      return () =>
        h(
          Breadcrumbs,
          { ref: rootRef, 'data-probe': 'root' },
          {
            default: () =>
              h(BreadcrumbsPath, {
                ref: pathRef,
                'aria-label': 'Current path',
                links,
                page: 'Breadcrumbs',
              }),
          },
        );
    },
  });

  const navigation = screen.getByRole('navigation', { name: 'Breadcrumb' });
  const list = screen.getByRole('list', { name: 'Current path' });

  expect(pathDoesNotExposeOwnedCompositionProps).toBe(true);
  expect(rootRef.value?.$el).toBe(navigation);
  expect(pathRef.value?.$el).toBe(list);
  expect(navigation.dataset).toMatchObject({ probe: 'root', slot: 'breadcrumbs-root' });
  expect(list.getAttribute('data-slot')).toBe('breadcrumbs-list');
  expect(document.querySelector('[data-slot="breadcrumbs-separator"] svg')).not.toBeNull();
  await expect.element(page.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  await expect.element(page.getByText('Breadcrumbs')).toHaveAttribute('aria-current', 'page');
  expect(
    document.querySelector('[data-slot="breadcrumbs-separator"]')?.getAttribute('aria-hidden'),
  ).toBe('true');
  expect(document.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
  expect([...document.querySelector('[data-slot="breadcrumbs-separator"] svg')!.classList]).toEqual(
    expect.arrayContaining(['size-[1em]', 'flex-none', '[&:dir(rtl)]:rotate-180']),
  );
});

test('renders Vue VNode values passed through Path props', async () => {
  const links = [{ href: '/', label: h('em', { 'data-label': 'home' }, 'Home') }];
  const pageContent = h('span', { title: 'Current page detail' }, 'Overview');
  const separator = shallowRef<VNodeChild>(h('span', { 'data-separator': 'custom' }, '·'));

  render({
    setup() {
      return () =>
        h(Breadcrumbs, null, {
          default: () =>
            h(BreadcrumbsPath, { links, page: pageContent, separator: separator.value }),
        });
    },
  });

  const home = screen.getByText('Home');
  const pageLabel = screen.getByText('Overview');

  expect(home.tagName).toBe('EM');
  expect(home.getAttribute('data-label')).toBe('home');
  expect(pageLabel.tagName).toBe('SPAN');
  await expect.element(page.getByText('Overview')).toHaveAttribute('title', 'Current page detail');
  expect(screen.getByText('·').getAttribute('data-separator')).toBe('custom');

  for (const value of [undefined, null]) {
    separator.value = value;
    await nextTick();
    expect(document.querySelector('[data-slot="breadcrumbs-separator"] svg')).not.toBeNull();
    expect(screen.queryByText('·')).toBeNull();
  }
  for (const value of ['', false, 0]) {
    separator.value = value;
    await nextTick();
    const host = document.querySelector('[data-slot="breadcrumbs-separator"]');
    expect(host?.querySelector('svg')).toBeNull();
    expect(host?.textContent).toContain(value === 0 ? '0' : '');
    expect(host?.getAttribute('aria-hidden')).toBe('true');
  }
  separator.value = h('strong', { 'data-separator': 'updated' }, '/');
  await nextTick();
  expect(screen.getByText('/').tagName).toBe('STRONG');
  expect(screen.getByText('/').getAttribute('data-separator')).toBe('updated');
});

test('preserves consumer labels and native listeners while keeping owned ARIA attributes', async () => {
  const clicks: MouseEvent[] = [];

  render({
    setup() {
      return () =>
        h(
          Breadcrumbs,
          {
            'aria-label': 'Project breadcrumbs',
            onClick: (event: MouseEvent) => clicks.push(event),
          },
          {
            default: () =>
              h(BreadcrumbsList, null, {
                default: () => [
                  h(BreadcrumbsItem, null, {
                    default: () =>
                      h(
                        BreadcrumbsPage,
                        { 'aria-current': 'step' },
                        {
                          default: () => 'Current',
                        },
                      ),
                  }),
                  h(BreadcrumbsSeparator, { 'aria-hidden': 'false' }),
                  h(BreadcrumbsEllipsis, { 'aria-hidden': 'false' }, { default: () => 'More' }),
                ],
              }),
          },
        );
    },
  });

  await page.getByRole('navigation', { name: 'Project breadcrumbs' }).click();

  expect(clicks).toHaveLength(1);
  await expect.element(page.getByText('Current')).toHaveAttribute('aria-current', 'page');
  expect(
    document.querySelector('[data-slot="breadcrumbs-separator"]')?.getAttribute('aria-hidden'),
  ).toBe('true');
  await expect.element(page.getByText('More')).toHaveAttribute('aria-hidden', 'true');
});

test('keeps the semantic link child with asChild and exposes its host through the Vue ref', async () => {
  const linkRef = ref<ComponentPublicInstance | null>(null);

  render({
    setup() {
      return () =>
        h(
          BreadcrumbsLink,
          { ref: linkRef, asChild: true },
          { default: () => h('a', { href: '/docs' }, 'Docs') },
        );
    },
  });

  const link = screen.getByRole('link', { name: 'Docs' });

  expect(linkRef.value?.$el).toBe(link);
  await expect.element(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
  expect(link.getAttribute('data-slot')).toBe('breadcrumbs-link');
});

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
  expect(navigation.classList.contains('text-muted-foreground')).toBe(false);
  expect(list.classList.contains('gap-4')).toBe(true);
  expect(list.classList.contains('gap-1')).toBe(false);
});