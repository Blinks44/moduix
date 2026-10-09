import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestCard from './fixtures/TestCard.vue';

test('renders Card asChild without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestCard));
  expect(html).toMatch(/^<a/);
  expect(html).toContain('data-slot="card-root"');
  expect(html).toContain('data-variant="subtle"');
  expect(html).toContain('href="/reports/release-health"');
});