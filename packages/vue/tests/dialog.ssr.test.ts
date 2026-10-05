import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestDialog from './fixtures/TestDialog.vue';

test('renders the public dialog anatomy without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestDialog));
  expect(html).toContain('data-slot="dialog-trigger"');
  expect(html).toContain('data-slot="dialog-content"');
  expect(html).toContain('data-slot="dialog-title"');
});