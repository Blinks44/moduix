import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrTreeView from './fixtures/SsrTreeView.vue';

test('renders tree-view on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrTreeView));
  expect(html).toContain('data-slot="tree-view-root"');
  expect(html).toContain('data-slot="tree-view-tree"');
  expect(html).toContain('data-slot="tree-view-item"');
});