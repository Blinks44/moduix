import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../text';
import { SimpleGrid } from './SimpleGrid';
import styles from './SimpleGrid.stories.module.css';

const items = ['Analytics', 'Billing', 'Customers', 'Exports', 'Integrations', 'Reports'];

const meta = {
  title: 'Components/SimpleGrid',
  component: SimpleGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SimpleGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Columns: Story = {
  render: () => (
    <SimpleGrid columns={3} gap={12} className={styles.grid}>
      {items.map((item) => (
        <div key={item} className={styles.item}>
          <Text weight="semibold">{item}</Text>
        </div>
      ))}
    </SimpleGrid>
  ),
};

export const AutoResponsive: Story = {
  render: () => (
    <SimpleGrid minChildWidth={160} gap={12} className={styles.grid}>
      {items.map((item) => (
        <div key={item} className={styles.item}>
          <Text weight="semibold">{item}</Text>
          <Text tone="muted">The column count follows the available width.</Text>
        </div>
      ))}
    </SimpleGrid>
  ),
};

export const SeparateGaps: Story = {
  render: () => (
    <SimpleGrid columns={3} rowGap={24} columnGap={8} className={styles.grid}>
      {items.map((item) => (
        <div key={item} className={styles.item}>
          <Text weight="semibold">{item}</Text>
        </div>
      ))}
    </SimpleGrid>
  ),
};

export const SemanticElement: Story = {
  render: () => (
    <SimpleGrid asChild minChildWidth="10rem" gap={12} className={styles.grid}>
      <section aria-label="Workspace sections">
        {items.map((item) => (
          <div key={item} className={styles.item}>
            <Text weight="semibold">{item}</Text>
          </div>
        ))}
      </section>
    </SimpleGrid>
  ),
};