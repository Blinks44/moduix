import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrButton from './fixtures/SsrButton.vue';

test('renders button public anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrButton));
  expect(html).toContain('<a');
  expect(html).toContain('data-slot="button-root"');
  expect(html).not.toContain('type="button"');
});