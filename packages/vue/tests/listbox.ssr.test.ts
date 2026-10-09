import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrListbox from './fixtures/SsrListbox.vue';

test('renders listbox on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrListbox));
  expect(html).toContain('data-slot="listbox-root"');
  expect(html).toContain('data-slot="listbox-content"');
});