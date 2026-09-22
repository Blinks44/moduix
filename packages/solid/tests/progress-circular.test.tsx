import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
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
  let rootRef!: HTMLDivElement;
  let circleRef!: SVGSVGElement;

  render(() => (
    <ProgressCircular ref={(element) => (rootRef = element)} defaultValue={42}>
      <ProgressCircularLabel>Export data</ProgressCircularLabel>
      <ProgressCircularRing ref={(element) => (circleRef = element)} aria-label="Export data" />
      <ProgressCircularValueText />
    </ProgressCircular>
  ));

  const progressbar = screen.getByRole('progressbar', { name: 'Export data' });

  expect(rootRef).toHaveAttribute('data-scope', 'progress');
  expect(rootRef).toHaveAttribute('data-part', 'root');
  expect(rootRef).toHaveAttribute('data-slot', 'progress-circular-root');
  expect(rootRef).toHaveAttribute('data-state', 'loading');
  expect(progressbar).toHaveAttribute('data-slot', 'progress-circular-circle');
  expect(progressbar).toHaveAttribute('aria-valuenow', '42');
  expect(circleRef).toBe(progressbar);
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
  let rootRef: HTMLElement | undefined;

  render(() => (
    <ProgressCircular
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} aria-label="Export status" />}
      defaultValue={70}
    >
      <ProgressCircularRing aria-label="Export status" />
    </ProgressCircular>
  ));

  const root = screen.getByRole('region', { name: 'Export status' });

  expect(rootRef).toBeUndefined();
  expect(root).toHaveAttribute('data-slot', 'progress-circular-root');
  expect(root).toHaveAttribute('data-scope', 'progress');
});

test('renders an indeterminate circular progressbar without an ARIA value', () => {
  render(() => (
    <ProgressCircular defaultValue={null}>
      <ProgressCircularRing aria-label="Preparing report" />
    </ProgressCircular>
  ));

  const progressbar = screen.getByRole('progressbar', { name: 'Preparing report' });

  expect(progressbar).toHaveAttribute('data-state', 'indeterminate');
  expect(progressbar).not.toHaveAttribute('aria-valuenow');
});

test('synchronizes custom circular composition with controlled values and state views', async () => {
  function ControlledProgress() {
    const [value, setValue] = createSignal<number | null>(10);

    return (
      <>
        <ProgressCircular
          value={value()}
          min={10}
          max={30}
          translations={{
            value: ({ value: progressValue, max }) => `Processed ${progressValue} of ${max}`,
          }}
        >
          <ProgressCircularCircle>
            <ProgressCircularCircleTrack />
            <ProgressCircularCircleRange />
          </ProgressCircularCircle>
          <ProgressCircularContext>
            {(progress) => (
              <ProgressCircularValueText>{progress().valueAsString}</ProgressCircularValueText>
            )}
          </ProgressCircularContext>
          <ProgressCircularView state="loading">Import in progress</ProgressCircularView>
          <ProgressCircularView state="complete">Import complete</ProgressCircularView>
        </ProgressCircular>
        <button type="button" onClick={() => setValue(30)}>
          Complete import
        </button>
      </>
    );
  }

  render(() => <ControlledProgress />);

  const progressbar = screen.getByRole('progressbar', { name: 'Processed 10 of 30' });

  expect(progressbar).toHaveAttribute('aria-valuemin', '10');
  expect(progressbar).toHaveAttribute('aria-valuemax', '30');
  expect(progressbar).toHaveAttribute('aria-valuenow', '10');
  expect(progressbar).toHaveAttribute('data-state', 'loading');
  expect(screen.getByText('Processed 10 of 30')).toHaveAttribute('aria-live', 'polite');
  expect(screen.getByText('Import in progress')).toBeVisible();
  expect(screen.getByText('Import complete')).not.toBeVisible();

  fireEvent.click(screen.getByRole('button', { name: 'Complete import' }));

  await waitFor(() => expect(progressbar).toHaveAttribute('aria-valuenow', '30'));
  expect(progressbar).toHaveAttribute('data-state', 'complete');
  expect(screen.getByRole('progressbar', { name: 'Processed 30 of 30' })).toBe(progressbar);
  expect(screen.getByText('Processed 30 of 30')).toHaveAttribute('aria-live', 'polite');
  expect(screen.getByText('Import in progress')).not.toBeVisible();
  expect(screen.getByText('Import complete')).toBeVisible();
});

function RootProviderProgress() {
  const progress = useProgress({ defaultValue: 58 });

  return (
    <ProgressCircularRootProvider value={progress} data-testid="progress-provider">
      <ProgressCircularRing aria-label="Team rollout" />
      <ProgressCircularContext>
        {(state) => <output>{state().value}</output>}
      </ProgressCircularContext>
    </ProgressCircularRootProvider>
  );
}

test('keeps flat provider, context, and hook exports', () => {
  render(() => <RootProviderProgress />);

  const root = screen.getByTestId('progress-provider');

  expect(root).toHaveAttribute('data-slot', 'progress-circular-root-provider');
  expect(screen.getByRole('progressbar', { name: 'Team rollout' })).toHaveAttribute(
    'aria-valuenow',
    '58',
  );
  expect(screen.getByText('58')).toBeTruthy();
});
