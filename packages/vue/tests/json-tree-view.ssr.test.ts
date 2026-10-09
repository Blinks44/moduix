import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrJsonTreeView from './fixtures/SsrJsonTreeView.vue';

test('renders json-tree-view on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrJsonTreeView));
  expect(html).toContain('data-slot="json-tree-view-root"');
  expect(html).toContain('data-slot="json-tree-view-tree"');
  expect(html).toContain('data-scope="json-tree-view"');
});