import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from '../field';
import { NativeSelect } from './NativeSelect';

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
    <NativeSelect defaultValue="">
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
    <NativeSelect defaultValue="react" disabled>
      <option value="react">React</option>
      <option value="vue">Vue</option>
    </NativeSelect>
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