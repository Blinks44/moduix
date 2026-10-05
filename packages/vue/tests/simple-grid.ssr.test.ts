import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestSimpleGrid from './fixtures/TestSimpleGrid.vue';

test('renders simple-grid asChild without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestSimpleGrid));
  expect(html).toMatch(/^<ul/);
  expect(html).toContain('data-slot="simple-grid-root"');
  expect(html).toContain('gap:12px');
  expect(html).toContain('Analytics');
});