import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  ProgressLinear,
  ProgressLinearContext,
  ProgressLinearLabel,
  ProgressLinearValueText,
  ProgressLinearTrack,
  ProgressLinearRange,
  ProgressLinearRootProvider,
  useProgress,
  useProgressContext,
} from '../src';
import { LocaleProvider } from '../src/locale';

test('renders the linear Ark anatomy with stable hooks and an accessible name', async () => {
  let rootRef!: HTMLDivElement;
  let trackRef!: HTMLDivElement;

  render(() => (
    <ProgressLinear ref={(element) => (rootRef = element)} defaultValue={42}>
      <ProgressLinearLabel>Export data</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack ref={(element) => (trackRef = element)} aria-label="Export data">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  ));

  const progressbar = screen.getByRole('progressbar', { name: 'Export data' });
  const range = progressbar.querySelector('[data-part="range"]')!;

  expect(rootRef.dataset).toMatchObject({
    scope: 'progress',
    part: 'root',
    slot: 'progress-linear-root',
    state: 'loading',
  });
  expect([...rootRef.classList]).toEqual(expect.arrayContaining(['grid', 'w-full']));
  expect(progressbar.getAttribute('data-slot')).toBe('progress-linear-track');
  await expect
    .element(page.getByRole('progressbar', { name: 'Export data' }))
    .toHaveAttribute('aria-valuenow', '42');
  expect([...progressbar.classList]).toEqual(
    expect.arrayContaining(['h-2', 'bg-muted', 'ring-1', 'ring-inset']),
  );
  expect(trackRef).toBe(progressbar);
  expect(range?.getAttribute('data-slot')).toBe('progress-linear-range');
  expect([...range.classList]).toEqual(expect.arrayContaining(['h-full', 'bg-primary']));
  await expect.element(page.getByText('42%')).toHaveAttribute('aria-live', 'polite');
});

test('preserves semantic root composition with asChild', () => {
  let rootRef: HTMLElement | undefined;

  render(() => (
    <ProgressLinear
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} aria-label="Export status" />}
      defaultValue={70}
    >
      <ProgressLinearTrack aria-label="Export status">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  ));

  const root = screen.getByRole('region', { name: 'Export status' });

  expect(root.tagName).toBe('SECTION');
  expect(rootRef).toBeUndefined();
  expect(root.dataset).toMatchObject({ slot: 'progress-linear-root', scope: 'progress' });
});

test('renders an indeterminate linear progressbar without an ARIA value', async () => {
  render(() => (
    <ProgressLinear defaultValue={null}>
      <ProgressLinearTrack aria-label="Preparing report">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  ));

  const progressbar = screen.getByRole('progressbar', { name: 'Preparing report' });
  const range = progressbar.querySelector('[data-part="range"]')!;

  await expect
    .element(page.getByRole('progressbar', { name: 'Preparing report' }))
    .toHaveAttribute('data-state', 'indeterminate');
  await expect
    .element(page.getByRole('progressbar', { name: 'Preparing report' }))
    .not.toHaveAttribute('aria-valuenow');
  expect([...range!.classList]).toEqual(
    expect.arrayContaining([
      'data-[state=indeterminate]:data-[orientation=horizontal]:w-[35%]',
      'data-[state=indeterminate]:data-[orientation=horizontal]:animate-moduix-progress-linear-indeterminate',
    ]),
  );
});

// Pauses the indeterminate animation at its first and last frame and reads the range position.
function sweepEdges(name: string) {
  const track = screen.getByRole('progressbar', { name });
  const range = track.querySelector<HTMLElement>('[data-part="range"]')!;
  const [animation] = range.getAnimations();
  const duration = Number(animation!.effect!.getComputedTiming().duration);
  animation!.pause();
  const frames = [0, duration - 1].map((time) => {
    animation!.currentTime = time;
    return range.getBoundingClientRect();
  });

  return { track: track.getBoundingClientRect(), start: frames[0]!, end: frames[1]! };
}

test('sweeps the indeterminate range from the start edge to the end edge', () => {
  render(() => (
    <>
      <ProgressLinear defaultValue={null}>
        <ProgressLinearTrack aria-label="Sweep horizontal">
          <ProgressLinearRange />
        </ProgressLinearTrack>
      </ProgressLinear>
      <ProgressLinear defaultValue={null} orientation="vertical">
        <ProgressLinearTrack aria-label="Sweep vertical">
          <ProgressLinearRange />
        </ProgressLinearTrack>
      </ProgressLinear>
      <LocaleProvider locale="ar">
        <div lang="ar" dir="rtl">
          <ProgressLinear defaultValue={null}>
            <ProgressLinearTrack aria-label="Sweep rtl">
              <ProgressLinearRange />
            </ProgressLinearTrack>
          </ProgressLinear>
        </div>
      </LocaleProvider>
    </>
  ));

  const ltr = sweepEdges('Sweep horizontal');
  expect(ltr.start.right).toBeLessThanOrEqual(ltr.track.left + 1);
  expect(ltr.end.left).toBeGreaterThanOrEqual(ltr.track.right - 1);

  const rtl = sweepEdges('Sweep rtl');
  expect(rtl.start.left).toBeGreaterThanOrEqual(rtl.track.right - 1);
  expect(rtl.end.right).toBeLessThanOrEqual(rtl.track.left + 1);

  const vertical = sweepEdges('Sweep vertical');
  expect(vertical.start.width).toBeCloseTo(vertical.track.width, 0);
  expect(vertical.start.top).toBeGreaterThanOrEqual(vertical.track.bottom - 1);
  expect(vertical.end.bottom).toBeLessThanOrEqual(vertical.track.top + 1);
});

test('preserves custom bounds and accessible value text', async () => {
  render(() => (
    <ProgressLinear
      defaultValue={420}
      min={200}
      max={800}
      translations={{
        value({ value, max }) {
          return `${value} of ${max} requests completed`;
        },
      }}
    >
      <ProgressLinearContext>
        {(state) => <ProgressLinearValueText>{state().valueAsString}</ProgressLinearValueText>}
      </ProgressLinearContext>
      <ProgressLinearTrack aria-label="Request migration">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  ));

  const progressbar = page.getByRole('progressbar', { name: 'Request migration' });
  await expect.element(progressbar).toHaveAttribute('aria-valuemin', '200');
  await expect.element(progressbar).toHaveAttribute('aria-valuemax', '800');
  await expect.element(progressbar).toHaveAttribute('aria-valuenow', '420');
  await expect
    .element(page.getByText('420 of 800 requests completed'))
    .toHaveAttribute('aria-live', 'polite');
});

function ProgressContextValue() {
  const progress = useProgressContext();

  return <output>{progress().value}</output>;
}

function RootProviderProgress() {
  const progress = useProgress({ defaultValue: 58 });

  return (
    <ProgressLinearRootProvider value={progress} data-testid="progress-provider">
      <ProgressLinearTrack aria-label="Team rollout">
        <ProgressLinearRange />
      </ProgressLinearTrack>
      <ProgressLinearContext>{(state) => <output>{state().value}</output>}</ProgressLinearContext>
      <ProgressContextValue />
    </ProgressLinearRootProvider>
  );
}

test('exposes the flat RootProvider, Context, and hook exports', async () => {
  render(() => <RootProviderProgress />);

  expect(screen.getByTestId('progress-provider').getAttribute('data-slot')).toBe(
    'progress-linear-root-provider',
  );
  await expect
    .element(page.getByRole('progressbar', { name: 'Team rollout' }))
    .toHaveAttribute('aria-valuenow', '58');
  expect(screen.getAllByText('58')).toHaveLength(2);
});

test('lets consumer utilities override defaults on each styled part', () => {
  render(() => (
    <ProgressLinear class="w-80" data-testid="progress-root">
      <ProgressLinearLabel>Export data</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack class="h-4" aria-label="Export data">
        <ProgressLinearRange class="bg-accent" />
      </ProgressLinearTrack>
    </ProgressLinear>
  ));

  const root = screen.getByTestId('progress-root');
  const track = screen.getByRole('progressbar', { name: 'Export data' });
  const range = track.querySelector('[data-part="range"]')!;
  expect(root.classList.contains('w-80')).toBe(true);
  expect(root.classList.contains('w-full')).toBe(false);
  expect(track.classList.contains('h-4')).toBe(true);
  expect(track.classList.contains('h-2')).toBe(false);
  expect(range.classList.contains('bg-accent')).toBe(true);
  expect(range.classList.contains('bg-primary')).toBe(false);
});

test('fills the container width by default', () => {
  render(() => (
    <div style={{ width: '20rem' }}>
      <ProgressLinear defaultValue={40} data-testid="progress-width">
        <ProgressLinearTrack aria-label="Width">
          <ProgressLinearRange />
        </ProgressLinearTrack>
      </ProgressLinear>
    </div>
  ));

  expect(screen.getByTestId('progress-width').offsetWidth).toBe(320);
});