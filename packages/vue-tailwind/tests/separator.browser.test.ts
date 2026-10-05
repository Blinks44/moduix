import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Separator } from '../src';
import TestSeparator from './fixtures/TestSeparator.vue';

test('keeps ARIA metadata and stable data hooks aligned with public props', async () => {
  expect('Root' in Separator).toBe(false);
  render({
    components: { Separator },
    template: `
      <Separator
        aria-orientation="vertical"
        data-testid="separator"
        data-orientation="vertical"
        data-part="custom"
        data-scope="custom"
        data-size="xs"
        data-slot="custom"
        data-variant="solid"
        orientation="horizontal"
        size="lg"
        variant="dotted"
      />
    `,
  });

  await expect.element(page.getByTestId('separator')).toHaveCount(1);
  const separator = screen.getByTestId('separator');

  expect(separator.getAttribute('role')).toBe('separator');
  expect(separator.getAttribute('aria-orientation')).toBe('horizontal');
  expect(separator.dataset).toMatchObject({
    scope: 'separator',
    part: 'root',
    slot: 'separator-root',
    orientation: 'horizontal',
    size: 'lg',
    variant: 'dotted',
  });
});

test('allows consumer utilities to replace selected defaults', async () => {
  render({
    components: { Separator },
    template: '<Separator data-testid="separator" class="w-32 border-t-2 border-primary" />',
  });

  await expect.element(page.getByTestId('separator')).toHaveCount(1);
  const separator = screen.getByTestId('separator');

  expect([...separator.classList]).toEqual(
    expect.arrayContaining(['w-32', 'border-primary', 'border-t-2']),
  );
  for (const className of ['w-full', 'border-border', 'border-t']) {
    expect(separator.classList.contains(className)).toBe(false);
  }
  await expect.element(page.getByTestId('separator')).toHaveCSS('width', '128px');
  await expect.element(page.getByTestId('separator')).toHaveCSS('border-top-width', '2px');
});

test('applies the public defaults and direct styling props', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  render({
    components: { Separator },
    setup: () => ({ rootRef }),
    template:
      '<Separator ref="rootRef" data-testid="separator" class="custom-separator" style="color: red" />',
  });

  await expect.element(page.getByTestId('separator')).toHaveCount(1);
  const separator = screen.getByTestId('separator');
  expect(rootRef.value?.$el).toBe(separator);

  expect(separator.getAttribute('role')).toBe('separator');
  expect(separator.getAttribute('aria-orientation')).toBe('horizontal');
  expect(separator.dataset).toMatchObject({
    orientation: 'horizontal',
    size: 'sm',
    variant: 'solid',
  });
  expect(separator.classList.contains('custom-separator')).toBe(true);
  expect(separator.style).toMatchObject({ color: 'red' });
  await expect.element(page.getByTestId('separator')).toHaveCSS('display', 'block');
  await expect.element(page.getByTestId('separator')).toHaveCSS('border-top-width', '1px');
  await expect.element(page.getByTestId('separator')).toHaveCSS('border-top-style', 'solid');
  await expect.element(page.getByTestId('separator')).toHaveCSS('margin', '0px');
  await expect.element(page.getByTestId('separator')).toHaveCSS('flex-shrink', '0');
  expect(separator.getBoundingClientRect().width).toBe(separator.parentElement!.clientWidth);
});

test('supports decorative separators and semantic asChild hosts', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  render({
    components: { Separator },
    setup: () => ({ rootRef }),
    template:
      '<Separator data-testid="decorative" role="presentation" aria-orientation="vertical" /><Separator ref="rootRef" as-child><hr data-testid="native-rule" /></Separator>',
  });
  await expect.element(page.getByTestId('native-rule')).toHaveCount(1);
  const decorative = screen.getByTestId('decorative');
  const nativeRule = screen.getByTestId('native-rule');
  expect(decorative.getAttribute('role')).toBe('presentation');
  expect(decorative.hasAttribute('aria-orientation')).toBe(false);
  expect(rootRef.value?.$el).toBe(nativeRule);
  expect(nativeRule.getAttribute('data-slot')).toBe('separator-root');
});

test('hydrates separator without replacing the server host', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestSeparator));
  document.body.append(host);
  const serverRoot = host.querySelector<HTMLElement>('[data-slot="separator-root"]')!;
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestSeparator);
  try {
    app.mount(host);
    await expect.element(page.getByRole('separator')).toHaveAttribute('data-size', 'lg');
    expect(host.querySelectorAll('hr')).toHaveLength(1);
    expect(host.querySelector('hr')).toBe(serverRoot);
    expect([...serverRoot.classList]).toContain('hydrated-separator');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});