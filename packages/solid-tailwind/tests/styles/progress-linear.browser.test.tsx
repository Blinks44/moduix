import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  ProgressLinear,
  ProgressLinearLabel,
  ProgressLinearValueText,
  ProgressLinearTrack,
  ProgressLinearRange,
} from '@/index';

test('renders the linear Ark anatomy with stable hooks and an accessible name', async () => {
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
  const range = progressbar.querySelector('[data-part="range"]')!;

  expect(rootRef.dataset).toMatchObject({
    scope: 'progress',
    part: 'root',
    slot: 'progress-linear-root',
    state: 'loading',
  });
  expect(progressbar.getAttribute('data-slot')).toBe('progress-linear-track');
  await expect
    .element(page.getByRole('progressbar', { name: 'Export data' }))
    .toHaveAttribute('aria-valuenow', '42');
  expect(trackRef).toBe(progressbar);
  expect(range?.getAttribute('data-slot')).toBe('progress-linear-range');
  await expect.element(page.getByText('42%')).toHaveAttribute('aria-live', 'polite');
});

test('lets consumer utilities override defaults on each styled part', () => {
  render(() => (
    <ProgressLinear class="w-80" data-testid="progress-root">
      <ProgressLinearLabel>Export data</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack class="h-4" aria-label="Export data">
        <ProgressLinearRange class="bg-accent" />
      </ProgressLinearTrack>
    </ProgressLinear>
  ));

  const root = screen.getByTestId('progress-root');
  const track = screen.getByRole('progressbar', { name: 'Export data' });
  const range = track.querySelector('[data-part="range"]')!;
  expect(root.classList.contains('w-80')).toBe(true);
  expect(track.classList.contains('h-4')).toBe(true);
  expect(range.classList.contains('bg-accent')).toBe(true);
});