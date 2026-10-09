import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestBadge from './fixtures/TestBadge.vue';

test('renders Badge asChild without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestBadge));
  expect(html).toContain('<a');
  expect(html).toContain('data-slot="badge-root"');
  expect(html).toContain('data-variant="link"');
  expect(html).toContain('href="#styling"');
});