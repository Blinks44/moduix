import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationFirstTrigger,
  PaginationItem,
  PaginationItems,
  PaginationLastTrigger,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRootProvider,
  usePagination,
  usePaginationContext,
} from '../src';
import type { PaginationPageChangeDetails } from '../src';
import PaginationConsumer from './pagination-consumer.vue';

const paginationComponents = {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationFirstTrigger,
  PaginationItem,
  PaginationItems,
  PaginationLastTrigger,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRootProvider,
};

const PageValue = defineComponent({
  setup() {
    return { pagination: usePaginationContext() };
  },
  template: '<output>Page {{ pagination.page }}</output>',
});

test('preserves Ark navigation semantics, refs, attrs, and default trigger boundaries', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const triggerRef = ref<ComponentPublicInstance>();

  render({
    components: paginationComponents,
    setup: () => ({ rootRef, triggerRef }),
    template: `
      <Pagination
        ref="rootRef"
        id="page-navigation"
        class="consumer-root"
        data-probe="root"
        :count="20"
        :default-page="1"
        :page-size="10"
      >
        <PaginationPrevTrigger ref="triggerRef" aria-label="Go to the previous page" />
        <PaginationItems />
        <PaginationNextTrigger />
      </Pagination>
    `,
  });

  const navigation = screen.getByRole('navigation', { name: 'pagination' });
  const navigationLocator = page.getByRole('navigation', { name: 'pagination', exact: true });
  await expect.element(navigationLocator).toHaveAttribute('data-slot', 'pagination-root');
  await expect.element(navigationLocator).toHaveAttribute('id', 'pagination:page-navigation');
  await expect.element(navigationLocator).toHaveAttribute('data-probe', 'root');
  expect([...navigation.classList]).toEqual(expect.arrayContaining(['consumer-root']));
  expect(rootRef.value?.$el).toBe(navigation);

  const previousTrigger = screen.getByRole('button', { name: 'Go to the previous page' });
  await expect
    .element(page.getByRole('button', { name: 'Go to the previous page', exact: true }))
    .toHaveAttribute('data-slot', 'pagination-prev-trigger');
  await expect
    .element(page.getByRole('button', { name: 'Go to the previous page', exact: true }))
    .toBeDisabled();
  expect(triggerRef.value?.$el).toBe(previousTrigger);
  await expect
    .element(page.getByRole('button', { name: /next page/i, exact: true }))
    .not.toBeDisabled();
  await expect
    .element(page.getByRole('button', { name: /page 1/i, exact: true }))
    .toHaveAttribute('data-slot', 'pagination-item');
  await expect
    .element(page.getByRole('button', { name: /page 1/i, exact: true }))
    .toHaveAttribute('data-selected');
});

test('lets Ark translations set the navigation landmark label', async () => {
  render({
    components: paginationComponents,
    template: `
        <Pagination :count="20" :page-size="10" :translations="{ rootLabel: 'Page navigation' }">
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </Pagination>
      `,
  });

  await expect
    .element(page.getByRole('navigation', { name: 'Page navigation', exact: true }))
    .toBeAttached();
});

test('renders ellipses and keeps first and last trigger boundaries in sync', async () => {
  render({
    components: paginationComponents,
    template: `
        <Pagination :count="200" :default-page="10" :page-size="10" :sibling-count="1">
          <PaginationFirstTrigger />
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
          <PaginationLastTrigger />
        </Pagination>
      `,
  });

  expect(screen.getAllByText('...')).toHaveLength(2);

  const firstPageTrigger = page.getByRole('button', { name: 'first page', exact: true });
  await expect.element(firstPageTrigger).toHaveAttribute('data-slot', 'pagination-first-trigger');
  const lastPageTrigger = page.getByRole('button', { name: 'last page', exact: true });
  await expect.element(lastPageTrigger).toHaveAttribute('data-slot', 'pagination-last-trigger');

  await firstPageTrigger.click();
  await expect
    .element(page.locator('[data-slot="pagination-item"][data-selected]'))
    .toContainText('1');
  await expect.element(firstPageTrigger).toBeDisabled();
  await expect
    .element(page.getByRole('button', { name: /previous page/i, exact: true }))
    .toBeDisabled();

  await lastPageTrigger.click();
  await expect
    .element(page.locator('[data-slot="pagination-item"][data-selected]'))
    .toContainText('20');
  await expect
    .element(page.getByRole('button', { name: /next page/i, exact: true }))
    .toBeDisabled();
  await expect.element(lastPageTrigger).toBeDisabled();
});

test('supports Vue page models and preserves Ark page-change details', async () => {
  const currentPage = ref(1);
  const pageSize = ref(10);
  const changes: number[] = [];

  render({
    components: paginationComponents,
    setup: () => ({
      page: currentPage,
      pageSize,
      handlePageChange: (details: PaginationPageChangeDetails) => changes.push(details.page),
    }),
    template: `
      <Pagination
        v-model:page="page"
        v-model:page-size="pageSize"
        :count="30"
        @page-change="handlePageChange"
      >
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
        <PaginationContext v-slot="pagination">
          <button type="button" @click="pagination.setPageSize(5)">Change page size</button>
          <output>Page {{ pagination.page }} of {{ pagination.totalPages }}</output>
        </PaginationContext>
      </Pagination>
    `,
  });
  await page.getByRole('button', { name: /page 2/i, exact: true }).click();
  await expect.poll(() => currentPage.value).toBe(2);
  expect(changes).toEqual([2]);
  await expect.element(page.getByText('Page 2 of 3')).toBeAttached();

  await page.getByRole('button', { name: 'Change page size', exact: true }).click();
  await expect.poll(() => pageSize.value).toBe(5);
  await expect.element(page.getByText('Page 2 of 6')).toBeAttached();
});

test('composes link mode with semantic anchors through asChild', async () => {
  render({
    components: paginationComponents,
    template: `
        <Pagination
          :count="30"
          :page-size="10"
          type="link"
          :get-page-url="(details) => '?page=' + details.page"
        >
          <PaginationPrevTrigger as-child><a>Previous</a></PaginationPrevTrigger>
          <PaginationContext v-slot="pagination">
            <template v-for="(page, index) in pagination.pages" :key="index">
              <PaginationItem
                v-if="page.type === 'page'"
                as-child
                :type="page.type"
                :value="page.value"
              >
                <a>{{ page.value }}</a>
              </PaginationItem>
              <PaginationEllipsis v-else :index="index" />
            </template>
          </PaginationContext>
          <PaginationNextTrigger as-child><a>Next</a></PaginationNextTrigger>
        </Pagination>
      `,
  });

  await expect
    .element(page.getByRole('link', { name: /page 2/i, exact: true }))
    .toHaveAttribute('href', '?page=2');
});

test('exposes usePagination state through RootProvider and its context slot', async () => {
  render({
    components: { ...paginationComponents, PageValue },
    setup: () => ({
      pagination: usePagination({ count: 30, defaultPage: 2, pageSize: 10 }),
    }),
    template: `
      <PaginationRootProvider :value="pagination">
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
        <PageValue />
        <PaginationContext v-slot="api">
          <output>Range {{ api.pageRange.start }}-{{ api.pageRange.end }}</output>
        </PaginationContext>
      </PaginationRootProvider>
    `,
  });
  await expect.element(page.getByText('Page 2')).toBeAttached();
  await expect.element(page.getByText('Range 10-20')).toBeAttached();
  await page.getByRole('button', { name: /next page/i, exact: true }).click();
  await expect.element(page.getByText('Page 3')).toBeAttached();
});

test('keeps root asChild semantics and refs on the consumer host', async () => {
  const rootRef = ref<ComponentPublicInstance>();

  render({
    components: paginationComponents,
    setup: () => ({ rootRef }),
    template: `
      <Pagination ref="rootRef" as-child :count="20" :page-size="10">
        <nav aria-label="Custom page navigation">
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </nav>
      </Pagination>
    `,
  });
  const navigation = screen.getByRole('navigation', { name: 'Custom page navigation' });
  await expect
    .element(page.getByRole('navigation', { name: 'Custom page navigation', exact: true }))
    .toHaveAttribute('data-slot', 'pagination-root');
  expect(rootRef.value?.$el).toBe(navigation);
});

test('hydrates without replacing hosts or ids and responds to selection', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrPagination));
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="pagination-root"]');
  const serverInputs = [...host.querySelectorAll('input')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(SsrPagination);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelector('[data-slot="pagination-root"]')).toBe(serverRoot);
    expect([...host.querySelectorAll('input')]).toEqual(serverInputs);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await expect
      .element(page.locator('[data-slot="pagination-item"][data-selected]'))
      .toContainText('2');
    await page.getByRole('button', { name: 'next page', exact: true }).click();
    await expect
      .element(page.locator('[data-slot="pagination-item"][data-selected]'))
      .toContainText('3');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});
test('keeps the public flat API usable from a Vue consumer SFC', async () => {
  render(PaginationConsumer);

  await expect.element(page.getByText('2 of 3')).toBeAttached();
  await page
    .locator('[data-slot="pagination-root"] [data-slot="pagination-item"][data-index="3"]')
    .click();
  await expect.element(page.getByText('3 of 3')).toBeAttached();
});
import SsrPagination from './fixtures/SsrPagination.vue';