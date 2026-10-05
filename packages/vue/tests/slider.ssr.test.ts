import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestSlider from './fixtures/TestSlider.vue';

test('renders public slider anatomy without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const markup = await renderToString(createSSRApp(TestSlider));
  expect(markup).toContain('data-slot="slider-root"');
  expect(markup).toContain('data-slot="slider-control"');
  expect(markup).toContain('data-slot="slider-value-text"');
  expect(markup).toContain('data-slot="slider-marker"');
});