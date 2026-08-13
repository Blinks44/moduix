import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { Timer, useTimer, useTimerContext } from '../src';

test('renders the short root form with default segments, stable hooks, and a forwarded ref', () => {
  const ref = createRef<HTMLDivElement>();

  const { container } = render(
    <Timer ref={ref} data-testid="timer" targetMs={60_000}>
      <Timer.Segments />
    </Timer>,
  );

  const root = screen.getByTestId('timer');
  const area = screen.getByRole('timer');

  expect(Timer.Root).toBe(Timer);
  expect(ref.current).toBe(root);
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
  const ref = createRef<HTMLDivElement>();

  const { container } = render(
    <Timer targetMs={60_000}>
      <Timer.Segments
        ref={ref}
        aria-label="Remaining time"
        data-testid="custom-segments"
        separator="·"
        types={['minutes', 'seconds']}
      />
    </Timer>,
  );

  const area = screen.getByTestId('custom-segments');

  expect(ref.current).toBe(area);
  expect(area).toHaveAttribute('aria-label', 'Remaining time');
  expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-slot="timer-separator"]')).toHaveLength(1);
  expect(container.querySelector('[data-type="hours"]')).not.toBeInTheDocument();
  expect(area).toHaveTextContent('·');
});

test('preserves Ark action visibility and native keyboard semantics', async () => {
  render(
    <Timer targetMs={60_000}>
      <Timer.Segments />
      <Timer.Control>
        <Timer.ActionTrigger action="start">Start</Timer.ActionTrigger>
        <Timer.ActionTrigger action="pause">Pause</Timer.ActionTrigger>
        <Timer.ActionTrigger action="reset">Reset</Timer.ActionTrigger>
      </Timer.Control>
    </Timer>,
  );

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

  return <output>{timer.running ? 'Running' : 'Idle'}</output>;
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
  render(<ProviderTimer />);

  const output = screen.getByRole('status');

  expect(output).toHaveTextContent('Idle');

  fireEvent.click(screen.getByRole('button', { name: 'Start provider timer' }));

  await waitFor(() => {
    expect(output).toHaveTextContent('Running');
  });
});

test('preserves semantic replacement children with asChild', () => {
  render(
    <Timer asChild targetMs={60_000}>
      <section data-testid="timer-section">
        <Timer.Segments />
      </section>
    </Timer>,
  );

  const section = screen.getByTestId('timer-section');

  expect(section).toHaveAttribute('data-scope', 'timer');
  expect(section).toHaveAttribute('data-part', 'root');
  expect(section).toHaveAttribute('data-slot', 'timer-root');
});