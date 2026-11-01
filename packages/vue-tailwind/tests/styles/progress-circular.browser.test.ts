import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
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
} from '@/index';

const progressComponents = {
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
};

test('synchronizes custom circular composition with controlled values and state views', async () => {
  render({
    components: progressComponents,
    setup() {
      const value = ref<number | null>(10);
      return { value };
    },
    template: `
      <ProgressCircular
        v-model="value"
        :min="10"
        :max="30"
        :translations="{ value: ({ value, max }) => \`Processed \${value} of \${max}\` }"
      >
        <ProgressCircularCircle>
          <ProgressCircularCircleTrack />
          <ProgressCircularCircleRange />
        </ProgressCircularCircle>
        <ProgressCircularContext v-slot="state">
          <ProgressCircularValueText>{{ state.valueAsString }}</ProgressCircularValueText>
        </ProgressCircularContext>
        <ProgressCircularView state="loading">Import in progress</ProgressCircularView>
        <ProgressCircularView state="complete">Import complete</ProgressCircularView>
      </ProgressCircular>
      <button type="button" @click="value = 30">Complete import</button>
    `,
  });

  const progressbar = screen.getByRole('progressbar', { name: 'Processed 10 of 30' });

  const progressbarLocator = page.getByRole('progressbar');
  await expect.element(progressbarLocator).toHaveAttribute('aria-valuemin', '10');
  await expect.element(progressbarLocator).toHaveAttribute('aria-valuemax', '30');
  await expect.element(progressbarLocator).toHaveAttribute('aria-valuenow', '10');
  await expect.element(progressbarLocator).toHaveAttribute('data-state', 'loading');
  await expect.element(page.getByText('Import in progress')).toBeVisible();
  await expect.element(page.getByText('Import complete')).not.toBeVisible();

  await page.getByRole('button', { name: 'Complete import' }).click();

  await expect.element(progressbarLocator).toHaveAttribute('aria-valuenow', '30');
  await expect.element(progressbarLocator).toHaveAttribute('data-state', 'complete');
  expect(screen.getByRole('progressbar', { name: 'Processed 30 of 30' })).toBe(progressbar);
  await expect.element(page.getByText('Import in progress')).not.toBeVisible();
  await expect.element(page.getByText('Import complete')).toBeVisible();
});

test('renders the circular Ark anatomy and Tailwind contract', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const circleRef = ref<ComponentPublicInstance>();

  render({
    components: progressComponents,
    setup() {
      return { circleRef, rootRef };
    },
    template: `
      <ProgressCircular ref="rootRef" :default-value="42">
        <ProgressCircularLabel>Export data</ProgressCircularLabel>
        <ProgressCircularRing ref="circleRef" aria-label="Export data" />
        <ProgressCircularValueText />
      </ProgressCircular>
    `,
  });

  const progressbar = screen.getByRole('progressbar', { name: 'Export data' });
  const root = rootRef.value?.$el as HTMLElement;

  expect(root.dataset).toMatchObject({
    scope: 'progress',
    part: 'root',
    slot: 'progress-circular-root',
  });
  expect(progressbar.getAttribute('data-slot')).toBe('progress-circular-circle');
  await expect
    .element(page.getByRole('progressbar', { name: 'Export data' }))
    .toHaveAttribute('aria-valuenow', '42');
  expect(circleRef.value?.$el).toBe(progressbar);
});

test('preserves consumer classes on every styled part', () => {
  render({
    components: progressComponents,
    template: `
      <ProgressCircular class="w-80" data-testid="progress-root" :default-value="42">
        <ProgressCircularLabel class="text-lg">Export data</ProgressCircularLabel>
        <ProgressCircularValueText class="text-xl" />
        <ProgressCircularRing class="[--size:10rem]" aria-label="Export data" />
      </ProgressCircular>
    `,
  });

  expect(screen.getByTestId('progress-root')?.classList.contains('w-80')).toBe(true);
  expect(screen.getByText('Export data')?.classList.contains('text-lg')).toBe(true);
  expect(screen.getByText('42%')?.classList.contains('text-xl')).toBe(true);
  expect(
    screen.getByRole('progressbar', { name: 'Export data' })?.classList.contains('[--size:10rem]'),
  ).toBe(true);
});