import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Timer, useTimer, useTimerContext } from '../src';

test('renders the short root form with default segments, stable hooks, and a forwarded ref', () => {
  let ref!: HTMLDivElement;

  const { container } = render(() => (
    <Timer ref={(element) => (ref = element)} data-testid="timer" targetMs={60_000}>
      <Timer.Segments />
    </Timer>
  ));

  const root = screen.getByTestId('timer');
  const area = screen.getByRole('timer');

  expect(Timer.Root).toBe(Timer);
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
      <Timer.Segments
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
      <Timer.Segments />
      <Timer.Control>
        <Timer.ActionTrigger action="start">Start</Timer.ActionTrigger>
        <Timer.ActionTrigger action="pause">Pause</Timer.ActionTrigger>
        <Timer.ActionTrigger action="reset">Reset</Timer.ActionTrigger>
      </Timer.Control>
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
    <Timer.RootProvider value={timer}>
      <ProviderStatus />
      <Timer.Control>
        <Timer.ActionTrigger action="start">Start provider timer</Timer.ActionTrigger>
      </Timer.Control>
    </Timer.RootProvider>
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
          <Timer.Segments />
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
          <Timer.Segments />
        </section>
      )}
      targetMs={60_000}
    />
  ));

  expect(screen.getByTestId('timer-section')).toBeInTheDocument();
  expect(rootRef).toBeUndefined();
});

test('keeps Timer.Context connected to the provider API', () => {
  function ContextStatus() {
    return (
      <Timer.Context>
        {(timer) => <output>{timer().running ? 'Running' : 'Idle'}</output>}
      </Timer.Context>
    );
  }

  render(() => (
    <Timer targetMs={60_000}>
      <ContextStatus />
    </Timer>
  ));

  expect(screen.getByRole('status')).toHaveTextContent('Idle');
});

test('keeps Timer.Segments reactive when its types change', async () => {
  const [types, setTypes] = createSignal<Array<'minutes' | 'seconds'>>(['minutes']);

  const { container } = render(() => (
    <Timer targetMs={60_000}>
      <Timer.Segments types={types()} />
    </Timer>
  ));

  expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(1);

  setTypes(['minutes', 'seconds']);

  await waitFor(() => {
    expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-slot="timer-separator"]')).toHaveLength(1);
  });
});