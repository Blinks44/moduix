import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  ProgressLinear,
  ProgressLinearContext,
  ProgressLinearLabel,
  ProgressLinearRange,
  ProgressLinearRootProvider,
  ProgressLinearTrack,
  ProgressLinearValueText,
  ProgressLinearView,
} from '@/index';

const progressComponents = {
  ProgressLinear,
  ProgressLinearContext,
  ProgressLinearLabel,
  ProgressLinearRange,
  ProgressLinearRootProvider,
  ProgressLinearTrack,
  ProgressLinearValueText,
  ProgressLinearView,
};

test('renders the linear Ark anatomy with stable hooks and an accessible name', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const trackRef = ref<ComponentPublicInstance>();

  render({
    components: progressComponents,
    setup() {
      return { rootRef, trackRef };
    },
    template: `
      <ProgressLinear ref="rootRef" :default-value="42">
        <ProgressLinearLabel>Export data</ProgressLinearLabel>
        <ProgressLinearValueText />
        <ProgressLinearTrack ref="trackRef" aria-label="Export data">
          <ProgressLinearRange />
        </ProgressLinearTrack>
      </ProgressLinear>
    `,
  });

  const progressbar = screen.getByRole('progressbar', { name: 'Export data' });
  const root = rootRef.value?.$el as HTMLElement;

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
  expect(trackRef.value?.$el).toBe(progressbar);
  expect(progressbar.querySelector('[data-part="range"]')?.getAttribute('data-slot')).toBe(
    'progress-linear-range',
  );
  await expect.element(page.getByText('42%')).toHaveAttribute('aria-live', 'polite');
});