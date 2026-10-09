import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrSteps from './fixtures/SsrSteps.vue';

test('renders steps on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrSteps));
  expect(html).toContain('data-slot="steps-root"');
  expect(html).toContain('data-slot="steps-trigger"');
  expect(html).toContain('aria-selected="true"');
});