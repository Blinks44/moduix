import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import { createToaster } from '../src/components/toast';
import SsrToast from './fixtures/SsrToast.vue';

test('renders toast on the server without browser globals', async () => {
  const html = await renderToString(
    createSSRApp(SsrToast, { toaster: createToaster({ placement: 'bottom', duration: Infinity }) }),
  );
  expect(html).toContain('data-slot="toast-toaster"');
});