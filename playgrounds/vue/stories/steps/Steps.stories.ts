import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import {
  Steps,
  StepsCompletedContent,
  StepsContent,
  StepsIndicator,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsProgress,
  StepsRootProvider,
  StepsSeparator,
  StepsTrigger,
  useSteps,
} from '@/components/steps';

const items = [
  {
    title: 'Account',
    description: 'Create the workspace owner account.',
  },
  {
    title: 'Profile',
    description: 'Set team details and default locale.',
  },
  {
    title: 'Billing',
    description: 'Choose the plan and payment method.',
  },
];

const actionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 'var(--moduix-spacing-2)',
};
const stackStyle = {
  display: 'grid',
  gap: 'var(--moduix-spacing-3)',
};

const stepsComponents = {
  Steps,
  StepsCompletedContent,
  StepsContent,
  StepsIndicator,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsProgress,
  StepsRootProvider,
  StepsSeparator,
  StepsTrigger,
};

const StepsNavigation = defineComponent({
  components: stepsComponents,
  setup: () => ({ items }),
  template: `
    <StepsList>
      <StepsItem v-for="(item, index) in items" :key="item.title" :index="index">
        <StepsTrigger>
          <StepsIndicator />
          <span>{{ item.title }}</span>
        </StepsTrigger>
        <StepsSeparator />
      </StepsItem>
    </StepsList>
  `,
});

const StepsPanels = defineComponent({
  components: stepsComponents,
  setup: () => ({ items }),
  template: `
    <template v-for="(item, index) in items" :key="item.title">
      <StepsContent :index="index">{{ item.title }} - {{ item.description }}</StepsContent>
    </template>
    <StepsCompletedContent>Steps complete. The workspace is ready.</StepsCompletedContent>
  `,
});

const StepsActions = defineComponent({
  components: stepsComponents,
  setup: () => ({ actionsStyle }),
  template: `
    <div :style="actionsStyle">
      <StepsPrevTrigger>Back</StepsPrevTrigger>
      <StepsNextTrigger>Next</StepsNextTrigger>
    </div>
  `,
});

const storyComponents = { ...stepsComponents, StepsActions, StepsNavigation, StepsPanels };

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { items, stackStyle, ...setup?.() };
      },
      template,
    });
}

const meta = {
  title: 'Components/Steps',
  component: Steps,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Steps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: renderStory(`
    <Steps :count="items.length">
      <StepsNavigation />
      <StepsPanels />
      <StepsActions />
    </Steps>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :style="stackStyle">
        <output>Current step: {{ step + 1 }}</output>
        <Steps v-model:step="step" :count="items.length">
          <StepsNavigation />
          <StepsPanels />
          <StepsActions />
        </Steps>
      </div>
    `,
    () => ({ step: ref(1) }),
  ),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :style="stackStyle">
        <output>Current step: {{ steps.value + 1 }}</output>
        <StepsRootProvider :value="steps">
          <StepsNavigation />
          <StepsPanels />
          <StepsActions />
        </StepsRootProvider>
      </div>
    `,
    () => ({ steps: useSteps({ count: items.length }) }),
  ),
};

export const Validation: Story = {
  render: renderStory(
    `
      <div :style="stackStyle">
        <button type="button" @click="toggleAccount">
          {{ isAccountValid ? 'Mark account unverified' : 'Verify account' }}
        </button>
        <Steps
          :count="items.length"
          linear
          :is-step-valid="isStepValid"
          @step-invalid="handleStepInvalid"
        >
          <StepsNavigation />
          <StepsPanels />
          <StepsActions />
        </Steps>
        <output>{{ message }}</output>
      </div>
    `,
    () => {
      const isAccountValid = ref(false);
      const message = ref('Verify the account before continuing.');
      const toggleAccount = () => {
        const wasValid = isAccountValid.value;
        isAccountValid.value = !wasValid;
        message.value = wasValid ? 'Account needs verification.' : 'Account is verified.';
      };
      return {
        handleStepInvalid: (details: { step: number; action: 'next' | 'set' }) => {
          message.value = `Step ${details.step + 1} must be valid before moving ${details.action}.`;
        },
        isAccountValid,
        isStepValid: (index: number) => index !== 0 || isAccountValid.value,
        message,
        toggleAccount,
      };
    },
  ),
};

export const Vertical: Story = {
  render: renderStory(`
    <Steps :count="items.length" :default-step="1" orientation="vertical">
      <StepsNavigation />
      <StepsPanels />
      <StepsActions />
    </Steps>
  `),
};

export const LinkComposition: Story = {
  render: renderStory(`
    <Steps :count="items.length" :default-step="1" :linear="false">
      <StepsList>
        <StepsItem v-for="(item, index) in items" :key="item.title" :index="index">
          <StepsTrigger as-child>
            <a :href="\`#step-\${index + 1}\`">
              <StepsIndicator />
              <span>{{ item.title }}</span>
            </a>
          </StepsTrigger>
          <StepsSeparator />
        </StepsItem>
      </StepsList>
      <StepsPanels />
      <StepsActions />
    </Steps>
  `),
};

export const Progress: Story = {
  render: renderStory(`
    <Steps :count="items.length" :default-step="1">
      <StepsProgress />
      <StepsNavigation />
      <StepsPanels />
      <StepsActions />
    </Steps>
  `),
};