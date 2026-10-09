import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestBleed from './fixtures/TestBleed.vue';

test('renders bleed asChild without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestBleed));
  expect(html).toMatch(/^<figure/);
  expect(html).toContain('data-slot="bleed-root"');
  expect(html).toContain('data-inline="md"');
  expect(html).toContain('data-block="sm"');
});