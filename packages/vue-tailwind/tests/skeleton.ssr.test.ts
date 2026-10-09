import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestSkeleton from './fixtures/TestSkeleton.vue';

test('renders Skeleton asChild without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestSkeleton));
  expect(html).toContain('<section');
  expect(html).toContain('data-state="loading"');
  expect(html).toContain('aria-hidden="true"');
  expect(html).toContain('data-slot="skeleton-root"');
});