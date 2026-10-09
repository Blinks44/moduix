import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestTooltip from './fixtures/TestTooltip.vue';

test('renders inline and portalled tooltip anatomy without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const context: { teleports?: Record<string, string> } = {};
  const html = await renderToString(createSSRApp(TestTooltip), context);
  const markup = html + (context.teleports?.body ?? '');
  expect(markup).toContain('data-slot="tooltip-trigger"');
  expect(markup).toContain('data-slot="tooltip-content"');
  expect(markup).toContain('data-slot="tooltip-arrow-tip"');
  expect(markup).toContain('Inline hint');
  expect(markup).toContain('Portalled hint');
  expect(markup).not.toContain('Closed hint');
});