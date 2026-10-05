import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrFieldset from './fixtures/SsrFieldset.vue';

test('renders the public fieldset anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrFieldset));
  expect(html).toContain('data-slot="fieldset-root"');
  expect(html).toContain('data-slot="fieldset-legend"');
  expect(html).toContain('aria-live="polite"');
});