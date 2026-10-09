import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrQrCode from './fixtures/SsrQrCode.vue';

test('renders qr-code public anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrQrCode));
  expect(html).toContain('data-slot="qr-code-root"');
  expect(html).toContain('data-slot="qr-code-frame"');
  expect(html).toContain('data-slot="qr-code-pattern"');
});