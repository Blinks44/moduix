import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrNativeSelect from './fixtures/SsrNativeSelect.vue';

test('renders the public native-select anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrNativeSelect));
  expect(html).toContain('data-slot="native-select-control"');
  expect(html).toContain('data-slot="native-select-root"');
  expect(html).toContain('data-slot="native-select-indicator"');
});