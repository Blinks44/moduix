import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrToggle from './fixtures/SsrToggle.vue';
import SsrToggleHost from './fixtures/SsrToggleHost.vue';

test('renders the semantic Toggle indicator fallback on the server', async () => {
  const html = await renderToString(createSSRApp(SsrToggleHost));
  expect(html).toContain('<button');
  expect(html).toContain('<em');
  expect(html).toContain('data-slot="toggle-indicator"');
  expect(html).toContain('aria-pressed="false"');
});

test('renders toggle public anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrToggle));
  expect(html).toContain('data-slot="toggle-root"');
  expect(html).toContain('data-slot="toggle-indicator"');
  expect(html).toContain('aria-pressed="true"');
});