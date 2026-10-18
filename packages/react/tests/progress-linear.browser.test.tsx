import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  ProgressLinear,
  ProgressLinearContext,
  ProgressLinearLabel,
  ProgressLinearRange,
  ProgressLinearRootProvider,
  ProgressLinearTrack,
  ProgressLinearValueText,
  useProgress,
  useProgressContext,
} from '../src';
import { LocaleProvider } from '../src/locale';

test('renders the linear Ark anatomy with stable hooks and an accessible name', async () => {
  const rootRef = createRef<HTMLDivElement>();
  const trackRef = createRef<HTMLDivElement>();

  render(
    <ProgressLinear ref={rootRef} defaultValue={42}>
      <ProgressLinearLabel>Export data</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack ref={trackRef} aria-label="Export data">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>,
  );

  const progressbar = screen.getByRole('progressbar', { name: 'Export data' });
  const root = rootRef.current!;

  expect(root.dataset).toMatchObject({
    scope: 'progress',
    part: 'root',
    slot: 'progress-linear-root',
    state: 'loading',
  });
  expect(progressbar.getAttribute('data-slot')).toBe('progress-linear-track');
  await expect
    .element(page.getByRole('progressbar', { name: 'Export data' }))
    .toHaveAttribute('aria-valuenow', '42');
  expect(trackRef.current).toBe(progressbar);
  expect(progressbar.querySelector('[data-part="range"]')?.getAttribute('data-slot')).toBe(
    'progress-linear-range',
  );
  await expect.element(page.getByText('42%')).toHaveAttribute('aria-live', 'polite');
});

test('preserves semantic root composition with asChild', () => {
  const rootRef = createRef<HTMLDivElement>();

  render(
    <ProgressLinear asChild ref={rootRef} defaultValue={70}>
      <section aria-label="Export status">
        <ProgressLinearTrack aria-label="Export status">
          <ProgressLinearRange />
        </ProgressLinearTrack>
      </section>
    </ProgressLinear>,
  );

  const root = screen.getByRole('region', { name: 'Export status' });

  expect(rootRef.current).toBe(root);
  expect(root.dataset).toMatchObject({ slot: 'progress-linear-root', scope: 'progress' });
});

test('renders an indeterminate linear progressbar without an ARIA value', async () => {
  render(
    <ProgressLinear defaultValue={null}>
      <ProgressLinearTrack aria-label="Preparing report">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>,
  );

  await expect
    .element(page.getByRole('progressbar', { name: 'Preparing report' }))
    .toHaveAttribute('data-state', 'indeterminate');
  await expect
    .element(page.getByRole('progressbar', { name: 'Preparing report' }))
    .not.toHaveAttribute('aria-valuenow');
});

function IndeterminateProgress({ orientation }: { orientation: 'horizontal' | 'vertical' }) {
  return (
    <ProgressLinear defaultValue={null} orientation={orientation}>
      <ProgressLinearTrack aria-label={`Sweep ${orientation}`}>
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  );
}

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
  render(
    <>
      <IndeterminateProgress orientation="horizontal" />
      <IndeterminateProgress orientation="vertical" />
      <LocaleProvider locale="ar">
        <div lang="ar" dir="rtl">
          <ProgressLinear defaultValue={null}>
            <ProgressLinearTrack aria-label="Sweep rtl">
              <ProgressLinearRange />
            </ProgressLinearTrack>
          </ProgressLinear>
        </div>
      </LocaleProvider>
    </>,
  );

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
  render(
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
        {(state) => <ProgressLinearValueText>{state.valueAsString}</ProgressLinearValueText>}
      </ProgressLinearContext>
      <ProgressLinearTrack aria-label="Request migration">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>,
  );

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

  return <output>{progress.value}</output>;
}

function RootProviderProgress() {
  const progress = useProgress({ defaultValue: 58 });

  return (
    <ProgressLinearRootProvider value={progress} data-testid="progress-provider">
      <ProgressLinearTrack aria-label="Team rollout">
        <ProgressLinearRange />
      </ProgressLinearTrack>
      <ProgressLinearContext>{(state) => <output>{state.value}</output>}</ProgressLinearContext>
      <ProgressContextValue />
    </ProgressLinearRootProvider>
  );
}

test('exposes the flat RootProvider, Context, and hook exports', async () => {
  render(<RootProviderProgress />);

  expect(screen.getByTestId('progress-provider').getAttribute('data-slot')).toBe(
    'progress-linear-root-provider',
  );
  await expect
    .element(page.getByRole('progressbar', { name: 'Team rollout' }))
    .toHaveAttribute('aria-valuenow', '58');
  expect(screen.getAllByText('58')).toHaveLength(2);
});

test('fills the container width by default', () => {
  render(
    <div style={{ width: '20rem' }}>
      <ProgressLinear defaultValue={40} data-testid="progress-width">
        <ProgressLinearTrack aria-label="Width">
          <ProgressLinearRange />
        </ProgressLinearTrack>
      </ProgressLinear>
    </div>,
  );

  expect(screen.getByTestId('progress-width').offsetWidth).toBe(320);
});