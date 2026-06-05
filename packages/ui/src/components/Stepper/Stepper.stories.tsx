import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperList,
  StepperTitle,
  StepperTrigger,
} from './Stepper';

const steps = [
  {
    step: 1,
    title: 'Account',
    description: 'Create the workspace owner account.',
  },
  {
    step: 2,
    title: 'Profile',
    description: 'Set team details and default locale.',
  },
  {
    step: 3,
    title: 'Billing',
    description: 'Choose the plan and payment method.',
  },
  {
    step: 4,
    title: 'Launch',
    description: 'Review the setup and finish onboarding.',
  },
] as const;

function StepperPreview({
  currentStep = 2,
  interactive = false,
  orientation = 'horizontal',
}: {
  currentStep?: number;
  interactive?: boolean;
  orientation?: 'horizontal' | 'vertical';
}) {
  const [step, setStep] = useState(currentStep);

  return (
    <Stepper currentStep={interactive ? step : currentStep} orientation={orientation}>
      <StepperList>
        {steps.map((item) => (
          <StepperItem key={item.step} step={item.step}>
            <StepperTrigger
              disabled={interactive ? item.step > step + 1 : undefined}
              onClick={interactive ? () => setStep(item.step) : undefined}
              render={interactive ? undefined : <div />}
            >
              <StepperIndicator />
              <StepperContent>
                <StepperTitle>{item.title}</StepperTitle>
                <StepperDescription>{item.description}</StepperDescription>
              </StepperContent>
            </StepperTrigger>
          </StepperItem>
        ))}
      </StepperList>
    </Stepper>
  );
}

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <StepperPreview />,
};

export const Interactive: Story = {
  render: () => <StepperPreview interactive />,
};

export const Vertical: Story = {
  render: () => <StepperPreview orientation="vertical" />,
};

export const LinkComposition: Story = {
  render: () => (
    <Stepper currentStep={2}>
      <StepperList>
        {steps.map((item) => (
          <StepperItem key={item.step} step={item.step}>
            <StepperTrigger render={<a href={`#step-${item.step}`} />}>
              <StepperIndicator />
              <StepperContent>
                <StepperTitle>{item.title}</StepperTitle>
                <StepperDescription>{item.description}</StepperDescription>
              </StepperContent>
            </StepperTrigger>
          </StepperItem>
        ))}
      </StepperList>
    </Stepper>
  ),
};