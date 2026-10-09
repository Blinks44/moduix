import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestSeparator from './fixtures/TestSeparator.vue';

test('renders Separator asChild without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestSeparator));
  expect(html).toContain('<hr');
  expect(html).toContain('data-slot="separator-root"');
  expect(html).toContain('data-size="lg"');
});