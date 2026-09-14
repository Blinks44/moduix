import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Steps } from '@/components/steps/Steps';

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

function StepsList() {
  return (
    <Steps.List>
      {items.map((item, index) => (
        <Steps.Item index={index}>
          <Steps.Trigger>
            <Steps.Indicator />
            <span>{item.title}</span>
          </Steps.Trigger>
          <Steps.Separator />
        </Steps.Item>
      ))}
    </Steps.List>
  );
}

function StepsPanels() {
  return (
    <>
      {items.map((item, index) => (
        <Steps.Content index={index}>
          {item.title} - {item.description}
        </Steps.Content>
      ))}
      <Steps.CompletedContent>Steps complete. The workspace is ready.</Steps.CompletedContent>
    </>
  );
}

function StepsActions() {
  return (
    <div class="flex justify-end gap-2">
      <Steps.PrevTrigger>Back</Steps.PrevTrigger>
      <Steps.NextTrigger>Next</Steps.NextTrigger>
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
      <StepsList />
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
          <StepsList />
          <StepsPanels />
          <StepsActions />
        </Steps>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const steps = Steps.useSteps({ count: items.length });

    return (
      <div class="grid gap-3">
        <output>Current step: {steps().value + 1}</output>
        <Steps.RootProvider value={steps}>
          <StepsList />
          <StepsPanels />
          <StepsActions />
        </Steps.RootProvider>
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
          <StepsList />
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
      <StepsList />
      <StepsPanels />
      <StepsActions />
    </Steps>
  ),
};

export const LinkComposition: Story = {
  render: () => (
    <Steps count={items.length} defaultStep={1} linear={false}>
      <Steps.List>
        {items.map((item, index) => (
          <Steps.Item index={index}>
            <Steps.Trigger
              asChild={(props) => (
                <a {...props()} href={`#step-${index + 1}`}>
                  <Steps.Indicator />
                  <span>{item.title}</span>
                </a>
              )}
            />
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>
      <StepsPanels />
      <StepsActions />
    </Steps>
  ),
};

export const Progress: Story = {
  render: () => (
    <Steps count={items.length} defaultStep={1}>
      <Steps.Progress />
      <StepsList />
      <StepsPanels />
      <StepsActions />
    </Steps>
  ),
};