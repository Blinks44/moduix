import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrLightbox from './fixtures/SsrLightbox.vue';

test('renders lightbox on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrLightbox));
  expect(html).toContain('data-slot="lightbox-content"');
  expect(html).toContain('data-slot="lightbox-image"');
  expect(html).toContain('role="dialog"');
});