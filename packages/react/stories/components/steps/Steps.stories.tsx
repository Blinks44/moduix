import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Steps } from '../../../src/components/steps/Steps';

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

const actionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 'var(--moduix-spacing-2)',
} as const;

function StepsList() {
  return (
    <Steps.List>
      {items.map((item, index) => (
        <Steps.Item key={item.title} index={index}>
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
        <Steps.Content key={item.title} index={index}>
          {item.title} - {item.description}
        </Steps.Content>
      ))}
      <Steps.CompletedContent>Steps complete. The workspace is ready.</Steps.CompletedContent>
    </>
  );
}

function StepsActions() {
  return (
    <div style={actionsStyle}>
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
  render: function ControlledStory() {
    const [step, setStep] = useState(1);

    return (
      <div style={{ display: 'grid', gap: 'var(--moduix-spacing-3)' }}>
        <output>Current step: {step + 1}</output>
        <Steps
          count={items.length}
          step={step}
          onStepChange={(details) => {
            setStep(details.step);
          }}
        >
          <StepsList />
          <StepsPanels />
          <StepsActions />
        </Steps>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: function RootProviderStory() {
    const steps = Steps.useSteps({ count: items.length });

    return (
      <div style={{ display: 'grid', gap: 'var(--moduix-spacing-3)' }}>
        <output>Current step: {steps.value + 1}</output>
        <Steps.RootProvider value={steps}>
          <StepsList />
          <StepsPanels />
          <StepsActions />
        </Steps.RootProvider>
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
          <Steps.Item key={item.title} index={index}>
            <Steps.Trigger asChild>
              <a href={`#step-${index + 1}`}>
                <Steps.Indicator />
                <span>{item.title}</span>
              </a>
            </Steps.Trigger>
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