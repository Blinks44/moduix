import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestHeading from './fixtures/TestHeading.vue';

test('renders heading without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestHeading));
  expect(html).toMatch(/^<h2/);
  expect(html).toContain('data-slot="heading-root"');
});