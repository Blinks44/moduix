import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Bleed } from '../src';
import TestBleed from './fixtures/TestBleed.vue';

test('renders the default full-bleed root with stable hooks', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const { getByTestId } = render({
    components: { Bleed },
    setup: () => ({ rootRef }),
    template: '<Bleed ref="rootRef" data-testid="bleed" />',
  });
  const bleed = getByTestId('bleed');

  expect(bleed.getAttribute('data-scope')).toBe('bleed');
  expect(bleed.getAttribute('data-part')).toBe('root');
  expect(bleed.getAttribute('data-slot')).toBe('bleed-root');
  expect(bleed.getAttribute('data-inline')).toBe('full');
  expect(bleed.getAttribute('data-block')).toBe('none');
  expect(rootRef.value?.$el).toBe(bleed);
  expect(bleed.getBoundingClientRect().width).toBeCloseTo(window.innerWidth);
  expect(getComputedStyle(bleed).marginBlockStart).toBe('0px');
});

test('composes a semantic asChild element and exposes its DOM root through a Vue ref', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = {
    components: { Bleed },
    setup() {
      return { rootRef };
    },
    template: `
      <Bleed ref="rootRef" as-child inline="md" block="sm" class="figure">
        <figure aria-label="Full-width map" />
      </Bleed>
    `,
  };
  const { getByRole } = render(Harness);
  const figure = getByRole('figure', { name: 'Full-width map' });

  expect(rootRef.value?.$el).toBe(figure);
  expect(figure.getAttribute('data-inline')).toBe('md');
  expect(figure.getAttribute('data-block')).toBe('sm');
  expect([...figure.classList]).toEqual(expect.arrayContaining(['figure']));
  const style = getComputedStyle(figure);
  expect(style.marginInlineStart).toBe('-12px');
  expect(style.marginInlineEnd).toBe('-12px');
  expect(style.marginBlockStart).toBe('-8px');
  expect(style.marginBlockEnd).toBe('-8px');
});

test('keeps wrapper-owned hooks and merges consumer classes', () => {
  render({
    components: { Bleed },
    template: `
      <Bleed
        data-testid="bleed"
        data-scope="custom"
        data-part="custom"
        data-slot="custom"
        inline="xs"
        block="lg"
        class="consumer-class"
      />
    `,
  });
  const bleed = screen.getByTestId('bleed');

  expect(bleed.getAttribute('data-scope')).toBe('bleed');
  expect(bleed.getAttribute('data-part')).toBe('root');
  expect(bleed.getAttribute('data-slot')).toBe('bleed-root');
  expect(bleed.getAttribute('data-inline')).toBe('xs');
  expect(bleed.getAttribute('data-block')).toBe('lg');
  expect([...bleed.classList]).toEqual(expect.arrayContaining(['consumer-class']));
  expect(bleed.className).not.toBe('consumer-class');
  const style = getComputedStyle(bleed);
  expect(style.marginInlineStart).toBe('-4px');
  expect(style.marginBlockStart).toBe('-16px');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render({
    components: { Bleed },
    template: '<Bleed data-testid="bleed" inline="md" block="lg" class="mx-8 my-10" />',
  });
  const bleed = screen.getByTestId('bleed');

  expect([...bleed.classList]).toEqual(expect.arrayContaining(['mx-8', 'my-10']));
  expect([...bleed.classList]).not.toContain('-mx-3');
  expect([...bleed.classList]).not.toContain('-my-4');
  const style = getComputedStyle(bleed);
  expect(style.marginInlineStart).toBe('32px');
  expect(style.marginInlineEnd).toBe('32px');
  expect(style.marginBlockStart).toBe('40px');
  expect(style.marginBlockEnd).toBe('40px');
});

test('hydrates bleed without replacing the server host', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestBleed));
  document.body.append(host);
  const serverRoot = host.querySelector<HTMLElement>('figure')!;
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestBleed);
  try {
    app.mount(host);
    await expect.element(page.getByRole('figure', { name: 'Full-width map' })).toHaveCount(1);
    expect(host.querySelectorAll('figure')).toHaveLength(1);
    expect(host.querySelector('figure')).toBe(serverRoot);
    expect(serverRoot.dataset).toMatchObject({ inline: 'md', block: 'sm', slot: 'bleed-root' });
    expect([...serverRoot.classList]).toContain('figure');
    expect(getComputedStyle(serverRoot).marginInlineStart).toBe('-12px');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});