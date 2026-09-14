import type { Meta, StoryObj } from '@storybook/react-vite';
import { SimpleGrid } from '@/components/simple-grid/SimpleGrid';

const items = ['Analytics', 'Billing', 'Customers', 'Exports', 'Integrations', 'Reports'];
const gridClass = 'w-[min(48rem,calc(100vw-4rem))]';
const itemClass = 'min-w-0 rounded-lg border border-border bg-background p-4';
const titleClass =
  'm-0 text-md leading-6 font-semibold tracking-normal wrap-anywhere text-foreground';
const mutedClass =
  'm-0 text-md leading-6 font-regular tracking-normal wrap-anywhere text-muted-foreground';

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
    <SimpleGrid columns={3} gap={12} className={gridClass}>
      {items.map((item) => (
        <div key={item} className={itemClass}>
          <p className={titleClass}>{item}</p>
        </div>
      ))}
    </SimpleGrid>
  ),
};

export const AutoResponsive: Story = {
  render: () => (
    <SimpleGrid minChildWidth={160} gap={12} className={gridClass}>
      {items.map((item) => (
        <div key={item} className={itemClass}>
          <p className={titleClass}>{item}</p>
          <p className={mutedClass}>The column count follows the available width.</p>
        </div>
      ))}
    </SimpleGrid>
  ),
};

export const SeparateGaps: Story = {
  render: () => (
    <SimpleGrid columns={3} rowGap={24} columnGap={8} className={gridClass}>
      {items.map((item) => (
        <div key={item} className={itemClass}>
          <p className={titleClass}>{item}</p>
        </div>
      ))}
    </SimpleGrid>
  ),
};

export const SemanticElement: Story = {
  render: () => (
    <SimpleGrid asChild minChildWidth="10rem" gap={12} className={gridClass}>
      <section aria-label="Workspace sections">
        {items.map((item) => (
          <div key={item} className={itemClass}>
            <p className={titleClass}>{item}</p>
          </div>
        ))}
      </section>
    </SimpleGrid>
  ),
};