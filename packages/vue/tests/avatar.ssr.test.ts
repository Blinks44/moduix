import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrAvatar from './fixtures/SsrAvatar.vue';

test('renders avatar fallback anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrAvatar));
  expect(html).toContain('data-slot="avatar-root"');
  expect(html).toContain('data-slot="avatar-fallback"');
  expect(html).toContain('data-slot="avatar-image"');
  expect(html).toContain('alt="Alex T."');
});