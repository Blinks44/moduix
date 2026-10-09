import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrNavigationMenu from './fixtures/SsrNavigationMenu.vue';

test('renders closed content safely on the server', async () => {
  const html = await renderToString(createSSRApp(SsrNavigationMenu));
  expect(html).toContain('data-slot="navigation-menu-content"');
  expect(html).toContain('data-state="closed"');
});