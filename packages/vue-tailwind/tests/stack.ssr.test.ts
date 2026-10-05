import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestStack from './fixtures/TestStack.vue';

test('renders stack asChild without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestStack));
  expect(html).toMatch(/^<figure/);
  expect(html).toContain('data-slot="stack-root"');
  expect(html).toContain('Project updates');
});