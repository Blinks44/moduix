import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent } from 'vue';
import type { Component } from 'vue';
import {
  Clipboard,
  ClipboardContext,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRootProvider,
  ClipboardTrigger,
  ClipboardValueText,
} from '@/index';

const clipboardComponents = {
  Clipboard,
  ClipboardContext,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRootProvider,
  ClipboardTrigger,
  ClipboardValueText,
} as Record<string, Component>;

test('applies native utilities and lets consumer classes win', () => {
  const Harness = defineComponent({
    components: clipboardComponents,
    template: `
      <Clipboard class="gap-4 text-primary" default-value="moduix/clipboard">
        <ClipboardLabel>Copy link</ClipboardLabel>
        <ClipboardControl class="gap-5">
          <ClipboardInput class="bg-muted px-0" />
          <ClipboardTrigger class="rounded-lg bg-muted px-2"><ClipboardIndicator /></ClipboardTrigger>
        </ClipboardControl>
      </Clipboard>
    `,
  });

  const { container } = render(Harness);
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