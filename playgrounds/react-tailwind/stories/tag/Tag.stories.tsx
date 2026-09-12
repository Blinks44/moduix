import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tag } from '@/components/tag/Tag';
import { CheckIcon } from '@/lib/moduix/icons/ui';

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

const rowClass = 'flex flex-wrap items-center gap-3';
const constrainedClass = 'max-w-72';
const buttonTagClass = 'appearance-none cursor-pointer';
const customSoftClass = 'border-primary/35 bg-primary/15 text-primary';
const customOutlineClass = 'border-foreground/20 text-primary';

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive'] as const;
const removableTags: {
  label: string;
  variant: (typeof variants)[number];
  disabled?: boolean;
}[] = [
  { label: 'TypeScript', variant: 'default' },
  { label: 'Design review', variant: 'secondary' },
  { label: 'Needs approval', variant: 'outline', disabled: true },
];

export const Basic: Story = {};

export const Variants: Story = {
  render: () => {
    return (
      <div className={rowClass}>
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
      <div className={rowClass}>
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
    const [tags, setTags] = useState(removableTags);

    return (
      <div className={rowClass}>
        {tags.map((tag) => (
          <Tag key={tag.label} variant={tag.variant}>
            <Tag.Label>{tag.label}</Tag.Label>
            <Tag.EndElement>
              <Tag.CloseTrigger
                disabled={tag.disabled}
                aria-label={`Remove ${tag.label} tag`}
                onClick={() => {
                  setTags((tags) => tags.filter((item) => item.label !== tag.label));
                }}
              />
            </Tag.EndElement>
          </Tag>
        ))}
      </div>
    );
  },
};

export const WithLeadingIcon: Story = {
  render: () => {
    return (
      <div className={rowClass}>
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
            <Tag.CloseTrigger aria-label="Remove deployed tag" />
          </Tag.EndElement>
        </Tag>
      </div>
    );
  },
};

export const TruncatedLabel: Story = {
  render: () => {
    return (
      <Tag className={constrainedClass}>
        <Tag.Label title="Ready for stakeholder review after legal approval">
          Ready for stakeholder review after legal approval
        </Tag.Label>
        <Tag.EndElement>
          <Tag.CloseTrigger aria-label="Remove long tag" />
        </Tag.EndElement>
      </Tag>
    );
  },
};

export const RenderAsButton: Story = {
  render: () => {
    return (
      <Tag asChild variant="outline">
        <button className={buttonTagClass} type="button">
          <Tag.Label>Open filter</Tag.Label>
        </button>
      </Tag>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <div className={rowClass}>
        <Tag className={customSoftClass}>
          <Tag.StartElement>
            <CheckIcon />
          </Tag.StartElement>
          <Tag.Label>Priority</Tag.Label>
          <Tag.EndElement>
            <Tag.CloseTrigger aria-label="Remove priority tag" />
          </Tag.EndElement>
        </Tag>
        <Tag className={customOutlineClass} variant="outline">
          <Tag.Label>Customer-facing</Tag.Label>
        </Tag>
      </div>
    );
  },
};