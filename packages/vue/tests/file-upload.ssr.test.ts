import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestFileUpload from './fixtures/TestFileUpload.vue';

test('renders FileUpload anatomy without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestFileUpload));
  expect(html).toContain('data-slot="file-upload-root"');
  expect(html).toContain('data-slot="file-upload-dropzone-icon"');
  expect(html).toContain('type="file"');
  expect(html).toContain('aria-label="Clear files"');
  expect(html).toContain('moduix.txt');
});