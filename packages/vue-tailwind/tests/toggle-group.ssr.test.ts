import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrToggleGroup from './fixtures/SsrToggleGroup.vue';

test('renders toggle-group public anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrToggleGroup));
  expect(html).toContain('data-slot="toggle-group-root"');
  expect(html).toContain('data-slot="toggle-group-item"');
  expect(html).toContain('data-state="on"');
});