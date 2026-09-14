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

test('uses native utilities on every owned part and merges consumer overrides', () => {
  const { container } = render(
    <Timer className="block gap-6 text-primary" targetMs={60_000}>
      <Timer.Area className="text-lg">
        <Timer.Item className="min-w-0" type="minutes" />
        <Timer.Separator className="text-primary">:</Timer.Separator>
      </Timer.Area>
      <Timer.Control>
        <Timer.ActionTrigger className="rounded-full bg-primary" action="start">
          Start
        </Timer.ActionTrigger>
      </Timer.Control>
    </Timer>,
  );

  const root = container.querySelector('[data-slot="timer-root"]');
  const area = container.querySelector('[data-slot="timer-area"]');
  const item = container.querySelector('[data-slot="timer-item"]');
  const separator = container.querySelector('[data-slot="timer-separator"]');
  const control = container.querySelector('[data-slot="timer-control"]');
  const trigger = screen.getByRole('button', { name: 'Start' });

  expect(root).toHaveClass('block', 'gap-6', 'text-primary');
  expect(root).not.toHaveClass('inline-grid', 'gap-3', 'text-foreground');
  expect(area).toHaveClass('inline-flex', 'gap-1', 'text-lg', 'tabular-nums');
  expect(area).not.toHaveClass('text-2xl');
  expect(item).toHaveClass('min-w-0', 'text-center');
  expect(item).not.toHaveClass('min-w-[2ch]');
  expect(separator).toHaveClass('text-primary');
  expect(separator).not.toHaveClass('text-muted-foreground');
  expect(control).toHaveClass('inline-flex', 'gap-2');
  expect(trigger).toHaveClass('inline-flex', 'min-h-control-md', 'border', 'bg-primary');
  expect(trigger).not.toHaveClass('rounded-md', 'bg-background');
});