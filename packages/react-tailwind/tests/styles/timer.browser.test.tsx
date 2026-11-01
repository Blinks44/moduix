import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import {
  Timer,
  TimerActionTrigger,
  TimerArea,
  TimerControl,
  TimerItem,
  TimerSeparator,
} from '@/index';

test('uses native utilities on every owned part and merges consumer overrides', async () => {
  const { container } = render(
    <Timer className="block gap-6 text-primary" targetMs={60_000}>
      <TimerArea className="text-lg">
        <TimerItem className="min-w-0" type="minutes" />
        <TimerSeparator className="text-primary">:</TimerSeparator>
      </TimerArea>
      <TimerControl>
        <TimerActionTrigger className="rounded-full bg-primary" action="start">
          Start
        </TimerActionTrigger>
      </TimerControl>
    </Timer>,
  );

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