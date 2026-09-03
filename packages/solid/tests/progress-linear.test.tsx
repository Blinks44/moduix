import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { ProgressLinear, useProgressContext } from '../src';

test('renders the linear Ark anatomy with stable hooks and an accessible name', () => {
  let rootRef!: HTMLDivElement;
  let trackRef!: HTMLDivElement;

  render(() => (
    <ProgressLinear ref={(element) => (rootRef = element)} defaultValue={42}>
      <ProgressLinear.Label>Export data</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track ref={(element) => (trackRef = element)} aria-label="Export data">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
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
      <ProgressLinear.Track aria-label="Export status">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
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
      <ProgressLinear.Track aria-label="Preparing report">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
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
      <ProgressLinear.Context>
        {(state) => <ProgressLinear.ValueText>{state().valueAsString}</ProgressLinear.ValueText>}
      </ProgressLinear.Context>
      <ProgressLinear.Track aria-label="Request migration">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
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
  const progress = ProgressLinear.useProgress({ defaultValue: 58 });

  return (
    <ProgressLinear.RootProvider value={progress} data-testid="progress-provider">
      <ProgressLinear.Track aria-label="Team rollout">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
      <ProgressLinear.Context>{(state) => <output>{state().value}</output>}</ProgressLinear.Context>
      <ProgressContextValue />
    </ProgressLinear.RootProvider>
  );
}

test('keeps RootProvider, Context, and useProgress on the moduix namespace', () => {
  render(() => <RootProviderProgress />);

  const root = screen.getByTestId('progress-provider');

  expect(root).toHaveAttribute('data-slot', 'progress-linear-root-provider');
  expect(screen.getByRole('progressbar', { name: 'Team rollout' })).toHaveAttribute(
    'aria-valuenow',
    '58',
  );
  expect(screen.getAllByText('58')).toHaveLength(2);
});