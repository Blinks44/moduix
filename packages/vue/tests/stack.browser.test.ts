import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Stack } from '@/index';
import TestStack from './fixtures/TestStack.vue';

test('does not pass direction or fill to nested roots', () => {
  render({
    components: { Stack },
    template: `
      <Stack direction="row" fill data-testid="outer">
        <Stack data-testid="inner" />
      </Stack>
    `,
  });

  const inner = screen.getByTestId('inner');

  expect(getComputedStyle(inner).flexDirection).toBe('column');
  expect(getComputedStyle(inner).flexGrow).toBe('0');
});

test('preserves semantic hosts and refs with asChild', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = {
    components: { Stack },
    setup() {
      return { rootRef };
    },
    template: `
      <Stack ref="rootRef" as-child :gap="12" class="stack-class">
        <section aria-label="Project updates" class="section-class" style="color: red" />
      </Stack>
    `,
  };

  render(Harness);

  const section = screen.getByRole('region', { name: 'Project updates' });

  expect(rootRef.value?.$el).toBe(section);
  expect(section.style.gap).toBe('12px');
  expect([...section.classList]).toEqual(expect.arrayContaining(['section-class', 'stack-class']));
  expect(section.style).toMatchObject({ color: 'red' });
  expect(section.getAttribute('data-slot')).toBe('stack-root');
});

test('hydrates stack without replacing the server host', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestStack));
  document.body.append(host);
  const serverRoot = host.querySelector<HTMLElement>('figure')!;
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestStack);
  try {
    app.mount(host);
    await expect.element(page.getByRole('figure', { name: 'Project updates' })).toHaveCount(1);
    expect(host.querySelectorAll('figure')).toHaveLength(1);
    expect(host.querySelector('figure')).toBe(serverRoot);
    expect(serverRoot.dataset).toMatchObject({ slot: 'stack-root' });
    expect(getComputedStyle(serverRoot).flexDirection).toBe('row');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});