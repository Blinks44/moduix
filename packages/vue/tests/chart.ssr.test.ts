import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrChart from './fixtures/SsrChart.vue';

test('renders a real chart surface on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrChart));
  expect(html).toContain('data-slot="chart-root"');
  expect(html).toContain('aria-label="Monthly revenue"');
  expect(html).toContain('<svg');
  expect(html).not.toContain('data-slot="chart-tooltip-body"');
});