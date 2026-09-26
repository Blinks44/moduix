import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Tag,
  TagCloseTrigger,
  TagEndElement,
  TagLabel,
  TagStartElement,
} from '@/components/tag/Tag';
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
      <div className={rowClass}>
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
    const [tags, setTags] = useState(removableTags);

    return (
      <div className={rowClass}>
        {tags.map((tag) => (
          <Tag key={tag.label} variant={tag.variant}>
            <TagLabel>{tag.label}</TagLabel>
            <TagEndElement>
              <TagCloseTrigger
                disabled={tag.disabled}
                aria-label={`Remove ${tag.label} tag`}
                onClick={() => {
                  setTags((tags) => tags.filter((item) => item.label !== tag.label));
                }}
              />
            </TagEndElement>
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
          <TagStartElement>
            <CheckIcon />
          </TagStartElement>
          <TagLabel>Selected</TagLabel>
        </Tag>
        <Tag variant="outline">
          <TagStartElement>
            <CheckIcon />
          </TagStartElement>
          <TagLabel>Deployed</TagLabel>
          <TagEndElement>
            <TagCloseTrigger aria-label="Remove deployed tag" />
          </TagEndElement>
        </Tag>
      </div>
    );
  },
};

export const TruncatedLabel: Story = {
  render: () => {
    return (
      <Tag className={constrainedClass}>
        <TagLabel title="Ready for stakeholder review after legal approval">
          Ready for stakeholder review after legal approval
        </TagLabel>
        <TagEndElement>
          <TagCloseTrigger aria-label="Remove long tag" />
        </TagEndElement>
      </Tag>
    );
  },
};

export const RenderAsButton: Story = {
  render: () => {
    return (
      <Tag asChild variant="outline">
        <button className={buttonTagClass} type="button">
          <TagLabel>Open filter</TagLabel>
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
          <TagStartElement>
            <CheckIcon />
          </TagStartElement>
          <TagLabel>Priority</TagLabel>
          <TagEndElement>
            <TagCloseTrigger aria-label="Remove priority tag" />
          </TagEndElement>
        </Tag>
        <Tag className={customOutlineClass} variant="outline">
          <TagLabel>Customer-facing</TagLabel>
        </Tag>
      </div>
    );
  },
};