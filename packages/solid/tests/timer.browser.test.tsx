import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Timer,
  TimerActionTrigger,
  TimerContext,
  TimerControl,
  TimerRootProvider,
  TimerSegments,
  useTimer,
  useTimerContext,
} from '../src';

test('renders the short root form with default segments, stable hooks, and a forwarded ref', async () => {
  let ref!: HTMLDivElement;

  const { container } = render(() => (
    <Timer ref={(element) => (ref = element)} data-testid="timer" targetMs={60_000}>
      <TimerSegments />
    </Timer>
  ));

  const root = screen.getByTestId('timer');

  expect(ref).toBe(root);
  await expect.element(page.getByTestId('timer')).toHaveAttribute('data-slot', 'timer-root');
  await expect.element(page.getByRole('timer')).toHaveAttribute('data-slot', 'timer-area');
  await expect.element(page.getByRole('timer')).toHaveAttribute('aria-atomic', 'true');
  expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(3);
  expect(container.querySelectorAll('[data-slot="timer-separator"]')).toHaveLength(2);
  await expect.element(page.locator('[data-type="hours"]')).toBeAttached();
  await expect.element(page.locator('[data-type="minutes"]')).toBeAttached();
  await expect.element(page.locator('[data-type="seconds"]')).toBeAttached();
});

test('forwards area props and refs through custom segments', async () => {
  let ref!: HTMLDivElement;

  const { container } = render(() => (
    <Timer targetMs={60_000}>
      <TimerSegments
        ref={(element) => (ref = element)}
        aria-label="Remaining time"
        data-testid="custom-segments"
        separator="·"
        types={['minutes', 'seconds']}
      />
    </Timer>
  ));

  const area = screen.getByTestId('custom-segments');

  expect(ref).toBe(area);
  await expect
    .element(page.getByTestId('custom-segments'))
    .toHaveAttribute('aria-label', 'Remaining time');
  expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-slot="timer-separator"]')).toHaveLength(1);
  await expect.element(page.locator('[data-type="hours"]')).toHaveCount(0);
  await expect.element(page.getByTestId('custom-segments')).toContainText('·');
});

test('preserves Ark action visibility and native keyboard semantics', async () => {
  render(() => (
    <Timer targetMs={60_000}>
      <TimerSegments />
      <TimerContext>
        {(timer) => (
          <output data-testid="timer-context">{timer().running ? 'Running' : 'Idle'}</output>
        )}
      </TimerContext>
      <TimerControl>
        <TimerActionTrigger action="start">Start</TimerActionTrigger>
        <TimerActionTrigger action="pause">Pause</TimerActionTrigger>
        <TimerActionTrigger action="reset">Reset</TimerActionTrigger>
      </TimerControl>
    </Timer>
  ));

  const startLocator = page.getByText('Start', { exact: true });
  await expect.element(startLocator).toHaveAttribute('type', 'button');
  await expect.element(page.getByText('Pause')).toHaveAttribute('hidden');
  await expect.element(page.getByText('Reset')).toHaveAttribute('hidden');

  await expect.element(page.getByTestId('timer-context')).toHaveText('Idle');
  await startLocator.press('Enter');
  await expect.element(page.getByTestId('timer-context')).toHaveText('Running');

  await expect.element(startLocator).toHaveAttribute('hidden');
  await expect.element(page.getByText('Pause')).not.toHaveAttribute('hidden');
  await expect.element(page.getByText('Reset')).not.toHaveAttribute('hidden');
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await expect.element(page.getByText('Pause', { exact: true })).toHaveAttribute('hidden');
  await expect.element(startLocator).toHaveAttribute('hidden');
  await expect.element(page.getByTestId('timer-context')).toHaveText('Idle');
  await page.getByRole('button', { name: 'Reset', exact: true }).press('Enter');
  await expect.element(startLocator).not.toHaveAttribute('hidden');
  await expect.element(page.getByText('Reset', { exact: true })).toHaveAttribute('hidden');
  await expect.element(page.getByRole('timer')).toContainText('00:00:00');
});

function ProviderStatus() {
  const timer = useTimerContext();

  return <output>{timer().running ? 'Running' : 'Idle'}</output>;
}

function ProviderTimer() {
  const timer = useTimer({ targetMs: 60_000 });

  return (
    <TimerRootProvider value={timer}>
      <ProviderStatus />
      <TimerControl>
        <TimerActionTrigger action="start">Start provider timer</TimerActionTrigger>
      </TimerControl>
    </TimerRootProvider>
  );
}

test('keeps the RootProvider and context hook path available', async () => {
  render(() => <ProviderTimer />);

  await expect.element(page.getByRole('status')).toContainText('Idle');

  await page.getByRole('button', { name: 'Start provider timer', exact: true }).click();

  await expect.element(page.getByRole('status')).toContainText('Running');
});

test('preserves semantic replacement children with asChild', async () => {
  render(() => (
    <Timer
      asChild={(props) => (
        <section {...props()} data-testid="timer-section">
          <TimerSegments />
        </section>
      )}
      targetMs={60_000}
    />
  ));

  const sectionLocator = page.getByTestId('timer-section');
  await expect.element(sectionLocator).toHaveAttribute('data-scope', 'timer');
  await expect.element(sectionLocator).toHaveAttribute('data-part', 'root');
  await expect.element(sectionLocator).toHaveAttribute('data-slot', 'timer-root');
});

test('does not forward refs through native Ark Solid asChild composition', async () => {
  let rootRef: HTMLDivElement | undefined;

  render(() => (
    <Timer
      ref={(element) => (rootRef = element)}
      asChild={(props) => (
        <section {...props()} data-testid="timer-section">
          <TimerSegments />
        </section>
      )}
      targetMs={60_000}
    />
  ));

  await expect.element(page.getByTestId('timer-section')).toBeAttached();
  expect(rootRef).toBeUndefined();
});

test('keeps TimerSegments reactive when its types change', async () => {
  const [types, setTypes] = createSignal<Array<'minutes' | 'seconds'>>(['minutes']);

  const { container } = render(() => (
    <Timer targetMs={60_000}>
      <TimerSegments types={types()} />
    </Timer>
  ));

  expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(1);

  setTypes(['minutes', 'seconds']);

  await expect.poll(() => container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(2);
  await expect
    .poll(() => container.querySelectorAll('[data-slot="timer-separator"]'))
    .toHaveLength(1);
});