import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  ProgressLinear,
  ProgressLinearLabel,
  ProgressLinearRange,
  ProgressLinearTrack,
  ProgressLinearValueText,
} from '@/index';

test('renders the linear Ark anatomy with stable hooks and an accessible name', async () => {
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

  expect(root.dataset).toMatchObject({
    scope: 'progress',
    part: 'root',
    slot: 'progress-linear-root',
    state: 'loading',
  });
  expect(progressbar.getAttribute('data-slot')).toBe('progress-linear-track');
  await expect
    .element(page.getByRole('progressbar', { name: 'Export data' }))
    .toHaveAttribute('aria-valuenow', '42');
  expect(trackRef.current).toBe(progressbar);
  expect(progressbar.querySelector('[data-part="range"]')?.getAttribute('data-slot')).toBe(
    'progress-linear-range',
  );
  await expect.element(page.getByText('42%')).toHaveAttribute('aria-live', 'polite');
});