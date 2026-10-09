import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestSpinner from './fixtures/TestSpinner.vue';

test('renders Spinner asChild without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestSpinner));
  expect(html).toContain('<span');
  expect(html).toContain('data-slot="spinner-root"');
  expect(html).toContain('role="status"');
  expect(html).toContain('aria-label="Loading report"');
});