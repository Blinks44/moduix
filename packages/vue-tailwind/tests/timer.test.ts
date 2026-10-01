import { TimerItem as ArkTimerItem, TimerRoot as ArkTimerRoot } from '@ark-ui/vue/timer';
import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, h, nextTick, ref, shallowRef } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Timer,
  TimerActionTrigger,
  TimerArea,
  TimerContext,
  TimerControl,
  TimerItem,
  TimerRootProvider,
  TimerSegments,
  TimerSeparator,
  useTimer,
  useTimerContext,
} from '../src';
import type { TimerItemProps } from '../src';

const timerComponents = {
  Timer,
  TimerActionTrigger,
  TimerArea,
  TimerContext,
  TimerControl,
  TimerItem,
  TimerRootProvider,
  TimerSegments,
  TimerSeparator,
};

test('renders the short root form with default segments, stable hooks, and Vue refs', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const segmentsRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: timerComponents,
    setup() {
      return { rootRef, segmentsRef };
    },
    template: `
      <Timer ref="rootRef" data-testid="timer" :target-ms="60000">
        <TimerSegments ref="segmentsRef" />
      </Timer>
    `,
  });

  const { container } = render(Harness);

  const root = screen.getByTestId('timer');
  const area = screen.getByRole('timer');

  expect(rootRef.value?.$el).toBe(root);
  expect(segmentsRef.value?.$el).toBe(area);
  expect(root).toHaveAttribute('data-slot', 'timer-root');
  expect(area).toHaveAttribute('data-slot', 'timer-area');
  expect(area).toHaveAttribute('aria-atomic', 'true');
  expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(3);
  expect(container.querySelectorAll('[data-slot="timer-separator"]')).toHaveLength(2);
  expect(container.querySelector('[data-type="hours"]')).toBeInTheDocument();
  expect(container.querySelector('[data-type="minutes"]')).toBeInTheDocument();
  expect(container.querySelector('[data-type="seconds"]')).toBeInTheDocument();
});

test('forwards area props and refs through custom segments', () => {
  const segmentsRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: timerComponents,
    setup() {
      return { segmentsRef };
    },
    template: `
      <Timer :target-ms="60000">
        <TimerSegments
          ref="segmentsRef"
          aria-label="Remaining time"
          data-testid="custom-segments"
          separator="·"
          :types="['minutes', 'seconds']"
        />
      </Timer>
    `,
  });

  const { container } = render(Harness);
  const area = screen.getByTestId('custom-segments');

  expect(segmentsRef.value?.$el).toBe(area);
  expect(area).toHaveAttribute('aria-label', 'Remaining time');
  expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-slot="timer-separator"]')).toHaveLength(1);
  expect(container.querySelector('[data-type="hours"]')).not.toBeInTheDocument();
  expect(area).toHaveTextContent('·');
});

test('preserves initial time, custom ids, translations, and Ark runtime values', () => {
  const { container } = render({
    components: timerComponents,
    template: `
      <Timer
        countdown
        :start-ms="3723456"
        :ids="{ root: 'countdown-root', area: 'countdown-area' }"
        :translations="{ areaLabel: () => 'Time remaining' }"
      >
        <TimerSegments :types="['hours', 'minutes', 'seconds', 'milliseconds']" />
      </Timer>
    `,
  });
  expect(container.querySelector('[data-slot="timer-root"]')).toHaveAttribute(
    'id',
    'countdown-root',
  );
  expect(screen.getByRole('timer')).toHaveAttribute('id', 'countdown-area');
  expect(screen.getByRole('timer')).toHaveAttribute('aria-label', 'Time remaining');
  for (const [type, text, value] of [
    ['hours', '01', '1'],
    ['minutes', '02', '2'],
    ['seconds', '03', '3'],
    ['milliseconds', '456', '456'],
  ]) {
    const item = container.querySelector(`[data-type="${type}"]`);
    expect(item).toHaveTextContent(text);
    expect(item?.getAttribute('style')).toContain(`--value: ${value}`);
  }
});

test('renders a reactive VNode separator and preserves area attrs', async () => {
  const separator = shallowRef(h('span', { 'data-testid': 'separator-content' }, '·'));
  const Harness = defineComponent({
    components: timerComponents,
    setup() {
      return { separator };
    },
    template: `
      <Timer :target-ms="60000">
        <TimerSegments :types="['minutes', 'seconds']" :separator="separator" class="custom-area" />
      </Timer>
    `,
  });
  render(Harness);
  expect(screen.getByRole('timer')).toHaveClass('custom-area');
  expect(screen.getByTestId('separator-content')).toHaveTextContent('·');
  separator.value = h('strong', { 'data-testid': 'separator-content' }, '/');
  await nextTick();
  expect(screen.getByTestId('separator-content').tagName).toBe('STRONG');
  expect(screen.getByTestId('separator-content')).toHaveTextContent('/');
});

// Ark Vue 5.39.2 discards TimerItem's default slot and feeds text to asChild.
// Keep the native Ark reproduction alongside the wrapper assertion; re-enable after the upstream fix.
test.skip('preserves TimerItem asChild replacement hosts in native Ark and moduix', async () => {
  const template = `
    <Timer :start-ms="12000" :target-ms="60000">
      <TimerItem type="seconds" as-child><span data-testid="item-host">12</span></TimerItem>
    </Timer>
  `;
  const NativeArkApp = defineComponent({
    components: { Timer: ArkTimerRoot, TimerItem: ArkTimerItem },
    template,
  });
  const ModuixApp = defineComponent({
    components: { Timer, TimerItem },
    template,
  });
  for (const App of [NativeArkApp, ModuixApp]) {
    const html = await renderToString(createSSRApp(App));
    const host = document.createElement('div');
    host.innerHTML = html;
    const item = host.querySelector('[data-testid="item-host"]');
    expect(item).not.toBeNull();
    expect(item).toHaveAttribute('data-part', 'item');
    expect(item).toHaveAttribute('data-type', 'seconds');
    expect(item).toHaveTextContent('12');
  }
});

test('preserves Ark action visibility and native button semantics', async () => {
  render({
    components: timerComponents,
    template: `
      <Timer :target-ms="60000">
        <TimerSegments />
        <TimerControl>
          <TimerActionTrigger action="start">Start</TimerActionTrigger>
          <TimerActionTrigger action="pause">Pause</TimerActionTrigger>
          <TimerActionTrigger action="reset">Reset</TimerActionTrigger>
        </TimerControl>
      </Timer>
    `,
  });

  const start = screen.getByRole('button', { name: 'Start' });
  const pause = screen.getByText('Pause');
  const reset = screen.getByText('Reset');

  expect(start).toHaveAttribute('type', 'button');
  expect(pause).toHaveAttribute('hidden');
  expect(reset).toHaveAttribute('hidden');

  await fireEvent.click(start);

  await waitFor(() => {
    expect(start).toHaveAttribute('hidden');
    expect(pause).not.toHaveAttribute('hidden');
    expect(reset).not.toHaveAttribute('hidden');
  });
});

const ProviderStatus = defineComponent({
  setup() {
    const timer = useTimerContext();
    return { timer };
  },
  template: '<output>{{ timer.running ? "Running" : "Idle" }}</output>',
});

test('keeps RootProvider and context hook state connected', async () => {
  const Harness = defineComponent({
    components: { ...timerComponents, ProviderStatus },
    setup() {
      return { timer: useTimer({ targetMs: 60_000 }) };
    },
    template: `
      <TimerRootProvider :value="timer">
        <ProviderStatus />
        <TimerControl>
          <TimerActionTrigger action="start">Start provider timer</TimerActionTrigger>
        </TimerControl>
      </TimerRootProvider>
    `,
  });

  render(Harness);
  const output = screen.getByRole('status');

  expect(output).toHaveTextContent('Idle');

  await fireEvent.click(screen.getByRole('button', { name: 'Start provider timer' }));

  await waitFor(() => {
    expect(output).toHaveTextContent('Running');
  });
});

test('keeps the public TimerContext slot connected to the provider', () => {
  const ContextStatus = defineComponent({
    components: { TimerContext },
    template: `
      <TimerContext v-slot="context">
        <output>{{ context.running ? 'Running' : 'Idle' }}</output>
      </TimerContext>
    `,
  });
  const Harness = defineComponent({
    components: { ...timerComponents, ContextStatus },
    setup() {
      return { timer: useTimer({ targetMs: 60_000 }) };
    },
    template: `
      <TimerRootProvider :value="timer">
        <ContextStatus />
      </TimerRootProvider>
    `,
  });

  render(Harness);

  expect(screen.getByRole('status')).toHaveTextContent('Idle');
});

test('preserves semantic replacement hosts and refs with asChild', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const areaRef = ref<ComponentPublicInstance>();
  const actionRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: timerComponents,
    setup() {
      return { actionRef, areaRef, rootRef };
    },
    template: `
      <Timer ref="rootRef" as-child :target-ms="60000">
        <section data-testid="timer-section">
          <TimerArea ref="areaRef" as-child>
            <article data-testid="timer-area-host"><TimerItem type="seconds" /></article>
          </TimerArea>
          <TimerControl>
            <TimerActionTrigger ref="actionRef" as-child action="start">
              <a href="/start" data-testid="start-link">Start</a>
            </TimerActionTrigger>
          </TimerControl>
        </section>
      </Timer>
    `,
  });

  render(Harness);

  const root = screen.getByTestId('timer-section');
  const area = screen.getByTestId('timer-area-host');
  const action = screen.getByTestId('start-link');

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-scope', 'timer');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'timer-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(area.tagName).toBe('ARTICLE');
  expect(area).toHaveAttribute('data-part', 'area');
  expect(area).toHaveAttribute('data-slot', 'timer-area');
  expect(areaRef.value?.$el).toBe(area);
  expect(action.tagName).toBe('A');
  expect(action).toHaveAttribute('data-part', 'action-trigger');
  expect(action).toHaveAttribute('data-slot', 'timer-action-trigger');
  expect(actionRef.value?.$el).toBe(action);
});

test('keeps TimerSegments reactive when its types change', async () => {
  const types = ref<TimerItemProps['type'][]>(['minutes']);
  const Harness = defineComponent({
    components: timerComponents,
    setup() {
      return { types };
    },
    template: `
      <Timer :target-ms="60000"><TimerSegments :types="types" /></Timer>
    `,
  });

  const { container } = render(Harness);

  expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(1);

  types.value = ['minutes', 'seconds'];
  await nextTick();

  await waitFor(() => {
    expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-slot="timer-separator"]')).toHaveLength(1);
  });
});

test('forwards root lifecycle listeners through the transparent wrapper', async () => {
  const ticks: unknown[] = [];
  const completed: unknown[] = [];
  const Harness = defineComponent({
    components: timerComponents,
    setup() {
      return { completed, ticks };
    },
    template: `
      <Timer
        auto-start
        :interval="1"
        :start-ms="0"
        :target-ms="10"
        @tick="ticks.push($event)"
        @complete="completed.push(true)"
      >
        <TimerSegments />
      </Timer>
    `,
  });

  const { unmount } = render(Harness);

  await waitFor(() => {
    expect(ticks.length).toBeGreaterThan(0);
    expect(ticks[0]).toEqual({
      value: expect.any(Number),
      time: expect.objectContaining({ seconds: expect.any(Number) }),
      formattedTime: expect.objectContaining({ seconds: expect.any(String) }),
    });
    expect(completed).toEqual([true]);
  });
  unmount();
});

test('renders and hydrates the public anatomy on the server', async () => {
  const App = defineComponent({
    components: timerComponents,
    template: `
      <Timer :target-ms="60000">
        <TimerSegments />
        <TimerControl><TimerActionTrigger action="start">Start</TimerActionTrigger></TimerControl>
      </Timer>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="timer-root"');
  expect(html).toContain('data-slot="timer-area"');
  expect(html).toContain('role="timer"');
  expect(html).toContain('data-slot="timer-action-trigger"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="timer-root"]');
  const serverParts = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  app.mount(host);

  expect(host.querySelector('[data-slot="timer-root"]')).toBe(serverRoot);
  expect([...host.querySelectorAll('[data-slot]')]).toEqual(serverParts);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  expect(warn).not.toHaveBeenCalled();
  expect(error).not.toHaveBeenCalled();

  app.unmount();
  host.remove();
  warn.mockRestore();
  error.mockRestore();
});

test('uses native utilities on every owned part and merges consumer overrides', () => {
  const { container } = render({
    components: timerComponents,
    template: `
      <Timer class="block gap-6 text-primary" :target-ms="60000">
        <TimerArea class="text-lg">
          <TimerItem class="min-w-0" type="minutes" />
          <TimerSeparator class="text-primary">:</TimerSeparator>
        </TimerArea>
        <TimerControl>
          <TimerActionTrigger class="rounded-full bg-primary" action="start">
            Start
          </TimerActionTrigger>
        </TimerControl>
      </Timer>
    `,
  });

  const root = container.querySelector('[data-slot="timer-root"]');
  const area = container.querySelector('[data-slot="timer-area"]');
  const item = container.querySelector('[data-slot="timer-item"]');
  const separator = container.querySelector('[data-slot="timer-separator"]');
  const control = container.querySelector('[data-slot="timer-control"]');
  const trigger = screen.getByRole('button', { name: 'Start' });

  expect(root).toHaveClass('block', 'gap-6', 'text-primary');
  expect(root).not.toHaveClass('inline-grid', 'gap-3', 'text-foreground');
  expect(area).toHaveClass('inline-flex', 'gap-1', 'text-lg', 'tabular-nums');
  expect(area).not.toHaveClass('text-2xl');
  expect(item).toHaveClass('min-w-0', 'text-center');
  expect(item).not.toHaveClass('min-w-[2ch]');
  expect(separator).toHaveClass('text-primary');
  expect(separator).not.toHaveClass('text-muted-foreground');
  expect(control).toHaveClass('inline-flex', 'gap-2');
  expect(trigger).toHaveClass('inline-flex', 'min-h-control-md', 'border', 'bg-primary');
  expect(trigger).not.toHaveClass('rounded-md', 'bg-background');
});