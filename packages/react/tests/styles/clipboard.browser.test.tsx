import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { type CSSProperties } from 'react';
import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardTrigger,
} from '@/index';

test('sizes the input, trigger, and default icon from the clipboard variables', () => {
  render(
    <Clipboard
      defaultValue="moduix"
      style={
        {
          '--moduix-clipboard-height': '48px',
          '--moduix-clipboard-icon-size': '20px',
        } as CSSProperties
      }
    >
      <ClipboardControl>
        <ClipboardInput />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>,
  );

  const input = document.querySelector<HTMLElement>('[data-slot="clipboard-input"]');
  const trigger = document.querySelector<HTMLElement>('[data-slot="clipboard-trigger"]');
  const icon = document.querySelector('[data-slot="clipboard-indicator"] > svg');

  expect(input?.offsetHeight).toBe(48);
  expect(trigger?.offsetHeight).toBe(48);
  expect(icon?.getBoundingClientRect().width).toBe(20);
  expect(input && getComputedStyle(input).paddingLeft).toBe('12px');
});