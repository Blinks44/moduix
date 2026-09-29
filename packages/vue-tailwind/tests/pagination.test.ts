import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
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

test('preserves Ark navigation semantics, refs, attrs, and default trigger boundaries', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const triggerRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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

  render(Harness);

  const navigation = screen.getByRole('navigation', { name: 'pagination' });
  expect(navigation).toHaveAttribute('data-slot', 'pagination-root');
  expect(navigation).toHaveAttribute('id', 'pagination:page-navigation');
  expect(navigation).toHaveAttribute('data-probe', 'root');
  expect(navigation).toHaveClass('consumer-root');
  expect(rootRef.value?.$el).toBe(navigation);

  const previousTrigger = screen.getByRole('button', { name: 'Go to the previous page' });
  expect(previousTrigger).toHaveAttribute('data-slot', 'pagination-prev-trigger');
  expect(previousTrigger).toBeDisabled();
  expect(triggerRef.value?.$el).toBe(previousTrigger);
  expect(screen.getByRole('button', { name: /next page/i })).not.toBeDisabled();
  expect(screen.getByRole('button', { name: /page 1/i })).toHaveAttribute(
    'data-slot',
    'pagination-item',
  );
  expect(screen.getByRole('button', { name: /page 1/i })).toHaveAttribute('data-selected');
});

test('lets Ark translations set the navigation landmark label', () => {
  render(
    defineComponent({
      components: paginationComponents,
      template: `
        <Pagination :count="20" :page-size="10" :translations="{ rootLabel: 'Page navigation' }">
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </Pagination>
      `,
    }),
  );

  expect(screen.getByRole('navigation', { name: 'Page navigation' })).toBeInTheDocument();
});

test('renders ellipses and keeps first and last trigger boundaries in sync', async () => {
  const { container } = render(
    defineComponent({
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
    }),
  );

  expect(screen.getAllByText('...')).toHaveLength(2);
  const firstTrigger = screen.getByRole('button', { name: 'first page' });
  const lastTrigger = screen.getByRole('button', { name: 'last page' });
  expect(firstTrigger).toHaveAttribute('data-slot', 'pagination-first-trigger');
  expect(lastTrigger).toHaveAttribute('data-slot', 'pagination-last-trigger');

  await fireEvent.click(firstTrigger);
  await waitFor(() =>
    expect(
      container.querySelector('[data-slot="pagination-item"][data-selected]'),
    ).toHaveTextContent('1'),
  );
  expect(firstTrigger).toBeDisabled();
  expect(screen.getByRole('button', { name: /previous page/i })).toBeDisabled();

  await fireEvent.click(lastTrigger);
  await waitFor(() =>
    expect(
      container.querySelector('[data-slot="pagination-item"][data-selected]'),
    ).toHaveTextContent('20'),
  );
  expect(screen.getByRole('button', { name: /next page/i })).toBeDisabled();
  expect(lastTrigger).toBeDisabled();
});

test('supports Vue page models and preserves Ark page-change details', async () => {
  const page = ref(1);
  const pageSize = ref(10);
  const changes: number[] = [];
  const Harness = defineComponent({
    components: paginationComponents,
    setup: () => ({
      page,
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

  render(Harness);
  await fireEvent.click(screen.getByRole('button', { name: /page 2/i }));
  await waitFor(() => expect(page.value).toBe(2));
  expect(changes).toEqual([2]);
  expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();

  await fireEvent.click(screen.getByRole('button', { name: 'Change page size' }));
  await waitFor(() => expect(pageSize.value).toBe(5));
  expect(screen.getByText('Page 2 of 6')).toBeInTheDocument();
});

test('composes link mode with semantic anchors through asChild', () => {
  render(
    defineComponent({
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
    }),
  );

  expect(screen.getByRole('link', { name: /page 2/i })).toHaveAttribute('href', '?page=2');
});

test('exposes usePagination state through RootProvider and its context slot', async () => {
  const Harness = defineComponent({
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

  render(Harness);
  expect(screen.getByText('Page 2')).toBeInTheDocument();
  expect(screen.getByText('Range 10-20')).toBeInTheDocument();
  await fireEvent.click(screen.getByRole('button', { name: /next page/i }));
  await waitFor(() => expect(screen.getByText('Page 3')).toBeInTheDocument());
});

test('keeps root asChild semantics and refs on the consumer host', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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

  render(Harness);
  const navigation = screen.getByRole('navigation', { name: 'Custom page navigation' });
  expect(navigation).toHaveAttribute('data-slot', 'pagination-root');
  expect(rootRef.value?.$el).toBe(navigation);
});

test('keeps generated ids and selected state stable through SSR hydration', async () => {
  const Harness = defineComponent({
    components: paginationComponents,
    template: `
      <Pagination id="pagination-ssr" :count="30" :default-page="2" :page-size="10">
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </Pagination>
    `,
  });

  const html = await renderToString(createSSRApp(Harness));
  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.append(container);
  const serverRoot = container.querySelector('[data-slot="pagination-root"]');
  const serverRootId = serverRoot?.getAttribute('id');
  expect(serverRootId).toBeTruthy();

  const hydrationWarning = rs.spyOn(console, 'warn').mockImplementation(() => {});
  const app = createSSRApp(Harness);
  app.mount(container);

  const hydratedRoot = container.querySelector('[data-slot="pagination-root"]');
  expect(hydratedRoot?.tagName).toBe('NAV');
  expect(hydratedRoot).toHaveAttribute('id', serverRootId);
  expect(container.querySelector('[data-slot="pagination-item"][data-selected]')).toHaveTextContent(
    '2',
  );
  expect(hydrationWarning).not.toHaveBeenCalledWith(expect.stringContaining('Hydration'));

  app.unmount();
  container.remove();
  hydrationWarning.mockRestore();
});

test('keeps the public flat API usable from a Vue consumer SFC', async () => {
  render(PaginationConsumer);

  expect(screen.getByText('2 of 3')).toBeInTheDocument();
  const firstNavigation = screen.getAllByRole('navigation')[0];
  const pageThree = firstNavigation?.querySelector('[data-slot="pagination-item"][data-index="3"]');
  expect(pageThree).toBeInTheDocument();
  await fireEvent.click(pageThree!);
  await waitFor(() => expect(screen.getByText('3 of 3')).toBeInTheDocument());
});

test('applies Tailwind utilities to the owned visual parts', () => {
  const { container } = render(
    defineComponent({
      components: paginationComponents,
      template:
        '<Pagination :count="200" :default-page="10" :page-size="10" :sibling-count="1"><PaginationFirstTrigger /><PaginationPrevTrigger /><PaginationItems /><PaginationNextTrigger /><PaginationLastTrigger /></Pagination>',
    }),
  );

  expect(screen.getByRole('navigation')).toHaveClass(
    'inline-flex',
    'max-w-full',
    'gap-1',
    'overflow-x-auto',
    'text-foreground',
  );
  expect(screen.getByRole('button', { name: /page 10/i })).toHaveClass(
    'h-control-md',
    'min-w-control-md',
    'rounded-md',
    'data-selected:bg-foreground',
    'data-selected:text-background',
  );
  expect(screen.getAllByText('...')[0]).toHaveClass(
    'h-control-md',
    'min-w-control-md',
    'rounded-md',
    'text-muted-foreground',
  );
  const firstTrigger = screen.getByRole('button', { name: 'first page' });
  expect(firstTrigger).toHaveClass('h-control-md', 'w-control-md', 'p-0');
  expect(firstTrigger.querySelector('span')).toHaveClass('inline-flex', '[&_svg+svg]:-ms-2');
  expect(container.querySelectorAll('[data-slot="pagination-first-trigger"] svg')).toHaveLength(2);
});

test('merges consumer Tailwind classes after component defaults', () => {
  render(
    defineComponent({
      components: paginationComponents,
      template:
        '<Pagination :count="20" :page-size="10"><PaginationPrevTrigger class="rounded-none px-0" /><PaginationItems /><PaginationNextTrigger /></Pagination>',
    }),
  );

  const previousTrigger = screen.getByRole('button', { name: /previous page/i });
  expect(previousTrigger).toHaveClass('rounded-none', 'px-0');
  expect(previousTrigger).not.toHaveClass('rounded-md', 'px-3');
});