import { page } from '@rstest/browser';
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

test('renders the circular Ark anatomy with stable hooks and an accessible name', async () => {
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

  expect(root.dataset).toMatchObject({
    scope: 'progress',
    part: 'root',
    slot: 'progress-circular-root',
    state: 'loading',
  });
  expect(progressbar.getAttribute('data-slot')).toBe('progress-circular-circle');
  await expect
    .element(page.getByRole('progressbar', { name: 'Export data' }))
    .toHaveAttribute('aria-valuenow', '42');
  expect(circleRef.current).toBe(progressbar);
  expect(progressbar.querySelector('[data-part="circle-track"]')?.getAttribute('data-slot')).toBe(
    'progress-circular-circle-track',
  );
  expect(progressbar.querySelector('[data-part="circle-range"]')?.getAttribute('data-slot')).toBe(
    'progress-circular-circle-range',
  );
  await expect.element(page.getByText('42%')).toHaveAttribute('aria-live', 'polite');
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
  expect(root.dataset).toMatchObject({ slot: 'progress-circular-root', scope: 'progress' });
});

test('renders an indeterminate circular progressbar without an ARIA value', async () => {
  render(
    <ProgressCircular defaultValue={null}>
      <ProgressCircularRing aria-label="Preparing report" />
    </ProgressCircular>,
  );

  await expect
    .element(page.getByRole('progressbar', { name: 'Preparing report' }))
    .toHaveAttribute('data-state', 'indeterminate');
  await expect
    .element(page.getByRole('progressbar', { name: 'Preparing report' }))
    .not.toHaveAttribute('aria-valuenow');
});

test('synchronizes custom circular composition with controlled values and state views', async () => {
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

  const progressbarLocator = page.getByRole('progressbar');
  await expect.element(progressbarLocator).toHaveAttribute('aria-valuemin', '10');
  await expect.element(progressbarLocator).toHaveAttribute('aria-valuemax', '30');
  await expect.element(progressbarLocator).toHaveAttribute('aria-valuenow', '10');
  await expect.element(progressbarLocator).toHaveAttribute('data-state', 'loading');
  await expect.element(page.getByText('Processed 10 of 30')).toHaveAttribute('aria-live', 'polite');
  await expect.element(page.getByText('Import in progress')).toBeVisible();
  await expect.element(page.getByText('Import complete')).not.toBeVisible();

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

  await expect.element(progressbarLocator).toHaveAttribute('aria-valuenow', '30');
  await expect.element(progressbarLocator).toHaveAttribute('data-state', 'complete');
  expect(screen.getByRole('progressbar', { name: 'Processed 30 of 30' })).toBe(progressbar);
  await expect.element(page.getByText('Processed 30 of 30')).toHaveAttribute('aria-live', 'polite');
  await expect.element(page.getByText('Import in progress')).not.toBeVisible();
  await expect.element(page.getByText('Import complete')).toBeVisible();
});

function RootProviderProgress() {
  const progress = useProgress({ defaultValue: 58 });

  return (
    <ProgressCircularRootProvider value={progress} data-testid="progress-provider">
      <ProgressCircularRing aria-label="Team rollout" />
      <ProgressCircularContext>{(state) => <output>{state.value}</output>}</ProgressCircularContext>
    </ProgressCircularRootProvider>
  );
}

test('keeps flat provider, context, and hook exports', async () => {
  render(<RootProviderProgress />);

  expect(screen.getByTestId('progress-provider').getAttribute('data-slot')).toBe(
    'progress-circular-root-provider',
  );
  await expect
    .element(page.getByRole('progressbar', { name: 'Team rollout' }))
    .toHaveAttribute('aria-valuenow', '58');
  expect(screen.getByText('58')).toBeTruthy();
});