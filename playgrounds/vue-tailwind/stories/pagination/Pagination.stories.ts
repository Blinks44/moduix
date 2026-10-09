import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
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
} from '@/components/pagination';

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

const PaginationPreview = defineComponent({
  components: paginationComponents,
  props: {
    count: { type: Number, default: 200 },
    defaultPage: { type: Number, default: 5 },
    pageSize: { type: Number, default: 10 },
    siblingCount: { type: Number, default: 1 },
  },
  template: `
    <Pagination :count="count" :default-page="defaultPage" :page-size="pageSize" :sibling-count="siblingCount">
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </Pagination>
  `,
});

const CustomPaginationItems = defineComponent({
  components: { PaginationContext, PaginationEllipsis, PaginationItem },
  template: `
    <PaginationContext v-slot="pagination">
      <template v-for="(page, index) in pagination.pages" :key="index">
        <PaginationItem
          v-if="page.type === 'page'"
          :type="page.type"
          :value="page.value"
          class="rounded-sm data-selected:border-primary data-selected:bg-primary data-selected:text-primary-foreground"
        >
          {{ page.value }}
        </PaginationItem>
        <PaginationEllipsis v-else :index="index" class="rounded-sm" />
      </template>
    </PaginationContext>
  `,
});

const storyComponents = { ...paginationComponents, CustomPaginationItems };

const meta = {
  title: 'Components/Pagination',
  component: PaginationPreview,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof PaginationPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup: () => setup?.() ?? {},
      template,
    });
}

export const Default: Story = {
  args: {
    count: 200,
    defaultPage: 5,
    pageSize: 10,
  },
};

export const Start: Story = {
  args: {
    count: 200,
    defaultPage: 1,
    pageSize: 10,
  },
};

export const End: Story = {
  args: {
    count: 200,
    defaultPage: 20,
    pageSize: 10,
  },
};

export const NumericContent: Story = {
  args: {
    count: 120,
    defaultPage: 10,
    pageSize: 1,
    siblingCount: 2,
  },
};

export const Controlled: Story = {
  render: renderStory(
    `
      <Pagination
        v-model:page="page"
        :count="200"
        :page-size="10"
      >
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </Pagination>
    `,
    () => ({ page: ref(5) }),
  ),
};

export const Link: Story = {
  render: renderStory(
    `
      <Pagination
        :count="200"
        :default-page="5"
        :page-size="10"
        type="link"
        :get-page-url="getPageUrl"
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
    () => ({ getPageUrl: (details: { page: number }) => '?page=' + details.page }),
  ),
};

export const WithEdges: Story = {
  render: renderStory(`
    <Pagination :count="400" :page-size="20" :sibling-count="2">
      <PaginationFirstTrigger />
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
      <PaginationLastTrigger />
    </Pagination>
  `),
};

export const RightToLeft: Story = {
  render: renderStory(`
    <Pagination dir="rtl" :count="200" :default-page="5" :page-size="10" :sibling-count="1">
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </Pagination>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div class="grid justify-items-center gap-3">
        <button type="button" @click="pagination.goToNextPage()">Next page</button>
        <PaginationRootProvider :value="pagination">
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </PaginationRootProvider>
      </div>
    `,
    () => ({
      pagination: usePagination({ count: 200, pageSize: 10, siblingCount: 2 }),
    }),
  ),
};

export const CustomStyles: Story = {
  render: renderStory(`
    <Pagination :count="200" :default-page="5" :page-size="10">
      <PaginationPrevTrigger class="rounded-sm" />
      <CustomPaginationItems />
      <PaginationNextTrigger class="rounded-sm" />
    </Pagination>
  `),
};