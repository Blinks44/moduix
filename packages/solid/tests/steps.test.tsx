import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Steps,
  StepsCompletedContent,
  StepsContent,
  StepsIndicator,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRootProvider,
  StepsSeparator,
  StepsTrigger,
  useSteps,
} from '../src';

const items = [
  { title: 'Account', content: 'Account content' },
  { title: 'Profile', content: 'Profile content' },
];

function TestSteps(props: {
  onStepChange?: (details: { step: number }) => void;
  step?: number;
  linear?: boolean;
  isStepValid?: (index: number) => boolean;
  onStepInvalid?: (details: { step: number; action: 'next' | 'set'; targetStep?: number }) => void;
}) {
  return (
    <Steps
      count={items.length}
      onStepChange={props.onStepChange}
      step={props.step}
      linear={props.linear}
      isStepValid={props.isStepValid}
      onStepInvalid={props.onStepInvalid}
    >
      <StepsList>
        {items.map((item, index) => (
          <StepsItem index={index}>
            <StepsTrigger>
              <StepsIndicator />
              {item.title}
            </StepsTrigger>
            <StepsSeparator />
          </StepsItem>
        ))}
      </StepsList>
      {items.map((item, index) => (
        <StepsContent index={index}>{item.content}</StepsContent>
      ))}
      <StepsCompletedContent>Complete</StepsCompletedContent>
      <StepsPrevTrigger>Back</StepsPrevTrigger>
      <StepsNextTrigger>Next</StepsNextTrigger>
    </Steps>
  );
}

function ControlledSteps() {
  const [step, setStep] = createSignal(0);

  return (
    <>
      <output>Current step: {step() + 1}</output>
      <TestSteps step={step()} onStepChange={(details) => setStep(details.step)} />
    </>
  );
}

function RootProviderSteps() {
  const steps = useSteps({ count: items.length });

  return (
    <>
      <button type="button" onClick={() => steps().goToNextStep()}>
        Advance externally
      </button>
      <output>Current step: {steps().value + 1}</output>
      <StepsRootProvider value={steps}>
        <StepsList>
          {items.map((item, index) => (
            <StepsItem index={index}>
              <StepsTrigger>{item.title}</StepsTrigger>
            </StepsItem>
          ))}
        </StepsList>
      </StepsRootProvider>
    </>
  );
}

test('preserves Ark navigation details and moduix default indicators', async () => {
  const changes: number[] = [];
  const { container } = render(() => (
    <TestSteps onStepChange={(details) => changes.push(details.step)} />
  ));

  const [account, profile] = screen.getAllByRole('tab');
  const indicators = container.querySelectorAll('[data-slot="steps-indicator"]');

  expect(account).toHaveAttribute('aria-controls');
  expect(profile).toHaveAttribute('aria-controls');
  expect(indicators[0]).toHaveTextContent('1');
  expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();

  fireEvent.click(screen.getByRole('button', { name: 'Next' }));

  await waitFor(() => expect(changes).toEqual([1]));
  expect(indicators[0]).toHaveAttribute('data-complete');
  expect(indicators[0]?.querySelector('svg')).toBeInTheDocument();
});

test('keeps the moduix RootProvider store usable outside the part tree', async () => {
  render(() => <RootProviderSteps />);

  fireEvent.click(screen.getByRole('button', { name: 'Advance externally' }));

  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Current step: 2'));
});

test('keeps controlled state synchronized with Ark navigation details', async () => {
  render(() => <ControlledSteps />);

  fireEvent.click(screen.getByRole('button', { name: 'Next' }));

  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Current step: 2'));
  expect(screen.getByRole('tab', { name: /Profile/ })).toHaveAttribute('aria-selected', 'true');
});

test('preserves Ark linear validation and prevents direct navigation', async () => {
  const invalidSteps: Array<{
    step: number;
    action: 'next' | 'set';
    targetStep?: number;
  }> = [];

  render(() => (
    <TestSteps
      linear
      isStepValid={(index) => index !== 0}
      onStepInvalid={(details) => invalidSteps.push(details)}
    />
  ));

  fireEvent.click(screen.getByRole('button', { name: 'Next' }));

  await waitFor(() => expect(invalidSteps).toHaveLength(1));
  expect(invalidSteps[0]).toMatchObject({ step: 0, action: 'next' });

  const [account] = screen.getAllByRole('tab');
  fireEvent.click(screen.getByRole('tab', { name: /Profile/ }));

  expect(invalidSteps).toHaveLength(1);
  expect(account).toHaveAttribute('aria-selected', 'true');
});