import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrSwitch from './fixtures/SsrSwitch.vue';

test('renders the public switch anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrSwitch));
  expect(html).toContain('data-slot="switch-root"');
  expect(html).toContain('data-slot="switch-control"');
  expect(html).toContain('data-slot="switch-label"');
});