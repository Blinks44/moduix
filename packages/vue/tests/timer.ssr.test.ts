import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrTimer from './fixtures/SsrTimer.vue';
import SsrTimerItem from './fixtures/SsrTimerItem.vue';

test('renders timer on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrTimer));
  expect(html).toContain('data-slot="timer-root"');
  expect(html).toContain('data-slot="timer-area"');
  expect(html).toContain('role="timer"');
  expect(html).toContain('data-slot="timer-action-trigger"');
});

// Ark Vue 5.39.2 discards TimerItem's default slot and feeds text to asChild.
// Re-enable after the upstream fix; both native Ark and moduix must preserve the host.
test.skip('preserves TimerItem asChild replacement hosts in native Ark and moduix', async () => {
  for (const native of [true, false]) {
    const html = await renderToString(createSSRApp(SsrTimerItem, { native }));
    const item = html.match(/<span\b[^>]*data-testid="item-host"[^>]*>12<\/span>/)?.[0];
    expect(item).toBeDefined();
    expect(item).toContain('data-part="item"');
    expect(item).toContain('data-type="seconds"');
  }
});