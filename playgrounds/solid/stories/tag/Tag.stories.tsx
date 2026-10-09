import { clsx } from 'clsx';
import { For, createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  Tag,
  TagCloseTrigger,
  TagEndElement,
  TagLabel,
  TagStartElement,
} from '@/components/tag/Tag';
import { CheckIcon } from '@/internal/icons/ui/Icons';
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
          <TagLabel>{variant}</TagLabel>
        </Tag>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class={styles.row}>
      <Tag size="sm">
        <TagLabel>Compact</TagLabel>
      </Tag>
      <Tag size="md">
        <TagLabel>Default</TagLabel>
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
              <TagLabel>{tag.label}</TagLabel>
              <TagEndElement>
                <TagCloseTrigger
                  disabled={tag.disabled}
                  aria-label={`Remove ${tag.label} tag`}
                  onClick={() =>
                    setTags((items) => items.filter((item) => item.label !== tag.label))
                  }
                />
              </TagEndElement>
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
  ),
};

export const TruncatedLabel: Story = {
  render: () => (
    <Tag class={styles.constrained}>
      <TagLabel title="Ready for stakeholder review after legal approval">
        Ready for stakeholder review after legal approval
      </TagLabel>
      <TagEndElement>
        <TagCloseTrigger aria-label="Remove long tag" />
      </TagEndElement>
    </Tag>
  ),
};

export const RenderAsButton: Story = {
  render: () => (
    <Tag
      variant="outline"
      asChild={(props) => (
        <button {...props()} class={clsx(props().class, styles.buttonTag)} type="button">
          <TagLabel>Open filter</TagLabel>
        </button>
      )}
    />
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div class={styles.row}>
      <Tag class={styles.customSoft}>
        <TagStartElement>
          <CheckIcon />
        </TagStartElement>
        <TagLabel>Priority</TagLabel>
        <TagEndElement>
          <TagCloseTrigger aria-label="Remove priority tag" />
        </TagEndElement>
      </Tag>
      <Tag class={styles.customOutline} variant="outline">
        <TagLabel>Customer-facing</TagLabel>
      </Tag>
    </div>
  ),
};