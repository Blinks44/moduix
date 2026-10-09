import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Container } from '../src';
import TestContainer from './fixtures/TestContainer.vue';

test.each([
  ['xs', '640px'],
  ['sm', '768px'],
  ['md', '1024px'],
  ['lg', '1152px'],
  ['xl', '1440px'],
  ['full', 'none'],
] as const)('applies the %s maximum width', (size, maxWidth) => {
  render({
    components: { Container },
    template: `<Container data-testid="container" size="${size}" gutter="none" />`,
  });

  expect(screen.getByTestId('container').getAttribute('data-size')).toBe(size);
  expect(getComputedStyle(screen.getByTestId('container')).maxWidth).toBe(maxWidth);
});

test.each([
  ['none', 0, 0, 0],
  ['sm', 12, 3, 24],
  ['md', 16, 4, 32],
  ['lg', 24, 5, 48],
] as const)('applies the %s gutter and includes it in maximum width', (gutter, min, vw, max) => {
  render({
    components: { Container },
    template: `<Container data-testid="container" gutter="${gutter}" />`,
  });

  expect(screen.getByTestId('container').getAttribute('data-gutter')).toBe(gutter);
  const style = getComputedStyle(screen.getByTestId('container'));
  const padding = Math.min(max, Math.max(min, (window.innerWidth * vw) / 100));
  expect(parseFloat(style.paddingInlineStart)).toBeCloseTo(padding);
  expect(parseFloat(style.paddingInlineEnd)).toBeCloseTo(padding);
  expect(parseFloat(style.maxWidth)).toBeCloseTo(1152 + padding * 2);
});

test('preserves default layout, refs, and owned hooks when consumer props conflict', () => {
  const rootRef = ref<ComponentPublicInstance>();
  render({
    components: { Container },
    setup: () => ({ rootRef }),
    template: `
      <Container
        ref="rootRef"
        data-testid="container"
        data-scope="custom"
        data-part="custom"
        data-slot="custom"
        data-size="custom"
        data-gutter="custom"
        class="consumer-class"
      />
    `,
  });
  const container = screen.getByTestId('container');

  expect(container.getAttribute('data-scope')).toBe('container');
  expect(container.getAttribute('data-part')).toBe('root');
  expect(container.getAttribute('data-slot')).toBe('container-root');
  expect(container.getAttribute('data-size')).toBe('lg');
  expect(container.getAttribute('data-gutter')).toBe('md');
  expect([...container.classList]).toEqual(expect.arrayContaining(['consumer-class']));
  expect(rootRef.value?.$el).toBe(container);
  expect('Root' in Container).toBe(false);
  const style = getComputedStyle(container);
  expect(style.display).toBe('block');
  expect(style.minWidth).toBe('0px');
  expect(parseFloat(style.maxWidth)).toBeCloseTo(1152 + parseFloat(style.paddingInlineStart) * 2);
});

test('composes a semantic asChild element and exposes its DOM root through a Vue ref', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = {
    components: { Container },
    setup() {
      return { rootRef };
    },
    template: `
      <Container ref="rootRef" as-child size="md" gutter="lg" class="semantic-root">
        <main aria-label="Page content" />
      </Container>
    `,
  };

  render(Harness);
  const main = screen.getByRole('main', { name: 'Page content' });

  expect(rootRef.value?.$el).toBe(main);
  expect(main.getAttribute('data-scope')).toBe('container');
  expect(main.getAttribute('data-part')).toBe('root');
  expect(main.getAttribute('data-slot')).toBe('container-root');
  expect(main.getAttribute('data-size')).toBe('md');
  expect(main.getAttribute('data-gutter')).toBe('lg');
  expect([...main.classList]).toEqual(expect.arrayContaining(['semantic-root']));
});

test('hydrates container without replacing the server host', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestContainer));
  document.body.append(host);
  const serverRoot = host.querySelector<HTMLElement>('main')!;
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestContainer);
  try {
    app.mount(host);
    await expect.element(page.getByRole('main', { name: 'Page content' })).toHaveCount(1);
    expect(host.querySelectorAll('main')).toHaveLength(1);
    expect(host.querySelector('main')).toBe(serverRoot);
    expect(serverRoot.dataset).toMatchObject({ size: 'md', gutter: 'lg', slot: 'container-root' });
    expect([...serverRoot.classList]).toContain('semantic-root');
    expect(getComputedStyle(serverRoot).display).toBe('block');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});