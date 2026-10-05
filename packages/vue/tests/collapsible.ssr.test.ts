import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrCollapsible from './fixtures/SsrCollapsible.vue';

test('renders collapsible public anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrCollapsible));
  expect(html).toContain('data-slot="collapsible-root"');
  expect(html).toContain('data-slot="collapsible-trigger"');
  expect(html).toContain('aria-expanded="true"');
});