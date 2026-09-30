import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { SimpleGrid } from '@/components/simple-grid';
const gridClass = 'w-[min(48rem,calc(100vw-4rem))]';
const itemClass = 'min-w-0 rounded-lg border border-border bg-background p-4';
const titleClass =
  'm-0 text-md leading-6 font-semibold tracking-normal wrap-anywhere text-foreground';
const mutedClass =
  'm-0 text-md leading-6 font-regular tracking-normal wrap-anywhere text-muted-foreground';

const items = ['Analytics', 'Billing', 'Customers', 'Exports', 'Integrations', 'Reports'];
const meta = {
  title: 'Components/SimpleGrid',
  component: SimpleGrid,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SimpleGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Columns: Story = {
  render: () => ({
    components: { SimpleGrid },
    setup: () => ({ items, gridClass, itemClass, titleClass, mutedClass }),
    template: `
      <SimpleGrid :columns="3" :gap="12" :class="gridClass">
        
        <div v-for="item in items" :key="item" :class="itemClass">
          <p :class="titleClass">{{ item }}</p>
          
        </div>
        
      </SimpleGrid>
    `,
  }),
};

export const AutoResponsive: Story = {
  render: () => ({
    components: { SimpleGrid },
    setup: () => ({ items, gridClass, itemClass, titleClass, mutedClass }),
    template: `
      <SimpleGrid :min-child-width="160" :gap="12" :class="gridClass">
        
        <div v-for="item in items" :key="item" :class="itemClass">
          <p :class="titleClass">{{ item }}</p>
          <p :class="mutedClass">The column count follows the available width.</p>
        </div>
        
      </SimpleGrid>
    `,
  }),
};

export const SeparateGaps: Story = {
  render: () => ({
    components: { SimpleGrid },
    setup: () => ({ items, gridClass, itemClass, titleClass, mutedClass }),
    template: `
      <SimpleGrid :columns="3" :row-gap="24" :column-gap="8" :class="gridClass">
        
        <div v-for="item in items" :key="item" :class="itemClass">
          <p :class="titleClass">{{ item }}</p>
          
        </div>
        
      </SimpleGrid>
    `,
  }),
};

export const SemanticElement: Story = {
  render: () => ({
    components: { SimpleGrid },
    setup: () => ({ items, gridClass, itemClass, titleClass, mutedClass }),
    template: `
      <SimpleGrid as-child min-child-width="10rem" :gap="12" :class="gridClass">
        <section aria-label="Workspace sections">
        <div v-for="item in items" :key="item" :class="itemClass">
          <p :class="titleClass">{{ item }}</p>
          
        </div>
        </section>
      </SimpleGrid>
    `,
  }),
};