import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@/components/field';
import { NativeSelect } from '@/components/native-select';

const meta = {
  title: 'Components/NativeSelect',
  component: NativeSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof NativeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

const storyComponents = {
  Field,
  FieldErrorText,
  FieldHelperText,
  FieldLabel,
  NativeSelect,
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <NativeSelect aria-label="Framework">
      <option value="" disabled selected>Choose framework</option>
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="svelte">Svelte</option>
    </NativeSelect>
  `),
};

export const Disabled: Story = {
  render: renderStory(`
    <NativeSelect aria-label="Framework" model-value="react" disabled>
      <option value="react">React</option>
      <option value="vue">Vue</option>
    </NativeSelect>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <NativeSelect v-model="value" aria-label="Framework">
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="svelte">Svelte</option>
      </NativeSelect>
    `,
    () => ({ value: ref('react') }),
  ),
};

export const AsChild: Story = {
  render: renderStory(`
    <NativeSelect as-child>
      <select aria-label="Framework">
        <option value="" disabled selected>Choose framework</option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </select>
    </NativeSelect>
  `),
};

export const Grouping: Story = {
  render: renderStory(`
    <NativeSelect aria-label="Framework">
      <option value="" disabled selected>Choose framework</option>
      <optgroup label="UI libraries">
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </optgroup>
      <optgroup label="Meta-frameworks">
        <option value="next">Next.js</option>
        <option value="sveltekit">SvelteKit</option>
      </optgroup>
    </NativeSelect>
  `),
};

export const Invalid: Story = {
  render: renderStory(`
    <Field invalid>
      <FieldLabel>Framework</FieldLabel>
      <NativeSelect name="framework">
        <option value="" disabled selected>Choose framework</option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </NativeSelect>
      <FieldErrorText>Choose a framework.</FieldErrorText>
    </Field>
  `),
};

export const Multiple: Story = {
  render: renderStory(`
    <NativeSelect multiple size="3" aria-label="Frameworks">
      <option value="react" selected>React</option>
      <option value="vue" selected>Vue</option>
      <option value="svelte">Svelte</option>
    </NativeSelect>
  `),
};

export const WithField: Story = {
  render: renderStory(`
    <Field required>
      <FieldLabel>Framework</FieldLabel>
      <NativeSelect name="framework">
        <option value="" disabled selected>Choose framework</option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="svelte">Svelte</option>
      </NativeSelect>
      <FieldHelperText>Select the framework used by this project.</FieldHelperText>
    </Field>
  `),
};