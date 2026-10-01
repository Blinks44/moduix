import { Bell, Star } from '@lucide/vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
import { Toggle, ToggleContext, ToggleIndicator, useToggleContext } from '@/components/toggle';
import { CheckIcon } from '@/lib/moduix/icons/ui';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

const rowClass = 'flex items-center gap-2';
const stackClass = 'flex flex-col items-start gap-3';
const hintClass = 'text-muted-foreground text-xs leading-4';
const customButtonClass = 'border-dashed';
const customToggleClass =
  'border-[color-mix(in_oklab,var(--color-primary)_45%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-primary)_8%,transparent)] text-primary [@media(hover:hover)]:hover:bg-[color-mix(in_oklab,var(--color-primary)_14%,transparent)] active:bg-[color-mix(in_oklab,var(--color-primary)_18%,transparent)]';

const ToggleStateLabel = defineComponent({
  setup() {
    return { toggle: useToggleContext() };
  },
  template: '<span>{{ toggle.pressed ? "Notifications on" : "Notifications off" }}</span>',
});

const storyComponents = {
  Bell,
  CheckIcon,
  Star,
  Toggle,
  ToggleContext,
  ToggleIndicator,
  ToggleStateLabel,
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return {
          customButtonClass,
          customToggleClass,
          hintClass,
          rowClass,
          stackClass,
          ...setup?.(),
        };
      },
      template,
    });
}

export const Default: Story = {
  render: (args) => ({
    components: storyComponents,
    setup: () => ({ args }),
    template: `
      <Toggle default-pressed v-bind="args">
        <Star aria-hidden="true" focusable="false" />
        Favorite
      </Toggle>
    `,
  }),
};

export const Variants: Story = {
  render: renderStory(`
    <div :class="rowClass">
      <Toggle>Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle variant="ghost">Ghost</Toggle>
      <Toggle default-pressed>Pressed</Toggle>
    </div>
  `),
};

export const Sizes: Story = {
  render: renderStory(`
    <div :class="rowClass">
      <Toggle size="xs">XS</Toggle>
      <Toggle size="sm">Small</Toggle>
      <Toggle size="md">Medium</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  `),
};

export const Icons: Story = {
  render: renderStory(`
    <div :class="rowClass">
      <Toggle variant="outline">
        <Bell aria-hidden="true" focusable="false" />
        Alerts
      </Toggle>
      <Toggle size="icon-md" variant="outline" aria-label="Favorites">
        <Star aria-hidden="true" focusable="false" />
      </Toggle>
      <Toggle size="icon-md" variant="ghost" aria-label="Enabled" default-pressed>
        <CheckIcon />
      </Toggle>
    </div>
  `),
};

export const Disabled: Story = {
  render: renderStory(`
    <div :class="rowClass">
      <Toggle disabled>Disabled</Toggle>
      <Toggle default-pressed disabled>Pressed</Toggle>
    </div>
  `),
};

export const ContentResilience: Story = {
  render: renderStory(`
    <div :class="stackClass">
      <Toggle variant="outline">
        <Bell aria-hidden="true" focusable="false" />
        Receive account-security and sign-in notifications
      </Toggle>
      <Toggle size="lg" variant="ghost">Archive 1,248 completed notifications</Toggle>
    </div>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="stackClass">
        <Toggle v-model:pressed="pressed">
          <Bell aria-hidden="true" focusable="false" />
          {{ pressed ? 'Notifications on' : 'Notifications off' }}
        </Toggle>
        <span :class="hintClass">Current value: {{ String(pressed) }}</span>
      </div>
    `,
    () => ({ pressed: ref(false) }),
  ),
};

export const Indicator: Story = {
  render: renderStory(`
    <Toggle aria-label="Favorite" size="icon-md" variant="outline">
      <ToggleIndicator>
        <CheckIcon />
        <template #fallback><Star aria-hidden="true" focusable="false" /></template>
      </ToggleIndicator>
    </Toggle>
  `),
};

export const Context: Story = {
  render: renderStory(`
    <Toggle default-pressed>
      <Bell aria-hidden="true" focusable="false" />
      <ToggleStateLabel />
    </Toggle>
  `),
};

export const AsChild: Story = {
  name: 'asChild',
  render: renderStory(`
    <Toggle as-child variant="outline" default-pressed>
      <button type="button" :class="customButtonClass">
        <CheckIcon />
        Custom button
      </button>
    </Toggle>
  `),
};

export const CustomStyles: Story = {
  name: 'Custom Styles',
  render: renderStory(`
    <Toggle
      :class="customToggleClass"
      variant="outline"
      default-pressed
    >
      <CheckIcon />
      Styled with class
    </Toggle>
  `),
};