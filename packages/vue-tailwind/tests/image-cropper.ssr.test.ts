import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrImageCropper from './fixtures/SsrImageCropper.vue';

test('renders image-cropper without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrImageCropper));
  expect(html).toContain('data-slot="image-cropper-root"');
  expect(html).toContain('data-slot="image-cropper-selection"');
});