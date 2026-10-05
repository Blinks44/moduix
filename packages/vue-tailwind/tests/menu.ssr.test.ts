import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestMenu from './fixtures/TestMenu.vue';

test('renders menu without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestMenu));
  expect(html).toContain('data-slot="menu-trigger"');
  expect(html).toContain('data-slot="menu-content"');
  expect(html).toContain('data-slot="menu-viewport"');
});