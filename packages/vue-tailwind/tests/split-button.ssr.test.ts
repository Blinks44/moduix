import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestSplitButton from './fixtures/TestSplitButton.vue';

test('renders inline, closed and portalled split-buttons without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestSplitButton));
  expect(html.match(/data-slot="split-button-root"/g)).toHaveLength(3);
  expect(html.match(/data-slot="split-button-action"/g)).toHaveLength(3);
  expect(html).toMatch(/<a\b[^>]*href="#docs"/);
  expect(html).toContain('aria-expanded="true"');
  expect(html).toContain('aria-expanded="false"');
  expect(html).toContain('data-slot="split-button-content"');
});