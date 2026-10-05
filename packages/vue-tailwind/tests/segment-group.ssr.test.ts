import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrSegmentGroup from './fixtures/SsrSegmentGroup.vue';

test('renders the public segment-group anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrSegmentGroup));
  expect(html).toContain('data-slot="segment-group-root"');
  expect(html).toContain('data-slot="segment-group-item"');
  expect(html).toContain('data-state="checked"');
});