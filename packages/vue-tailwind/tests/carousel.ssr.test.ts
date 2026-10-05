import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestCarousel from './fixtures/TestCarousel.vue';

test('renders the public anatomy on the server without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestCarousel));
  expect(html).toContain('data-slot="carousel-root"');
  expect(html).toContain('data-slot="carousel-item-group"');
  expect(html).toContain('data-slot="carousel-prev-trigger"');
  expect(html).toContain('data-slot="carousel-indicator"');
  expect(html).toContain('1 / 2');
});