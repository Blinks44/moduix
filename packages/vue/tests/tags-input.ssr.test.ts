import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrTagsInput from './fixtures/SsrTagsInput.vue';

test('renders tags-input on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrTagsInput));
  expect(html).toContain('data-slot="tags-input-root"');
  expect(html).toContain('data-slot="tags-input-input"');
  expect(html).toContain('data-slot="tags-input-item-text"');
});