import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
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

test('renders the linear Ark anatomy with stable hooks and an accessible name', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const trackRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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

  render(Harness);

  const progressbar = screen.getByRole('progressbar', { name: 'Export data' });
  const root = rootRef.value?.$el as HTMLElement;
  const range = progressbar.querySelector('[data-part="range"]')!;

  expect(root).toHaveAttribute('data-scope', 'progress');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'progress-linear-root');
  expect(root).toHaveAttribute('data-state', 'loading');
  expect(root).toHaveClass('grid', 'w-48', 'text-foreground');
  expect(progressbar).toHaveAttribute('data-slot', 'progress-linear-track');
  expect(progressbar).toHaveAttribute('aria-valuenow', '42');
  expect(progressbar).toHaveClass('block', 'h-2', 'bg-muted', 'ring-1', 'ring-inset');
  expect(trackRef.value?.$el).toBe(progressbar);
  expect(range).toHaveAttribute('data-slot', 'progress-linear-range');
  expect(range).toHaveClass('block', 'h-full', 'bg-primary');
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
      <ProgressLinear ref="rootRef" as-child :default-value="70">
        <section aria-label="Export status">
          <ProgressLinearTrack aria-label="Export status">
            <ProgressLinearRange />
          </ProgressLinearTrack>
        </section>
      </ProgressLinear>
    `,
  });

  render(Harness);

  const root = screen.getByRole('region', { name: 'Export status' });

  expect(rootRef.value?.$el).toBe(root);
  expect(root).toHaveAttribute('data-slot', 'progress-linear-root');
  expect(root).toHaveAttribute('data-scope', 'progress');
});

test('preserves asChild composition on the track and range parts', () => {
  const Harness = defineComponent({
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

  render(Harness);

  const progressbar = screen.getByRole('progressbar', { name: 'Export status' });
  const range = progressbar.querySelector('[data-part="range"]');

  expect(progressbar.tagName).toBe('OUTPUT');
  expect(progressbar).toHaveAttribute('data-slot', 'progress-linear-track');
  expect(range?.tagName).toBe('SPAN');
  expect(range).toHaveAttribute('data-slot', 'progress-linear-range');
});

test('renders an indeterminate linear progressbar without an ARIA value', () => {
  const Harness = defineComponent({
    components: progressComponents,
    template: `
      <ProgressLinear :default-value="null">
        <ProgressLinearTrack aria-label="Preparing report">
          <ProgressLinearRange />
        </ProgressLinearTrack>
      </ProgressLinear>
    `,
  });

  render(Harness);

  const progressbar = screen.getByRole('progressbar', { name: 'Preparing report' });
  const range = progressbar.querySelector('[data-part="range"]')!;

  expect(progressbar).toHaveAttribute('data-state', 'indeterminate');
  expect(progressbar).not.toHaveAttribute('aria-valuenow');
  expect(range).toHaveClass(
    'data-[state=indeterminate]:w-[35%]',
    'data-[state=indeterminate]:animate-moduix-progress-linear-indeterminate',
  );
});

test('preserves custom bounds and accessible value text', () => {
  const Harness = defineComponent({
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

  render(Harness);

  const progressbar = screen.getByRole('progressbar', { name: 'Request migration' });

  expect(progressbar).toHaveAttribute('aria-valuemin', '200');
  expect(progressbar).toHaveAttribute('aria-valuemax', '800');
  expect(progressbar).toHaveAttribute('aria-valuenow', '420');
  expect(screen.getByText('420 of 800 requests completed')).toHaveAttribute('aria-live', 'polite');
});

const ProgressContextValue = defineComponent({
  setup() {
    const progress = useProgressContext();
    return { progress };
  },
  template: '<output>{{ progress.value }}</output>',
});

test('supports controlled values and context access', async () => {
  const Harness = defineComponent({
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

  render(Harness);
  await fireEvent.click(screen.getByRole('button', { name: 'Set progress' }));

  await waitFor(() => expect(screen.getByText('Current value: 75')).toBeInTheDocument());
  expect(screen.getByRole('progressbar', { name: 'Upload status' })).toHaveAttribute(
    'aria-valuenow',
    '75',
  );
});

test('connects provider, context, hook, and state views', async () => {
  const Harness = defineComponent({
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

  render(Harness);

  const root = screen.getByTestId('progress-provider');

  expect(root).toHaveAttribute('data-slot', 'progress-linear-root-provider');
  expect(screen.getByRole('progressbar', { name: 'Team rollout' })).toHaveAttribute(
    'aria-valuenow',
    '58',
  );
  expect(screen.getAllByText('58')).toHaveLength(2);
  expect(screen.getByText('Transfer in progress')).toBeInTheDocument();
  expect(screen.getByText('Export complete')).toHaveAttribute('hidden');
});

test('lets consumer utilities override defaults on each styled part', () => {
  const Harness = defineComponent({
    components: progressComponents,
    template: `
      <ProgressLinear class="w-80" data-testid="progress-root">
        <ProgressLinearLabel>Export data</ProgressLinearLabel>
        <ProgressLinearValueText />
        <ProgressLinearTrack class="h-4" aria-label="Export data">
          <ProgressLinearRange class="bg-accent" />
        </ProgressLinearTrack>
      </ProgressLinear>
    `,
  });

  render(Harness);

  const root = screen.getByTestId('progress-root');
  const track = screen.getByRole('progressbar', { name: 'Export data' });
  const range = track.querySelector('[data-part="range"]')!;

  expect(root).toHaveClass('w-80');
  expect(root).not.toHaveClass('w-48');
  expect(track).toHaveClass('h-4');
  expect(track).not.toHaveClass('h-2');
  expect(range).toHaveClass('bg-accent');
  expect(range).not.toHaveClass('bg-primary');
});

test('renders and hydrates the public anatomy on the server', async () => {
  const App = defineComponent({
    components: progressComponents,
    template: `
      <ProgressLinear :default-value="42">
        <ProgressLinearLabel>Export data</ProgressLinearLabel>
        <ProgressLinearValueText />
        <ProgressLinearTrack aria-label="Export data"><ProgressLinearRange /></ProgressLinearTrack>
      </ProgressLinear>
    `,
  });

  const html = await renderToString(createSSRApp(App));

  expect(html).toContain('data-slot="progress-linear-root"');
  expect(html).toContain('data-slot="progress-linear-track"');
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