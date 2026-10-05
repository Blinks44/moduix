import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestKbd from './fixtures/TestKbd.vue';

test('renders kbd without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestKbd));
  expect(html).toMatch(/^<span/);
  expect(html).toContain('data-scope="kbd"');
  expect(html).toContain('data-part="group"');
  expect(html).toContain('data-slot="kbd-root"');
});