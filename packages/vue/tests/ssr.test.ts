import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, type Component } from 'vue';
import { createToaster } from '@/components/toast';

const fixtures = import.meta.webpackContext('./fixtures', { regExp: /\.vue$/ });
// SsrTreeNode is a recursive part of SsrTreeView, not a standalone fixture.
const keys = fixtures.keys().filter((key) => key !== './SsrTreeNode.vue');
const props: Record<string, Record<string, unknown>> = {
  './SsrToast.vue': { toaster: createToaster({ placement: 'bottom', duration: Infinity }) },
};

test('runs without browser globals', () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
});

// Every hydration fixture also renders on the server, so each component keeps a Node SSR check.
test.each(keys)('renders %s on the server', async (key) => {
  const fixture = (fixtures(key) as { default: Component }).default;
  const html = await renderToString(createSSRApp(fixture, props[key]));

  expect(html).toContain('data-slot="');
});