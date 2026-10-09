import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestDrawer from './fixtures/TestDrawer.vue';

test('renders the public drawer anatomy without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const markup = await renderToString(createSSRApp(TestDrawer));
  expect(markup).toContain('data-slot="drawer-trigger"');
  expect(markup).toContain('data-slot="drawer-backdrop"');
  expect(markup).toContain('data-slot="drawer-content"');
  expect(markup).toContain('data-slot="drawer-title"');
  expect(markup).toContain('Preferences');
});