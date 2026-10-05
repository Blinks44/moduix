import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
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
  useProgress,
  useProgressContext,
} from '../src';
import SsrProgressLinear from './fixtures/SsrProgressLinear.vue';

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
      <ProgressLinear :model-value="value">
        <ProgressLinearValueText ref="valueRef" class="consumer-value" style="color:red"
          title="Upload progress" data-testid="value" @click="clicks.push($event)">
          <template v-if="custom" #default><strong>{{ text }}</strong></template>
        </ProgressLinearValueText>
      </ProgressLinear>
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
  expect(host.getAttribute('data-slot')).toBe('progress-linear-value-text');
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
      <ProgressLinear>
        <ProgressLinearValueText ref="valueRef" as-child class="consumer-value"
          title="Upload progress" data-testid="value"><output>{{ text }}</output></ProgressLinearValueText>
      </ProgressLinear>
    `,
  });
  const host = screen.getByTestId('value');
  expect(host.tagName).toBe('OUTPUT');
  expect(valueRef.value?.$el).toBe(host);
  const value = page.getByTestId('value');
  expect(host.getAttribute('data-slot')).toBe('progress-linear-value-text');
  expect(host?.classList.contains('consumer-value')).toBe(true);
  await expect.element(value).toHaveAttribute('title', 'Upload progress');
  text.value = 'Complete';
  await nextTick();
  expect(screen.getByTestId('value')).toBe(host);
  expect(valueRef.value?.$el).toBe(host);
  await expect.element(value).toContainText('Complete');
});

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

test('preserves semantic root composition with asChild', () => {
  const rootRef = ref<ComponentPublicInstance>();

  render({
    components: progressComponents,
    setup() {
      return { rootRef };
    },
    template: `
      <ProgressLinear ref="rootRef" as-child :default-value="70">
        <section aria-label="Export status">
          <ProgressLinearTrack aria-label="Export status">
            <ProgressLinearRange />
          </ProgressLinearTrack>
        </section>
      </ProgressLinear>
    `,
  });

  const root = screen.getByRole('region', { name: 'Export status' });

  expect(rootRef.value?.$el).toBe(root);
  expect(root.dataset).toMatchObject({ slot: 'progress-linear-root', scope: 'progress' });
});

test('preserves asChild composition on the track and range parts', () => {
  render({
    components: progressComponents,
    template: `
      <ProgressLinear :default-value="70">
        <ProgressLinearTrack as-child aria-label="Export status">
          <output>
            <ProgressLinearRange as-child><span /></ProgressLinearRange>
          </output>
        </ProgressLinearTrack>
      </ProgressLinear>
    `,
  });

  const progressbar = screen.getByRole('progressbar', { name: 'Export status' });
  const range = progressbar.querySelector('[data-part="range"]');

  expect(progressbar.tagName).toBe('OUTPUT');
  expect(progressbar.getAttribute('data-slot')).toBe('progress-linear-track');
  expect(range?.tagName).toBe('SPAN');
  expect(range?.getAttribute('data-slot')).toBe('progress-linear-range');
});

test('renders an indeterminate linear progressbar without an ARIA value', async () => {
  render({
    components: progressComponents,
    template: `
      <ProgressLinear :default-value="null">
        <ProgressLinearTrack aria-label="Preparing report">
          <ProgressLinearRange />
        </ProgressLinearTrack>
      </ProgressLinear>
    `,
  });

  await expect
    .element(page.getByRole('progressbar', { name: 'Preparing report' }))
    .toHaveAttribute('data-state', 'indeterminate');
  await expect
    .element(page.getByRole('progressbar', { name: 'Preparing report' }))
    .not.toHaveAttribute('aria-valuenow');
});

test('preserves custom bounds and accessible value text', async () => {
  render({
    components: progressComponents,
    template: `
      <ProgressLinear
        :default-value="420"
        :min="200"
        :max="800"
        :translations="{ value: ({ value, max }) => value + ' of ' + max + ' requests completed' }"
      >
        <ProgressLinearContext v-slot="state">
          <ProgressLinearValueText>{{ state.valueAsString }}</ProgressLinearValueText>
        </ProgressLinearContext>
        <ProgressLinearTrack aria-label="Request migration">
          <ProgressLinearRange />
        </ProgressLinearTrack>
      </ProgressLinear>
    `,
  });

  const progressbar = page.getByRole('progressbar', { name: 'Request migration' });
  await expect.element(progressbar).toHaveAttribute('aria-valuemin', '200');
  await expect.element(progressbar).toHaveAttribute('aria-valuemax', '800');
  await expect.element(progressbar).toHaveAttribute('aria-valuenow', '420');
  await expect
    .element(page.getByText('420 of 800 requests completed'))
    .toHaveAttribute('aria-live', 'polite');
});

const ProgressContextValue = {
  setup() {
    const progress = useProgressContext();
    return { progress };
  },
  template: '<output>{{ progress.value }}</output>',
};

test('supports controlled values and context access', async () => {
  render({
    components: progressComponents,
    setup() {
      const value = ref<number | null>(45);
      const setValue = () => {
        value.value = 75;
      };
      return { setValue, value };
    },
    template: `
      <ProgressLinear v-model="value">
        <ProgressLinearTrack aria-label="Upload status"><ProgressLinearRange /></ProgressLinearTrack>
      </ProgressLinear>
      <button type="button" @click="setValue">Set progress</button>
      <output>Current value: {{ value }}</output>
    `,
  });
  await page.getByRole('button', { name: 'Set progress' }).click();

  await expect.element(page.getByText('Current value: 75')).toBeAttached();
  await expect
    .element(page.getByRole('progressbar', { name: 'Upload status' }))
    .toHaveAttribute('aria-valuenow', '75');
});

test('connects provider, context, hook, and state views', async () => {
  render({
    components: { ...progressComponents, ProgressContextValue },
    setup() {
      return { progress: useProgress({ defaultValue: 58 }) };
    },
    template: `
      <ProgressLinearRootProvider :value="progress" data-testid="progress-provider">
        <ProgressLinearTrack aria-label="Team rollout"><ProgressLinearRange /></ProgressLinearTrack>
        <ProgressLinearContext v-slot="state"><output>{{ state.value }}</output></ProgressLinearContext>
        <ProgressContextValue />
        <ProgressLinearView state="loading">Transfer in progress</ProgressLinearView>
        <ProgressLinearView state="complete">Export complete</ProgressLinearView>
      </ProgressLinearRootProvider>
    `,
  });

  expect(screen.getByTestId('progress-provider').getAttribute('data-slot')).toBe(
    'progress-linear-root-provider',
  );
  await expect
    .element(page.getByRole('progressbar', { name: 'Team rollout' }))
    .toHaveAttribute('aria-valuenow', '58');
  expect(screen.getAllByText('58')).toHaveLength(2);
  await expect.element(page.getByText('Transfer in progress')).toBeAttached();
  await expect.element(page.getByText('Export complete')).toHaveAttribute('hidden');
});

test('renders and hydrates the public anatomy', async () => {
  const html = await renderToString(createSSRApp(SsrProgressLinear));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverHosts = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrProgressLinear);
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