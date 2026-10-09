import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrPinInput from './fixtures/SsrPinInput.vue';

test('renders pin-input on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrPinInput));
  expect(html).toContain('data-slot="pin-input-root"');
  expect(html).toContain('data-slot="pin-input-input"');
});