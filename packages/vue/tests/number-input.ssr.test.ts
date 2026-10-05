import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import NumberInputSsrConsumer from './number-input-ssr-consumer.vue';

test('renders the number input on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(NumberInputSsrConsumer));
  expect(html).toContain('data-slot="number-input-root"');
  expect(html).toContain('role="spinbutton"');
  expect(html).toContain('aria-valuenow="7"');
});