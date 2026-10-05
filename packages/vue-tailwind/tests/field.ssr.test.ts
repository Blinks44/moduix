import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrField from './fixtures/SsrField.vue';

test('renders the public field anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrField));
  expect(html).toContain('data-slot="field-root"');
  expect(html).toContain('data-slot="field-label"');
  expect(html).toContain('data-slot="field-input"');
});