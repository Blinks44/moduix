import { clsx } from 'clsx';
import { createSignal, For } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Tag } from '@/components/tag/Tag';
import { CheckIcon } from '@/lib/moduix/icons/ui/Icons';

const meta = {
  title: 'Components/Tag',
  component: Tag.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'TypeScript',
  },
} satisfies Meta<typeof Tag.Root>;

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
  render: () => (
    <div class={rowClass}>
      <For each={variants}>
        {(variant) => (
          <Tag variant={variant}>
            <Tag.Label>{variant}</Tag.Label>
          </Tag>
        )}
      </For>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class={rowClass}>
      <Tag size="sm">
        <Tag.Label>Compact</Tag.Label>
      </Tag>
      <Tag size="md">
        <Tag.Label>Default</Tag.Label>
      </Tag>
    </div>
  ),
};

export const Removable: Story = {
  render: () => {
    const [tags, setTags] = createSignal(removableTags);

    return (
      <div class={rowClass}>
        <For each={tags()}>
          {(tag) => (
            <Tag variant={tag.variant}>
              <Tag.Label>{tag.label}</Tag.Label>
              <Tag.EndElement>
                <Tag.CloseTrigger
                  disabled={tag.disabled}
                  aria-label={`Remove ${tag.label} tag`}
                  onClick={() =>
                    setTags((items) => items.filter((item) => item.label !== tag.label))
                  }
                />
              </Tag.EndElement>
            </Tag>
          )}
        </For>
      </div>
    );
  },
};

export const WithLeadingIcon: Story = {
  render: () => (
    <div class={rowClass}>
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
  ),
};

export const TruncatedLabel: Story = {
  render: () => (
    <Tag class={constrainedClass}>
      <Tag.Label title="Ready for stakeholder review after legal approval">
        Ready for stakeholder review after legal approval
      </Tag.Label>
      <Tag.EndElement>
        <Tag.CloseTrigger aria-label="Remove long tag" />
      </Tag.EndElement>
    </Tag>
  ),
};

export const RenderAsButton: Story = {
  render: () => (
    <Tag
      variant="outline"
      asChild={(props) => (
        <button {...props()} class={clsx(props().class, buttonTagClass)} type="button">
          <Tag.Label>Open filter</Tag.Label>
        </button>
      )}
    />
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div class={rowClass}>
      <Tag class={customSoftClass}>
        <Tag.StartElement>
          <CheckIcon />
        </Tag.StartElement>
        <Tag.Label>Priority</Tag.Label>
        <Tag.EndElement>
          <Tag.CloseTrigger aria-label="Remove priority tag" />
        </Tag.EndElement>
      </Tag>
      <Tag class={customOutlineClass} variant="outline">
        <Tag.Label>Customer-facing</Tag.Label>
      </Tag>
    </div>
  ),
};