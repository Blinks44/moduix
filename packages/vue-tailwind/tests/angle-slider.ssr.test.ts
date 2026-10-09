import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestAngleSlider from './fixtures/TestAngleSlider.vue';

test('renders public angle slider anatomy without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestAngleSlider));
  expect(html).toContain('data-slot="angle-slider-root"');
  expect(html).toContain('data-slot="angle-slider-control"');
  expect(html).toContain('data-slot="angle-slider-value-text"');
  expect(html).toContain('data-slot="angle-slider-marker"');
});