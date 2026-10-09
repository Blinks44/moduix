import { CircleX } from '@lucide/vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { CloseButton } from '@/components/close-button';

const meta = {
  title: 'Components/CloseButton',
  component: CloseButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    'aria-label': 'Close',
  },
} satisfies Meta<typeof CloseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const storyComponents = { CircleX, CloseButton };

function renderStory(template: string) {
  return () =>
    defineComponent({
      components: storyComponents,
      template,
    });
}

export const Default: Story = {
  render: renderStory('<CloseButton aria-label="Close" />'),
};

export const CustomChildren: Story = {
  render: renderStory(`
    <CloseButton class="size-10" aria-label="Close panel">
      <CircleX class="size-5" aria-hidden="true" focusable="false" :stroke-width="3" />
    </CloseButton>
  `),
};

export const AsChild: Story = {
  render: renderStory(`
    <CloseButton as-child aria-label="Close">
      <button type="button">
        <CircleX class="size-3" aria-hidden="true" focusable="false" :stroke-width="3" />
      </button>
    </CloseButton>
  `),
};

export const Styled: Story = {
  render: renderStory(`
    <CloseButton
      class="size-10 bg-primary text-primary-foreground [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-foreground [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-primary-foreground"
      aria-label="Close message"
    >
      <CircleX class="size-4" aria-hidden="true" focusable="false" :stroke-width="3" />
    </CloseButton>
  `),
};

export const Disabled: Story = {
  render: renderStory('<CloseButton disabled aria-label="Close" />'),
};

export const AriaDisabled: Story = {
  render: renderStory('<CloseButton aria-disabled="true" aria-label="Close" />'),
};

export const DisabledAsChild: Story = {
  render: renderStory(`
    <CloseButton as-child disabled aria-label="Close">
      <button type="button">
        <CircleX class="size-3" aria-hidden="true" focusable="false" :stroke-width="3" />
      </button>
    </CloseButton>
  `),
};