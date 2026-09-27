import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component, PropType } from 'vue';
import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@/components/field';
import { Fieldset, FieldsetLegend } from '@/components/fieldset';
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupRootProvider,
  useRadioGroup,
} from '@/components/radio-group';
import styles from './RadioGroup.stories.module.css';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const frameworks = ['React', 'Solid', 'Vue'] as const;
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const radioGroupComponents = {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupRootProvider,
} as unknown as Record<string, Component>;

const RadioItems = defineComponent({
  components: radioGroupComponents,
  props: {
    items: { type: Array as PropType<readonly string[]>, default: () => frameworks },
  },
  template: `
    <RadioGroupItem v-for="item in items" :key="item" :value="item">
      <RadioGroupItemControl />
      <RadioGroupItemText>{{ item }}</RadioGroupItemText>
      <RadioGroupItemHiddenInput />
    </RadioGroupItem>
  `,
});

const RadioOptions = defineComponent({
  components: { RadioGroupOption },
  props: {
    items: { type: Array as PropType<readonly string[]>, default: () => frameworks },
  },
  template: `
    <RadioGroupOption v-for="item in items" :key="item" :value="item">
      {{ item }}
    </RadioGroupOption>
  `,
});

const storyComponents: Record<string, Component> = {
  Field,
  FieldErrorText,
  FieldHelperText,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
  ...radioGroupComponents,
  RadioItems,
  RadioOptions,
};

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { frameworks, sizes, styles, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <RadioGroup default-value="React">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioOptions />
    </RadioGroup>
  `),
};

export const InitialValue: Story = {
  render: renderStory(`
    <RadioGroup default-value="Solid">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioItems />
    </RadioGroup>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <RadioGroup v-model="value">
          <RadioGroupLabel>Framework</RadioGroupLabel>
          <RadioItems />
        </RadioGroup>
        <span :class="styles.hint">Current value: {{ value ?? 'none' }}</span>
      </div>
    `,
    () => ({ value: ref<string | null>('React') }),
  ),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <RadioGroupRootProvider :value="radioGroup">
          <RadioGroupLabel>Framework</RadioGroupLabel>
          <RadioItems />
        </RadioGroupRootProvider>
        <button :class="styles.button" type="button" @click="radioGroup.setValue('Solid')">
          Set to Solid
        </button>
      </div>
    `,
    () => ({ radioGroup: useRadioGroup({ defaultValue: 'React' }) }),
  ),
};

export const Orientation: Story = {
  render: renderStory(`
    <RadioGroup orientation="horizontal" default-value="React">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <div :class="styles.inlineItems"><RadioItems /></div>
    </RadioGroup>
  `),
};

export const Sizes: Story = {
  render: renderStory(`
    <RadioGroup default-value="md">
      <RadioGroupLabel>Control Size</RadioGroupLabel>
      <RadioGroupItem v-for="size in sizes" :key="size" :value="size">
        <RadioGroupItemControl :size="size" />
        <RadioGroupItemText>{{ size.toUpperCase() }}</RadioGroupItemText>
        <RadioGroupItemHiddenInput />
      </RadioGroupItem>
    </RadioGroup>
  `),
};

export const Disabled: Story = {
  render: renderStory(`
    <RadioGroup default-value="React" disabled>
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioItems />
    </RadioGroup>
  `),
};

export const ItemDisabled: Story = {
  render: renderStory(`
    <RadioGroup default-value="React">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioGroupOption value="React">React</RadioGroupOption>
      <RadioGroupOption disabled value="Solid">Solid</RadioGroupOption>
      <RadioGroupOption value="Vue">Vue</RadioGroupOption>
    </RadioGroup>
  `),
};

export const ReadOnly: Story = {
  render: renderStory(`
    <RadioGroup default-value="Solid" read-only>
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioItems />
    </RadioGroup>
  `),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <RadioGroup default-value="React" :class="styles.customRoot">
      <RadioGroupLabel>Styled Framework</RadioGroupLabel>
      <RadioGroupItem v-for="item in frameworks" :key="item" :value="item" :class="styles.customItem">
        <RadioGroupItemControl :class="styles.customControl" />
        <RadioGroupItemText>{{ item }}</RadioGroupItemText>
        <RadioGroupItemHiddenInput />
      </RadioGroupItem>
    </RadioGroup>
  `),
};

export const AsChild: Story = {
  render: renderStory(`
    <RadioGroup default-value="React">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioGroupItem
        v-for="item in frameworks"
        :key="item"
        :value="item"
        :class="styles.cardItem"
        as-child
      >
        <label>
          <RadioGroupItemControl />
          <RadioGroupItemText>{{ item }}</RadioGroupItemText>
          <RadioGroupItemHiddenInput />
        </label>
      </RadioGroupItem>
    </RadioGroup>
  `),
};

export const WithIndicator: Story = {
  render: renderStory(`
    <div :class="styles.indicatorStack">
      <div>Framework</div>
      <RadioGroup aria-label="Framework" default-value="React" :class="styles.indicatorRoot">
        <RadioGroupIndicator :class="styles.groupIndicator" />
        <RadioItems />
      </RadioGroup>
    </div>
  `),
};

export const WithFieldset: Story = {
  render: renderStory(`
    <Fieldset :class="styles.fieldset">
      <FieldsetLegend>Select a framework</FieldsetLegend>
      <RadioGroup default-value="React"><RadioItems /></RadioGroup>
    </Fieldset>
  `),
};

export const WithField: Story = {
  render: renderStory(`
    <Field invalid>
      <FieldLabel>Account type</FieldLabel>
      <RadioGroup invalid required name="account-type">
        <RadioOptions :items="['Personal', 'Team']" />
      </RadioGroup>
      <FieldHelperText>Choose the default account context for new projects.</FieldHelperText>
      <FieldErrorText>Choose an account type.</FieldErrorText>
    </Field>
  `),
};