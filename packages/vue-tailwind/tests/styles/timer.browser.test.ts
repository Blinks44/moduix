import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
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
} from '@/index';

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

test('uses native utilities on every owned part and merges consumer overrides', async () => {
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
  const separator = container.querySelector('[data-slot="timer-separator"]');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['block', 'gap-6', 'text-primary']));
  expect([...separator!.classList]).toEqual(expect.arrayContaining(['text-primary']));
  await expect.element(page.locator('[data-slot="timer-root"]')).toHaveCSS('display', 'block');
  await expect.element(page.locator('[data-slot="timer-root"]')).toHaveCSS('gap', '24px');
  await expect.element(page.getByRole('timer')).toHaveCSS('font-size', '18px');
  await expect
    .element(page.locator('[data-slot="timer-item"]').nth(0))
    .toHaveCSS('min-width', '0px');
});