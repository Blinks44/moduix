import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrSignaturePad from './fixtures/SsrSignaturePad.vue';

test('renders signature-pad without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrSignaturePad));
  expect(html).toContain('data-slot="signature-pad-root"');
  expect(html).toContain('data-slot="signature-pad-control"');
});