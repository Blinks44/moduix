import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrEmpty from './fixtures/SsrEmpty.vue';

test('renders an asChild host on the server', async () => {
  const html = await renderToString(createSSRApp(SsrEmpty));
  expect(html).toMatch(/^<section/);
  expect(html).toContain('data-scope="empty"');
  expect(html).toContain('data-slot="empty-root"');
  expect(html).toContain('data-slot="empty-title"');
  expect(html).toContain('consumer-empty');
});