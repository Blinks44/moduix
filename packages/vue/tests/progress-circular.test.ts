import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
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
  expect(screen.getByTestId('value')).toHaveTextContent('42%');
  value.value = 75;
  await nextTick();
  expect(screen.getByTestId('value')).toHaveTextContent('75%');
  custom.value = true;
  await nextTick();
  expect(screen.getByTestId('value')).toHaveTextContent('Uploaded');
  text.value = '';
  await nextTick();
  expect(screen.getByTestId('value').textContent).toBe('');
  custom.value = false;
  await nextTick();
  expect(screen.getByTestId('value')).toHaveTextContent('75%');
  value.value = null;
  await nextTick();
  const host = screen.getByTestId('value');
  expect(host.textContent).toBe('');
  expect(valueRef.value?.$el).toBe(host);
  expect(host).toHaveAttribute('data-slot', 'progress-circular-value-text');
  expect(host).toHaveAttribute('aria-live', 'polite');
  expect(host).toHaveAttribute('title', 'Upload progress');
  expect(host).toHaveClass('consumer-value');
  expect(host).toHaveStyle({ color: 'red' });
  await fireEvent.click(host);
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
  expect(host).toHaveAttribute('data-slot', 'progress-circular-value-text');
  expect(host).toHaveClass('consumer-value');
  expect(host).toHaveAttribute('title', 'Upload progress');
  text.value = 'Complete';
  await nextTick();
  expect(screen.getByTestId('value')).toBe(host);
  expect(valueRef.value?.$el).toBe(host);
  expect(host).toHaveTextContent('Complete');
});

test('renders the circular Ark anatomy with stable hooks and an accessible name', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const circleRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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

  render(Harness);

  const progressbar = screen.getByRole('progressbar', { name: 'Export data' });
  const root = rootRef.value?.$el as HTMLElement;

  expect(root).toHaveAttribute('data-scope', 'progress');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'progress-circular-root');
  expect(root).toHaveAttribute('data-state', 'loading');
  expect(progressbar).toHaveAttribute('data-slot', 'progress-circular-circle');
  expect(progressbar).toHaveAttribute('aria-valuenow', '42');
  expect(circleRef.value?.$el).toBe(progressbar);
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
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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

  render(Harness);

  const root = screen.getByRole('region', { name: 'Export status' });

  expect(rootRef.value?.$el).toBe(root);
  expect(root).toHaveAttribute('data-slot', 'progress-circular-root');
  expect(root).toHaveAttribute('data-scope', 'progress');
});

test('renders an indeterminate circular progressbar without an ARIA value', () => {
  const Harness = defineComponent({
    components: progressComponents,
    template: `
      <ProgressCircular :default-value="null">
        <ProgressCircularRing aria-label="Preparing report" />
      </ProgressCircular>
    `,
  });

  render(Harness);

  const progressbar = screen.getByRole('progressbar', { name: 'Preparing report' });

  expect(progressbar).toHaveAttribute('data-state', 'indeterminate');
  expect(progressbar).not.toHaveAttribute('aria-valuenow');
});

test('synchronizes custom circular composition with controlled values and state views', async () => {
  const Harness = defineComponent({
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

  render(Harness);

  const progressbar = screen.getByRole('progressbar', { name: 'Processed 10 of 30' });

  expect(progressbar).toHaveAttribute('aria-valuemin', '10');
  expect(progressbar).toHaveAttribute('aria-valuemax', '30');
  expect(progressbar).toHaveAttribute('aria-valuenow', '10');
  expect(progressbar).toHaveAttribute('data-state', 'loading');
  expect(screen.getByText('Processed 10 of 30')).toHaveAttribute('aria-live', 'polite');
  expect(screen.getByText('Import in progress')).toBeVisible();
  expect(screen.getByText('Import complete')).not.toBeVisible();

  await fireEvent.click(screen.getByRole('button', { name: 'Complete import' }));

  await waitFor(() => expect(progressbar).toHaveAttribute('aria-valuenow', '30'));
  expect(progressbar).toHaveAttribute('data-state', 'complete');
  expect(screen.getByRole('progressbar', { name: 'Processed 30 of 30' })).toBe(progressbar);
  expect(screen.getByText('Processed 30 of 30')).toHaveAttribute('aria-live', 'polite');
  expect(screen.getByText('Import in progress')).not.toBeVisible();
  expect(screen.getByText('Import complete')).toBeVisible();
});

const ProgressContextValue = defineComponent({
  setup() {
    const progress = useProgressContext();
    return { progress };
  },
  template: '<output>{{ progress.value }}</output>',
});

test('supports context updates from the public hook', async () => {
  const ProgressContextActions = defineComponent({
    setup() {
      const progress = useProgressContext();
      const setValue = () => progress.value.setValue(75);
      return { setValue };
    },
    template: '<button type="button" @click="setValue">Set progress</button>',
  });
  const Harness = defineComponent({
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

  render(Harness);
  await fireEvent.click(screen.getByRole('button', { name: 'Set progress' }));

  await waitFor(() =>
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75'),
  );
});

test('supports v-model updates from the Vue parent', async () => {
  const Harness = defineComponent({
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

  render(Harness);
  await fireEvent.click(screen.getByRole('button', { name: 'Set progress' }));

  await waitFor(() =>
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75'),
  );
});

test('keeps flat provider, context, and hook exports', () => {
  const Harness = defineComponent({
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

  render(Harness);

  const root = screen.getByTestId('progress-provider');

  expect(root).toHaveAttribute('data-slot', 'progress-circular-root-provider');
  expect(screen.getByRole('progressbar', { name: 'Team rollout' })).toHaveAttribute(
    'aria-valuenow',
    '58',
  );
  expect(screen.getAllByText('58')).toHaveLength(2);
});

test('renders and hydrates the public anatomy on the server', async () => {
  const App = defineComponent({
    components: progressComponents,
    template: `
      <ProgressCircular :default-value="42">
        <ProgressCircularLabel>Export data</ProgressCircularLabel>
        <ProgressCircularValueText />
        <ProgressCircularRing aria-label="Export data" />
      </ProgressCircular>
    `,
  });

  const html = await renderToString(createSSRApp(App));

  expect(html).toContain('data-slot="progress-circular-root"');
  expect(html).toContain('data-slot="progress-circular-circle"');
  expect(html).toContain('aria-valuenow="42"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);

  app.mount(host);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  app.unmount();
  host.remove();
});