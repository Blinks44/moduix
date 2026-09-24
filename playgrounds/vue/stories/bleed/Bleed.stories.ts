import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { Bleed } from '@/components/bleed';
import styles from './Bleed.stories.module.css';

const meta = {
  title: 'Components/Bleed',
  component: Bleed,
  tags: ['autodocs'],
  args: {
    inline: 'full',
    block: 'none',
  },
  argTypes: {
    inline: {
      control: 'inline-radio',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    block: {
      control: 'inline-radio',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    asChild: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Bleed>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) =>
    defineComponent({
      components: { Bleed },
      setup() {
        return { args, styles };
      },
      template: `
        <div :class="styles.container">
          <p :class="[styles.text, styles.mutedText]">Container content stays constrained.</p>
          <Bleed v-bind="args" :class="styles.bleed">
            <p :class="[styles.text, styles.semiboldText]">This block bleeds to the viewport edges.</p>
          </Bleed>
          <p :class="[styles.text, styles.mutedText]">Following content returns to the container width.</p>
        </div>
      `,
    }),
};

export const BlockBleed: Story = {
  render: () =>
    defineComponent({
      components: { Bleed },
      setup() {
        return { styles };
      },
      template: `
        <div :class="styles.paddedContainer">
          <p :class="[styles.text, styles.mutedText]">Container padding above.</p>
          <Bleed inline="md" block="md" :class="styles.panel">
            <p :class="styles.text">Inline and block bleed</p>
          </Bleed>
          <p :class="[styles.text, styles.mutedText]">Container padding below.</p>
        </div>
      `,
    }),
};

export const CustomStyling: Story = {
  render: () =>
    defineComponent({
      components: { Bleed },
      setup() {
        return { styles };
      },
      template: `
        <div :class="styles.container">
          <Bleed :class="styles.customBleed">
            <p :class="[styles.text, styles.semiboldText]">Customized bleed amount.</p>
          </Bleed>
        </div>
      `,
    }),
};

export const InlineAmounts: Story = {
  render: () =>
    defineComponent({
      components: { Bleed },
      setup() {
        return { styles };
      },
      template: `
        <div :class="styles.container">
          <Bleed inline="sm" :class="styles.panel"><p :class="styles.text">Small inline bleed</p></Bleed>
          <Bleed inline="lg" :class="styles.panel"><p :class="styles.text">Large inline bleed</p></Bleed>
          <Bleed inline="full" :class="styles.panel"><p :class="styles.text">Full inline bleed</p></Bleed>
        </div>
      `,
    }),
};

export const SemanticElement: Story = {
  render: () =>
    defineComponent({
      components: { Bleed },
      setup() {
        return { styles };
      },
      template: `
        <div :class="styles.container">
          <Bleed as-child :class="styles.figure">
            <figure>
              <div :class="styles.media" />
              <p :class="[styles.text, styles.mutedText, styles.smallText]">
                Full-width media with a constrained parent.
              </p>
            </figure>
          </Bleed>
        </div>
      `,
    }),
};