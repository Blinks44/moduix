import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  ProgressCircular,
  ProgressCircularCircle,
  ProgressCircularCircleRange,
  ProgressCircularCircleTrack,
  ProgressCircularContext,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularRootProvider,
  ProgressCircularValueText,
  ProgressCircularView,
  useProgress,
} from '../src';

test('renders the circular Ark anatomy with stable hooks and an accessible name', () => {
  const rootRef = createRef<HTMLDivElement>();
  const circleRef = createRef<SVGSVGElement>();

  render(
    <ProgressCircular ref={rootRef} defaultValue={42}>
      <ProgressCircularLabel>Export data</ProgressCircularLabel>
      <ProgressCircularRing ref={circleRef} aria-label="Export data" />
      <ProgressCircularValueText />
    </ProgressCircular>,
  );

  const progressbar = screen.getByRole('progressbar', { name: 'Export data' });
  const root = rootRef.current!;

  expect(root).toHaveAttribute('data-scope', 'progress');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'progress-circular-root');
  expect(root).toHaveAttribute('data-state', 'loading');
  expect(progressbar).toHaveAttribute('data-slot', 'progress-circular-circle');
  expect(progressbar).toHaveAttribute('aria-valuenow', '42');
  expect(circleRef.current).toBe(progressbar);
  expect(progressbar.querySelector('[data-part="circle-track"]')).toHaveAttribute(
    'data-slot',
    'progress-circular-circle-track',
  );
  expect(progressbar.querySelector('[data-part="circle-range"]')).toHaveAttribute(
    'data-slot',
    'progress-circular-circle-range',
  );
  expect(screen.getByText('42%')).toHaveAttribute('aria-live', 'polite');
});

test('preserves semantic root composition with asChild', () => {
  const rootRef = createRef<HTMLDivElement>();

  render(
    <ProgressCircular asChild ref={rootRef} defaultValue={70}>
      <section aria-label="Export status">
        <ProgressCircularRing aria-label="Export status" />
      </section>
    </ProgressCircular>,
  );

  const root = screen.getByRole('region', { name: 'Export status' });

  expect(rootRef.current).toBe(root);
  expect(root).toHaveAttribute('data-slot', 'progress-circular-root');
  expect(root).toHaveAttribute('data-scope', 'progress');
});

test('renders an indeterminate circular progressbar without an ARIA value', () => {
  render(
    <ProgressCircular defaultValue={null}>
      <ProgressCircularRing aria-label="Preparing report" />
    </ProgressCircular>,
  );

  const progressbar = screen.getByRole('progressbar', { name: 'Preparing report' });

  expect(progressbar).toHaveAttribute('data-state', 'indeterminate');
  expect(progressbar).not.toHaveAttribute('aria-valuenow');
});

test('synchronizes custom circular composition with controlled values and state views', () => {
  const { rerender } = render(
    <ProgressCircular
      value={10}
      min={10}
      max={30}
      translations={{
        value({ value, max }) {
          return `Processed ${value} of ${max}`;
        },
      }}
    >
      <ProgressCircularCircle>
        <ProgressCircularCircleTrack />
        <ProgressCircularCircleRange />
      </ProgressCircularCircle>
      <ProgressCircularContext>
        {(progress) => (
          <ProgressCircularValueText>{progress.valueAsString}</ProgressCircularValueText>
        )}
      </ProgressCircularContext>
      <ProgressCircularView state="loading">Import in progress</ProgressCircularView>
      <ProgressCircularView state="complete">Import complete</ProgressCircularView>
    </ProgressCircular>,
  );

  const progressbar = screen.getByRole('progressbar', { name: 'Processed 10 of 30' });

  expect(progressbar).toHaveAttribute('aria-valuemin', '10');
  expect(progressbar).toHaveAttribute('aria-valuemax', '30');
  expect(progressbar).toHaveAttribute('aria-valuenow', '10');
  expect(progressbar).toHaveAttribute('data-state', 'loading');
  expect(screen.getByText('Processed 10 of 30')).toHaveAttribute('aria-live', 'polite');
  expect(screen.getByText('Import in progress')).toBeVisible();
  expect(screen.getByText('Import complete')).not.toBeVisible();

  rerender(
    <ProgressCircular
      value={30}
      min={10}
      max={30}
      translations={{
        value({ value, max }) {
          return `Processed ${value} of ${max}`;
        },
      }}
    >
      <ProgressCircularCircle>
        <ProgressCircularCircleTrack />
        <ProgressCircularCircleRange />
      </ProgressCircularCircle>
      <ProgressCircularContext>
        {(progress) => (
          <ProgressCircularValueText>{progress.valueAsString}</ProgressCircularValueText>
        )}
      </ProgressCircularContext>
      <ProgressCircularView state="loading">Import in progress</ProgressCircularView>
      <ProgressCircularView state="complete">Import complete</ProgressCircularView>
    </ProgressCircular>,
  );

  expect(progressbar).toHaveAttribute('aria-valuenow', '30');
  expect(progressbar).toHaveAttribute('data-state', 'complete');
  expect(screen.getByRole('progressbar', { name: 'Processed 30 of 30' })).toBe(progressbar);
  expect(screen.getByText('Processed 30 of 30')).toHaveAttribute('aria-live', 'polite');
  expect(screen.getByText('Import in progress')).not.toBeVisible();
  expect(screen.getByText('Import complete')).toBeVisible();
});

test('keeps component-owned visual utilities and lets consumers override them', () => {
  render(
    <ProgressCircular className="gap-0 text-primary" data-testid="progress-root">
      <ProgressCircularLabel className="text-lg">Export data</ProgressCircularLabel>
      <ProgressCircularCircle className="[--size:4rem]" data-testid="progress-circle">
        <ProgressCircularCircleTrack className="stroke-accent" data-testid="progress-track" />
        <ProgressCircularCircleRange className="stroke-chart-2" data-testid="progress-range" />
      </ProgressCircularCircle>
    </ProgressCircular>,
  );

  expect(screen.getByTestId('progress-root')).toHaveClass('inline-grid', 'gap-0', 'text-primary');
  expect(screen.getByTestId('progress-root')).not.toHaveClass('gap-2', 'text-foreground');
  expect(screen.getByText('Export data')).toHaveClass('text-lg');
  expect(screen.getByText('Export data')).not.toHaveClass('text-sm');
  expect(screen.getByTestId('progress-circle')).toHaveClass(
    'block',
    'overflow-visible',
    '[--size:4rem]',
  );
  expect(screen.getByTestId('progress-circle')).not.toHaveClass(
    '[--size:var(--spacing-control-xl)]',
  );
  expect(screen.getByTestId('progress-track')).toHaveClass('stroke-accent');
  expect(screen.getByTestId('progress-track')).not.toHaveClass('stroke-muted');
  expect(screen.getByTestId('progress-range')).toHaveClass('stroke-chart-2');
  expect(screen.getByTestId('progress-range')).not.toHaveClass('stroke-primary');
});

function RootProviderProgress() {
  const progress = useProgress({ defaultValue: 58 });

  return (
    <ProgressCircularRootProvider value={progress} data-testid="progress-provider">
      <ProgressCircularRing aria-label="Team rollout" />
      <ProgressCircularContext>
        {(state) => <output>{state.value}</output>}
      </ProgressCircularContext>
    </ProgressCircularRootProvider>
  );
}

test('keeps flat provider, context, and hook exports', () => {
  render(<RootProviderProgress />);

  const root = screen.getByTestId('progress-provider');

  expect(root).toHaveAttribute('data-slot', 'progress-circular-root-provider');
  expect(screen.getByRole('progressbar', { name: 'Team rollout' })).toHaveAttribute(
    'aria-valuenow',
    '58',
  );
  expect(screen.getByText('58')).toBeTruthy();
});
