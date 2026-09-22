import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
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

test('renders the short root form with default segments, stable hooks, and a forwarded ref', () => {
  let ref!: HTMLDivElement;

  const { container } = render(() => (
    <Timer ref={(element) => (ref = element)} data-testid="timer" targetMs={60_000}>
      <TimerSegments />
    </Timer>
  ));

  const root = screen.getByTestId('timer');
  const area = screen.getByRole('timer');

  expect(ref).toBe(root);
  expect(root).toHaveAttribute('data-slot', 'timer-root');
  expect(area).toHaveAttribute('data-slot', 'timer-area');
  expect(area).toHaveAttribute('aria-atomic', 'true');
  expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(3);
  expect(container.querySelectorAll('[data-slot="timer-separator"]')).toHaveLength(2);
  expect(container.querySelector('[data-type="hours"]')).toBeInTheDocument();
  expect(container.querySelector('[data-type="minutes"]')).toBeInTheDocument();
  expect(container.querySelector('[data-type="seconds"]')).toBeInTheDocument();
});

test('forwards area props and refs through custom segments', () => {
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
  expect(area).toHaveAttribute('aria-label', 'Remaining time');
  expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-slot="timer-separator"]')).toHaveLength(1);
  expect(container.querySelector('[data-type="hours"]')).not.toBeInTheDocument();
  expect(area).toHaveTextContent('·');
});

test('preserves Ark action visibility and native keyboard semantics', async () => {
  render(() => (
    <Timer targetMs={60_000}>
      <TimerSegments />
      <TimerControl>
        <TimerActionTrigger action="start">Start</TimerActionTrigger>
        <TimerActionTrigger action="pause">Pause</TimerActionTrigger>
        <TimerActionTrigger action="reset">Reset</TimerActionTrigger>
      </TimerControl>
    </Timer>
  ));

  const start = screen.getByRole('button', { name: 'Start' });
  const pause = screen.getByText('Pause');
  const reset = screen.getByText('Reset');

  expect(start).toHaveAttribute('type', 'button');
  expect(pause).toHaveAttribute('hidden');
  expect(reset).toHaveAttribute('hidden');

  fireEvent.click(start);

  await waitFor(() => {
    expect(start).toHaveAttribute('hidden');
    expect(pause).not.toHaveAttribute('hidden');
    expect(reset).not.toHaveAttribute('hidden');
  });
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

  const output = screen.getByRole('status');

  expect(output).toHaveTextContent('Idle');

  fireEvent.click(screen.getByRole('button', { name: 'Start provider timer' }));

  await waitFor(() => {
    expect(output).toHaveTextContent('Running');
  });
});

test('preserves semantic replacement children with asChild', () => {
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

  const section = screen.getByTestId('timer-section');

  expect(section).toHaveAttribute('data-scope', 'timer');
  expect(section).toHaveAttribute('data-part', 'root');
  expect(section).toHaveAttribute('data-slot', 'timer-root');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
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

  expect(screen.getByTestId('timer-section')).toBeInTheDocument();
  expect(rootRef).toBeUndefined();
});

test('keeps TimerContext connected to the provider API', () => {
  function ContextStatus() {
    return (
      <TimerContext>
        {(timer) => <output>{timer().running ? 'Running' : 'Idle'}</output>}
      </TimerContext>
    );
  }

  render(() => (
    <Timer targetMs={60_000}>
      <ContextStatus />
    </Timer>
  ));

  expect(screen.getByRole('status')).toHaveTextContent('Idle');
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

  await waitFor(() => {
    expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-slot="timer-separator"]')).toHaveLength(1);
  });
});