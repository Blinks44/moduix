import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import {
  ProgressCircular,
  ProgressCircularCircle,
  ProgressCircularCircleRange,
  ProgressCircularCircleTrack,
  ProgressCircularLabel,
} from '@/index';

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

  expect(screen.getByText('Export data')?.classList.contains('text-lg')).toBe(true);
  expect(screen.getByTestId('progress-track')?.classList.contains('stroke-accent')).toBe(true);
  expect(screen.getByTestId('progress-range')?.classList.contains('stroke-chart-2')).toBe(true);
});