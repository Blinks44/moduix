import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckIcon } from '@/lib/moduix/icons/ui';
import type { TagVariant } from './Tag';
import { Tag, TagLabel, TagRemove } from './Tag';
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
            <TagLabel>{variant}</TagLabel>
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
          <TagLabel>Compact</TagLabel>
        </Tag>
        <Tag size="md">
          <TagLabel>Default</TagLabel>
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
          <TagLabel>TypeScript</TagLabel>
          <TagRemove />
        </Tag>
        <Tag variant="secondary">
          <TagLabel>Design review</TagLabel>
          <TagRemove aria-label="Remove design review tag" />
        </Tag>
        <Tag variant="outline">
          <TagLabel>Needs approval</TagLabel>
          <TagRemove disabled />
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
          <CheckIcon />
          <TagLabel>Selected</TagLabel>
        </Tag>
        <Tag variant="outline">
          <CheckIcon />
          <TagLabel>Deployed</TagLabel>
          <TagRemove />
        </Tag>
      </div>
    );
  },
};

export const TruncatedLabel: Story = {
  render: () => {
    return (
      <Tag className={styles.constrained}>
        <TagLabel title="Ready for stakeholder review after legal approval">
          Ready for stakeholder review after legal approval
        </TagLabel>
        <TagRemove />
      </Tag>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        <Tag className={styles.customSoft}>
          <CheckIcon />
          <TagLabel>Priority</TagLabel>
          <TagRemove />
        </Tag>
        <Tag className={styles.customOutline} variant="outline">
          <TagLabel>Customer-facing</TagLabel>
        </Tag>
      </div>
    );
  },
};