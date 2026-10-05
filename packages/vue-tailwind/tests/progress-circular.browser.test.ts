import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
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
  useProgress,
  useProgressContext,
} from '../src';
import SsrProgressCircular from './fixtures/SsrProgressCircular.vue';

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

test('updates fallback and consumer value text without losing attrs or refs', async () => {
  const value = ref<number | null>(42);
  const custom = ref(false);
  const text = ref('Uploaded');
  const valueRef = ref<ComponentPublicInstance>();
  const clicks: MouseEvent[] = [];
  render({
    components: progressComponents,
    setup: () => ({ value, custom, text, valueRef, clicks }),
    template: `
      <ProgressCircular :model-value="value">
        <ProgressCircularValueText ref="valueRef" class="consumer-value" style="color:red"
          title="Upload progress" data-testid="value" @click="clicks.push($event)">
          <template v-if="custom" #default><strong>{{ text }}</strong></template>
        </ProgressCircularValueText>
      </ProgressCircular>
    `,
  });
  const valueLocator = page.getByTestId('value');
  await expect.element(valueLocator).toContainText('42%');
  value.value = 75;
  await nextTick();
  await expect.element(valueLocator).toContainText('75%');
  custom.value = true;
  await nextTick();
  await expect.element(valueLocator).toContainText('Uploaded');
  text.value = '';
  await nextTick();
  expect(screen.getByTestId('value').textContent).toBe('');
  custom.value = false;
  await nextTick();
  await expect.element(valueLocator).toContainText('75%');
  await valueLocator.click();
  value.value = null;
  await nextTick();
  const host = screen.getByTestId('value');
  expect(host.textContent).toBe('');
  expect(valueRef.value?.$el).toBe(host);
  expect(host.getAttribute('data-slot')).toBe('progress-circular-value-text');
  await expect.element(valueLocator).toHaveAttribute('aria-live', 'polite');
  await expect.element(valueLocator).toHaveAttribute('title', 'Upload progress');
  expect(host?.classList.contains('consumer-value')).toBe(true);
  await expect.element(valueLocator).toHaveCSS('color', 'rgb(255, 0, 0)');
  expect(clicks).toHaveLength(1);
});

test('preserves the consumer value text host and ref with asChild', async () => {
  const text = ref('Uploaded');
  const valueRef = ref<ComponentPublicInstance>();
  render({
    components: progressComponents,
    setup: () => ({ text, valueRef }),
    template: `
      <ProgressCircular>
        <ProgressCircularValueText ref="valueRef" as-child class="consumer-value"
          title="Upload progress" data-testid="value"><output>{{ text }}</output></ProgressCircularValueText>
      </ProgressCircular>
    `,
  });
  const host = screen.getByTestId('value');
  expect(host.tagName).toBe('OUTPUT');
  expect(valueRef.value?.$el).toBe(host);
  const value = page.getByTestId('value');
  expect(host.getAttribute('data-slot')).toBe('progress-circular-value-text');
  expect(host?.classList.contains('consumer-value')).toBe(true);
  await expect.element(value).toHaveAttribute('title', 'Upload progress');
  text.value = 'Complete';
  await nextTick();
  expect(screen.getByTestId('value')).toBe(host);
  expect(valueRef.value?.$el).toBe(host);
  await expect.element(value).toContainText('Complete');
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
  expect([...root!.classList]).toEqual(expect.arrayContaining(['inline-grid', 'text-foreground']));
  expect(progressbar.getAttribute('data-slot')).toBe('progress-circular-circle');
  await expect
    .element(page.getByRole('progressbar', { name: 'Export data' }))
    .toHaveAttribute('aria-valuenow', '42');
  expect(progressbar?.classList.contains('block')).toBe(true);
  expect(circleRef.value?.$el).toBe(progressbar);
  expect(
    progressbar.querySelector('[data-part="circle-track"]')?.classList.contains('stroke-muted'),
  ).toBe(true);
  expect(
    progressbar.querySelector('[data-part="circle-range"]')?.classList.contains('stroke-primary'),
  ).toBe(true);
  expect([...screen.getByText('42%')!.classList]).toEqual(
    expect.arrayContaining(['text-sm', 'font-medium']),
  );
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

test('preserves semantic root composition with asChild', () => {
  const rootRef = ref<ComponentPublicInstance>();

  render({
    components: progressComponents,
    setup() {
      return { rootRef };
    },
    template: `
      <ProgressCircular ref="rootRef" as-child :default-value="70">
        <section aria-label="Export status">
          <ProgressCircularRing aria-label="Export status" />
        </section>
      </ProgressCircular>
    `,
  });

  const root = screen.getByRole('region', { name: 'Export status' });

  expect(rootRef.value?.$el).toBe(root);
  expect(root.dataset).toMatchObject({ slot: 'progress-circular-root', scope: 'progress' });
});

test('renders an indeterminate circular progressbar without an ARIA value', async () => {
  render({
    components: progressComponents,
    template: `
      <ProgressCircular :default-value="null">
        <ProgressCircularRing aria-label="Preparing report" />
      </ProgressCircular>
    `,
  });

  const progressbar = screen.getByRole('progressbar', { name: 'Preparing report' });
  const range = progressbar.querySelector('[data-part="circle-range"]')!;

  await expect
    .element(page.getByRole('progressbar', { name: 'Preparing report' }))
    .toHaveAttribute('data-state', 'indeterminate');
  await expect
    .element(page.getByRole('progressbar', { name: 'Preparing report' }))
    .not.toHaveAttribute('aria-valuenow');
  expect(
    range?.classList.contains(
      'data-[state=indeterminate]:animate-moduix-progress-circular-indeterminate',
    ),
  ).toBe(true);
});

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

const ProgressContextValue = {
  setup() {
    const progress = useProgressContext();
    return { progress };
  },
  template: '<output>{{ progress.value }}</output>',
};

test('supports context updates from the public hook', async () => {
  const ProgressContextActions = {
    setup() {
      const progress = useProgressContext();
      const setValue = () => progress.value.setValue(75);
      return { setValue };
    },
    template: '<button type="button" @click="setValue">Set progress</button>',
  };

  render({
    components: { ...progressComponents, ProgressContextActions },
    setup() {
      const value = ref<number | null>(45);
      return { value };
    },
    template: `
      <ProgressCircular :default-value="value">
        <ProgressCircularRing aria-label="Upload status" />
        <ProgressContextActions />
      </ProgressCircular>
    `,
  });
  await page.getByRole('button', { name: 'Set progress' }).click();

  await expect.element(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
});

test('supports v-model updates from the Vue parent', async () => {
  render({
    components: progressComponents,
    setup() {
      const value = ref<number | null>(45);
      return { value };
    },
    template: `
      <ProgressCircular v-model="value">
        <ProgressCircularRing aria-label="Upload status" />
      </ProgressCircular>
      <button type="button" @click="value = 75">Set progress</button>
    `,
  });
  await page.getByRole('button', { name: 'Set progress' }).click();

  await expect.element(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
});

test('keeps flat provider, context, and hook exports', async () => {
  render({
    components: { ...progressComponents, ProgressContextValue },
    setup() {
      return { progress: useProgress({ defaultValue: 58 }) };
    },
    template: `
      <ProgressCircularRootProvider :value="progress" data-testid="progress-provider">
        <ProgressCircularRing aria-label="Team rollout" />
        <ProgressCircularContext v-slot="state"><output>{{ state.value }}</output></ProgressCircularContext>
        <ProgressContextValue />
      </ProgressCircularRootProvider>
    `,
  });

  expect(screen.getByTestId('progress-provider').getAttribute('data-slot')).toBe(
    'progress-circular-root-provider',
  );
  await expect
    .element(page.getByRole('progressbar', { name: 'Team rollout' }))
    .toHaveAttribute('aria-valuenow', '58');
  expect(screen.getAllByText('58')).toHaveLength(2);
});

test('renders and hydrates the public anatomy', async () => {
  const html = await renderToString(createSSRApp(SsrProgressCircular));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverHosts = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrProgressCircular);
  try {
    app.mount(host);
    await nextTick();
    expect([...host.querySelectorAll('[data-slot]')]).toHaveLength(serverHosts.length);
    [...host.querySelectorAll('[data-slot]')].forEach((element, index) =>
      expect(element).toBe(serverHosts[index]),
    );
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);

    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});