import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrTable from './fixtures/SsrTable.vue';
import SsrTableHost from './fixtures/SsrTableHost.vue';

test('renders native table sections, spanning cells, and an empty row', async () => {
  const html = await renderToString(createSSRApp(SsrTable));
  for (const tag of ['table', 'colgroup', 'col', 'caption', 'thead', 'tbody', 'tfoot']) {
    expect(html).toContain('<' + tag);
  }
  expect(html).toContain('data-slot="table-empty"');
  expect(html).toContain('colspan="2"');
  expect(html).toContain('width="50%"');
  expect(html).toContain('No results.');
});

test('renders a semantic asChild table host on the server', async () => {
  const html = await renderToString(createSSRApp(SsrTableHost));
  expect(html).toContain('<section');
  expect(html).toContain('data-slot="table-root"');
  expect(html).toContain('hydrated-table');
});