import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { h } from 'vue';
import { NumberInput } from '@/components/number-input';
import NumberInputDemo from './NumberInputDemo.vue';

const meta = {
  title: 'Components/NumberInput',
  component: NumberInput,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;
type Scenario =
  | 'basic'
  | 'controlled'
  | 'min-max-and-step'
  | 'fraction-digits'
  | 'scrubber'
  | 'mouse-wheel'
  | 'formatted'
  | 'field-validation'
  | 'disabled-and-read-only'
  | 'value-text'
  | 'root-provider'
  | 'custom-icons'
  | 'context';

function renderScenario(scenario: Scenario) {
  return () => h(NumberInputDemo, { scenario });
}

export const Basic: Story = { render: renderScenario('basic') };
export const Controlled: Story = { render: renderScenario('controlled') };
export const MinMaxAndStep: Story = { render: renderScenario('min-max-and-step') };
export const FractionDigits: Story = { render: renderScenario('fraction-digits') };
export const Scrubber: Story = { render: renderScenario('scrubber') };
export const MouseWheel: Story = { render: renderScenario('mouse-wheel') };
export const Formatted: Story = { render: renderScenario('formatted') };
export const WithFieldValidation: Story = { render: renderScenario('field-validation') };
export const DisabledAndReadOnly: Story = { render: renderScenario('disabled-and-read-only') };
export const ValueText: Story = { render: renderScenario('value-text') };
export const RootProvider: Story = { render: renderScenario('root-provider') };
export const CustomIcons: Story = { render: renderScenario('custom-icons') };
export const Context: Story = { render: renderScenario('context') };