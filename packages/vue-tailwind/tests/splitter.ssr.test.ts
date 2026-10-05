import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestSplitter from './fixtures/TestSplitter.vue';

test('renders public splitter anatomy without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestSplitter));
  expect(html).toContain('data-slot="splitter-root"');
  expect(html).toContain('data-slot="splitter-panel"');
  expect(html).toContain('data-slot="splitter-resize-trigger"');
  expect(html).toContain('role="separator"');
});