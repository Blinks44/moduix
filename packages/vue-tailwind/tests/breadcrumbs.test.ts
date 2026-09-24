import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/vue';
import { defineComponent, h, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
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

test('forwards Path list props and Vue refs without exposing owned composition props', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const pathRef = ref<ComponentPublicInstance | null>(null);
  const links = [{ href: '/', label: 'Home' }];
  const Harness = defineComponent({
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

  render(Harness);

  const navigation = screen.getByRole('navigation', { name: 'Breadcrumb' });
  const list = screen.getByRole('list', { name: 'Current path' });

  expect(pathDoesNotExposeOwnedCompositionProps).toBe(true);
  expect(rootRef.value?.$el).toBe(navigation);
  expect(pathRef.value?.$el).toBe(list);
  expect(navigation).toHaveAttribute('data-probe', 'root');
  expect(navigation).toHaveAttribute('data-slot', 'breadcrumbs-root');
  expect(list).toHaveAttribute('data-slot', 'breadcrumbs-list');
  expect(document.querySelector('[data-slot="breadcrumbs-separator"] svg')).not.toBeNull();
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  expect(screen.getByText('Breadcrumbs')).toHaveAttribute('aria-current', 'page');
  expect(document.querySelector('[data-slot="breadcrumbs-separator"]')).toHaveAttribute(
    'aria-hidden',
    'true',
  );
  expect(document.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
});

test('renders Vue VNode values passed through Path props', () => {
  const links = [{ href: '/', label: h('em', { 'data-label': 'home' }, 'Home') }];
  const page = h('span', { title: 'Current page detail' }, 'Overview');
  const separator = h('span', { 'data-separator': 'custom' }, '·');
  const Harness = defineComponent({
    setup() {
      return () =>
        h(Breadcrumbs, null, {
          default: () => h(BreadcrumbsPath, { links, page, separator }),
        });
    },
  });

  render(Harness);

  const home = screen.getByText('Home');
  const pageLabel = screen.getByText('Overview');
  const separatorLabel = screen.getByText('·');

  expect(home.tagName).toBe('EM');
  expect(home).toHaveAttribute('data-label', 'home');
  expect(pageLabel.tagName).toBe('SPAN');
  expect(pageLabel).toHaveAttribute('title', 'Current page detail');
  expect(separatorLabel).toHaveAttribute('data-separator', 'custom');
});

test('preserves consumer labels and native listeners while keeping owned ARIA attributes', async () => {
  const clicks: MouseEvent[] = [];
  const Harness = defineComponent({
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
                    default: () => h(BreadcrumbsPage, { 'aria-current': 'step' }, 'Current'),
                  }),
                  h(BreadcrumbsSeparator, { 'aria-hidden': 'false' }),
                  h(BreadcrumbsEllipsis, { 'aria-hidden': 'false' }, { default: () => 'More' }),
                ],
              }),
          },
        );
    },
  });

  render(Harness);

  const navigation = screen.getByRole('navigation', { name: 'Project breadcrumbs' });
  const currentPage = screen.getByText('Current');

  await fireEvent.click(navigation);

  expect(clicks).toHaveLength(1);
  expect(currentPage).toHaveAttribute('aria-current', 'page');
  expect(document.querySelector('[data-slot="breadcrumbs-separator"]')).toHaveAttribute(
    'aria-hidden',
    'true',
  );
  expect(screen.getByText('More')).toHaveAttribute('aria-hidden', 'true');
});

test('keeps the semantic link child with asChild and exposes its host through the Vue ref', () => {
  const linkRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    setup() {
      return () =>
        h(
          BreadcrumbsLink,
          { ref: linkRef, asChild: true },
          { default: () => h('a', { href: '/docs' }, 'Docs') },
        );
    },
  });

  render(Harness);

  const link = screen.getByRole('link', { name: 'Docs' });

  expect(linkRef.value?.$el).toBe(link);
  expect(link).toHaveAttribute('href', '/docs');
  expect(link).toHaveAttribute('data-slot', 'breadcrumbs-link');
});

test('merges consumer Tailwind classes after component defaults', () => {
  const Harness = defineComponent({
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

  render(Harness);

  const navigation = screen.getByRole('navigation');
  const list = screen.getByRole('list');

  expect(navigation).toHaveClass('text-red-500');
  expect(navigation).not.toHaveClass('text-muted-foreground');
  expect(list).toHaveClass('gap-4');
  expect(list).not.toHaveClass('gap-1');
});