import { Field } from '@ark-ui/solid/field';
import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { NativeSelect } from '@/components/native-select/NativeSelect';

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

export const Basic: Story = {
  render: () => (
    <NativeSelect defaultValue="" aria-label="Framework">
      <option value="" disabled>
        Choose framework
      </option>
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="svelte">Svelte</option>
    </NativeSelect>
  ),
};

export const Disabled: Story = {
  render: () => (
    <NativeSelect defaultValue="react" aria-label="Framework" disabled>
      <option value="react">React</option>
      <option value="vue">Vue</option>
    </NativeSelect>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal('react');

    return (
      <NativeSelect
        value={value()}
        aria-label="Framework"
        onChange={(event) => setValue(event.currentTarget.value)}
      >
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="svelte">Svelte</option>
      </NativeSelect>
    );
  },
};

export const AsChild: Story = {
  render: () => (
    <NativeSelect
      asChild={(props) => (
        <select {...props()} value="" aria-label="Framework">
          <option value="" disabled>
            Choose framework
          </option>
          <option value="react">React</option>
          <option value="vue">Vue</option>
        </select>
      )}
    />
  ),
};

export const Grouping: Story = {
  render: () => (
    <NativeSelect defaultValue="" aria-label="Framework">
      <option value="" disabled>
        Choose framework
      </option>
      <optgroup label="UI libraries">
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </optgroup>
      <optgroup label="Meta-frameworks">
        <option value="next">Next.js</option>
        <option value="sveltekit">SvelteKit</option>
      </optgroup>
    </NativeSelect>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field.Root invalid>
      <Field.Label>Framework</Field.Label>
      <NativeSelect defaultValue="" name="framework">
        <option value="" disabled>
          Choose framework
        </option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </NativeSelect>
      <Field.ErrorText>Choose a framework.</Field.ErrorText>
    </Field.Root>
  ),
};

export const Multiple: Story = {
  render: () => (
    <NativeSelect defaultValue={['react', 'vue']} multiple size={3} aria-label="Frameworks">
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="svelte">Svelte</option>
    </NativeSelect>
  ),
};

export const WithField: Story = {
  render: () => (
    <Field.Root required>
      <Field.Label>Framework</Field.Label>
      <NativeSelect defaultValue="" name="framework">
        <option value="" disabled>
          Choose framework
        </option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="svelte">Svelte</option>
      </NativeSelect>
      <Field.HelperText>Select the framework used by this project.</Field.HelperText>
    </Field.Root>
  ),
};