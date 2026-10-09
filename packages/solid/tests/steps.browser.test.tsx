import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
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

  const indicators = container.querySelectorAll('[data-slot="steps-indicator"]');

  await expect.element(page.getByRole('tab').nth(0)).toHaveAttribute('aria-controls');
  await expect.element(page.getByRole('tab').nth(1)).toHaveAttribute('aria-controls');
  expect(indicators[0]!.textContent).toContain('1');
  await expect.element(page.getByRole('button', { name: 'Back', exact: true })).toBeDisabled();

  await page.getByRole('button', { name: 'Next', exact: true }).click();

  await expect.poll(() => changes).toEqual([1]);
  expect(indicators[0]!.hasAttribute('data-complete')).toBe(true);
  expect(Boolean(indicators[0]?.querySelector('svg')?.isConnected)).toBe(true);
});

test('keeps the moduix RootProvider store usable outside the part tree', async () => {
  render(() => <RootProviderSteps />);

  await page.getByRole('button', { name: 'Advance externally', exact: true }).click();

  await expect.element(page.getByRole('status')).toContainText('Current step: 2');
});

test('keeps controlled state synchronized with Ark navigation details', async () => {
  render(() => <ControlledSteps />);

  await page.getByRole('button', { name: 'Next', exact: true }).click();

  await expect.element(page.getByRole('status')).toContainText('Current step: 2');
  await expect
    .element(page.getByRole('tab', { name: /Profile/, exact: true }))
    .toHaveAttribute('aria-selected', 'true');
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

  await page.getByRole('button', { name: 'Next', exact: true }).click();

  await expect.poll(() => invalidSteps).toHaveLength(1);
  expect(invalidSteps[0]).toMatchObject({ step: 0, action: 'next' });

  await page.getByRole('tab', { name: /Profile/, exact: true }).click();

  expect(invalidSteps).toHaveLength(1);
  await expect.element(page.getByRole('tab').nth(0)).toHaveAttribute('aria-selected', 'true');
});