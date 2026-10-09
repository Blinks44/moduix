import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestContainer from './fixtures/TestContainer.vue';

test('renders container asChild without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestContainer));
  expect(html).toMatch(/^<main/);
  expect(html).toContain('data-slot="container-root"');
  expect(html).toContain('data-size="md"');
  expect(html).toContain('data-gutter="lg"');
});