import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement } from '@/components/tag';
import { CheckIcon } from '@/lib/moduix/icons/ui/Icons';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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
type TagVariant = (typeof variants)[number];
type RemovableTag = { label: string; variant: TagVariant; disabled?: boolean };

const removableTags: RemovableTag[] = [
  { label: 'TypeScript', variant: 'default' },
  { label: 'Design review', variant: 'secondary' },
  { label: 'Needs approval', variant: 'outline', disabled: true },
];
const tagComponents = { CheckIcon, Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement };

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: tagComponents,
      setup() {
        return {
          buttonTagClass,
          constrainedClass,
          customOutlineClass,
          customSoftClass,
          rowClass,
          variants,
          ...setup?.(),
        };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory('<Tag>TypeScript</Tag>'),
};

export const Variants: Story = {
  render: renderStory(`
    <div :class="rowClass">
      <Tag v-for="variant in variants" :key="variant" :variant="variant">
        <TagLabel>{{ variant }}</TagLabel>
      </Tag>
    </div>
  `),
};

export const Sizes: Story = {
  render: renderStory(`
    <div :class="rowClass">
      <Tag size="sm"><TagLabel>Compact</TagLabel></Tag>
      <Tag size="md"><TagLabel>Default</TagLabel></Tag>
    </div>
  `),
};

export const Removable: Story = {
  render: renderStory(
    `
      <div :class="rowClass">
        <Tag v-for="tag in tags" :key="tag.label" :variant="tag.variant">
          <TagLabel>{{ tag.label }}</TagLabel>
          <TagEndElement>
            <TagCloseTrigger
              :disabled="tag.disabled"
              :aria-label="'Remove ' + tag.label + ' tag'"
              @click="removeTag(tag.label)"
            />
          </TagEndElement>
        </Tag>
      </div>
    `,
    () => {
      const tags = ref(removableTags);
      const removeTag = (label: string) => {
        tags.value = tags.value.filter((tag) => tag.label !== label);
      };
      return { removeTag, tags };
    },
  ),
};

export const WithLeadingIcon: Story = {
  render: renderStory(`
    <div :class="rowClass">
      <Tag>
        <TagStartElement><CheckIcon /></TagStartElement>
        <TagLabel>Selected</TagLabel>
      </Tag>
      <Tag variant="outline">
        <TagStartElement><CheckIcon /></TagStartElement>
        <TagLabel>Deployed</TagLabel>
        <TagEndElement><TagCloseTrigger aria-label="Remove deployed tag" /></TagEndElement>
      </Tag>
    </div>
  `),
};

export const TruncatedLabel: Story = {
  render: renderStory(`
    <Tag :class="constrainedClass">
      <TagLabel title="Ready for stakeholder review after legal approval">
        Ready for stakeholder review after legal approval
      </TagLabel>
      <TagEndElement><TagCloseTrigger aria-label="Remove long tag" /></TagEndElement>
    </Tag>
  `),
};

export const RenderAsButton: Story = {
  render: renderStory(`
    <Tag as-child variant="outline">
      <button :class="buttonTagClass" type="button"><TagLabel>Open filter</TagLabel></button>
    </Tag>
  `),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <div :class="rowClass">
      <Tag :class="customSoftClass">
        <TagStartElement><CheckIcon /></TagStartElement>
        <TagLabel>Priority</TagLabel>
        <TagEndElement><TagCloseTrigger aria-label="Remove priority tag" /></TagEndElement>
      </Tag>
      <Tag :class="customOutlineClass" variant="outline">
        <TagLabel>Customer-facing</TagLabel>
      </Tag>
    </div>
  `),
};