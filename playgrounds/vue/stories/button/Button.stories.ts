import { Plus } from '@lucide/vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Button } from '@/components/button';
import styles from './Button.stories.module.css';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = [
  'default',
  'outline',
  'secondary',
  'destructive',
  'destructive-outline',
  'ghost',
  'link',
] as const;

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const buttonComponents = { Button, Plus };

function renderStory(template: string, setup: () => Record<string, unknown> = () => ({ styles })) {
  return () =>
    defineComponent({
      components: buttonComponents,
      setup,
      template,
    });
}

export const Basic: Story = {
  render: renderStory('<Button>Button</Button>'),
};

export const Variants: Story = {
  render: renderStory(
    `
      <div :class="styles.row">
        <Button v-for="variant in variants" :key="variant" :variant="variant">
          {{ variant }}
        </Button>
      </div>
    `,
    () => ({ styles, variants }),
  ),
};

export const Sizes: Story = {
  render: renderStory(
    `
      <div :class="styles.row">
        <Button v-for="size in sizes" :key="size" :size="size">{{ size }}</Button>
      </div>
    `,
    () => ({ styles, sizes }),
  ),
};

export const Disabled: Story = {
  render: renderStory(`
    <div :class="styles.row">
      <Button disabled>Disabled</Button>
      <Button as-child disabled variant="outline">
        <a href="#button">Disabled link</a>
      </Button>
    </div>
  `),
};

export const WithIcons: Story = {
  render: renderStory(`
    <div :class="styles.row">
      <Button>
        <Plus aria-hidden="true" focusable="false" :stroke-width="3" />
        Create Item
      </Button>
      <Button size="icon-sm" variant="outline" aria-label="Small favorite">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <path
            d="M12 3.75 14.7 9.22l5.93.86-4.29 4.18 1.01 5.9L12 17.32l-5.35 2.84 1.02-5.9-4.3-4.18 5.94-.86L12 3.75Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Button>
      <Button size="icon-md" variant="outline" aria-label="Favorite">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <path
            d="M12 3.75 14.7 9.22l5.93.86-4.29 4.18 1.01 5.9L12 17.32l-5.35 2.84 1.02-5.9-4.3-4.18 5.94-.86L12 3.75Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Button>
      <Button size="icon-lg" variant="outline" aria-label="Large favorite">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <path
            d="M12 3.75 14.7 9.22l5.93.86-4.29 4.18 1.01 5.9L12 17.32l-5.35 2.84 1.02-5.9-4.3-4.18 5.94-.86L12 3.75Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Button>
      <Button variant="link">
        Open Docs
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <path
            d="M7 17 17 7M9 7h8v8"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Button>
    </div>
  `),
};

export const AsChildLink: Story = {
  render: renderStory(`
    <Button as-child variant="outline">
      <a href="#button">Open Button Docs</a>
    </Button>
  `),
};

export const Ref: Story = {
  render: renderStory(
    `
      <div :class="styles.row">
        <Button ref="buttonRef">Focus target</Button>
        <Button variant="outline" @click="focusButton">Focus first button</Button>
      </div>
    `,
    () => {
      const buttonRef = ref<ComponentPublicInstance | null>(null);
      const focusButton = () => {
        const element = buttonRef.value?.$el;
        if (element instanceof HTMLButtonElement) element.focus();
      };

      return { buttonRef, focusButton, styles };
    },
  ),
};

export const PendingState: Story = {
  render: renderStory(
    '<Button :loading="pending" @click="save"><span v-if="pending" :class="styles.spinner" role="presentation" aria-hidden="true"></span>{{ pending ? \'Saving\' : \'Save Changes\' }}</Button>',
    () => {
      const pending = ref(false);
      const save = () => {
        pending.value = true;
        setTimeout(() => (pending.value = false), 1800);
      };

      return { pending, save, styles };
    },
  ),
};

export const ContentStress: Story = {
  render: renderStory(`
    <div :class="styles.contentStress">
      <Button :class="styles.wrappingButton">Approve the updated account recovery settings</Button>
      <Button :class="styles.wrappingButton" dir="rtl" variant="outline">
        اعتماد إعدادات استرداد الحساب المحدّثة
      </Button>
    </div>
  `),
};