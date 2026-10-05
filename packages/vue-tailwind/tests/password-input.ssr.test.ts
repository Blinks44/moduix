import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrPasswordInput from './fixtures/SsrPasswordInput.vue';

test('renders password-input on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrPasswordInput));
  expect(html).toContain('data-slot="password-input-root"');
  expect(html).toContain('data-slot="password-input-input"');
});