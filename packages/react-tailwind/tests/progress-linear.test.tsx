import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
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

test('renders the linear Ark anatomy with stable hooks and an accessible name', () => {
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
  const range = progressbar.querySelector('[data-part="range"]')!;

  expect(root).toHaveAttribute('data-scope', 'progress');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'progress-linear-root');
  expect(root).toHaveAttribute('data-state', 'loading');
  expect(root).toHaveClass('grid', 'w-48', 'text-foreground');
  expect(progressbar).toHaveAttribute('data-slot', 'progress-linear-track');
  expect(progressbar).toHaveAttribute('aria-valuenow', '42');
  expect(progressbar).toHaveClass('block', 'h-2', 'bg-muted', 'ring-1', 'ring-inset');
  expect(trackRef.current).toBe(progressbar);
  expect(range).toHaveAttribute('data-slot', 'progress-linear-range');
  expect(range).toHaveClass('block', 'h-full', 'bg-primary');
  expect(screen.getByText('42%')).toHaveAttribute('aria-live', 'polite');
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
  expect(root).toHaveAttribute('data-slot', 'progress-linear-root');
  expect(root).toHaveAttribute('data-scope', 'progress');
});

test('renders an indeterminate linear progressbar without an ARIA value', () => {
  render(
    <ProgressLinear defaultValue={null}>
      <ProgressLinearTrack aria-label="Preparing report">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>,
  );

  const progressbar = screen.getByRole('progressbar', { name: 'Preparing report' });
  const range = progressbar.querySelector('[data-part="range"]')!;

  expect(progressbar).toHaveAttribute('data-state', 'indeterminate');
  expect(progressbar).not.toHaveAttribute('aria-valuenow');
  expect(range).toHaveClass(
    'data-[state=indeterminate]:w-[35%]',
    'data-[state=indeterminate]:animate-moduix-progress-linear-indeterminate',
  );
});

test('preserves custom bounds and accessible value text', () => {
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

  const progressbar = screen.getByRole('progressbar', { name: 'Request migration' });

  expect(progressbar).toHaveAttribute('aria-valuemin', '200');
  expect(progressbar).toHaveAttribute('aria-valuemax', '800');
  expect(progressbar).toHaveAttribute('aria-valuenow', '420');
  expect(screen.getByText('420 of 800 requests completed')).toHaveAttribute('aria-live', 'polite');
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

test('exposes the flat RootProvider, Context, and hook exports', () => {
  render(<RootProviderProgress />);

  const root = screen.getByTestId('progress-provider');

  expect(root).toHaveAttribute('data-slot', 'progress-linear-root-provider');
  expect(screen.getByRole('progressbar', { name: 'Team rollout' })).toHaveAttribute(
    'aria-valuenow',
    '58',
  );
  expect(screen.getAllByText('58')).toHaveLength(2);
});

test('lets consumer utilities override defaults on each styled part', () => {
  render(
    <ProgressLinear className="w-80" data-testid="progress-root">
      <ProgressLinearLabel>Export data</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack className="h-4" aria-label="Export data">
        <ProgressLinearRange className="bg-accent" />
      </ProgressLinearTrack>
    </ProgressLinear>,
  );

  const root = screen.getByTestId('progress-root');
  const track = screen.getByRole('progressbar', { name: 'Export data' });
  const range = track.querySelector('[data-part="range"]')!;

  expect(root).toHaveClass('w-80');
  expect(root).not.toHaveClass('w-48');
  expect(track).toHaveClass('h-4');
  expect(track).not.toHaveClass('h-2');
  expect(range).toHaveClass('bg-accent');
  expect(range).not.toHaveClass('bg-primary');
});
