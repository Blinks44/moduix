import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { ProgressLinear } from '../src';

test('renders the linear Ark anatomy with stable hooks and an accessible name', () => {
  const rootRef = createRef<HTMLDivElement>();
  const trackRef = createRef<HTMLDivElement>();

  render(
    <ProgressLinear ref={rootRef} defaultValue={42}>
      <ProgressLinear.Label>Export data</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track ref={trackRef} aria-label="Export data">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>,
  );

  const progressbar = screen.getByRole('progressbar', { name: 'Export data' });
  const root = rootRef.current!;

  expect(root).toHaveAttribute('data-scope', 'progress');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'progress-linear-root');
  expect(root).toHaveAttribute('data-state', 'loading');
  expect(progressbar).toHaveAttribute('data-slot', 'progress-linear-track');
  expect(progressbar).toHaveAttribute('aria-valuenow', '42');
  expect(trackRef.current).toBe(progressbar);
  expect(progressbar.querySelector('[data-part="range"]')).toHaveAttribute(
    'data-slot',
    'progress-linear-range',
  );
  expect(screen.getByText('42%')).toHaveAttribute('aria-live', 'polite');
});

test('preserves semantic root composition with asChild', () => {
  const rootRef = createRef<HTMLDivElement>();

  render(
    <ProgressLinear asChild ref={rootRef} defaultValue={70}>
      <section aria-label="Export status">
        <ProgressLinear.Track aria-label="Export status">
          <ProgressLinear.Range />
        </ProgressLinear.Track>
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
      <ProgressLinear.Track aria-label="Preparing report">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>,
  );

  const progressbar = screen.getByRole('progressbar', { name: 'Preparing report' });

  expect(progressbar).toHaveAttribute('data-state', 'indeterminate');
  expect(progressbar).not.toHaveAttribute('aria-valuenow');
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
      <ProgressLinear.Context>
        {(state) => <ProgressLinear.ValueText>{state.valueAsString}</ProgressLinear.ValueText>}
      </ProgressLinear.Context>
      <ProgressLinear.Track aria-label="Request migration">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>,
  );

  const progressbar = screen.getByRole('progressbar', { name: 'Request migration' });

  expect(progressbar).toHaveAttribute('aria-valuemin', '200');
  expect(progressbar).toHaveAttribute('aria-valuemax', '800');
  expect(progressbar).toHaveAttribute('aria-valuenow', '420');
  expect(screen.getByText('420 of 800 requests completed')).toHaveAttribute('aria-live', 'polite');
});

function RootProviderProgress() {
  const progress = ProgressLinear.useProgress({ defaultValue: 58 });

  return (
    <ProgressLinear.RootProvider value={progress} data-testid="progress-provider">
      <ProgressLinear.Track aria-label="Team rollout">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
      <ProgressLinear.Context>{(state) => <output>{state.value}</output>}</ProgressLinear.Context>
    </ProgressLinear.RootProvider>
  );
}

test('keeps RootProvider, Context, and useProgress on the moduix namespace', () => {
  render(<RootProviderProgress />);

  const root = screen.getByTestId('progress-provider');

  expect(root).toHaveAttribute('data-slot', 'progress-linear-root-provider');
  expect(screen.getByRole('progressbar', { name: 'Team rollout' })).toHaveAttribute(
    'aria-valuenow',
    '58',
  );
  expect(screen.getByText('58')).toBeTruthy();
});