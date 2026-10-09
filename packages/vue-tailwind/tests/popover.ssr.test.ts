import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import TestPopover from './fixtures/TestPopover.vue';

test('renders the public popover anatomy without browser globals', async () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
  const html = await renderToString(createSSRApp(TestPopover));
  expect(html).toContain('data-slot="popover-trigger"');
  expect(html).toContain('data-slot="popover-content"');
  expect(html).toContain('data-slot="popover-title"');
});