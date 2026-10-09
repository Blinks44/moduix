import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrTabs from './fixtures/SsrTabs.vue';

test('renders tabs on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrTabs));
  expect(html).toContain('data-slot="tabs-root"');
  expect(html).toContain('data-slot="tabs-trigger"');
  expect(html).toContain('aria-selected="true"');
});