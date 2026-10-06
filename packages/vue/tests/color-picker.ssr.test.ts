import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrColorPicker from './fixtures/SsrColorPicker.vue';

test('renders color-picker on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrColorPicker));
  expect(html).toContain('data-slot="color-picker-trigger"');
  expect(html).toContain('data-slot="color-picker-content"');
});