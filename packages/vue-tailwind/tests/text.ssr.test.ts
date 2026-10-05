import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestText from './fixtures/TestText.vue';

test('renders text without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestText));
  expect(html).toMatch(/^<a/);
  expect(html).toContain('data-slot="text-root"');
  expect(html).toContain('-webkit-line-clamp:2');
});