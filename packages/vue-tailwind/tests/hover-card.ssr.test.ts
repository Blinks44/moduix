import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestHoverCard from './fixtures/TestHoverCard.vue';

test('renders the public hover-card anatomy without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestHoverCard));
  expect(html).toContain('data-slot="hover-card-trigger"');
  expect(html).toContain('data-slot="hover-card-content"');
});