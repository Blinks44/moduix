import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrTour from './fixtures/SsrTour.vue';

test('renders tour on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrTour));
  expect(html).toContain('data-slot="tour-content"');
  expect(html).toContain('data-slot="tour-positioner"');
});