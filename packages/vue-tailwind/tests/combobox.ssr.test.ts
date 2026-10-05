import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrCombobox from './fixtures/SsrCombobox.vue';

test('renders combobox on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrCombobox));
  expect(html).toContain('data-slot="combobox-root"');
  expect(html).toContain('data-slot="combobox-content"');
});