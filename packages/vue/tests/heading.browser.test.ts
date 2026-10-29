import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Heading } from '@/index';
import TestHeading from './fixtures/TestHeading.vue';

test.each([false, true])(
  'keeps the host and ref stable between semantic changes, asChild=%s',
  async (asChild) => {
    const element = ref<NonNullable<InstanceType<typeof Heading>['$props']['as']>>();
    const title = ref('Initial');
    const rootRef = ref<ComponentPublicInstance>();
    render({
      components: { Heading },
      setup: () => ({ element, title, rootRef, asChild }),
      template: `
      <Heading ref="rootRef" :as="element" :as-child="asChild" :title="title" data-testid="root">
        <h2>Content</h2>
      </Heading>
    `,
    });
    for (const as of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const) {
      element.value = as;
      await nextTick();
      const host = screen.getByTestId('root');
      expect(host.tagName).toBe(asChild ? 'H2' : as.toUpperCase());
      expect(rootRef.value?.$el).toBe(host);
      title.value = as;
      await nextTick();
      expect(screen.getByTestId('root')).toBe(host);
      expect(rootRef.value?.$el).toBe(host);
      expect(host.getAttribute('title')).toBe(as);
      expect(host.textContent).toContain('Content');
    }
    element.value = undefined;
    await nextTick();
    expect(screen.getByTestId('root').tagName).toBe(asChild ? 'H2' : 'H1');
  },
);

test('keeps explicit visual props separate from heading semantics', () => {
  render({
    components: { Heading },
    template: '<Heading as="h3" size="2xl" weight="bold">Section title</Heading>',
  });

  const heading = screen.getByRole('heading', { name: 'Section title', level: 3 });

  expect(heading.getAttribute('data-size')).toBe('2xl');
  expect(heading.getAttribute('data-weight')).toBe('bold');
});

test('hydrates heading without replacing the server host', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestHeading));
  document.body.append(host);
  const serverRoot = host.querySelector<HTMLElement>('h2')!;
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestHeading);
  try {
    app.mount(host);
    await expect
      .element(page.getByRole('heading', { name: 'Hydrated heading', level: 2 }))
      .toHaveCount(1);
    expect(host.querySelectorAll('h2')).toHaveLength(1);
    expect(host.querySelector('h2')).toBe(serverRoot);
    expect(serverRoot.getAttribute('data-size')).toBe('xl');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});

test('derives the default size from as, also through asChild', () => {
  render({
    components: { Heading },
    template: '<Heading as="h3" as-child><h3>Composed section title</h3></Heading>',
  });

  const heading = screen.getByRole('heading', { name: 'Composed section title', level: 3 });

  expect(heading.getAttribute('data-size')).toBe('lg');
});