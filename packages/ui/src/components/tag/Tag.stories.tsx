import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckIcon } from '@/lib/moduix/icons/ui';
import type { TagVariant } from './Tag';
import { Tag } from './Tag';
import styles from './Tag.stories.module.css';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'TypeScript',
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive'] satisfies TagVariant[];

export const Basic: Story = {};

export const Variants: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        {variants.map((variant) => (
          <Tag key={variant} variant={variant}>
            <Tag.Label>{variant}</Tag.Label>
          </Tag>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        <Tag size="sm">
          <Tag.Label>Compact</Tag.Label>
        </Tag>
        <Tag size="md">
          <Tag.Label>Default</Tag.Label>
        </Tag>
      </div>
    );
  },
};

export const Removable: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        <Tag>
          <Tag.Label>TypeScript</Tag.Label>
          <Tag.EndElement>
            <Tag.CloseTrigger />
          </Tag.EndElement>
        </Tag>
        <Tag variant="secondary">
          <Tag.Label>Design review</Tag.Label>
          <Tag.EndElement>
            <Tag.CloseTrigger aria-label="Remove design review tag" />
          </Tag.EndElement>
        </Tag>
        <Tag variant="outline">
          <Tag.Label>Needs approval</Tag.Label>
          <Tag.EndElement>
            <Tag.CloseTrigger disabled />
          </Tag.EndElement>
        </Tag>
      </div>
    );
  },
};

export const WithLeadingIcon: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        <Tag>
          <Tag.StartElement>
            <CheckIcon />
          </Tag.StartElement>
          <Tag.Label>Selected</Tag.Label>
        </Tag>
        <Tag variant="outline">
          <Tag.StartElement>
            <CheckIcon />
          </Tag.StartElement>
          <Tag.Label>Deployed</Tag.Label>
          <Tag.EndElement>
            <Tag.CloseTrigger />
          </Tag.EndElement>
        </Tag>
      </div>
    );
  },
};

export const TruncatedLabel: Story = {
  render: () => {
    return (
      <Tag className={styles.constrained}>
        <Tag.Label title="Ready for stakeholder review after legal approval">
          Ready for stakeholder review after legal approval
        </Tag.Label>
        <Tag.EndElement>
          <Tag.CloseTrigger />
        </Tag.EndElement>
      </Tag>
    );
  },
};

export const RenderAsButton: Story = {
  render: () => {
    return (
      <Tag asChild variant="outline">
        <button className={styles.buttonTag} type="button">
          <Tag.Label>Open filter</Tag.Label>
        </button>
      </Tag>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        <Tag className={styles.customSoft}>
          <Tag.StartElement>
            <CheckIcon />
          </Tag.StartElement>
          <Tag.Label>Priority</Tag.Label>
          <Tag.EndElement>
            <Tag.CloseTrigger />
          </Tag.EndElement>
        </Tag>
        <Tag className={styles.customOutline} variant="outline">
          <Tag.Label>Customer-facing</Tag.Label>
        </Tag>
      </div>
    );
  },
};