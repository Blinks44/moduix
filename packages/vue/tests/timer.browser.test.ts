import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
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
import SsrTimer from './fixtures/SsrTimer.vue';

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

test('renders the short root form with default segments, stable hooks, and Vue refs', async () => {
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
  await expect.element(page.getByTestId('timer')).toHaveAttribute('data-slot', 'timer-root');
  await expect.element(page.getByRole('timer')).toHaveAttribute('data-slot', 'timer-area');
  await expect.element(page.getByRole('timer')).toHaveAttribute('aria-atomic', 'true');
  expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(3);
  expect(container.querySelectorAll('[data-slot="timer-separator"]')).toHaveLength(2);
  await expect.element(page.locator('[data-type="hours"]')).toBeAttached();
  await expect.element(page.locator('[data-type="minutes"]')).toBeAttached();
  await expect.element(page.locator('[data-type="seconds"]')).toBeAttached();
});

test('forwards area props and refs through custom segments', async () => {
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
  await expect
    .element(page.getByTestId('custom-segments'))
    .toHaveAttribute('aria-label', 'Remaining time');
  expect(container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-slot="timer-separator"]')).toHaveLength(1);
  await expect.element(page.locator('[data-type="hours"]')).toHaveCount(0);
  await expect.element(page.getByTestId('custom-segments')).toContainText('·');
});

test('preserves initial time, custom ids, translations, and Ark runtime values', async () => {
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
  await expect
    .element(page.locator('[data-slot="timer-root"]'))
    .toHaveAttribute('id', 'countdown-root');
  await expect.element(page.getByRole('timer')).toHaveAttribute('id', 'countdown-area');
  await expect.element(page.getByRole('timer')).toHaveAttribute('aria-label', 'Time remaining');
  for (const [type, text, value] of [
    ['hours', '01', '1'],
    ['minutes', '02', '2'],
    ['seconds', '03', '3'],
    ['milliseconds', '456', '456'],
  ]) {
    const item = container.querySelector(`[data-type="${type}"]`);
    await expect.element(page.locator(`[data-type="${type}"]`)).toContainText(text);
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
  expect([...screen.getByRole('timer')!.classList]).toEqual(
    expect.arrayContaining(['custom-area']),
  );
  await expect.element(page.getByTestId('separator-content')).toContainText('·');
  separator.value = h('strong', { 'data-testid': 'separator-content' }, '/');
  await nextTick();
  expect(screen.getByTestId('separator-content').tagName).toBe('STRONG');
  await expect.element(page.getByTestId('separator-content')).toContainText('/');
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

  const startLocator = page.getByText('Start', { exact: true });
  await expect.element(startLocator).toHaveAttribute('type', 'button');
  await expect.element(page.getByText('Pause')).toHaveAttribute('hidden');
  await expect.element(page.getByText('Reset')).toHaveAttribute('hidden');

  await startLocator.press('Enter');

  await expect.element(startLocator).toHaveAttribute('hidden');
  await expect.element(page.getByText('Pause')).not.toHaveAttribute('hidden');
  await expect.element(page.getByText('Reset')).not.toHaveAttribute('hidden');
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await expect.element(page.getByText('Pause', { exact: true })).toHaveAttribute('hidden');
  await expect.element(startLocator).toHaveAttribute('hidden');
  await page.getByRole('button', { name: 'Reset', exact: true }).press('Enter');
  await expect.element(startLocator).not.toHaveAttribute('hidden');
  await expect.element(page.getByText('Reset', { exact: true })).toHaveAttribute('hidden');
  await expect.element(page.getByRole('timer')).toContainText('00:00:00');
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
        <TimerContext v-slot="context"><output data-testid="timer-context">{{ context.running ? 'Running' : 'Idle' }}</output></TimerContext>
        <TimerControl>
          <TimerActionTrigger action="start">Start provider timer</TimerActionTrigger>
        </TimerControl>
      </TimerRootProvider>
    `,
  });

  render(Harness);

  await expect.element(page.getByRole('status').nth(0)).toContainText('Idle');
  await expect.element(page.getByTestId('timer-context')).toHaveText('Idle');

  await page.getByRole('button', { name: 'Start provider timer', exact: true }).click();

  await expect.element(page.getByRole('status').nth(0)).toContainText('Running');
  await expect.element(page.getByTestId('timer-context')).toHaveText('Running');
});

test('preserves semantic replacement hosts and refs with asChild', async () => {
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
  const rootLocator = page.getByTestId('timer-section');
  await expect.element(rootLocator).toHaveAttribute('data-scope', 'timer');
  await expect.element(rootLocator).toHaveAttribute('data-part', 'root');
  await expect.element(rootLocator).toHaveAttribute('data-slot', 'timer-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(area.tagName).toBe('ARTICLE');
  await expect.element(page.getByTestId('timer-area-host')).toHaveAttribute('data-part', 'area');
  await expect
    .element(page.getByTestId('timer-area-host'))
    .toHaveAttribute('data-slot', 'timer-area');
  expect(areaRef.value?.$el).toBe(area);
  expect(action.tagName).toBe('A');
  await expect
    .element(page.getByTestId('start-link'))
    .toHaveAttribute('data-part', 'action-trigger');
  await expect
    .element(page.getByTestId('start-link'))
    .toHaveAttribute('data-slot', 'timer-action-trigger');
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

  await expect.poll(() => container.querySelectorAll('[data-slot="timer-item"]')).toHaveLength(2);
  await expect
    .poll(() => container.querySelectorAll('[data-slot="timer-separator"]'))
    .toHaveLength(1);
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

  await expect.poll(() => ticks.length).toBeGreaterThan(0);
  await expect
    .poll(() => ticks[0])
    .toEqual({
      value: expect.any(Number),
      time: expect.objectContaining({ seconds: expect.any(Number) }),
      formattedTime: expect.objectContaining({ seconds: expect.any(String) }),
    });
  await expect.poll(() => completed).toEqual([true]);
  unmount();
});

test('hydrates stable hosts and ids and remains interactive', async () => {
  const html = await renderToString(createSSRApp(SsrTimer));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="timer-root"]');
  const serverNodes = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(serverRoot).not.toBeNull();
  expect(serverIds.length).toBeGreaterThan(0);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrTimer);
  try {
    app.mount(host);
    await nextTick();
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    expect(host.querySelector('[data-slot="timer-root"]')).toBe(serverRoot);
    expect([...host.querySelectorAll('[data-slot]')]).toEqual(serverNodes);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await page.getByRole('button', { name: 'Start', exact: true }).click();
    await expect
      .element(page.locator('[data-slot="timer-action-trigger"]'))
      .toHaveAttribute('hidden');
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});