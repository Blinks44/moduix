import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
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
} from '@/components/steps/Steps';

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
] as const;

function StepsNavigation() {
  return (
    <StepsList>
      {items.map((item, index) => (
        <StepsItem index={index}>
          <StepsTrigger>
            <StepsIndicator />
            <span>{item.title}</span>
          </StepsTrigger>
          <StepsSeparator />
        </StepsItem>
      ))}
    </StepsList>
  );
}

function StepsPanels() {
  return (
    <>
      {items.map((item, index) => (
        <StepsContent index={index}>
          {item.title} - {item.description}
        </StepsContent>
      ))}
      <StepsCompletedContent>Steps complete. The workspace is ready.</StepsCompletedContent>
    </>
  );
}

function StepsActions() {
  return (
    <div class="flex justify-end gap-2">
      <StepsPrevTrigger>Back</StepsPrevTrigger>
      <StepsNextTrigger>Next</StepsNextTrigger>
    </div>
  );
}

const meta = {
  title: 'Components/Steps',
  component: Steps,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Steps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Steps count={items.length}>
      <StepsNavigation />
      <StepsPanels />
      <StepsActions />
    </Steps>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [step, setStep] = createSignal(1);

    return (
      <div class="grid gap-3">
        <output>Current step: {step() + 1}</output>
        <Steps count={items.length} step={step()} onStepChange={(details) => setStep(details.step)}>
          <StepsNavigation />
          <StepsPanels />
          <StepsActions />
        </Steps>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const steps = useSteps({ count: items.length });

    return (
      <div class="grid gap-3">
        <output>Current step: {steps().value + 1}</output>
        <StepsRootProvider value={steps}>
          <StepsNavigation />
          <StepsPanels />
          <StepsActions />
        </StepsRootProvider>
      </div>
    );
  },
};

export const Validation: Story = {
  render: () => {
    const [isAccountValid, setIsAccountValid] = createSignal(false);
    const [message, setMessage] = createSignal('Verify the account before continuing.');

    return (
      <div class="grid gap-3">
        <button
          type="button"
          onClick={() => {
            const wasValid = isAccountValid();
            setIsAccountValid(!wasValid);
            setMessage(wasValid ? 'Account needs verification.' : 'Account is verified.');
          }}
        >
          {isAccountValid() ? 'Mark account unverified' : 'Verify account'}
        </button>
        <Steps
          count={items.length}
          linear
          isStepValid={(index) => index !== 0 || isAccountValid()}
          onStepInvalid={(details) => {
            setMessage(`Step ${details.step + 1} must be valid before moving ${details.action}.`);
          }}
        >
          <StepsNavigation />
          <StepsPanels />
          <StepsActions />
        </Steps>
        <output>{message()}</output>
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => (
    <Steps count={items.length} defaultStep={1} orientation="vertical">
      <StepsNavigation />
      <StepsPanels />
      <StepsActions />
    </Steps>
  ),
};

export const LinkComposition: Story = {
  render: () => (
    <Steps count={items.length} defaultStep={1} linear={false}>
      <StepsList>
        {items.map((item, index) => (
          <StepsItem index={index}>
            <StepsTrigger
              asChild={(props) => (
                <a {...props()} href={`#step-${index + 1}`}>
                  <StepsIndicator />
                  <span>{item.title}</span>
                </a>
              )}
            />
            <StepsSeparator />
          </StepsItem>
        ))}
      </StepsList>
      <StepsPanels />
      <StepsActions />
    </Steps>
  ),
};

export const Progress: Story = {
  render: () => (
    <Steps count={items.length} defaultStep={1}>
      <StepsProgress />
      <StepsNavigation />
      <StepsPanels />
      <StepsActions />
    </Steps>
  ),
};
