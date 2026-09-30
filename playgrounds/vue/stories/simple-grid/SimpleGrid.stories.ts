import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { SimpleGrid } from '@/components/simple-grid';
import { Text } from '@/components/text';
import styles from './SimpleGrid.stories.module.css';

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
    components: { SimpleGrid, Text },
    setup: () => ({ items, styles }),
    template: `
      <SimpleGrid :columns="3" :gap="12" :class="styles.grid">
        
        <div v-for="item in items" :key="item" :class="styles.item">
          <Text weight="semibold">{{ item }}</Text>
          
        </div>
        
      </SimpleGrid>
    `,
  }),
};

export const AutoResponsive: Story = {
  render: () => ({
    components: { SimpleGrid, Text },
    setup: () => ({ items, styles }),
    template: `
      <SimpleGrid :min-child-width="160" :gap="12" :class="styles.grid">
        
        <div v-for="item in items" :key="item" :class="styles.item">
          <Text weight="semibold">{{ item }}</Text>
          <Text tone="muted">The column count follows the available width.</Text>
        </div>
        
      </SimpleGrid>
    `,
  }),
};

export const SeparateGaps: Story = {
  render: () => ({
    components: { SimpleGrid, Text },
    setup: () => ({ items, styles }),
    template: `
      <SimpleGrid :columns="3" :row-gap="24" :column-gap="8" :class="styles.grid">
        
        <div v-for="item in items" :key="item" :class="styles.item">
          <Text weight="semibold">{{ item }}</Text>
          
        </div>
        
      </SimpleGrid>
    `,
  }),
};

export const SemanticElement: Story = {
  render: () => ({
    components: { SimpleGrid, Text },
    setup: () => ({ items, styles }),
    template: `
      <SimpleGrid as-child min-child-width="10rem" :gap="12" :class="styles.grid">
        <section aria-label="Workspace sections">
        <div v-for="item in items" :key="item" :class="styles.item">
          <Text weight="semibold">{{ item }}</Text>
          
        </div>
        </section>
      </SimpleGrid>
    `,
  }),
};