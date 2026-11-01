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

test('sizes the input, trigger, and default icon from the clipboard variables', () => {
  const Harness = defineComponent({
    components: clipboardComponents,
    template: `
      <Clipboard
        default-value="moduix"
        style="--moduix-clipboard-height: 48px; --moduix-clipboard-icon-size: 20px"
      >
        <ClipboardControl>
          <ClipboardInput />
          <ClipboardTrigger>
            <ClipboardIndicator />
          </ClipboardTrigger>
        </ClipboardControl>
      </Clipboard>
    `,
  });

  render(Harness);

  const input = document.querySelector<HTMLElement>('[data-slot="clipboard-input"]');
  const trigger = document.querySelector<HTMLElement>('[data-slot="clipboard-trigger"]');
  const icon = document.querySelector('[data-slot="clipboard-indicator"] > svg');

  expect(input?.offsetHeight).toBe(48);
  expect(trigger?.offsetHeight).toBe(48);
  expect(icon?.getBoundingClientRect().width).toBe(20);
  expect(input && getComputedStyle(input).paddingLeft).toBe('12px');
});