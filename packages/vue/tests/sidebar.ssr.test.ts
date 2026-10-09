import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestSidebar from './fixtures/TestSidebar.vue';

test('renders the public anatomy without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestSidebar));
  expect(html).toContain('data-slot="sidebar-root"');
  expect(html).toContain('data-slot="sidebar-panel"');
  expect(html).toContain('data-slot="sidebar-resize-trigger"');
});