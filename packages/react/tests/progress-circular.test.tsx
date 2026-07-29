import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { ProgressCircular } from '../src';

test('renders the circular Ark anatomy with stable hooks and an accessible name', () => {
  const rootRef = createRef<HTMLDivElement>();
  const circleRef = createRef<SVGSVGElement>();

  render(
    <ProgressCircular ref={rootRef} defaultValue={42}>
      <ProgressCircular.Label>Export data</ProgressCircular.Label>
      <ProgressCircular.Ring ref={circleRef} aria-label="Export data" />
      <ProgressCircular.ValueText />
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
        <ProgressCircular.Ring aria-label="Export status" />
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
      <ProgressCircular.Ring aria-label="Preparing report" />
    </ProgressCircular>,
  );

  const progressbar = screen.getByRole('progressbar', { name: 'Preparing report' });

  expect(progressbar).toHaveAttribute('data-state', 'indeterminate');
  expect(progressbar).not.toHaveAttribute('aria-valuenow');
});

function RootProviderProgress() {
  const progress = ProgressCircular.useProgress({ defaultValue: 58 });

  return (
    <ProgressCircular.RootProvider value={progress} data-testid="progress-provider">
      <ProgressCircular.Ring aria-label="Team rollout" />
      <ProgressCircular.Context>
        {(state) => <output>{state.value}</output>}
      </ProgressCircular.Context>
    </ProgressCircular.RootProvider>
  );
}

test('keeps RootProvider, Context, and useProgress on the moduix namespace', () => {
  render(<RootProviderProgress />);

  const root = screen.getByTestId('progress-provider');

  expect(root).toHaveAttribute('data-slot', 'progress-circular-root-provider');
  expect(screen.getByRole('progressbar', { name: 'Team rollout' })).toHaveAttribute(
    'aria-valuenow',
    '58',
  );
  expect(screen.getByText('58')).toBeTruthy();
});