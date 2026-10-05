import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Timer,
  TimerActionTrigger,
  TimerArea,
  TimerContext,
  TimerControl,
  TimerItem,
  TimerRootProvider,
  TimerSegments,
  TimerSeparator,
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

test('uses native utilities on every owned part and merges consumer overrides', async () => {
  const { container } = render(() => (
    <Timer class="block gap-6 text-primary" targetMs={60_000}>
      <TimerArea class="text-lg">
        <TimerItem class="min-w-0" type="minutes" />
        <TimerSeparator class="text-primary">:</TimerSeparator>
      </TimerArea>
      <TimerControl>
        <TimerActionTrigger class="rounded-full bg-primary" action="start">
          Start
        </TimerActionTrigger>
      </TimerControl>
    </Timer>
  ));

  const root = container.querySelector('[data-slot="timer-root"]');
  const area = container.querySelector('[data-slot="timer-area"]');
  const item = container.querySelector('[data-slot="timer-item"]');
  const separator = container.querySelector('[data-slot="timer-separator"]');
  const control = container.querySelector('[data-slot="timer-control"]');
  const trigger = screen.getByRole('button', { name: 'Start' });

  expect([...root!.classList]).toEqual(expect.arrayContaining(['block', 'gap-6', 'text-primary']));
  expect(
    ['inline-grid', 'gap-3', 'text-foreground'].some((name) => root!.classList.contains(name)),
  ).toBe(false);
  expect([...area!.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'gap-1', 'text-lg', 'tabular-nums']),
  );
  expect(area!.classList.contains('text-2xl')).toBe(false);
  expect([...item!.classList]).toEqual(expect.arrayContaining(['min-w-0', 'text-center']));
  expect(item!.classList.contains('min-w-[2ch]')).toBe(false);
  expect([...separator!.classList]).toEqual(expect.arrayContaining(['text-primary']));
  expect(separator!.classList.contains('text-muted-foreground')).toBe(false);
  expect([...control!.classList]).toEqual(expect.arrayContaining(['inline-flex', 'gap-2']));
  expect([...trigger!.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'min-h-control-md', 'border', 'bg-primary']),
  );
  expect(['rounded-md', 'bg-background'].some((name) => trigger!.classList.contains(name))).toBe(
    false,
  );
  await expect.element(page.locator('[data-slot="timer-root"]')).toHaveCSS('display', 'block');
  await expect.element(page.locator('[data-slot="timer-root"]')).toHaveCSS('gap', '24px');
  await expect.element(page.getByRole('timer')).toHaveCSS('font-size', '18px');
  await expect
    .element(page.locator('[data-slot="timer-item"]').nth(0))
    .toHaveCSS('min-width', '0px');
});