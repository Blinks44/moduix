import { ArrowUpRight, Plus, Star } from '@lucide/vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Button } from '@/components/button';

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

const rowClassName = 'flex flex-wrap items-center justify-center gap-3';
const contentStressClassName = 'grid w-[min(18rem,calc(100vw_-_2rem))] gap-3';
const wrappingButtonClassName = 'whitespace-normal';

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

const buttonComponents = { ArrowUpRight, Button, Plus, Star };

function renderStory(template: string, setup: () => Record<string, unknown> = () => ({})) {
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
      <div :class="rowClassName">
        <Button v-for="variant in variants" :key="variant" :variant="variant">
          {{ variant }}
        </Button>
      </div>
    `,
    () => ({ rowClassName, variants }),
  ),
};

export const Sizes: Story = {
  render: renderStory(
    `
      <div :class="rowClassName">
        <Button v-for="size in sizes" :key="size" :size="size">{{ size }}</Button>
      </div>
    `,
    () => ({ rowClassName, sizes }),
  ),
};

export const Disabled: Story = {
  render: renderStory(`
    <div :class="rowClassName">
      <Button disabled>Disabled</Button>
      <Button as-child disabled variant="outline">
        <a href="#button">Disabled link</a>
      </Button>
    </div>
  `),
};

export const WithIcons: Story = {
  render: renderStory(`
    <div :class="rowClassName">
      <Button>
        <Plus />
        Create Item
      </Button>
      <Button size="icon-sm" variant="outline" aria-label="Small favorite"><Star /></Button>
      <Button size="icon-md" variant="outline" aria-label="Favorite"><Star /></Button>
      <Button size="icon-lg" variant="outline" aria-label="Large favorite"><Star /></Button>
      <Button variant="link">Open Docs <ArrowUpRight /></Button>
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
      <div :class="rowClassName">
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

      return { buttonRef, focusButton, rowClassName };
    },
  ),
};

export const PendingState: Story = {
  render: renderStory(
    '<Button :loading="pending" @click="save">{{ pending ? \'Saving\' : \'Save Changes\' }}</Button>',
    () => {
      const pending = ref(false);
      const save = () => {
        pending.value = true;
        setTimeout(() => (pending.value = false), 1800);
      };

      return { pending, save };
    },
  ),
};

export const ContentStress: Story = {
  render: renderStory(
    `
    <div :class="contentStressClassName">
      <Button :class="wrappingButtonClassName">Approve the updated account recovery settings</Button>
      <Button :class="wrappingButtonClassName" dir="rtl" variant="outline">
        اعتماد إعدادات استرداد الحساب المحدّثة
      </Button>
    </div>
  `,
    () => ({ contentStressClassName, wrappingButtonClassName }),
  ),
};