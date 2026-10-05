import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrMarquee from './fixtures/SsrMarquee.vue';

test('renders marquee on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrMarquee));
  expect(html).toContain('data-slot="marquee-root"');
  expect(html).toContain('data-slot="marquee-viewport"');
  expect(html).toContain('data-slot="marquee-content"');
});