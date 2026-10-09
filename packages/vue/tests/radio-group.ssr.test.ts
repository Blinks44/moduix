import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrRadioGroup from './fixtures/SsrRadioGroup.vue';

test('renders the public radio-group anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrRadioGroup));
  expect(html).toContain('data-slot="radio-group-root"');
  expect(html).toContain('data-slot="radio-group-item-control"');
  expect(html).toContain('checked');
});