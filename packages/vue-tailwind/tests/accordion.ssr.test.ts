import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrAccordion from './fixtures/SsrAccordion.vue';

test('renders accordion on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrAccordion));
  expect(html).toContain('data-slot="accordion-root"');
  expect(html).toContain('data-slot="accordion-item-trigger"');
  expect(html).toContain('aria-expanded="true"');
});