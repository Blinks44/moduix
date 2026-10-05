import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrEditable from './fixtures/SsrEditable.vue';

test('renders editable on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrEditable));
  expect(html).toContain('data-slot="editable-root"');
  expect(html).toContain('data-slot="editable-preview"');
  expect(html).toContain('data-slot="editable-area"');
});