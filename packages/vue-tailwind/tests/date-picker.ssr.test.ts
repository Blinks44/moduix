import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrDatePicker from './fixtures/SsrDatePicker.vue';

test('renders date-picker on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrDatePicker));
  expect(html).toContain('data-slot="date-picker-root"');
  expect(html).toContain('data-slot="date-picker-input"');
  expect(html).toContain('data-slot="date-picker-month-select"');
  expect(html).toContain('data-slot="date-picker-year-select"');
  expect(html).toContain('data-slot="date-picker-value-text"');
});