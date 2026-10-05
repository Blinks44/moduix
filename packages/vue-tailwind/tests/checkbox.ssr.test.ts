import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrCheckbox from './fixtures/SsrCheckbox.vue';

test('renders the public checkbox anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrCheckbox));
  expect(html).toContain('data-slot="checkbox-root"');
  expect(html).toContain('data-slot="checkbox-control"');
  expect(html).toContain('type="checkbox"');
});