import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrRatingGroup from './fixtures/SsrRatingGroup.vue';

test('renders the public rating-group anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrRatingGroup));
  expect(html).toContain('data-slot="rating-group-root"');
  expect(html).toContain('data-slot="rating-group-item-indicator"');
  expect(html).toContain('role="radio"');
});