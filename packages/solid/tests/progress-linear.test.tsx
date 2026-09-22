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

test('renders the linear Ark anatomy with stable hooks and an accessible name', () => {
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

  expect(rootRef).toHaveAttribute('data-scope', 'progress');
  expect(rootRef).toHaveAttribute('data-part', 'root');
  expect(rootRef).toHaveAttribute('data-slot', 'progress-linear-root');
  expect(rootRef).toHaveAttribute('data-state', 'loading');
  expect(progressbar).toHaveAttribute('data-slot', 'progress-linear-track');
  expect(progressbar).toHaveAttribute('aria-valuenow', '42');
  expect(trackRef).toBe(progressbar);
  expect(progressbar.querySelector('[data-part="range"]')).toHaveAttribute(
    'data-slot',
    'progress-linear-range',
  );
  expect(screen.getByText('42%')).toHaveAttribute('aria-live', 'polite');
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
  expect(root).toHaveAttribute('data-slot', 'progress-linear-root');
  expect(root).toHaveAttribute('data-scope', 'progress');
});

test('renders an indeterminate linear progressbar without an ARIA value', () => {
  render(() => (
    <ProgressLinear defaultValue={null}>
      <ProgressLinearTrack aria-label="Preparing report">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  ));

  const progressbar = screen.getByRole('progressbar', { name: 'Preparing report' });

  expect(progressbar).toHaveAttribute('data-state', 'indeterminate');
  expect(progressbar).not.toHaveAttribute('aria-valuenow');
});

test('preserves custom bounds and accessible value text', () => {
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

  const progressbar = screen.getByRole('progressbar', { name: 'Request migration' });

  expect(progressbar).toHaveAttribute('aria-valuemin', '200');
  expect(progressbar).toHaveAttribute('aria-valuemax', '800');
  expect(progressbar).toHaveAttribute('aria-valuenow', '420');
  expect(screen.getByText('420 of 800 requests completed')).toHaveAttribute('aria-live', 'polite');
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

test('exposes the flat RootProvider, Context, and hook exports', () => {
  render(() => <RootProviderProgress />);

  const root = screen.getByTestId('progress-provider');

  expect(root).toHaveAttribute('data-slot', 'progress-linear-root-provider');
  expect(screen.getByRole('progressbar', { name: 'Team rollout' })).toHaveAttribute(
    'aria-valuenow',
    '58',
  );
  expect(screen.getAllByText('58')).toHaveLength(2);
});
