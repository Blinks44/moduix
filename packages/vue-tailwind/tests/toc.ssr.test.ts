import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestToc from './fixtures/TestToc.vue';

test('renders the public anatomy without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestToc));
  expect(html).toContain('data-slot="toc-root"');
  expect(html).toContain('data-slot="toc-content"');
  expect(html).toContain('data-slot="toc-nav"');
  expect(html).toContain('data-slot="toc-title"');
});