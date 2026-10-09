import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestAlert from './fixtures/TestAlert.vue';

test('renders Alert anatomy without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestAlert));
  expect(html).toContain('data-slot="alert-root"');
  expect(html).toContain('data-slot="alert-content"');
  expect(html).toContain('data-slot="alert-title"');
  expect(html).toContain('role="status"');
});