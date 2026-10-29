import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import { Clipboard, ClipboardControl, ClipboardInput, ClipboardTrigger } from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const { container } = render(() => (
    <Clipboard class="gap-4 text-primary">
      <ClipboardControl class="gap-5">
        <ClipboardInput class="bg-muted px-0" />
        <ClipboardTrigger class="rounded-lg bg-muted px-2" />
      </ClipboardControl>
    </Clipboard>
  ));

  const root = container.querySelector('[data-slot="clipboard-root"]');
  const control = container.querySelector('[data-slot="clipboard-control"]');
  const input = container.querySelector('[data-slot="clipboard-input"]');
  const trigger = container.querySelector('[data-slot="clipboard-trigger"]');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  expect([...control!.classList]).toEqual(expect.arrayContaining(['gap-5']));
  expect([...input!.classList]).toEqual(expect.arrayContaining(['bg-muted', 'px-0']));
  expect([...trigger!.classList]).toEqual(
    expect.arrayContaining(['rounded-lg', 'bg-muted', 'px-2']),
  );
  expect(getComputedStyle(root!).gap).toBe('16px');
  expect(getComputedStyle(input!).paddingLeft).toBe('0px');
  expect(getComputedStyle(trigger!).paddingLeft).toBe('8px');
});