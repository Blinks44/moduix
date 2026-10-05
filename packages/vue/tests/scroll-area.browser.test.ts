import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  ScrollArea,
  ScrollAreaContext,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRootProvider,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  useScrollArea,
} from '../src';
import SsrScrollArea from './fixtures/SsrScrollArea.vue';

const scrollAreaComponents = {
  ScrollArea,
  ScrollAreaContext,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRootProvider,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
};

test('renders Ark anatomy with stable styling hooks and forwarded refs', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const viewportRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: scrollAreaComponents,
    setup() {
      return { rootRef, viewportRef };
    },
    template: `
      <ScrollArea
        ref="rootRef"
        data-slot="consumer-root"
        data-variant="consumer"
        fade
        variant="always"
      >
        <ScrollAreaViewport ref="viewportRef" data-slot="consumer-viewport">
          <ScrollAreaContent>Scrollable content</ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollArea>
    `,
  });

  render(Harness);

  const root = rootRef.value?.$el as HTMLElement;
  const viewport = viewportRef.value?.$el as HTMLElement;

  expect('Root' in ScrollArea).toBe(false);
  expect(root!.getAttribute('data-scope')).toBe('scroll-area');
  expect(root!.getAttribute('data-part')).toBe('root');
  expect(root!.getAttribute('data-slot')).toBe('scroll-area-root');
  expect(root!.hasAttribute('data-fade')).toBe(true);
  expect(root!.getAttribute('data-variant')).toBe('always');
  expect(viewport!.getAttribute('data-part')).toBe('viewport');
  expect(viewport!.getAttribute('data-slot')).toBe('scroll-area-viewport');
  await expect
    .element(page.getByText('Scrollable content'))
    .toHaveAttribute('data-slot', 'scroll-area-content');
  await expect.element(page.locator('[data-slot="scroll-area-scrollbar"]')).toBeAttached();
  await expect.element(page.locator('[data-slot="scroll-area-thumb"]')).toBeAttached();
  await expect.element(page.locator('[data-slot="scroll-area-corner"]')).toBeAttached();
});

test('keeps RootProvider composition and context connected', async () => {
  const Harness = defineComponent({
    components: scrollAreaComponents,
    setup() {
      return { scrollArea: useScrollArea() };
    },
    template: `
      <ScrollAreaRootProvider :value="scrollArea" data-slot="consumer-provider" style="width: 240px; height: 120px">
        <ScrollAreaViewport>
          <ScrollAreaContent style="height: 480px">Provider content</ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
        <ScrollAreaCorner />
        <ScrollAreaContext v-slot="context">
          <output>{{ String(context.isAtTop) }}</output>
          <button type="button" @click="context.scrollToEdge({ edge: 'bottom', behavior: 'instant' })">Scroll to bottom</button>
        </ScrollAreaContext>
      </ScrollAreaRootProvider>
    `,
  });

  render(Harness);

  await expect
    .element(page.locator('[data-slot="scroll-area-root-provider"]'))
    .toHaveAttribute('data-scope', 'scroll-area');
  await expect.element(page.getByText('Provider content')).toBeAttached();
  await expect.element(page.getByText('true')).toBeAttached();
  const viewport = document.querySelector('[data-slot="scroll-area-viewport"]')!;
  await expect
    .element(page.locator('[data-slot="scroll-area-viewport"]'))
    .toHaveAttribute('data-overflow-y');
  expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight);
  await page.getByRole('button', { name: 'Scroll to bottom', exact: true }).click();
  await expect
    .element(page.locator('[data-slot="scroll-area-viewport"]'))
    .toHaveAttribute('data-at-bottom');
  await expect.element(page.getByText('false', { exact: true })).toBeAttached();
  expect(viewport.scrollTop).toBe(viewport.scrollHeight - viewport.clientHeight);
});

test('preserves asChild composition and refs for every visible part', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const viewportRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const scrollbarRef = ref<ComponentPublicInstance>();
  const thumbRef = ref<ComponentPublicInstance>();
  const cornerRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: scrollAreaComponents,
    setup() {
      return { contentRef, cornerRef, rootRef, scrollbarRef, thumbRef, viewportRef };
    },
    template: `
      <ScrollArea ref="rootRef" as-child>
        <section aria-label="Related articles" role="region">
          <ScrollAreaViewport ref="viewportRef">
            <ScrollAreaContent ref="contentRef">Article list</ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar ref="scrollbarRef"><ScrollAreaThumb ref="thumbRef" /></ScrollAreaScrollbar>
          <ScrollAreaCorner ref="cornerRef" />
        </section>
      </ScrollArea>
    `,
  });

  render(Harness);

  const root = screen.getByRole('region', { name: 'Related articles' });

  expect(rootRef.value?.$el).toBe(root);
  await expect
    .element(page.getByRole('region', { name: 'Related articles', exact: true }))
    .toHaveAttribute('data-slot', 'scroll-area-root');
  await expect
    .element(page.getByRole('region', { name: 'Related articles', exact: true }))
    .not.toHaveAttribute('data-fade');
  await expect
    .element(page.getByRole('region', { name: 'Related articles', exact: true }))
    .toHaveAttribute('data-variant', 'hover');
  expect(viewportRef.value!.$el.getAttribute('data-slot')).toBe('scroll-area-viewport');
  expect(contentRef.value!.$el.getAttribute('data-slot')).toBe('scroll-area-content');
  expect(scrollbarRef.value!.$el.getAttribute('data-slot')).toBe('scroll-area-scrollbar');
  expect(thumbRef.value!.$el.getAttribute('data-slot')).toBe('scroll-area-thumb');
  expect(cornerRef.value!.$el.getAttribute('data-slot')).toBe('scroll-area-corner');
});

test('renders and hydrates scroll-area without replacing server hosts or IDs', async () => {
  const html = await renderToString(createSSRApp(SsrScrollArea));
  expect(html).toContain('data-slot="scroll-area-root"');
  expect(html).toContain('data-slot="scroll-area-viewport"');
  expect(html).toContain('data-slot="scroll-area-content"');
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverParts = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(serverIds.length).toBeGreaterThan(0);
  expect(serverIds.every(Boolean)).toBe(true);
  const app = createSSRApp(SsrScrollArea);
  try {
    app.mount(host);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    const hydratedParts = [...host.querySelectorAll('[data-slot]')];
    expect(hydratedParts).toHaveLength(serverParts.length);
    hydratedParts.forEach((part, index) => expect(part).toBe(serverParts[index]));
    expect(host.querySelectorAll('[data-slot="scroll-area-root"]')).toHaveLength(1);
    await expect
      .element(page.locator('[data-slot="scroll-area-content"]'))
      .toContainText('Server content');
    const viewport = page.locator('[data-slot="scroll-area-viewport"]');
    await expect.element(viewport).toHaveAttribute('data-overflow-y');
    await viewport.press('End');
    await expect.element(viewport).toHaveAttribute('data-at-bottom');
  } finally {
    app.unmount();
    host.remove();
  }
});