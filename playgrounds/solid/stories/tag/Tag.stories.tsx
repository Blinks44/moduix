import { clsx } from 'clsx';
import { For, createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Tag } from '@/components/tag/Tag';
import { CheckIcon } from '@/internal/icons/ui/Icons';
import styles from './Tag.stories.module.css';

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
    <div class={styles.row}>
      {variants.map((variant) => (
        <Tag variant={variant}>
          <Tag.Label>{variant}</Tag.Label>
        </Tag>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class={styles.row}>
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
      <div class={styles.row}>
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
    <div class={styles.row}>
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
    <Tag class={styles.constrained}>
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
        <button {...props()} class={clsx(props().class, styles.buttonTag)} type="button">
          <Tag.Label>Open filter</Tag.Label>
        </button>
      )}
    />
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div class={styles.row}>
      <Tag class={styles.customSoft}>
        <Tag.StartElement>
          <CheckIcon />
        </Tag.StartElement>
        <Tag.Label>Priority</Tag.Label>
        <Tag.EndElement>
          <Tag.CloseTrigger aria-label="Remove priority tag" />
        </Tag.EndElement>
      </Tag>
      <Tag class={styles.customOutline} variant="outline">
        <Tag.Label>Customer-facing</Tag.Label>
      </Tag>
    </div>
  ),
};