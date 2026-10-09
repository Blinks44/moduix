import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrFloatingPanel from './fixtures/SsrFloatingPanel.vue';

test('renders floating-panel on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrFloatingPanel));
  expect(html).toContain('data-slot="floating-panel-content"');
  expect(html).toContain('data-slot="floating-panel-positioner"');
});